# Release Process

This document defines the process for preparing, publishing and communicating releases across all repositories of the OhMyOpenSource! organization.

A release is a deliberate, documented event, not just a merge to `main`. It marks a specific, stable point in the project's history that consumers can depend on, reference and roll back to if necessary. A consistent release process ensures that every release is reproducible, traceable and communicated clearly.

This document complements [versioning.md](versioning.md) (which defines *how* versions are numbered) and [branching-strategy.md](../git/branching-strategy.md) (which defines *where* releases live in the branch model).

---

## Release Readiness Criteria

A release must not be created until the following conditions are met:

- All issues and PRs assigned to the release milestone are closed
- The CI pipeline on `main` (or the `release/` branch) is fully green, tests, lint, build
- The `CHANGELOG.md` has been updated to include all changes since the last release
- The version number has been determined following [SemVer](versioning.md)
- A brief review has confirmed that no known critical bugs will be shipped

Do not release under time pressure if these criteria are not met. A delayed release is preferable to a broken one.

---

## Release Types

### Standard release

A planned release that ships new features, improvements and non-critical bug fixes. Standard releases follow the full release process described in this document.

Examples: `v1.5.0`, `v2.0.0`

### Patch release

A release that ships only backward-compatible bug fixes. It follows the same process as a standard release but with a smaller scope and a faster cycle.

Examples: `v1.4.3`, `v2.0.1`

### Hotfix release

An unplanned release triggered by a critical bug or security vulnerability in production that cannot wait for the next planned release. Hotfixes branch from `main` directly, following the hotfix flow defined in [branching-strategy.md](../git/branching-strategy.md).

Examples: `v1.4.4`, `v2.0.2`

### Pre-release

A release intended for testing, not for production use. Pre-releases are published to allow early adopters and contributors to validate changes before the final release.

Examples: `v2.0.0-beta.1`, `v2.0.0-rc.1`

---

## The Release Process (Standard & Patch)

### Step 1 - Prepare the release branch

Cut a `release/` branch from `develop` when the milestone is considered feature-complete:

```bash
git checkout develop
git pull origin develop
git checkout -b release/1.5.0
```

Only bug fixes, version bumps and documentation updates are allowed on a release branch. No new features.

### Step 2 - Bump the version

Update the version in the project manifest and commit the change:

```bash
# Node.js
npm version 1.5.0 --no-git-tag-version
git commit -am "build(release): bump version to 1.5.0"

# Python (pyproject.toml)
# Edit version field manually, then:
git commit -am "build(release): bump version to 1.5.0"
```

### Step 3 - Update the CHANGELOG

