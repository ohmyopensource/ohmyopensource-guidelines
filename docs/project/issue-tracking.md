---
title: Issue Tracking | OhMyOpenSource! Guidelines
description: Conventions for creating, labeling, assigning and managing issues across OhMyOpenSource repositories, including templates, labels, milestones and lifecycle.
head:
  - - meta
    - property: og:title
      content: Issue Tracking | OhMyOpenSource! Guidelines
  - - meta
    - property: og:description
      content: Learn how to write effective issues, use labels, manage milestones and track work efficiently in OhMyOpenSource projects.
  - - meta
    - property: og:url
      content: https://guidelines.ohmyopensource.org/guidelines/issue-tracking
  - - meta
    - name: keywords
      content: issue tracking guidelines, github issues best practices, issue templates, bug report template, feature request template, labels milestones github, issue lifecycle management, ohmyopensource guidelines
  - - meta
    - name: twitter:title
      content: Issue Tracking | OhMyOpenSource! Guidelines
  - - meta
    - name: twitter:description
      content: Best practices for managing issues, labels, milestones and workflows in OhMyOpenSource projects.
---

# OhMyOpenSource! - Issue Tracking

This document defines the conventions for creating, labeling, assigning and closing issues across all repositories of the OhMyOpenSource! organization.

Issues are the primary unit of work visibility. A well-maintained issue tracker is not administrative overhead, it is the team's shared memory: a record of what needs to be done, why, who is working on it, and what was decided. An issue tracker full of vague, unlabeled, stale tickets is worse than no issue tracker at all.

---

## When to Open an Issue

An issue should be opened for every unit of work that is significant enough to track - not just bugs. Open an issue for:

- A bug that needs to be investigated and fixed
- A new feature or enhancement to be designed and implemented
- A task or chore with a clear deliverable (e.g. updating a dependency, adding CI coverage)
- A question that requires discussion and a decision
- A piece of documentation that is missing or incorrect
- Technical debt that should be addressed in a future cycle

Do not use issues as a general chat channel. Discussions that do not lead to a concrete action item belong in a team communication tool, not in the tracker.

---

## Writing a Good Issue

A good issue gives any contributor enough context to understand the problem and start working on it, without needing to ask follow-up questions.

### Title

The title should describe the problem or the desired outcome clearly and concisely. It is the first thing anyone sees when scanning the issue list.

**Good titles:**

```
Checkout button remains active when cart is empty
Add pagination to the /users endpoint
Upgrade ESLint to v9
Session token is not invalidated on password change
```

**Poor titles:**

```
Bug
Fix the thing
Problem with login
Help
```

### Description

