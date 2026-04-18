# Code Review

This document defines the standards and expectations for code review across all repositories of the OhMyOpenSource! organization.  
Code review is not a quality gate, it is a collaborative practice. Its purpose is to improve code health over time, share knowledge across the team, and catch issues before they reach production.

---

## The Core Principle

The goal of a code review is not to find a perfect solution, there is no such thing as perfect code, only *better* code. A reviewer should approve a change once it demonstrably improves the overall health of the codebase, even if it does not address every possible concern.

This means: do not block a PR for things that are minor, stylistic, or speculative. Do block it for things that genuinely reduce correctness, maintainability, or clarity.

> Approve changes that make things better. Require changes for things that make things worse. Everything else is a suggestion.

---

## Responsibilities

### The Author

The author is responsible for submitting work that is ready to be reviewed, not work that is half-finished and expected to be fixed during review. Before requesting review:

- The code compiles, all tests pass, and CI is green
- The PR description clearly explains the problem and the solution
- The diff has been self-reviewed and the author has read through every changed line
- The change is as small and focused as possible

When a reviewer leaves a comment the author does not understand, the first step is to ask for clarification, not to ignore it or dismiss it. When a reviewer asks for a change, and the author disagrees, the appropriate response is to engage constructively, not defensively.

If a reviewer points out something unclear in the code, the correct response is to **fix the code**, not to explain it in the PR comment thread. Explanations written in review threads are visible only to the people in that review,  they do not help future readers of the code.

### The Reviewer

The reviewer is responsible for understanding the change and providing timely, clear and respectful feedback. This means:

- Reading the PR description before looking at the diff
- Reviewing every line of human-written code, not skimming
- Leaving comments that explain the *why*, not just the *what*
- Distinguishing between blocking concerns and optional suggestions
- Responding within one business day

The reviewer is not responsible for doing the author's job. Pointing out a problem and letting the author decide how to fix it is often better than prescribing a solution, the author is closer to the code and may have context the reviewer does not.

---

## What to Look For

When reviewing a change, evaluate the following in roughly this order of importance:

**Design**: Does the overall approach make sense? Is this change solving the right problem in the right place? Does it integrate well with the existing system? Is now the right time to introduce this?

**Functionality**: Does the code do what it is supposed to do? Are there edge cases that have not been considered? Are there potential concurrency issues, race conditions, or subtle bugs visible in the code?

**Complexity**: Is the code more complex than it needs to be? Can a future developer understand it quickly? Over-engineering, solving problems that do not yet exist, is a common and costly form of complexity that reviewers should push back on.

**Tests**: Are there tests for the new or changed behavior? Are the tests actually testing the right things? Would they fail if the code broke? Tests are code too, they deserve the same quality bar as production code.

**Naming**: Are variables, functions, classes and modules named clearly enough to communicate their purpose without requiring a comment?

**Comments**: Do code comments explain *why* something exists, not *what* it does? If the code itself requires a comment to explain what it does, the code should be simplified first.

**Documentation**: If the change affects how the project is built, tested, deployed or used, has the relevant documentation been updated?

**Style and consistency**: Does the code follow the project's style guide and existing conventions? Style issues that are not covered by the linter should be noted but should not block a PR.

---

## Writing Comments

The tone and framing of a review comment matters as much as its content. A technically correct comment delivered poorly will generate friction rather than improvement.

**Comment on the code, not the person.**

| Avoid | Prefer |
|---|---|
| "Why did you do it this way?" | "I'm not sure I follow the reasoning here, could you help me understand the intent, or add a comment explaining it?" |
| "This is wrong." | "This approach could cause X in the case of Y. Would it make sense to handle that here?" |
| "You should use a map here." | "A map might improve lookup time here since this runs on every request. What do you think?" |
| "This is too complex." | "I'm finding this hard to follow, do you think we could simplify the logic, or break it into smaller functions?" |

**Label comment severity** so the author can prioritize correctly:

