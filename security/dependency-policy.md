# Dependency Policy

This document defines the rules and best practices for managing third-party dependencies across all repositories of the OhMyOpenSource! organization.

Dependencies are a fundamental part of modern software, but every dependency added to a project is also a surface area for vulnerabilities, licensing issues, and supply chain risk. This policy exists to keep that surface area visible, controlled and auditable.

---

## Why Dependency Management Matters

The software supply chain is one of the most frequent attack vectors in modern development. Vulnerabilities do not only come from code written in-house, they come from the packages that code depends on, and from the packages that *those* packages depend on. A single outdated or malicious transitive dependency can compromise an entire application.

Beyond security, dependencies carry licensing obligations. Using a package with a license incompatible with the project's license, or with the organization's redistribution model, can create legal exposure.

Dependency management is not a one-time task. It is an ongoing responsibility.

---

## General Principles

- Every dependency added to a project must be **justified**: it should solve a real problem that is not reasonably solvable with the existing codebase or standard library
- Dependencies must be **as few as possible**: prefer a focused, well-maintained package over a bloated one that does more than needed
- Dependencies must be **actively maintained**: avoid packages with no recent activity, no maintainer response, or no clear ownership
- The full dependency tree, direct and transitive: must remain **visible and auditable** at all times
- Security vulnerabilities in dependencies: must be addressed **promptly** according to their severity

---

## Adding a New Dependency

Before adding any new dependency, evaluate the following:

- **Necessity**: is this dependency genuinely needed, or can the functionality be implemented simply without it?
- **Maintenance**: when was it last updated? Are issues and PRs being addressed? Does it have active maintainers?
- **Popularity and trust**: how widely adopted is it? Does it have a track record?
- **Size**: what is its footprint? Does it introduce a large number of transitive dependencies?
- **License**: is the license compatible with this project?
- **Security**: does it have known vulnerabilities? Check before adding, not after

When in doubt, open a discussion before adding the dependency.

---

## Version Pinning

Dependencies must be pinned to a **specific version** or a **constrained version range** in the project's manifest file. Unpinned dependencies (`latest`, `*`, or no version constraint) are not allowed in production code.

| Acceptable | Not acceptable |
|---|---|
| `"lodash": "4.17.21"` | `"lodash": "latest"` |
| `"express": "^4.18.0"` | `"express": "*"` |
| `numpy==1.26.4` | `numpy` (no version) |

Using a lockfile (`package-lock.json`, `yarn.lock`, `Pipfile.lock`, `poetry.lock`, `Cargo.lock`, etc.) is **mandatory** for all projects. Lockfiles must be committed to the repository and kept up to date.

Lockfiles guarantee that every developer, every CI run and every deployment uses the exact same resolved dependency tree, eliminating "works on my machine" discrepancies caused by version drift.

---

## Keeping Dependencies Up to Date

Dependencies must not be left to grow stale. Outdated packages accumulate unpatched vulnerabilities and make future upgrades harder.

**Expected cadence:**
- Security updates: addressed **within the week** of notification, based on severity
- Non-security updates: reviewed and applied **at least once per month**
- Major version upgrades: evaluated and planned per project release cycle

Use **Dependabot** to automate update detection.

### Responding to Dependabot PRs

Dependabot PRs must not be ignored or left open indefinitely. The expected response is:

- **Security updates**: review and merge as soon as CI passes, unless there is a known breaking change requiring investigation
- **Non-security updates**: batch and review regularly; do not let them accumulate beyond a few weeks
- **Breaking changes**: document the required migration work and create a tracking issue

---

## Vulnerability Management

When a vulnerability is reported in a dependency, whether via Dependabot, a security advisory, or a manual audit, the response depends on severity:

| Severity | Expected response time |
|---|---|
| Critical | Within 24 hours |
| High | Within 3 days |
| Medium | Within 2 weeks |
| Low | Next regular update cycle |

For each vulnerability, the options are:

1. **Update** the dependency to a patched version, preferred when available
2. **Replace** the dependency with an alternative if no fix exists or the package is abandoned
3. **Remove** the dependency if it is no longer necessary
4. **Accept and document** the risk temporarily, with a clear expiry date and justification, only for low/medium severity cases where no fix is yet available

