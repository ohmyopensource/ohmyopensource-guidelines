---
title: Commit Conventions | OhMyOpenSource! Guidelines
description: Commit message conventions for OhMyOpenSource projects based on Conventional Commits, including format, types, scopes, and versioning impact.
head:
  - - meta
    - property: og:title
      content: Commit Conventions | OhMyOpenSource! Guidelines
  - - meta
    - property: og:description
      content: Learn how to write clear and consistent commit messages using Conventional Commits in OhMyOpenSource projects.
  - - meta
    - property: og:url
      content: https://guidelines.ohmyopensource.org/guidelines/commit-conventions
  - - meta
    - name: keywords
      content: conventional commits, commit message guidelines, git commit standards, semantic versioning commits, commit types feat fix docs, commit best practices, ohmyopensource guidelines
  - - meta
    - name: twitter:title
      content: Commit Conventions | OhMyOpenSource! Guidelines
  - - meta
    - name: twitter:description
      content: Commit message standards and best practices based on Conventional Commits.
---

# OhMyOpenSource! - Commit Conventions

This document defines the commit message conventions adopted across all repositories of the OhMyOpenSource! organization.
Following these guidelines ensures a consistent, readable and automation-friendly Git history.

---

## Why Conventional Commits?

A well-structured commit history is not just a formality, it is a communication tool.
Clear commit messages make it easier to understand what changed and why, to generate changelogs automatically, to determine the next semantic version, and to review, debug or revert changes with confidence.

These conventions are based on the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

---

## Commit Message Format

Every commit message is composed of three parts: a **header** (mandatory), a **body** (optional) and a **footer** (optional).

```
<type>(<optional scope>): <description>

<optional body>

<optional footer>
```

The header is the only required part. Each section is separated by a blank line.

---

### Header

The header is a single line that summarizes the change. It follows this structure:

```
<type>(<optional scope>): <description>
```

#### Type

The `type` defines the category of the change. Use one of the following:

| Type       | When to use                                                                   |
| ---------- | ----------------------------------------------------------------------------- |
| `feat`     | Adding, adjusting or removing a feature in the API or UI                      |
| `fix`      | Fixing a bug introduced by a previous `feat` commit                           |
| `refactor` | Restructuring code without changing behavior                                  |
| `perf`     | A `refactor` that specifically improves performance                           |
| `style`    | Formatting changes that do not affect behavior (whitespace, semicolons, etc.) |
| `test`     | Adding missing tests or correcting existing ones                              |
| `docs`     | Changes to documentation only                                                 |
| `build`    | Changes to build tools, dependencies or project version                       |
| `ops`      | Changes to infrastructure, CI/CD pipelines, deployment or monitoring          |
| `chore`    | Miscellaneous tasks (e.g. modifying `.gitignore`, initial commit)             |

#### Scope

The `scope` is an **optional** value that provides additional context about which part of the codebase is affected.
Allowed scopes are defined per project.

```
feat(auth): add OAuth2 login support
fix(cart): prevent checkout with empty cart
docs(api): update authentication endpoint description
```

> Do not use issue identifiers (e.g. `#123`) as scopes.

#### Description

The `description` is a concise summary of the change.

- Write in the **imperative, present tense**: `add` not `added`, `fix` not `fixed`
- Think of it as completing the sentence: _"This commit will..."_
- Do **not** capitalize the first letter
- Do **not** end with a period (`.`)
- Keep it under **100 characters**

---

### Body

The body provides **motivation** for the change and contrasts it with the previous behavior.
Use it when the description alone is not sufficient to explain the _why_.

- Write in the imperative, present tense
- Separate from the header with a blank line
- Wrap lines at 100 characters

---

### Footer

The footer is used to reference issues and to document **breaking changes**.

- Reference issues with `Closes #123` or `Fixes #456`
- Breaking changes **must** start with `BREAKING CHANGE:` followed by a description

---

## Breaking Changes

A commit that introduces a breaking change must be marked with an `!` before the `:` in the header.
The footer must then document the breaking change starting with `BREAKING CHANGE:`.

```
feat(api)!: remove deprecated /users/list endpoint

BREAKING CHANGE: the /users/list endpoint has been removed.
Use /users with query parameters instead.
```

---

## Special Commits

### Initial commit

```
chore: init
```

### Merge commit

```
Merge branch '<branch-name>'
```

Follows the default Git merge message format, do not alter it.

### Revert commit

```
Revert "<original commit subject>"
```