- `Nit:` : minor polish, optional to address in this PR
- `Optional:` or `Consider:` : a suggestion worth thinking about, but not required
- `FYI:` : informational, no action expected in this PR
- (no label) : a required change before the PR can be approved

**Example comments:**
```
Nit: this variable name could be more descriptive, `items` is a bit vague given the context.

Consider: extracting this validation logic into a separate function would make it easier to test independently.

FYI: there is an open issue (#214) about refactoring this module, worth keeping in mind.

This will throw if `user` is null, which can happen when the session expires. We should handle that case here.
```

Acknowledge good decisions too. If the author solved something elegantly or added unusually thorough test coverage, say so. Positive reinforcement encourages good practices to continue.

---

## Response Time

Slow reviews do not just delay individual PRs, they slow down the entire team and erode trust in the review process.

| Situation | Expected response |
|---|---|
| PR assigned for review | First response within **1 business day** |
| Author has addressed feedback | Re-review within **1 business day** |
| Unable to review promptly | Communicate it, let the author know and suggest another reviewer |

A response does not have to be a full review. Acknowledging the PR and providing an estimated timeline is always better than silence.

If a PR is too large to review in a reasonable time, ask the author to split it into smaller, independently reviewable changes. This is almost always possible and benefits both parties.

---

## Handling Disagreement

Disagreements between authors and reviewers are normal and expected. The goal is to reach a technically sound decision, not to win an argument.

**For authors:** if you disagree with a comment, engage with it. Explain your reasoning, describe the tradeoffs you considered, and invite the reviewer to reconsider. Do not simply close or ignore a comment you disagree with.

```
# Don't:
"No, I'm not going to do that."

# Do:
"I went with X here because of [reason]. My understanding is that Y would introduce [tradeoff].
Are you suggesting that the tradeoff is worth it, or is there something I'm missing?"
```

**For reviewers:** if an author pushes back, consider whether they are correct before reiterating the comment. They may have context you do not. If you still believe the change improves code health, explain your reasoning clearly and continue to advocate for it, politely.

Do not defer quality improvements to "later". In practice, later almost never comes. If a PR introduces complexity that needs to be addressed, it should be addressed before the PR is merged, not after.

**Escalating conflicts:** if author and reviewer cannot reach consensus, the resolution path is a broader team discussion or input from a maintainer. A PR should never remain blocked indefinitely due to an unresolved disagreement. Do not let it stall, escalate.

---

## Approving a PR

A PR may be approved when:

- The change improves the overall health of the codebase
- All blocking comments have been resolved
- CI is passing
- At least one reviewer other than the author has approved

An approval does not require every comment to be resolved, only blocking ones. Minor suggestions and nits may remain open if the reviewer is confident the author will handle them appropriately, or if they are genuinely optional.

---

## Quick Reference

**Reviewer checklist:**
- [ ] Read the PR description before looking at the code
- [ ] Review every line of human-written code
- [ ] Evaluate design, functionality, complexity, tests, naming, comments, documentation
- [ ] Label comment severity (`Nit:`, `Optional:`, `FYI:`, or unlabeled for required)
- [ ] Comment on the code, not the person
- [ ] Respond within one business day

**Author checklist:**
- [ ] CI is green and all tests pass before requesting review
- [ ] The PR description explains the problem and the solution
- [ ] The diff has been self-reviewed
- [ ] When a comment is unclear, ask for clarification before pushing back
- [ ] Fix the code when asked to clarify — do not just explain in the thread
- [ ] Respond to feedback constructively, not defensively

---

## References

- [Google Engineering Practices - Code Review](https://google.github.io/eng-practices/review/)
- [How to review code effectively: A GitHub staff engineer's philosophy - GitHub Blog](https://github.blog/developer-skills/github/how-to-review-code-effectively-a-github-staff-engineers-philosophy/)
- [Code Reviews - Atlassian](https://www.atlassian.com/agile/software-development/code-reviews)
