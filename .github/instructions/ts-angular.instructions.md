---
applyTo: "**/*.ts"
description: "Project coding standards for TypeScript and Angular"
---

# Project coding standards for TypeScript and Angular

Apply the [general coding guidelines](./general-coding.instructions.md) to all code.

## TypeScript Guidelines
- Use TypeScript for all new code
- Follow functional programming principles where possible
- Use interfaces for data structures and type definitions
- Prefer immutable data (const, readonly)
- Use optional chaining (?.) and nullish coalescing (??) operators

## Angular Guidelines
- Use Angular components and services
- Follow Angular style guide
- Keep components small and focused
- If a `@Component` decorator has property `styleUrl`, it is fine. Do not suggest to replace it with `styleUrls` property.

