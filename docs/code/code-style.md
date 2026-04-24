---
title: Code Style | OhMyOpenSource! Guidelines
description: Code style guidelines for OhMyOpenSource projects, including formatting standards, linters, automation practices, and principles for writing clean and consistent code.
head:
  - - meta
    - property: og:title
      content: Code Style | OhMyOpenSource! Guidelines
  - - meta
    - property: og:description
      content: Learn the code style standards for OhMyOpenSource projects, including linters, formatters, and best practices for maintainable code.
  - - meta
    - property: og:url
      content: https://guidelines.ohmyopensource.org/guidelines/code-style
  - - meta
    - name: keywords
      content: code style guidelines, coding standards, linting and formatting, google style guide, clean code principles, developer best practices, ohmyopensource guidelines
  - - meta
    - name: twitter:title
      content: Code Style | OhMyOpenSource! Guidelines
  - - meta
    - name: twitter:description
      content: Code style standards and best practices for OhMyOpenSource projects.
---

# OhMyOpenSource! - Code Style

This document defines the code style standards adopted across all repositories of the OhMyOpenSource! organization.

Consistent code style is not about aesthetics - it is about reducing cognitive overhead. When every contributor writes code that looks the same, reviewers can focus on logic and correctness rather than formatting. Onboarding is faster. Diffs are cleaner. Maintenance is easier.

> Style discussions should never happen in code review. If a linter enforces it, it is not up for debate. If a linter does not enforce it, it is either a project-level decision or a matter of personal preference that should not block a PR.

---

## The Reference Standard: Google Style Guides

The primary style reference for all OhMyOpenSource! projects is the **Google Style Guides**, a comprehensive, well-maintained set of conventions covering most languages in active use.

These guides are not mandatory reading for every contributor on every project, but they are the authoritative reference when a style decision needs to be made. If a project's linter configuration aligns with the Google style guide for that language, no further discussion is needed.

| Language    | Google Style Guide                                      |
| ----------- | ------------------------------------------------------- |
| JavaScript  | https://google.github.io/styleguide/jsguide.html        |
| TypeScript  | https://google.github.io/styleguide/tsguide.html        |
| Python      | https://google.github.io/styleguide/pyguide.html        |
| Java        | https://google.github.io/styleguide/javaguide.html      |
| Go          | https://google.github.io/styleguide/go/                 |
| C++         | https://google.github.io/styleguide/cppguide.html       |
| C#          | https://google.github.io/styleguide/csharp-style.html   |
| HTML/CSS    | https://google.github.io/styleguide/htmlcssguide.html   |
| Shell       | https://google.github.io/styleguide/shellguide.html     |
| Swift       | https://google.github.io/swift/                         |
| Objective-C | https://google.github.io/styleguide/objcguide.html      |
| R           | https://google.github.io/styleguide/Rguide.html         |
| Markdown    | https://google.github.io/styleguide/docguide/style.html |

Using the Google style guide as the default does not prevent a project from making deliberate, documented exceptions. However, deviations should be explicit, configured in the linter, not left as unwritten conventions.

---

## Automation First

Style must be enforced by tools, not by humans. Manual style enforcement in code review is a waste of reviewers' time, a source of friction, and inconsistent by nature.

The correct approach is:

1. A **formatter** automatically rewrites code to conform to the style on every commit
2. A **linter** catches issues that formatters cannot fix (logic smells, unused imports, naming violations, etc.)
3. Both run **locally before the commit lands**, via a pre-commit hook
4. Both run **again in CI**, as a final backstop

If a style issue reaches a PR, it means the local tooling was not set up correctly, not that the reviewer should catch it manually.

---

## Linters and Formatters by Language

The following tools are recommended per language. Each project must document its chosen tools and configuration in its own `CONTRIBUTING.md` or `README.md`.

| Language                | Formatter             | Linter           |
| ----------------------- | --------------------- | ---------------- |
| JavaScript / TypeScript | Prettier              | ESLint           |
| Python                  | Black                 | Flake8 / Ruff    |
| Go                      | `gofmt` / `goimports` | `golangci-lint`  |
| Java                    | google-java-format    | Checkstyle       |
| C / C++                 | clang-format          | clang-tidy       |
| C#                      | dotnet-format         | Roslyn Analyzers |
| Shell                   | shfmt                 | ShellCheck       |
| CSS / SCSS              | Prettier              | Stylelint        |
| Markdown                | Prettier              | markdownlint     |

Configuration files for linters and formatters must be committed to the repository (e.g. `.eslintrc`, `.prettierrc`, `pyproject.toml`, `.clang-format`) so that all contributors use identical settings.

---

## Pre-Commit Hooks

Linting and formatting must run locally before a commit is created. This prevents style violations from ever entering the repository history, keeps CI green, and removes the need to fix formatting in a separate follow-up commit.

