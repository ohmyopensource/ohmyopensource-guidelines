---
title: Contributing Workflow | OhMyOpenSource! Guidelines
description: Step-by-step workflow for external contributors to OhMyOpenSource projects, covering fork setup, branch creation, synchronization with upstream, and pull request submission.
head:
  - - meta
    - property: og:title
      content: Contributing Workflow | OhMyOpenSource! Guidelines
  - - meta
    - property: og:description
      content: Learn how to fork, clone, sync and contribute to OhMyOpenSource projects as an external contributor.
  - - meta
    - property: og:url
      content: https://guidelines.ohmyopensource.org/guidelines/contributing-workflow
  - - meta
    - name: keywords
      content: contributing workflow, fork repository, git upstream, open source contribution, feature branch, sync fork, pull request workflow, ohmyopensource guidelines
  - - meta
    - name: twitter:title
      content: Contributing Workflow | OhMyOpenSource! Guidelines
  - - meta
    - name: twitter:description
      content: How to fork, sync and contribute to OhMyOpenSource projects as an external contributor.
---

# OhMyOpenSource! - Contributing Workflow

This document describes the end-to-end workflow for external contributors to OhMyOpenSource! projects.
It covers everything from the initial setup to opening a pull request, including how to keep your fork in sync with the upstream repository throughout your work.

---

## Overview

As an external contributor, you do not push directly to the upstream repository.
Instead, you work on your own copy of the project (a **fork**) and propose changes through a pull request.

The full workflow looks like this:

```
[1] upstream repo (OhMyOpenSource!/project)
          |-- fork -->
[2] your fork (your-username/project)
          |-- clone -->
[3] your local machine
          |-- feature branch -- commits -- push -->
[4] your fork (your-username/project)
          |-- pull request -->
[1] upstream repo (back to the top)
```

---

## Phase 1 - Initial Setup

This phase is done **once**, when you start contributing to a project.

### 1. Fork the repository

Go to the repository page on GitHub and click **Fork**.
This creates a personal copy of the project under your GitHub account.

### 2. Clone your fork

```bash
git clone https://github.com/your-username/project.git
cd project
```

You now have a local copy of your fork. By default, `origin` points to your fork.

### 3. Add the upstream remote

Your fork is a snapshot taken at fork time. To stay in sync with the original repository, you need to add it as a second remote, conventionally named `upstream`:

```bash
git remote add upstream https://github.com/OhMyOpenSource/project.git
```

Verify your remotes are set up correctly:

```bash
git remote -v
# origin    https://github.com/your-username/project.git (fetch)
# origin    https://github.com/your-username/project.git (push)
# upstream  https://github.com/OhMyOpenSource/project.git (fetch)
# upstream  https://github.com/OhMyOpenSource/project.git (push)
```

You only need to do this once per local clone. From this point on, `origin` is your fork and `upstream` is the official repository.

---

## Phase 2 - Starting Work on a Feature

Follow these steps every time you begin working on a new contribution.

### 1. Sync your local `develop` with upstream

Before creating a new branch, make sure your local `develop` reflects the latest state of the upstream repository.
This ensures your work starts from an up-to-date base and reduces the risk of conflicts later.

```bash
git fetch upstream
git checkout develop
git merge upstream/develop
```

::: info
`git fetch upstream` downloads the latest changes from the upstream repository without applying them.
`git merge upstream/develop` then integrates those changes into your local `develop`.
:::

Push the updated `develop` to your fork as well:

```bash
git push origin develop
```

### 2. Create a feature branch

Never commit directly to `develop`. Create a dedicated branch for your contribution:

```bash
git checkout -b feature/your-feature-name
```

Name the branch according to the [branching conventions](./branching-strategy.md):
use lowercase, hyphens only, and a short descriptive name.

```
feature/oauth2-login
feature/dark-mode-toggle
feature/search-results-pagination
```

---

## Phase 3 - Working on Your Feature

### Committing changes

Make small, focused commits as you work. Follow the [commit conventions](./commit-conventions.md) for every commit message.

```bash
git add .
git commit -m "feat(auth): add OAuth2 login with Google"
```

### Pushing to your fork

Push your branch to your fork regularly:

```bash
git push origin feature/your-feature-name
```

---

## Phase 4 - Before Opening a Pull Request

Before submitting your work for review, sync your branch one more time with the latest upstream `develop`.
This is important: new commits may have been merged into `develop` while you were working, and your PR should incorporate them before it is reviewed.

### 1. Fetch and merge the latest upstream changes

```bash
git fetch upstream
git checkout develop
git merge upstream/develop
git push origin develop
```

### 2. Bring those changes into your feature branch

```bash
git checkout feature/your-feature-name
git merge develop
```

If everything goes cleanly, your branch is now up to date.

> **A note on conflicts:** in some cases, the merge may result in conflicts - this happens when the same lines of code were modified both in upstream and in your branch. Git will mark the conflicting sections in the affected files. Resolve them manually, then complete the merge with `git add <file>` and `git commit`. If you are unsure how to proceed, do not force the merge: ask for guidance in the relevant issue or discussion thread.

### 3. Push the updated branch

```bash
git push origin feature/your-feature-name
```

---

## Phase 5 - Opening the Pull Request

Go to your fork on GitHub. GitHub will usually show a banner suggesting you open a pull request for your recently pushed branch - you can use that, or navigate to **Pull requests > New pull request** manually.

Set the targets as follows:

| Field       | Value                       |
| ----------- | --------------------------- |
| Base repo   | `OhMyOpenSource/project`    |
| Base branch | `dev`                       |
| Head repo   | `your-username/project`     |
| Compare     | `feature/your-feature-name` |

Fill in the PR title and description following the [pull request guidelines](./pull-request-guidelines.md).

---

## Full Workflow at a Glance

```
# --- Initial setup (once) ---
git clone https://github.com/your-username/project.git
cd project
git remote add upstream https://github.com/OhMyOpenSource/project.git

# --- Start of each contribution ---
git fetch upstream
git checkout develop
git merge upstream/develop
git push origin develop
git checkout -b feature/your-feature-name

# --- During development ---
git add .
git commit -m "feat(...): ..."
git push origin feature/your-feature-name

# --- Before opening the PR ---
git fetch upstream
git checkout develop
git merge upstream/develop
git push origin develop
git checkout feature/your-feature-name
git merge develop
git push origin feature/your-feature-name

# --- Open the PR on GitHub ---
# base: OhMyOpenSource/project @ develop
# compare: your-username/project @ feature/your-feature-name
```

---

## References

- [Branching Strategy](./branching-strategy.md)
- [Commit Conventions](./commit-conventions.md)
- [Pull Request Guidelines](./pull-request-guidelines.md)
- [GitHub Docs - Fork a repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo)
- [GitHub Docs - Syncing a fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork)
