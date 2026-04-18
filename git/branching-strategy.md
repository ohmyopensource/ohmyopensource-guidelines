# Branching Strategy

This document defines the branching model adopted across all repositories of the OhMyOpenSource! organization.  
A consistent branching strategy is the foundation of a stable, collaborative and predictable development process. It determines how work is organized, how code moves toward production, and how teams can collaborate in parallel without stepping on each other.

---

## Why a Branching Strategy Matters

Without a defined branching model, a repository tends toward chaos: changes intended for different releases get mixed together, hotfixes get lost in unfinished features, and no one can tell at a glance what state the codebase is in.

A branching strategy solves this by giving every line of work a designated home: a branch with a clear purpose, a clear origin and a clear destination.

---

## The Model: GitFlow (adapted)

The strategy adopted by OhMyOpenSource! is based on **GitFlow**, originally described by Vincent Driessen in 2010 and since adopted as an industry standard for projects with structured releases.

The model defines two categories of branches: **permanent branches**, which exist for the entire lifetime of the project, and **temporary branches**, which are created for a specific purpose and deleted once merged.

> **Note:** GitFlow works best for projects with versioned, scheduled releases. For projects that deploy continuously and frequently (e.g. web services with multiple deploys per day), a simpler model such as GitHub Flow may be more appropriate. The choice of strategy should be made per project and documented in its own `CONTRIBUTING.md`.

---

## Permanent Branches

These branches are never deleted. They represent the current state of the codebase at different stages of the delivery pipeline.

### `main`

`main` is the single source of truth for what is running in **production**.