### Option A: `pre-commit` (recommended for Python, multi-language, or C/C++ projects)

[pre-commit](https://pre-commit.com/) is a framework for managing and running Git hooks. It supports hooks for almost every language and integrates with most formatters and linters.

**Setup:**

```bash
pip install pre-commit
pre-commit install
```

**Example `.pre-commit-config.yaml`:**

```yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.6.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-json
      - id: check-merge-conflict

  - repo: https://github.com/psf/black
    rev: 24.4.2
    hooks:
      - id: black

  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.4.4
    hooks:
      - id: ruff
        args: [--fix]

  - repo: https://github.com/pre-commit/mirrors-prettier
    rev: v4.0.0-alpha.8
    hooks:
      - id: prettier
```

Run hooks manually on all files:

```bash
pre-commit run --all-files
```

### Option B: Husky + lint-staged (recommended for JavaScript/TypeScript projects)

[Husky](https://typicode.github.io/husky/) manages Git hooks for Node.js projects. Combined with [lint-staged](https://github.com/lint-staged/lint-staged), it runs linters only on staged files, making the hook fast even in large repositories.

**Setup:**

```bash
npm install --save-dev husky lint-staged
npx husky init
```

**`package.json`:**

```json
{
  "lint-staged": {
    "*.{js,ts,jsx,tsx}": ["eslint --fix", "prettier --write"],
    "*.{css,scss,md,json,yaml}": ["prettier --write"]
  }
}
```

**`.husky/pre-commit`:**

```bash
#!/bin/sh
npx lint-staged
```

---

## Enforcing Style in CI

Pre-commit hooks run locally but can be bypassed with `git commit --no-verify`. CI provides a mandatory, bypass-proof check.

Add a linting step to the CI workflow that fails the build if style violations are found:

```yaml
# .github/workflows/lint.yml
name: Lint

on:
  pull_request:
    branches:
      - main
      - develop

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Run ESLint
        run: npm run lint

      - name: Check Prettier formatting
        run: npm run format:check
```

The CI lint job must pass before a PR can be merged. A style failure in CI is treated the same as a failing test, it must be fixed before the PR is approved.

---

## Universal Rules

The following rules apply to all projects, regardless of language, and are not negotiable:

- **No tabs**: use spaces for indentation (indent size is defined per project)
- **No trailing whitespace**: enforced by the pre-commit hook
- **Files end with a newline**: enforced by the pre-commit hook
- **No commented-out code**: dead code should be deleted, not commented out. If it might be needed again, Git history preserves it
- **No `TODO` without a linked issue**: a `TODO` comment must reference a GitHub issue: `// TODO: #214 - handle null session`
- **One logical concept per file**: avoid files that do too many unrelated things

---

## Principles (Beyond the Formatter)

Some style choices cannot be enforced by a tool. These are principles, not rules, they require judgment, and they are fair game for code review comments.

**Clarity over cleverness.** Code is read far more often than it is written. A solution that is slightly less elegant but immediately understandable is almost always preferable to a clever one that requires study.

**Names should tell the truth.** A variable named `data` or `temp` communicates nothing. A function named `processItems` is vague. Names should describe _what a thing is_ or _what a function does_, precisely enough that a reader does not need to look at its implementation to understand how to use it.

**Functions should do one thing.** A function that handles input validation, business logic and database persistence is three functions. Short, focused functions are easier to test, easier to name, and easier to understand.

**Avoid magic numbers and strings.** Hardcoded values that appear without explanation are a maintenance hazard. Extract them into named constants.

```python
# Don't
if attempts > 3:
    lock_account()

# Do
MAX_LOGIN_ATTEMPTS = 3

if attempts > MAX_LOGIN_ATTEMPTS:
    lock_account()
```

**Consistency with the surrounding codebase.** When adding code to an existing file, match the style of what is already there, even if it differs from your personal preference. Local consistency matters.

---

## Per-Project Configuration

Each repository must document its style tooling in its `README.md` or `CONTRIBUTING.md`, including:

- Which linter and formatter are in use
- How to install and run them locally
- Whether `pre-commit` or Husky is used for Git hooks
- Any deliberate deviations from the Google style guide for that language

This information must be kept up to date. A contributor should be able to set up a fully linted local environment by following the project documentation alone.

---

## References

- [Google Style Guides](https://google.github.io/styleguide/)
- [pre-commit - A framework for managing Git hooks](https://pre-commit.com/)
- [Automatically format and lint code with pre-commit - Interrupt/Memfault](https://interrupt.memfault.com/blog/pre-commit)
- [Automating Code Quality: Git Hooks, Husky, and Lint-Staged - dev.to](https://dev.to/hkp22/automating-code-quality-git-hooks-husky-and-lint-staged-for-streamlined-linting-formatting-5ep4)
