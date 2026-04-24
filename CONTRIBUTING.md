# Contributing to OhMyOpenSource! Guidelines

Thank you for taking the time to contribute to this repository. The OhMyOpenSource! guidelines are a living document - they grow with the community, and contributions from anyone who works with these standards are genuinely valuable.

This document explains how to contribute effectively.

---

## What This Repository Is

This repository is the **official handbook** of the OhMyOpenSource! organization. It defines the conventions, standards and best practices followed across all our projects.

Changes to this repository affect every contributor across every project in the organization. That is why the bar for contributions is clarity and completeness, not cleverness or novelty.

---

## What You Can Contribute

Contributions are welcome for:

- **Corrections**: fixing factual errors, outdated information, or broken references
- **Clarifications**: improving explanations that are ambiguous or hard to follow
- **Additions**: proposing a new section, standard, or guideline that is missing
- **Examples**: adding concrete, practical examples to existing guidelines
- **Formatting**: fixing Markdown issues, broken links, inconsistent structure

If you are unsure whether a change is appropriate, open an issue to discuss it before opening a pull request.

---

## Before You Start

1. **Read the relevant guidelines first.** Before proposing a change to a section, read it in full. Understanding the existing reasoning makes for a better contribution.

2. **Check open issues and PRs.** Someone may already be working on the same thing. Avoid duplicating effort.

3. **Open an issue for significant changes.** If you want to add a new section, restructure an existing one, or change a convention that affects multiple repositories, open an issue first. This gives maintainers and the community a chance to discuss the direction before work begins.

---

## Making a Change

### 1. Fork and clone

```bash
git clone https://github.com/ohmyopensource/ohmyopensource-guidelines
cd ohmyopensource-guidelines
```

### 2. Create a branch

Follow the organization's [branching strategy](git/branching-strategy.md). For most contributions to this repository, a `fix/` or `docs/` branch is appropriate:

```bash
git checkout -b fix/clarify-semver-breaking-changes
git checkout -b docs/add-monorepo-guidelines
```

### 3. Make your changes

Write clearly. Match the tone of the existing documentation: direct, precise, and free of unnecessary hedging. Refer to [documentation.md](code/documentation.md) for the Markdown style conventions used in this repository.

### 4. Commit

Follow the [commit conventions](git/commit-conventions.md):

```
docs(versioning): clarify breaking change definition for 0.x releases
fix(branching): correct merge target for hotfix branches
```

### 5. Open a pull request

Use the pull request template. The description should explain:

- What was wrong or missing
- What you changed and why
- Any open questions or tradeoffs

---

## Style Guidelines

- Write in the **second person** when addressing the reader directly ("you should", "the author is responsible for")
- Use the **imperative** for instructions ("run", "create", "open")
- Keep sentences short and direct
- Use tables for comparisons and reference material
- Use code blocks for all commands, file paths, and code samples, always with a language specifier
- Avoid jargon without a definition
- Do not use exclamation points to convey enthusiasm - let the content speak for itself

---

## Review Process

All pull requests require at least one approval from a maintainer before merging. Expect feedback. Guidelines that affect the entire organization need to be carefully considered.

If your PR is not reviewed within a week, feel free to leave a comment to request attention.

---

## What Will Not Be Merged

- Changes that introduce ambiguity or reduce the specificity of an existing guideline without a compelling reason
- Additions that are highly project-specific and do not generalize across the organization
- Style changes that diverge from the existing tone and format without discussion
- Content that has not been discussed for significant structural changes

---

## Questions

If you have a question that is not answered here, open an issue with the `question` label. We will answer it and, if the question is common enough, add it here.