- Every commit on `main` represents a release-ready state of the software
- Direct commits to `main` are **not allowed**: changes arrive only via merges from `release/` or `hotfix/` branches
- Every merge into `main` must be tagged with a version number (see [Versioning](#versioning))
- `main` is protected: force pushes are disabled, and merges require at least one approval

> If something is on `main`, it is in production... or it is about to be.

### `develop`

`develop` is the integration branch. It holds the **latest delivered development changes** intended for the next release.

- All completed features are merged into `develop` first
- `develop` should always be in a buildable, testable state, never intentionally broken
- Automated CI runs against `develop` continuously
- Direct commits to `develop` are discouraged; changes arrive via `feature/` branches through pull requests

> Think of `develop` as the staging area for the next release. It is where the team's work comes together before it is promoted toward production.

### `staging` *(optional)*

Some projects introduce a `staging` branch between `develop` and `main` to represent a **pre-production environment**: a deployed instance that mirrors production as closely as possible and is used for final validation before a release.

- `staging` is fed from `release/` branches during the release preparation phase
- It is useful when the team needs a stable environment for QA, user acceptance testing or external stakeholder review
- Not all projects require this branch — its introduction should be a deliberate decision documented in the project

---

## Temporary Branches

These branches are created for a specific task and deleted once merged. They keep the repository clean and make the purpose of every line of work immediately visible from the branch name.

### `feature/<name>`

Used to develop a **new feature** for an upcoming release.

| Property | Value |
|---|---|
| Branches from | `develop` |
| Merges into | `develop` |
| Naming | `feature/<short-description>` |
| Lifetime | Until the feature is complete and merged |

```bash
git checkout develop
git checkout -b feature/user-avatar-upload
# ... work ...
git push origin feature/user-avatar-upload
# open a pull request targeting develop
```

Keep feature branches short-lived. A branch that lives for weeks tends to accumulate merge conflicts and becomes harder to review. If a feature is large, break it into smaller incremental branches.

**Examples:**
```
feature/oauth2-login
feature/dark-mode-toggle
feature/search-results-pagination
```

### `fix/<name>`

Used to fix a bug discovered **during development**, before a release.

| Property | Value |
|---|---|
| Branches from | `develop` |
| Merges into | `develop` |
| Naming | `fix/<short-description>` |
| Lifetime | Until the fix is merged |

```bash
git checkout develop
git checkout -b fix/login-redirect-loop
```

**Examples:**
```
fix/empty-cart-checkout
fix/avatar-upload-mime-validation
fix/dashboard-chart-rendering
```

> `fix/` branches address bugs found during active development. For bugs discovered in production, use a `hotfix/` branch instead (see below).

### `release/<version>`

Used to **prepare a new production release**. Once a set of features on `develop` is considered complete and stable, a release branch is opened to finalize the release.

| Property | Value |
|---|---|
| Branches from | `develop` |
| Merges into | `main` **and** `develop` |
| Naming | `release/<version>` e.g. `release/2.3.0` |
| Lifetime | Until the release is tagged and deployed |

A release branch allows the team to perform final checks, bump the version number, update the changelog and apply last-minute minor fixes, all without blocking the ongoing development on `develop`.

```bash
git checkout develop
git checkout -b release/2.3.0
# bump version, update CHANGELOG.md, minor fixes
git checkout main
git merge --no-ff release/2.3.0
git tag -a v2.3.0 -m "build(release): v2.3.0"
git checkout develop
git merge --no-ff release/2.3.0
git branch -d release/2.3.0
```

No new features are added to a release branch. Only bug fixes, version bumps and documentation updates are allowed.

### `hotfix/<name>`

Used to **fix a critical bug in production** that cannot wait for the next planned release.

| Property | Value |
|---|---|
| Branches from | `main` |
| Merges into | `main` **and** `develop` |
| Naming | `hotfix/<short-description>` or `hotfix/<version>` |
| Lifetime | Until the fix is deployed and merged back |

```bash
git checkout main
git checkout -b hotfix/payment-double-charge
# apply fix
git checkout main
git merge --no-ff hotfix/payment-double-charge
git tag -a v2.2.1 -m "build(release): v2.2.1"
git checkout develop
git merge --no-ff hotfix/payment-double-charge
git branch -d hotfix/payment-double-charge
```

> Hotfixes branch from `main` because `develop` may already contain unreleased changes that must not go to production. The fix is then merged back into both `main` (to deploy it) and `develop` (to keep the branches in sync).

---

## Branch Naming Conventions

| Branch type | Pattern | Examples |
|---|---|---|
| Feature | `feature/<short-description>` | `feature/stripe-integration`, `feature/user-roles` |
| Bug fix (dev) | `fix/<short-description>` | `fix/session-expiry`, `fix/null-pointer-checkout` |
| Release | `release/<version>` | `release/1.4.0`, `release/2.0.0-beta` |
| Hotfix | `hotfix/<short-description>` | `hotfix/csrf-token`, `hotfix/critical-data-loss` |

Rules:
- Use **lowercase** and **hyphens** only - no underscores, no camelCase, no spaces
- Keep names **short and descriptive** - the branch name should give a clear idea of its purpose at a glance
- Do not use personal names or cryptic identifiers (`feature/johns-stuff`, `feature/xyz123`)
- Issue or ticket numbers may be included as a suffix when helpful: `feature/user-roles-#214`

---

## Branch Overview

**Permanent branches:**
- `main`: reflects the current production state. Receives merges from `release/` and `hotfix/` only.
- `develop`: integration branch for the next release. Receives merges from `feature/` and `fix/` only.
- `staging` *(optional)*: pre-production environment, fed from `release/` branches for final validation.

**Temporary branches:**
- `feature/*`: branches from `develop`, merges back into `develop`
- `fix/*`: branches from `develop`, merges back into `develop`
- `release/*`: branches from `develop`, merges into `main` and `develop`
- `hotfix/*`: branches from `main`, merges into `main` and `develop`

**Development flow:**
- `develop` => `feature/*` => PR => `develop` => `release/*` => `main`

**Hotfix flow:**
- `main` => `hotfix/*` => PR => `main` + `develop`

---

## Versioning

All releases follow [Semantic Versioning](https://semver.org/): `MAJOR.MINOR.PATCH`.

| Change type | Version bump | Example |
|---|---|---|
| Breaking change | Major | `1.4.2` → `2.0.0` |
| New feature (non-breaking) | Minor | `1.4.2` → `1.5.0` |
| Bug fix or patch | Patch | `1.4.2` → `1.4.3` |

Every merge into `main` must be tagged:
```bash
git tag -a v2.3.0 -m "build(release): v2.3.0"
git push origin v2.3.0
```

---

## Protected Branches

Both `main` and `develop` are protected. The following rules apply:

- **Force pushes are disabled**
- **Direct commits are not allowed** - all changes must arrive via pull requests
- **At least one approval** is required before merging
- **All CI checks must pass** before a PR can be merged

These protections are enforced at the repository level via GitHub branch protection rules.

---

## Day-to-Day Workflow: A Practical Example

The following example walks through a typical development cycle from feature to production.

**1. A developer starts a new feature:**
```bash
git checkout develop
git pull origin develop
git checkout -b feature/email-notifications
```

**2. Work is done and pushed:**
```bash
git add .
git commit -m "feat(notifications): add email alert on new direct message"
git push origin feature/email-notifications
```

**3. A pull request is opened** targeting `develop`. After review and approval, it is merged.

**4. When enough features are ready, a release branch is cut:**
```bash
git checkout develop
git pull origin develop
git checkout -b release/1.5.0
# bump version in package.json, update CHANGELOG.md
git commit -m "build(release): bump version to 1.5.0"
```

**5. Final checks pass. The release is merged into `main` and tagged:**
```bash
git checkout main
git merge --no-ff release/1.5.0
git tag -a v1.5.0 -m "build(release): v1.5.0"
git push origin main --tags
```

**6. The release is also merged back into `develop`:**
```bash
git checkout develop
git merge --no-ff release/1.5.0
git push origin develop
git branch -d release/1.5.0
```

**7. A critical bug is discovered in production:**
```bash
git checkout main
git pull origin main
git checkout -b hotfix/login-token-expiry
# fix the bug
git commit -m "fix(auth): handle expired login token on session restore"
git checkout main
git merge --no-ff hotfix/login-token-expiry
git tag -a v1.5.1 -m "build(release): v1.5.1"
git checkout develop
git merge --no-ff hotfix/login-token-expiry
git branch -d hotfix/login-token-expiry
```

---

## Quick Reference

| Branch | Purpose | Branches from | Merges into | Protected |
|---|---|---|---|---|
| `main` | Production code | — | — | Yes |
| `develop` | Integration / next release | — | — | Yes |
| `staging` | Pre-production validation | `release/` | — | Optional |
| `feature/*` | New feature development | `develop` | `develop` | No |
| `fix/*` | Bug fix during development | `develop` | `develop` | No |
| `release/*` | Release preparation | `develop` | `main` + `develop` | No |
| `hotfix/*` | Critical production fix | `main` | `main` + `develop` | No |

---

## References

- [A Successful Git Branching Model — Vincent Driessen (nvie.com)](https://nvie.com/posts/a-successful-git-branching-model/)
- [Gitflow Workflow — Atlassian](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
- [Git Branching — Branching Workflows (git-scm.com)](https://git-scm.com/book/en/v2/Git-Branching-Branching-Workflows)