Add a new entry at the top of `CHANGELOG.md` for the release being prepared. Follow the [Keep a Changelog](https://keepachangelog.com/) format:

```markdown
## [1.5.0] — 2025-11-01

### Added
- Email notifications on new direct messages (#301)
- Pagination on the /users endpoint (#289)

### Fixed
- Checkout button remains active when cart is empty (#389)
- Session token not invalidated on password change (#402)

### Changed
- Default page size for paginated endpoints changed from 50 to 20
```

Commit the changelog update:

```bash
git commit -am "docs(release): update CHANGELOG for v1.5.0"
```

### Step 4 - Open a release PR

Open a pull request from `release/1.5.0` targeting `main`. The PR title should follow commit conventions:

```
build(release): v1.5.0
```

The PR description should include a summary of what is in the release and a link to the milestone. At least one reviewer must approve it.

### Step 5 - Merge into `main` and tag

Once the release PR is approved and CI passes, merge it into `main` using a merge commit (not squash):

```bash
git checkout main
git merge --no-ff release/1.5.0
```

Immediately after merging, create an annotated tag on the merge commit:

```bash
git tag -a v1.5.0 -m "build(release): v1.5.0"
git push origin main --tags
```

### Step 6 - Back-merge into `develop`

Merge the release branch back into `develop` to ensure any last-minute changes made on the release branch (version bumps, changelog, fixes) are not lost:

```bash
git checkout develop
git merge --no-ff release/1.5.0
git push origin develop
```

### Step 7 - Delete the release branch

```bash
git branch -d release/1.5.0
git push origin --delete release/1.5.0
```

### Step 8 - Publish the GitHub Release

Create a GitHub Release from the tag. Go to **Releases => Draft a new release** in the repository, or use the GitHub CLI:

```bash
gh release create v1.5.0 \
  --title "v1.5.0" \
  --notes-file CHANGELOG_EXCERPT.md \
  --latest
```

The GitHub Release must include:
- The version number as the title
- The full changelog entry for this version as the release notes
- Any binary artifacts or packages attached, if applicable

GitHub Releases are the primary communication channel for contributors and users following the project. They appear in the repository's **Releases** page and trigger notifications for users who watch the repository.

---

## The Hotfix Process

A hotfix is for critical issues that cannot wait for the next planned release.

```bash
# 1. Branch from main
git checkout main
git pull origin main
git checkout -b hotfix/payment-double-charge

# 2. Fix the issue and commit
git commit -am "fix(payments): prevent duplicate charge on network timeout"

# 3. Bump patch version and update CHANGELOG
git commit -am "build(release): bump version to 1.4.4"

# 4. Merge into main and tag
git checkout main
git merge --no-ff hotfix/payment-double-charge
git tag -a v1.4.4 -m "build(release): v1.4.4"
git push origin main --tags

# 5. Back-merge into develop
git checkout develop
git merge --no-ff hotfix/payment-double-charge
git push origin develop

# 6. Delete hotfix branch
git branch -d hotfix/payment-double-charge
git push origin --delete hotfix/payment-double-charge
```

Publish a GitHub Release for hotfixes following the same rules as standard releases.

---

## Automated Release (Optional)

For projects using `semantic-release`, the entire process above is automated on merge to `main`. See [versioning.md — Automated Versioning](versioning.md#automated-versioning) for configuration details.

When `semantic-release` is in use:
- Steps 1–7 above are replaced by the CI pipeline
- The `CHANGELOG.md` is generated automatically from commit history
- The GitHub Release is created automatically with generated release notes
- Manual tagging is not needed

The only manual steps that remain are the pre-release review (Step 0) and confirming the GitHub Release was published correctly.

---

## GitHub Release Notes

Every GitHub Release must have release notes that are useful to someone who was not involved in writing the code.

Good release notes:
- Describe changes in terms of **user-visible behavior**, not internal implementation
- Clearly mark **breaking changes** at the top
- Reference closed issues and merged PRs with `#number` links
- Are written for the reader, not the author

```markdown
## v1.5.0

### Breaking changes
- The `/users/list` endpoint has been removed. Use `/users?role=<role>` instead. (#321)

### New features
- Email notifications are now sent when a new direct message is received. (#301)
- The `/users` endpoint now supports pagination. Use `?page=N&page_size=20`. (#289)

### Bug fixes
- The checkout button is now disabled when the cart is empty. (#389)
- Session tokens are correctly invalidated on password change. (#402)
```

---

## Rollback

If a release introduces a critical regression and a hotfix cannot be deployed quickly enough, roll back by reverting the merge commit on `main`:

```bash
# Find the merge commit hash
git log --oneline main

# Revert the merge commit
git revert -m 1 <merge-commit-hash>
git push origin main
```

After reverting, create a GitHub Release for the reverted state (or re-publish the previous release as latest) so that consumers are aware of the rollback.

Document the rollback in a post-mortem issue, noting what went wrong and what will prevent it from happening again.

---

## Release Checklist

```
Pre-release:
- [ ] All milestone issues are closed
- [ ] CI is green on the release branch
- [ ] CHANGELOG.md is updated
- [ ] Version is bumped in the project manifest
- [ ] Release PR is open and approved

Release:
- [ ] Merged into main with a merge commit
- [ ] Annotated tag created and pushed
- [ ] Back-merged into develop
- [ ] Release branch deleted
- [ ] GitHub Release published with release notes

Post-release:
- [ ] Milestone is closed on GitHub
- [ ] Any relevant documentation has been updated
- [ ] Dependent projects or consumers have been notified if applicable
```

---

## References

- [GitHub Docs - About releases](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases)
- [GitHub Docs - Managing releases in a repository](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository)
- [Keep a Changelog](https://keepachangelog.com/)
- [OhMyOpenSource - Versioning](versioning.md)
- [OhMyOpenSource - Branching Strategy](../git/branching-strategy.md)
