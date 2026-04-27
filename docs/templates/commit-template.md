---
title: Commit Template | OhMyOpenSource! Guidelines
description: Git commit message template used across OhMyOpenSource projects based on Conventional Commits, including structure, examples and usage instructions.
head:
  - - meta
    - property: og:title
      content: Commit Template | OhMyOpenSource! Guidelines
  - - meta
    - property: og:description
      content: Learn how to structure Git commit messages using the standardized .gitmessage template in OhMyOpenSource projects.
  - - meta
    - property: og:url
      content: https://guidelines.ohmyopensource.org/guidelines/commit-template
  - - meta
    - name: keywords
      content: git commit template, .gitmessage, conventional commits template, commit message format, git commit structure, commit conventions, ohmyopensource guidelines
  - - meta
    - name: twitter:title
      content: Commit Template | OhMyOpenSource! Guidelines
  - - meta
    - name: twitter:description
      content: Standard .gitmessage template for writing consistent commit messages following Conventional Commits.
---

# OhMyOpenSource! - Commit Template

This is the `.gitmessage` template used across OhMyOpenSource! repositories. It guides the format of commit messages in line with the [Commit Conventions](../git/commit-conventions).

To configure it locally in a repository:

```bash
git config commit.template .gitmessage
```

---

## Template

```
# <type>(<optional scope>): <description>
# |         |                 |
# |         |                 └─ Imperative, present tense. No period. Max 100 chars.
# |         └─ Optional. The part of the codebase affected (e.g. auth, api, ui).
# └─ Required. One of: feat | fix | refactor | perf | style | test | docs | build | ops | chore
#
# Examples:
#   feat(auth): add OAuth2 login with Google
#   fix(cart): prevent checkout when cart is empty
#   docs(readme): update installation instructions
#   build(release): bump version to 1.5.0
#
# ─────────────────────────────────────────────────────────────────────────────
# BODY (optional - leave a blank line above)
# Explain the motivation for this change. Describe what changed and why,
# not how (the code shows how). Wrap at 100 characters.
#
# ─────────────────────────────────────────────────────────────────────────────
# FOOTER (optional - leave a blank line above)
# Reference issues:        Closes #123 / Fixes #456 / Resolves #789
# Breaking changes:        BREAKING CHANGE: <description of what breaks and how to migrate>
# Breaking change marker:  Add ! before the colon in the subject line: feat(api)!: ...
#
# ─────────────────────────────────────────────────────────────────────────────
# Full reference: https://guidelines.ohmyopensource.org/git/commit-conventions
```

---

## Quick Reference

| Field         | Rule                                                                                                  |
| ------------- | ----------------------------------------------------------------------------------------------------- |
| `type`        | Required - one of `feat`, `fix`, `refactor`, `perf`, `style`, `test`, `docs`, `build`, `ops`, `chore` |
| `scope`       | Optional - the part of the codebase affected                                                          |
| `description` | Imperative, present tense, no period, max 100 chars                                                   |
| `body`        | Optional - explains the _why_, separated by a blank line                                              |
| `footer`      | Optional - issue references and breaking changes                                                      |

See the full [Commit Conventions](../git/commit-conventions) for detailed rules and examples.
