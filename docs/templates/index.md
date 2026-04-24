---
title: Templates Overview | OhMyOpenSource! Guidelines
description: Overview of reusable templates for commits, pull requests and issue tracking across OhMyOpenSource repositories, designed to standardize collaboration.
head:
  - - meta
    - property: og:title
      content: Templates Overview | OhMyOpenSource! Guidelines
  - - meta
    - property: og:description
      content: Collection of standardized templates for commits, pull requests and issue tracking used across OhMyOpenSource projects.
  - - meta
    - property: og:url
      content: https://guidelines.ohmyopensource.org/templates
  - - meta
    - name: keywords
      content: templates, github templates, issue templates, pull request template, commit message template, git workflow, collaboration standards, ohmyopensource guidelines
  - - meta
    - name: twitter:title
      content: Templates Overview | OhMyOpenSource! Guidelines
  - - meta
    - name: twitter:description
      content: Standard templates for commits, pull requests and issue tracking used across OhMyOpenSource projects.
---

# OhMyOpenSource! - Templates

This section collects ready-to-use templates for the most common collaborative artifacts in an OhMyOpenSource! repository.

Templates are not bureaucracy — they are scaffolding. A good template reduces the cognitive load of starting from a blank page and ensures that the result contains the information that reviewers, maintainers and future readers actually need.

All templates in this section are also available in the `.github/` directory of each repository.

---

## Available Templates

### [Commit Template](./commit-template)

A `.gitmessage` template that guides the format of commit messages, aligned with the [Commit Conventions](../git/commit-conventions) used across all OhMyOpenSource! repositories.

### [Pull Request Template](./pull-request-template)

A `PULL_REQUEST_TEMPLATE.md` that structures PR descriptions with sections for problem, solution, changes, testing and a pre-merge checklist.

### [Bug Report](./bug-report)

An issue template for reporting broken or incorrect behavior. Prompts for reproduction steps, expected and actual behavior, and environment details.

### [Feature Request](./feature-request)

An issue template for proposing new features or improvements. Prompts for problem context, proposed solution, acceptance criteria and alternatives considered.

---

## How to Use These Templates

Templates in this documentation site are shown as rendered Markdown for readability. The raw template files — formatted for direct use in a repository — are available in the [`templates/`](https://github.com/ohmyopensource/ohmyopensource-guidelines/tree/main/templates) directory of this repository.

To add them to a repository, copy the relevant files to:

```
.github/
  PULL_REQUEST_TEMPLATE.md
  ISSUE_TEMPLATE/
    bug_report.md
    feature_request.md
.gitmessage          ← commit template (repo root)
```
