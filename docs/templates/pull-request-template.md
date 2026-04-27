---
title: Pull Request Template | OhMyOpenSource! Guidelines
description: Standard pull request template used across OhMyOpenSource repositories to ensure consistent structure, review quality and collaboration flow.
head:
  - - meta
    - property: og:title
      content: Pull Request Template | OhMyOpenSource! Guidelines
  - - meta
    - property: og:description
      content: Standard PR template enforcing structured descriptions, testing steps and review checklists across OhMyOpenSource projects.
  - - meta
    - property: og:url
      content: https://guidelines.ohmyopensource.org/templates/pull-request-template
  - - meta
    - name: keywords
      content: pull request template, github pr template, pull request guidelines, code review checklist, git workflow, collaboration standards, ohmyopensource guidelines
  - - meta
    - name: twitter:title
      content: Pull Request Template | OhMyOpenSource! Guidelines
  - - meta
    - name: twitter:description
      content: Standard pull request template with structured sections for problem, solution, testing and checklist.
---

# OhMyOpenSource! - Pull Request Template

This is the `PULL_REQUEST_TEMPLATE.md` used across OhMyOpenSource! repositories. Place it at `.github/PULL_REQUEST_TEMPLATE.md` - GitHub will pre-fill the PR description with this template automatically.

See [Pull Request Guidelines](../git/pull-request-guidelines) for the full conventions this template is designed to support.

---

## Template

```markdown
## Problem

<!-- Describe the problem this PR addresses. Link to the relevant issue. -->
<!-- Use: Closes #N / Fixes #N / Resolves #N -->

## Solution

<!-- Describe the approach taken. Explain the key decisions made. -->

## Changes

<!-- List the main changes introduced by this PR. -->

-
-
-

## Testing

<!-- How can the reviewer verify the change? Provide steps if applicable. -->

1.
2.
3.

## Notes

<!-- Anything the reviewer should be aware of: side effects, open questions,
     related PRs, screenshots, external references. -->

---

## Checklist

- [ ] The PR targets the correct branch (`develop`, not `main`)
- [ ] The branch is up to date with the target branch
- [ ] All CI checks pass (tests, lint, build)
- [ ] The PR addresses a single, well-defined task
- [ ] The title follows the commit conventions (`type(scope): description`)
- [ ] New behavior is covered by tests
- [ ] No secrets or sensitive data are included
- [ ] Documentation has been updated if relevant
- [ ] The commit history is clean and meaningful
```