Follows the default Git revert message format, do not alter it.

---

## Versioning Impact

Commit types determine how the project version is incremented following [Semantic Versioning](https://semver.org/):

| Commit contains                          | Version bump      |
| ---------------------------------------- | ----------------- |
| `BREAKING CHANGE` (on a `1.x.x` release) | Major → `x+1.0.0` |
| `BREAKING CHANGE` (on a `0.x.x` release) | Minor → `0.y+1.0` |
| `feat` or `fix`                          | Minor → `x.y+1.z` |
| Anything else                            | Patch → `x.y.z+1` |

---

## Examples

### Simple feature

```
feat: add email notifications on new direct messages
```

### Feature with scope

```
feat(dashboard): add date range filter to analytics chart
```

### Bug fix with scope

```
fix(auth): redirect to login page on expired session token
```

### Bug fix with body

```
fix(payments): prevent duplicate charge on network timeout

The payment service was retrying the request without checking whether
the original transaction had already been processed, resulting in
duplicate charges for some users.
```

### Documentation update

```
docs(readme): add installation instructions for Windows
```

### Refactor without behavior change

```
refactor(user-service): extract email validation into separate utility
```

### Performance improvement

```
perf(search): replace linear scan with indexed lookup for tag filtering
```

### Dependency update

```
build: update dependencies
```

### Version bump

```
build(release): bump version to 2.1.0
```

### CI/CD change

```
ops(ci): add automated deployment step to staging on merge to main
```

### Breaking change

```
feat(api)!: remove ticket list endpoint

refers to #1337

BREAKING CHANGE: the /tickets endpoint no longer supports listing all entities.
Use /tickets?status=open or /tickets?assignee=<id> for filtered queries.
```

### Initial commit

```
chore: init
```

---

### Common mistakes to avoid

| Bad commit                | Problem                                   | Corrected commit                                      |
| ------------------------- | ----------------------------------------- | ----------------------------------------------------- |
| `fixed bug`               | No type, past tense, vague                | `fix(cart): prevent order submission with no items`   |
| `WIP`                     | Not meaningful, not conventional          | `feat(profile): add avatar upload (incomplete)`       |
| `feat: Added new button.` | Past tense, ends with period, capitalized | `feat(ui): add confirm button to delete modal`        |
| `fix: stuff`              | Too vague, no context                     | `fix(api): handle null response from payment gateway` |
| `update`                  | No type, no description                   | `docs(contributing): update PR review requirements`   |

---

## Enforcing Conventions

To automatically validate commit messages before they are pushed, a Git hook can be used.

### Option A - Using `git-conventional-commits` (recommended)

Install the CLI tool:

```bash
npx git-conventional-commits init
```

Set up the commit-msg hook via the [pre-commit framework](https://pre-commit.com/):

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/qoomon/git-conventional-commits
    rev: <RELEASE_TAG>
    hooks:
      - id: conventional-commits
```

Then install the hook:

```bash
pip install pre-commit
pre-commit install -t commit-msg
```

### Option B - Manual Git hook

Create a local `commit-msg` hook:

```bash
mkdir -p .git-hooks
git config core.hooksPath .git-hooks
touch .git-hooks/commit-msg && chmod +x .git-hooks/commit-msg
```

Paste the following into `.git-hooks/commit-msg`:

```shell
#!/bin/sh
npx git-conventional-commits commit-msg-hook "$1"
```

Commit the hook file so all contributors share it:

```bash
git add .git-hooks/commit-msg
git commit -m"chore: add conventional commits hook"
```

> After cloning the repository, each contributor must run `git config core.hooksPath .git-hooks` once to activate the hook.

---

## Commit Message Template (optional)

To set up a local commit message template that guides the format while writing commits:

Create a file `.gitmessage` at the root of the repository:

```
# <type>(<optional scope>): <description>
# |<---- max 100 chars ---->|

# Body: explain the motivation for this change (optional)
# |<---- wrap at 100 chars --->|

# Footer: reference issues, document breaking changes (optional)
# Closes #<issue>
# BREAKING CHANGE: <description>
```

Then configure Git to use it:

```bash
git config commit.template .gitmessage
```

---

## References

- [Conventional Commits Specification](https://www.conventionalcommits.org/en/v1.0.0/)
- [Karma - Git Commit Msg](https://karma-runner.github.io/1.0/dev/git-commit-msg.html)
- [`git-conventional-commits` CLI](https://github.com/qoomon/git-conventional-commits)
