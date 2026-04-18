# Pull Request Guidelines

This document defines the standards for opening, reviewing and merging pull requests across all repositories of the OhMyOpenSource! organization.  
Pull requests are the primary medium of collaboration. A well-structured PR communicates intent clearly, speeds up review, and raises the overall quality of the codebase.

---

## Why Pull Requests Matter

A pull request is more than a code diff. It is a structured opportunity to catch bugs early, share knowledge across the team, and maintain consistent standards. The earlier an issue is identified in the development cycle, the cheaper it is to fix.

Beyond code quality, PRs are a form of living documentation: the description, the discussion and the commit history together tell the story of *why* a change was made, a story that is often more valuable than the change itself.

---

## Before Opening a PR

Before submitting a pull request for review, the author is responsible for:

- Ensuring all automated tests pass locally and on CI
- Running the linter and resolving all violations
- Rebasing the branch on top of the latest `main` (or target branch)
- Reviewing the diff personally: read through every changed line as if you were the reviewer
- Verifying that no secrets, credentials or environment-specific values have been accidentally committed
- Confirming that the PR addresses a single, well-defined task

> A PR that has not passed these checks should not be submitted for review.  
> Use a **draft PR** to share work in progress and gather early feedback without requesting a formal review.

---

## PR Size

Keep pull requests small and focused. A PR that is too large is difficult to review thoroughly and increases the risk of introducing regressions.

| Lines changed | Assessment |
|---|---|
| < 200 | Ideal |
| 200 - 400 | Acceptable |
| > 400 | Consider splitting into multiple PRs |

These are guidelines, not hard limits. A large refactor or a migration may legitimately exceed 400 lines, in those cases, provide extra context in the description.

If a feature is too large to fit in a single PR, break it down into a sequence of smaller ones. Each PR in the sequence should be independently mergeable and leave the codebase in a working state.

**Example of a feature broken into multiple PRs:**
```
feat: add base user model and migration
feat: implement user authentication endpoints
feat: add user profile management UI
feat: integrate email verification flow
```

---

## Writing a Good PR

### Title

The title is the first thing a reviewer sees. It should convey the purpose of the change at a glance.

- Follow the same conventions as commit messages: `<type>(<scope>): <description>`
- Write in the imperative, present tense
- Do not capitalize the first letter; do not end with a period
- Keep it under 100 characters
- Prefix with `WIP:` or open as a **draft** if the PR is not ready for review

**Good titles:**
```
feat(auth): add OAuth2 login with Google
fix(cart): prevent checkout when cart is empty
refactor(user-service): extract email validation into utility module
docs(api): document rate limiting behavior on /v2/search
```

**Poor titles:**
```
fix bug
update files
changes from yesterday
WIP
```

### Description

The description is the most important part of a PR. It should give reviewers everything they need to understand the change without having to ask follow-up questions.

Use the following structure as a starting point and adapt it to the complexity of the change:

```markdown
## Problem
<!-- What issue does this PR address? Link to the relevant issue or ticket. -->

## Solution
<!-- How was the problem solved? Provide a high-level summary of the approach. -->

## Changes
<!-- List the main changes introduced. -->
- 
- 

## Testing
<!-- How can the reviewer verify the change? Provide steps if applicable. -->

## Notes
<!-- Anything else the reviewer should know: side effects, open questions,
     related PRs, external references, screenshots. -->
```

Not every section is required for every PR. A one-line bug fix may need only a **Problem** and a **Solution**. A major feature should fill in every section.

If the change affects the UI, include before/after screenshots or a short screen recording.

---

## Checklist Before Requesting Review

Use this checklist before marking a PR as ready for review:

- [ ] The branch is up to date with the target branch
- [ ] All CI checks pass (tests, lint, build)
- [ ] The PR addresses a single task
- [ ] The title follows the commit conventions
- [ ] The description clearly explains the problem and the solution
- [ ] New behavior is covered by tests
- [ ] No secrets or sensitive data are included
- [ ] The commit history is clean and meaningful

