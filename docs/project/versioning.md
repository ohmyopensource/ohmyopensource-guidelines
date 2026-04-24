---
title: Versioning | OhMyOpenSource! Guidelines
description: Semantic Versioning standards for OhMyOpenSource projects, including MAJOR.MINOR.PATCH rules, pre-releases, Git tags, and automated versioning strategies.
head:
  - - meta
    - property: og:title
      content: Versioning | OhMyOpenSource! Guidelines
  - - meta
    - property: og:description
      content: Learn how OhMyOpenSource applies Semantic Versioning (SemVer), Git tags, and automated versioning for consistent release management.
  - - meta
    - property: og:url
      content: https://guidelines.ohmyopensource.org/guidelines/versioning
  - - meta
    - name: keywords
      content: semantic versioning, semver, versioning strategy, git tags, release versioning, pre-release versions, major minor patch, automated versioning, conventional commits versioning, ohmyopensource guidelines
  - - meta
    - name: twitter:title
      content: Versioning | OhMyOpenSource! Guidelines
  - - meta
    - name: twitter:description
      content: Semantic Versioning (SemVer) rules and release versioning strategy for OhMyOpenSource projects.
---

# OhMyOpenSource! - Versioning

This document defines the versioning standard adopted across all repositories of the OhMyOpenSource! organization.

Version numbers are a communication contract. They tell consumers of a package exactly what kind of change to expect when they update. Without a shared, consistent versioning scheme, every update is a gamble: will it break something? That uncertainty erodes trust and slows down the entire ecosystem.

---

## The Standard: Semantic Versioning (SemVer)