The description depends on the type of issue. Use the appropriate template (see [Issue Templates](#issue-templates) below).

In general, every issue description should answer:

- **What**: a clear description of the problem, behavior or desired outcome
- **Why**: the impact or motivation; why does this matter?
- **Context**: steps to reproduce (for bugs), or background (for features)
- **Acceptance criteria**: how will we know this issue is resolved?

Acceptance criteria are especially important for feature requests and tasks. They prevent scope creep and make it unambiguous when an issue can be closed.

```markdown
## Problem

Users can submit the checkout form even when their cart is empty,
resulting in a server error (500) and a broken order record in the database.

## Steps to reproduce

1. Add an item to the cart
2. Remove it
3. Click "Checkout" - the button is still active
4. A POST request is sent with an empty items array

## Expected behavior

The checkout button should be disabled when the cart is empty.
An error message should be shown if the user tries to submit anyway.

## Acceptance criteria

- [ ] Checkout button is disabled when `cart.items.length === 0`
- [ ] Attempting to submit via keyboard or direct API call returns a 400
- [ ] Unit test covers the empty cart case
```

---

## Issue Templates

Every repository must have issue templates that guide contributors toward opening useful, well-structured issues. Templates live in `.github/ISSUE_TEMPLATE/`.

### Bug report template

```markdown
---
name: Bug report
about: Report broken or incorrect behavior
labels: bug
---

## Description

<!-- A clear description of what is broken. -->

## Steps to reproduce

1.
2.
3.

## Expected behavior

<!-- What should happen. -->

## Actual behavior

<!-- What actually happens. -->

## Environment

- OS:
- Browser / runtime version:
- Project version / commit:

## Additional context

<!-- Logs, screenshots, links to related issues. -->
```

### Feature request template

```markdown
---
name: Feature request
about: Suggest a new feature or improvement
labels: enhancement
---

## Problem

<!-- What problem does this feature solve? Why is it needed? -->

## Proposed solution

<!-- Describe the feature you would like. -->

## Acceptance criteria

- [ ]
- [ ]

## Alternatives considered

<!-- Other approaches you have considered and why you rejected them. -->

## Additional context

<!-- Mockups, references, related issues. -->
```

---

## Labels

Labels are the primary way to filter, sort and prioritize issues at a glance. Every open issue must have at least one label.

### Type labels

| Label           | Color     | Description                                          |
| --------------- | --------- | ---------------------------------------------------- |
| `bug`           | Red       | Incorrect or broken behavior                         |
| `enhancement`   | Blue      | New feature or improvement to existing functionality |
| `documentation` | Blue      | Missing, incorrect or outdated documentation         |
| `chore`         | Grey      | Maintenance tasks: dependency updates, CI, tooling   |
| `question`      | Purple    | Discussion needed before work can begin              |
| `duplicate`     | Dark grey | Duplicates another open issue                        |
| `wontfix`       | Dark grey | Acknowledged but will not be addressed               |

### Priority labels

| Label                | Description                                                    |
| -------------------- | -------------------------------------------------------------- |
| `priority: critical` | Blocking a release or causing data loss: address immediately   |
| `priority: high`     | Significant impact on users or development: address this cycle |
| `priority: medium`   | Notable but not urgent: schedule for an upcoming cycle         |
| `priority: low`      | Minor or edge case: address when convenient                    |

### Status labels

| Label                  | Description                                                 |
| ---------------------- | ----------------------------------------------------------- |
| `status: needs triage` | Newly opened, not yet reviewed                              |
| `status: in progress`  | Actively being worked on                                    |
| `status: blocked`      | Waiting on external input or a dependency                   |
| `status: needs info`   | More information needed from the reporter before proceeding |
| `status: ready`        | Triaged, scoped and ready to be picked up                   |

### Contribution labels

| Label              | Description                                                      |
| ------------------ | ---------------------------------------------------------------- |
| `good first issue` | Suitable for first-time contributors: well-scoped and documented |
| `help wanted`      | Contributions welcome: the team is not actively working on this  |

### Label conventions

- Labels are applied at triage, not after the fact
- Every issue must have at least a **type** label
- Priority labels are optional but encouraged for bugs and enhancements
- `good first issue` should only be applied to issues that genuinely are, it is the label most visible to new contributors
- Labels should be kept consistent across all repositories in the organization, use the same names, colors and descriptions

---

## Milestones

Milestones group related issues toward a shared goal or deadline, typically a release version or a sprint.

### When to use milestones

- **Releases**: group all issues and PRs that must be resolved before a version ships (e.g. `v2.3.0`)
- **Sprints**: group work planned for a specific time period (e.g. `Sprint 14 - Oct 2025`)
- **Epics**: group multiple issues that together deliver a large feature (if GitHub Projects is not used)

### Milestone conventions

- Every issue that is actively planned for a specific release or sprint must be assigned to a milestone
- A milestone must have a **due date**: milestones without dates are not useful for planning
- The milestone progress page (visible at `github.com/<org>/<repo>/milestones`) shows the percentage of closed issues: use it to assess release readiness
- When a milestone is completed, close it: do not leave empty milestones open indefinitely

### Milestone naming

| Type    | Format                  | Example                        |
| ------- | ----------------------- | ------------------------------ |
| Release | `vMAJOR.MINOR.PATCH`    | `v2.3.0`                       |
| Sprint  | `Sprint N - Month YYYY` | `Sprint 14 - Oct 2025`         |
| Epic    | Descriptive name        | `User authentication refactor` |

---

## Assignments and Ownership

An issue without an assignee is an issue no one owns. Unowned issues get forgotten.

- Assign an issue to yourself when you start working on it, not before
- Do not assign issues to people who have not agreed to work on them
- If an assigned issue has had no activity for two weeks, check in with the assignee or reassign it
- A single assignee per issue is preferred, diffuse ownership leads to no ownership

---

## Linking Issues to PRs

Every PR that resolves an issue must reference it in the PR description using a closing keyword. GitHub will automatically close the issue when the PR is merged.

```markdown
Closes #214
Fixes #389
Resolves #412
```

This creates a bidirectional link between the issue and the PR, making it easy to trace what work addressed what problem - in both directions.

If a PR is related to an issue but does not fully resolve it, use a plain reference instead:

```markdown
Related to #214
Part of #389
```

---

## Issue Lifecycle

```
Open (needs triage)
  > Triaged (label + priority assigned)
    > Ready (scoped, acceptance criteria clear)
      > In Progress (assignee set, branch created)
        > In Review (PR open, linked to issue)
          > Closed (PR merged, issue auto-closed)
```

Issues that are not progressing should not be left open indefinitely:

- If **no information** has been provided for 30 days after `needs info` is applied: close with a note
- If the issue is **no longer relevant**: close with a brief explanation
- If the issue is **valid but not planned**: keep open, apply `help wanted` if contributions are welcome

Closing an issue is not a failure. A clean, accurate tracker is more useful than a comprehensive one full of noise.

---

## Quick Reference

| What         | Convention                                        |
| ------------ | ------------------------------------------------- |
| Title        | Clear, specific, describes problem or outcome     |
| Templates    | Required - `.github/ISSUE_TEMPLATE/`              |
| Labels       | At least one type label on every issue            |
| Milestones   | Assigned for all planned work; must have due date |
| Assignee     | Set when work begins, not before                  |
| PR link      | `Closes #N` in PR description                     |
| Stale issues | Review and clean up regularly                     |

---

## References

- [GitHub Docs - Managing labels](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/managing-labels)
- [GitHub Docs - About milestones](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/about-milestones)
- [GitHub Docs - Linking a pull request to an issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/linking-a-pull-request-to-an-issue)
