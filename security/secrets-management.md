# Secrets Management

This document defines the rules and best practices for handling secrets across all repositories of the OhMyOpenSource! organization.  
A secret is any piece of sensitive information that, if exposed, could compromise the security of a system or its users. This includes API keys, database credentials, authentication tokens, private certificates, and any other value that grants access to a resource.

---

## The Golden Rule

> **A secret must never be committed to a Git repository, not even a private one.**

Private repositories are not vaults. They get cloned, forked, and shared. New contributors join and leave. Git history is permanent and travels with every clone. Once a secret enters a repository's history, it must be considered compromised, regardless of whether it has been deleted from the latest commit.

A private repository containing secrets is like a password written on a banknote: you might trust the person you gave it to, but that note will pass through many hands.

---

## What Counts as a Secret

The following must **never** appear in source code, commit messages, configuration files, or any file tracked by Git:

- API keys and tokens (e.g. `sk_live_...`, `ghp_...`)
- Database connection strings containing credentials
- Passwords and passphrases
- Private SSH or TLS keys
- OAuth client secrets
- Webhook secrets
- Encryption keys and salts
- Any credential for a third-party service (AWS, Stripe, SendGrid, etc.)

If in doubt, treat it as a secret.

---

## The `.env` File

The standard approach for managing secrets in local development is the `.env` file: a plain text file that stores environment variables in `KEY=value` format, loaded at runtime by the application and never committed to version control.

```dotenv
# Example .env file — never commit this
DATABASE_URL=postgres://user:password@localhost:5432/myapp
API_KEY=a1b2c3d4e5f6g7h8
STRIPE_SECRET_KEY=sk_live_...
JWT_SECRET=my-very-secret-key
```

### Rules for `.env` files

- `.env` must always be listed in `.gitignore`, from the very first commit
- Never use `git add .` or `git add *`, always add files explicitly to avoid accidentally staging a `.env` file
- A `.env.example` (or `.env.sample`) file **must** be committed instead, containing all required variable names with empty or dummy values

```dotenv
# .env.example — commit this, not .env
DATABASE_URL=
API_KEY=
STRIPE_SECRET_KEY=
JWT_SECRET=
```

This gives new contributors a clear picture of what variables are needed without exposing real values. The setup flow for a new contributor should always be:

```bash
cp .env.example .env
# fill in real values from the team's secrets manager
```

### Naming conventions for `.env` variables

- Use `SCREAMING_SNAKE_CASE`
- Be descriptive: `STRIPE_SECRET_KEY` not `KEY`
- Prefix by service when multiple services are involved: `SENDGRID_API_KEY`, `AWS_SECRET_ACCESS_KEY`

### Validate on startup

Applications should validate that all required environment variables are present at startup, rather than failing silently at runtime when a missing variable is first accessed.

```javascript
// Example: fail fast if required variables are missing
const required = ['DATABASE_URL', 'API_KEY', 'JWT_SECRET'];
for (const key of required) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}
```

---

## `.gitignore` Template

Every repository must include a `.gitignore` that covers, at minimum, the following patterns:

```gitignore
# Environment variables
.env
.env.local
.env.*.local
.env.production
.env.staging

# Credentials and keys
*.pem
*.key
*.p12
*.pfx
id_rsa
id_ed25519

# Config files that may contain secrets
.netrc
.npmrc
.pypirc
config/secrets.yml
config/credentials.yml.enc
```

---

## Secrets in CI/CD: GitHub Actions

For automated workflows, secrets must be stored as **GitHub Actions Secrets**, never hardcoded in workflow files or passed as plain-text environment variables.

### How to add a secret

1. Go to the repository on GitHub
2. Navigate to **Settings** => **Secrets and variables** => **Actions**
3. Click **New repository secret**
4. Enter the name (e.g. `STRIPE_SECRET_KEY`) and value
5. Save - the value will never be visible again after creation

For secrets shared across multiple repositories within the organization, use **organization-level secrets** instead of duplicating them per repository.

### How to use secrets in a workflow

Reference secrets with `${{ secrets.SECRET_NAME }}` — they are automatically masked in logs.

```yaml
name: Deploy

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Deploy to production
        env:
          API_KEY: ${{ secrets.API_KEY }}
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
        run: ./scripts/deploy.sh
```

### Rules for secrets in GitHub Actions

