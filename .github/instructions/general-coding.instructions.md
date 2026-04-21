---
applyTo: "**"
---
# Project general coding standards

## Naming Conventions
- Use PascalCase for component names, interfaces, and type aliases
- Use camelCase for variables, functions, and methods
- Prefix private class members with underscore (_)
- Use ALL_CAPS for constants

## Error Handling
- Use try/catch blocks for async operations
- Always log errors with contextual information

## Libraries and Frameworks
When adding new code consider the version of the libraries and frameworks used in the project. Make sure to use the same version to avoid compatibility issues. They are listed in the [`package.json`](../../package.json) file.

## Files Importing
This project is NX workspace with many libraries. Imports of any files from other libraries should be done using the library alias name as defined in the [`tsconfig.base.json`](../../tsconfig.base.json) file `compilerOptions.paths`. For example, if you want to import a file from the `shared` library (`libs/shared/src/index.ts`), you should use:
```ts
import { SomeModule } from '@shared';
```
instead of:
```ts
import { SomeModule } from '../../../../../shared/src/lib/some-module';
```