All versioned projects in this organization follow **Semantic Versioning 2.0.0**, as defined at [semver.org](https://semver.org).

A version number takes the form:

```
MAJOR.MINOR.PATCH
```

Each component is a non-negative integer and must increase numerically:

| Component | Incremented when                                        | Example           |
| --------- | ------------------------------------------------------- | ----------------- |
| `MAJOR`   | A backward-incompatible (breaking) change is introduced | `1.4.2` > `2.0.0` |
| `MINOR`   | New backward-compatible functionality is added          | `1.4.2` > `1.5.0` |
| `PATCH`   | A backward-compatible bug fix is made                   | `1.4.2` > `1.4.3` |

When `MAJOR` is incremented, `MINOR` and `PATCH` are reset to `0`.
When `MINOR` is incremented, `PATCH` is reset to `0`.

### The meaning of `0.y.z`

`MAJOR` version zero (`0.y.z`) signals that the project is in **initial development**. The public API should not be considered stable, anything may change at any time. Once the project is ready for production use and the public API is established, it should be released as `1.0.0`.

---

## What Counts as a Breaking Change

A breaking change is any change that requires consumers of the project to modify their code or configuration to continue working correctly. Examples:

- Removing a public function, method, class or endpoint
- Renaming a public function, method, class or endpoint
- Changing the signature of a public function (parameters, return type)
- Changing the behavior of an existing public API in a way that is not backward-compatible
- Removing or renaming a configuration key
- Changing the format of a response or output that consumers depend on

When in doubt, treat it as a breaking change and increment `MAJOR`.

---

## Pre-release Versions

Pre-release versions may be denoted by appending a hyphen and identifiers after the patch version:

```
1.0.0-alpha
1.0.0-alpha.1
1.0.0-beta.2
1.0.0-rc.1
```

Pre-release versions indicate that the release is not yet stable and may change before the final release. Common pre-release identifiers:

| Identifier | Meaning                                                                           |
| ---------- | --------------------------------------------------------------------------------- |
| `alpha`    | Early, unstable: likely incomplete, expect breaking changes                       |
| `beta`     | Feature complete but not fully tested: breaking changes unlikely but possible     |
| `rc`       | Release candidate: intended as the final version unless critical issues are found |

Pre-release versions have lower precedence than the associated normal version: `1.0.0-rc.1 < 1.0.0`.

---

## Git Tags

Every release must be tagged in Git. Tags are the single source of truth for release versions, they connect a version number directly to a specific commit in the repository history.

### Tag format

Tags must follow the format `vMAJOR.MINOR.PATCH`, with the `v` prefix:

```bash
v1.0.0
v2.3.1
v1.0.0-beta.1
v1.0.0-rc.2
```

### Creating a tag

Always use **annotated tags** for releases. Annotated tags store the tagger's name, date and a message, they are permanent, meaningful markers in the Git history.

```bash
# Create an annotated tag
git tag -a v1.5.0 -m "build(release): v1.5.0"

# Push the tag to origin
git push origin v1.5.0

# Push all tags at once (use with care)
git push origin --tags
```

### Rules for tags

- Tags are **immutable**: once a version is tagged and published, that tag must never be moved, deleted or reused for a different commit
- Tags are created on `main` only: never on feature branches or `develop`
- Every tag must have a corresponding entry in `CHANGELOG.md`
- Lightweight tags (without `-a`) must not be used for releases

---

## Connecting SemVer to Conventional Commits

The version bump for each release can be derived mechanically from the commit history, when [Conventional Commits](../git/commit-conventions.md) are used consistently:

| Commit history contains                                       | Version bump                           |
| ------------------------------------------------------------- | -------------------------------------- |
| Any commit with `BREAKING CHANGE` in footer, or `!` in header | `MAJOR` (or `MINOR` if `MAJOR` is `0`) |
| At least one `feat:` commit                                   | `MINOR`                                |
| Only `fix:`, `perf:`, `docs:`, `chore:`, etc.                 | `PATCH`                                |

This is not just a convention, it enables **automated versioning**: tools can read the commit log since the last tag and determine the correct next version without human judgment.

---

## Automated Versioning

Manual version bumping is error-prone and easy to forget. For projects using Conventional Commits, version determination and tagging can be automated.

### Using `git-conventional-commits`

The `git-conventional-commits` CLI can determine the next version based on the commit history:

```bash
# Determine the next version automatically
npx git-conventional-commits version

# Generate changelog for the new release
npx git-conventional-commits changelog --release 1.5.0 --file CHANGELOG.md
```

### Using `semantic-release` (fully automated)

[`semantic-release`](https://github.com/semantic-release/semantic-release) automates the entire release workflow, version determination, changelog generation, tagging and publishing, triggered by CI on merge to `main`.

```bash
npm install --save-dev semantic-release
```

Example GitHub Actions workflow:

```yaml
name: Release

on:
  push:
    branches:
      - main

jobs:
  release:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      issues: write
      pull-requests: write
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0 # required: semantic-release needs full history

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - run: npm ci

      - run: npx semantic-release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }} # if publishing to npm
```

With `semantic-release`, a merge to `main` is a release. There is no manual step.

---

## Release Workflow (Manual)

For projects that manage releases manually, the process is as follows:

**1. Cut a release branch** from `develop`:

```bash
git checkout develop
git pull origin develop
git checkout -b release/1.5.0
```

**2. Bump the version** in the project manifest (`package.json`, `pyproject.toml`, etc.) and update `CHANGELOG.md`:

```bash
# Update version in package.json
npm version 1.5.0 --no-git-tag-version

# Or manually update the version field in pyproject.toml / pom.xml / etc.

# Commit the version bump
git commit -am "build(release): bump version to 1.5.0"
```

**3. Merge into `main`** via PR and tag the merge commit:

```bash
git checkout main
git merge --no-ff release/1.5.0
git tag -a v1.5.0 -m "build(release): v1.5.0"
git push origin main --tags
```

**4. Back-merge into `develop`**:

```bash
git checkout develop
git merge --no-ff release/1.5.0
git push origin develop
git branch -d release/1.5.0
```

---

## Quick Reference

| Rule               | Requirement                                         |
| ------------------ | --------------------------------------------------- |
| Version format     | `MAJOR.MINOR.PATCH` - SemVer 2.0.0                  |
| Tag format         | `vMAJOR.MINOR.PATCH` (annotated, on `main` only)    |
| Breaking change    | Increment `MAJOR`, reset `MINOR` and `PATCH` to `0` |
| New feature        | Increment `MINOR`, reset `PATCH` to `0`             |
| Bug fix            | Increment `PATCH`                                   |
| `0.y.z`            | Initial development - API not stable                |
| Pre-release        | `1.0.0-alpha`, `1.0.0-beta.1`, `1.0.0-rc.1`         |
| Tags are immutable | Never move, delete or reuse a released tag          |
| CHANGELOG          | Updated for every release, before tagging           |

---

## References

- [Semantic Versioning 2.0.0 - semver.org](https://semver.org)
- [Versioning with Git Tags and Conventional Commits - SEI/CMU](https://www.sei.cmu.edu/blog/versioning-with-git-tags-and-conventional-commits/)
- [Semantic Versioning with CI/CD and semantic-release - Semaphore](https://semaphore.io/blog/semantic-versioning-cicd)
- [`git-conventional-commits` CLI](https://github.com/qoomon/git-conventional-commits)