- **Never** print secrets to logs with `echo` or `console.log`, even masked values should not be logged deliberately
- **Never** hardcode secrets directly in workflow YAML files
- **Never** pass secrets as command-line arguments, they may appear in process listings
- Pass secrets as environment variables within the step that needs them, not globally across the entire job unless necessary
- Use environment-scoped secrets (via GitHub Environments) to restrict which workflows can access production credentials

```yaml
# ✅ Scoped to the step that needs it
- name: Publish package
  env:
    NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
  run: npm publish

# ❌ Avoid: exposed globally across all steps
env:
  NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
jobs:
  ...
```

### Using GitHub Environments for environment-specific secrets

For projects with multiple deployment targets (development, staging, production), use **GitHub Environments** to scope secrets to the appropriate context:

1. Go to **Settings** => **Environments**
2. Create environments (e.g. `production`, `staging`)
3. Add secrets scoped to each environment
4. Reference them in the workflow with the `environment` key:

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - name: Deploy
        env:
          DB_PASSWORD: ${{ secrets.DB_PASSWORD }}  # production-scoped
        run: ./deploy.sh
```

This ensures that production credentials are only accessible when a workflow explicitly targets the production environment, and can require manual approval before running.

---

## What to Do If a Secret Is Accidentally Committed

If a secret is committed to a repository, even briefly, treat it as compromised immediately.

**Do not** rely on deleting the file or reverting the commit. The secret is already in the Git history and may have been cloned or indexed.

The correct response, in order:

1. **Revoke and rotate the secret immediately**, invalidate the exposed credential at the source (the API provider, the cloud console, etc.) before doing anything else
2. **Remove it from Git history** using `git filter-repo` or BFG Repo Cleaner
3. **Force-push the rewritten history** and notify all contributors to re-clone
4. **Audit access logs** of the affected service to check for unauthorized use
5. **Document the incident** internally

```bash
# Remove a specific file from the entire Git history
# (requires git-filter-repo: pip install git-filter-repo)
git filter-repo --path .env --invert-paths
git push origin --force --all
```

> Removing a secret from history is a disruptive operation. Communicate with the team before force-pushing to shared branches.

---

## Automated Secrets Scanning

Manual vigilance is not sufficient. Every repository should have automated scanning in place to detect secrets before they are pushed or merged.

### Recommended tools

- **[git-secrets](https://github.com/awslabs/git-secrets)**: prevents commits containing secrets by scanning against configurable patterns (local hook)
- **[detect-secrets](https://github.com/Yelp/detect-secrets)**: baseline-based scanner that can be integrated into CI
- **[GitGuardian](https://www.gitguardian.com/)**: real-time monitoring across repositories, with alerts for detected credentials
- **GitHub Secret Scanning**: enabled by default on public repositories; alerts maintainers when known secret patterns are detected

At minimum, a `detect-secrets` pre-commit hook or equivalent should be active on every repository.

---

## Least Privilege Principle

Every secret should grant only the minimum permissions required for its purpose.

- Create dedicated API keys per service and per environment, never share a single key across multiple services or contexts
- Use short-lived tokens where the provider supports them (e.g. OAuth access tokens, AWS STS)
- Rotate secrets regularly, and always rotate them when a contributor leaves the project
- Revoke any key that is no longer in active use

---

## Summary: What to Do and What Not to Do

| Do | Do not |
|---|---|
| Store secrets in `.env`, excluded from Git | Commit `.env` or any file containing real credentials |
| Commit `.env.example` with empty values | Use `git add .` without checking what is staged |
| Use GitHub Secrets for CI/CD | Hardcode secrets in workflow YAML files |
| Scope secrets to environments and steps | Share a single key across multiple environments |
| Rotate secrets regularly | Leave unused or expired keys active |
| Revoke immediately if exposed | Rely on commit deletion to hide an exposed secret |
| Use automated scanning tools | Trust manual code review alone to catch secrets |

---

## References

- [GitHub Docs - Using secrets in GitHub Actions](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets)
- [GitHub Docs - Storing your secrets safely](https://docs.github.com/en/get-started/learning-to-code/storing-your-secrets-safely)
- [API Keys Security & Secrets Management Best Practices - GitGuardian](https://blog.gitguardian.com/secrets-api-management/)
- [Secure Your Secrets with .env - GitGuardian](https://blog.gitguardian.com/secure-your-secrets-with-env/)
- [.env Files and the Art of Not Committing Secrets - OpenReplay](https://blog.openreplay.com/env-files-art-not-committing-secrets/)