---

## Reviewing a PR

### Responsibilities of the Reviewer

The reviewer is responsible for:

- Reading the title and description before looking at the code
- Understanding the purpose of the change and evaluating whether the approach is sound
- Checking that tests cover the new or modified behavior
- Verifying that commit messages are meaningful and follow the project conventions
- Leaving clear, actionable and respectful feedback

The reviewer is **not** responsible for manually testing the feature — that is covered by automated tests and CI. However, checking out the branch locally to explore the change in context is encouraged for complex or high-risk changes.

### Review Tone

Code review is a collaborative activity. Comments should be constructive, respectful and focused on the code, not the author.

**Preferred approach:**
- Ask questions rather than issuing directives
- Explain the reasoning behind a suggestion
- Distinguish between blocking concerns and optional improvements
- Acknowledge good decisions, not just problems

**Examples:**

| Instead of | Prefer |
|---|---|
| `This is wrong.` | `This approach could cause X in the case of Y — would it make sense to handle it here?` |
| `Use a map here.` | `A map could improve lookup time here since this runs in a hot path. What do you think?` |
| `Why did you do it this way?` | `I'm not familiar with this pattern — could you add a comment explaining the intent?` |

### What to Look For

Beyond correctness, reviewers should evaluate:

- **Clarity**: Are variable names, function names and comments easy to understand?
- **Simplicity**: Does the solution introduce unnecessary complexity?
- **Test coverage**: Are both the expected path and edge cases covered?
- **Documentation**: Has any relevant documentation been updated?
- **Consistency**: Does the code follow the existing style and patterns of the codebase?
- **Commit history**: Are commits atomic, well-described and logically ordered?

### Review Decisions

| Decision | When to use |
|---|---|
| **Approve** | The change is ready to merge as-is, or after minor non-blocking fixes |
| **Request changes** | There are concerns that must be addressed before merging |
| **Comment** | Feedback is provided but a formal decision is deferred |

When requesting changes, state clearly what is blocking and why. Avoid leaving a PR in a blocked state without actionable next steps.

---

## Merging

A PR may be merged when:

- At least **one approval** has been received from a reviewer other than the author
- All CI checks pass
- All blocking review comments have been resolved
- The branch is up to date with the target branch

A PR must **not** be merged when:

- The build is failing
- There are unresolved comments requesting changes
- The PR is marked as `WIP` or is in draft state
- An explicit `do not merge` label has been applied

### After Merging

Once a PR is merged:

- Delete the source branch
- Close any related issues if not closed automatically
- Verify that the CI/CD pipeline has deployed the changes as expected

---

## Examples

### Well-structured PR description

```markdown
## Problem
Users are being charged twice when a network timeout occurs during the payment step.
Closes #412

## Solution
Added an idempotency check before retrying the payment request.
The service now verifies whether the original transaction was already processed
before issuing a new charge.

## Changes
- Added `isTransactionComplete()` check in `PaymentService`
- Extended the payment session model with a `transactionId` field
- Added unit tests for the retry logic under network failure conditions

## Testing
1. Simulate a network timeout during checkout
2. Verify that only one charge appears in the payment provider dashboard
3. Run `npm test -- --testPathPattern=payment`

## Notes
This fix does not address the UX during the timeout (spinner stays indefinitely).
Tracked separately in #418.
```

### Simple bug fix

```markdown
## Problem
The cart checkout button is active even when the cart is empty, allowing users
to submit an order with no items.
Closes #389

## Solution
Added a disabled state to the checkout button when `cart.items.length === 0`.
```

### Poor PR description

```markdown
fixed the bug
```

---

## References

- [GitHub Docs — Creating a Pull Request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)
- [The Comprehensive Guide to Pull Requests — Holger Frohloff](https://holgerfrohloff.de/2024/01/24/the-comprehensive-guide.html)
- [Pull Request Etiquette — BigPanda Engineering](https://medium.com/bigpanda-engineering/pull-request-etiquette-d53cfb035c20)
