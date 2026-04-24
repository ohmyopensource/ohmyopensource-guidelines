# Security Policy

This document defines how security vulnerabilities are reported and handled in this repository and across the OhMyOpenSource! organization.

---

## Scope

This repository contains documentation and guidelines - it does not ship executable code, dependencies, or deployable software. As a result, the attack surface is limited.

Security concerns relevant to this repository include:

- Links to compromised or malicious external resources
- Guidelines that recommend insecure practices
- Exposure of sensitive information in examples or templates

For security vulnerabilities in other OhMyOpenSource! repositories, refer to the `SECURITY.md` in the relevant repository.

---

## Reporting a Vulnerability

If you discover a security issue in this repository or in any OhMyOpenSource! project, **do not open a public GitHub issue**. Public disclosure before a fix is available puts users at risk.

Instead, report it privately by opening a **GitHub Security Advisory** in the affected repository:

1. Go to the repository on GitHub
2. Navigate to **Security** > **Advisories**
3. Click **Report a vulnerability**
4. Fill in the details as completely as possible

We will acknowledge the report within **48 hours** and aim to respond with an assessment within **5 business days**.

---

## What to Include in a Report

A useful security report includes:

- A clear description of the vulnerability and its potential impact
- Steps to reproduce or demonstrate the issue
- Any relevant logs, screenshots, or proof-of-concept code
- Your assessment of severity, if available

The more context you provide, the faster we can assess and address the issue.

---

## Our Commitment

When a valid security report is received, we commit to:

- Acknowledging receipt promptly
- Keeping you informed as the issue is investigated and resolved
- Crediting you in the fix or advisory, if you wish
- Not taking legal action against good-faith security researchers

We follow a **coordinated disclosure** model: we ask that reporters give us reasonable time to address an issue before making it public. In return, we commit to acting promptly and transparently.

---

## Supported Versions

As a documentation repository, there are no versioned releases with formal support windows. All security-relevant issues are addressed against the current state of the `main` branch.

---

## References

- [GitHub Docs - Privately reporting a security vulnerability](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing-information-about-vulnerabilities/privately-reporting-a-security-vulnerability)
- [OhMyOpenSource! - Secrets Management](security/secrets-management.md)
- [OhMyOpenSource! - Dependency Policy](security/dependency-policy.md)