Vulnerabilities must never be silently ignored. If a decision is made to defer remediation, it must be documented in the repository (e.g. as a GitHub issue with a label and a deadline).

---

## License Policy

Every dependency carries a license that governs how it may be used, modified and distributed. Before adding a dependency, verify that its license is compatible with the project.

**Allowed licenses** (permissive, safe for most use cases):
- MIT
- Apache 2.0
- BSD 2-Clause / BSD 3-Clause
- ISC
- CC0

**Licenses requiring evaluation** (may impose conditions on distribution or derivative works):
- LGPL (any version): generally usable as a runtime dependency; check carefully for static linking
- MPL 2.0: file-level copyleft; generally compatible with proprietary code if files are kept separate
- CC BY: attribution required; check for version and specific terms

**Not allowed** without explicit approval from the organization:
- GPL (any version): copyleft; may require releasing the entire project under GPL
- AGPL: network copyleft; may require releasing source for software offered as a service
- Proprietary / "All rights reserved": no redistribution rights
- Unlicensed: no rights granted by default

If a dependency's license is unclear, ambiguous, or not listed above, do not add it until the license has been reviewed.

---

## Automated Tools on GitHub

### Dependabot

All repositories must have **Dependabot** enabled for both security alerts and version updates.

Enable it by adding a `.github/dependabot.yml` configuration file:

```yaml
version: 2
updates:
  - package-ecosystem: "npm"          # adjust to your ecosystem
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
    labels:
      - "dependencies"
```

Common `package-ecosystem` values: `npm`, `pip`, `bundler`, `cargo`, `composer`, `maven`, `gradle`, `gomod`, `docker`, `github-actions`.

### Dependency Graph

GitHub's **Dependency Graph** provides a complete view of the direct and transitive dependencies of a repository, as well as which repositories depend on it. It is the foundation for Dependabot alerts and dependency review.

Enable it under **Settings => Security & analysis => Dependency graph**.

### Dependency Review

The **Dependency Review** action blocks pull requests that introduce dependencies with known vulnerabilities or incompatible licenses, before they are merged.

Add it to the CI workflow:

```yaml
name: Dependency Review

on:
  pull_request:
    branches:
      - main
      - develop

jobs:
  dependency-review:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Dependency Review
        uses: actions/dependency-review-action@v4
        with:
          fail-on-severity: high
          deny-licenses: GPL-2.0, GPL-3.0, AGPL-3.0
```

---

## What Not to Commit

The following must never be committed to the repository:

- Vendored dependency source code, unless the project has a specific and documented reason to vendor (e.g. a fork with patches not yet upstream)
- Binary distributions of dependencies (`.jar`, `.dll`, `.so`, etc.)
- Downloaded package caches (e.g. `node_modules/`, `.venv/`, `vendor/` for most ecosystems)

These must be listed in `.gitignore`. Dependencies are installed from the lockfile at build time, they do not belong in version control.

```gitignore
# Node
node_modules/

# Python
.venv/
__pycache__/
*.egg-info/

# Ruby
vendor/bundle/

# PHP
vendor/

# Rust
# (Cargo.lock should be committed for applications, not libraries)
```

---

## Summary

| Rule | Requirement |
|---|---|
| Justify every dependency | Required before adding |
| Pin versions | Mandatory - no `latest` or `*` |
| Commit lockfiles | Mandatory |
| Enable Dependabot | Mandatory on all repositories |
| Enable Dependency Review in CI | Mandatory |
| Address security alerts | Within defined SLA by severity |
| Check licenses before adding | Mandatory |
| Do not commit `node_modules` or equivalent | Never |

---

## References

- [GitHub Docs - Best practices for maintaining dependencies](https://docs.github.com/en/code-security/concepts/supply-chain-security/best-practices-for-maintaining-dependencies)
- [GitHub Docs - Configuring automatic dependency submission](https://docs.github.com/en/code-security/how-tos/secure-your-supply-chain/secure-your-dependencies/configuring-automatic-dependency-submission-for-your-repository)
- [Understand your software's supply chain with GitHub's dependency graph - GitHub Blog](https://github.blog/security/supply-chain-security/understand-your-softwares-supply-chain-with-githubs-dependency-graph/)
- [The Fragmented World of Dependency Policy - Andrew Nesbitt](https://nesbitt.io/2026/03/19/the-fragmented-world-of-dependency-policy.html)
