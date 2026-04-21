# AiHousesT

**AiHousesT** is a full-stack, server-side rendered web application for browsing AI-generated houses, built as an **Nx monorepo**.

## Table of Contents

- [Technical Overview](#technical-overview)
  - [Architecture](#architecture)
  - [Workspace Structure](#workspace-structure)
  - [Key Front-end Libraries](#key-front-end-libraries)
  - [UI & Styling](#ui--styling)
  - [Testing](#testing)
- [Run tasks](#run-tasks-angular-fe)
- [Add new projects](#add-new-projects)
- [Add Angular libraries, components, services, and more](#add-angular-libraries-components-services-and-more)
- [Useful links](#useful-links)
- [Tailwind Configuration](#tailwind-configuration)
- [PrimeNG components styles configuration: e.g. Button](#primeng-components-styles-configuration-eg-button)
- [API nest.js](#api-nestjs)
  - [Run tasks nest.js](#run-tasks-nestjs)
- [Database migrations](#database-migrations)
- [Redis](#redis)
- [Admin Panel](#admin-panel)
  - [Run tasks for Admin Panel](#run-tasks-for-admin-panel)

## Technical Overview


### Architecture

| Layer | Technology |
|---|---|
| Monorepo tooling | Nx 22 |
| Frontend framework | Angular 21 with SSR (`@angular/ssr`) |
| Admin panel | Separate Angular 21 application |
| Backend framework | NestJS 11 (REST API) |
| Database | PostgreSQL via TypeORM 0.3 |
| Session store | Redis (connect-redis + express-session) |
| Authentication | Passport.js — JWT + Local strategies |

### Workspace Structure

```
apps/
  ai-houses-t        — Main SSR Angular application
  admin-panel        — Angular admin panel
  api                — NestJS REST API
libs/
  front-end/         — Angular libraries (core, shared, styles, utils, pages, features/)
  front-end-ap/      — Admin-panel-specific Angular libraries
  back-end/          — NestJS feature libraries (auth, user, address, ai-house, image, seo, redis, migrations)
  shared/            — Framework-agnostic models and utilities shared across front-end and back-end
```

### Key Front-end Libraries

| Alias | Path | Purpose |
|---|---|---|
| `@fe/core` | `libs/front-end/core` | App-wide configuration (providers, interceptors) |
| `@fe/shared` | `libs/front-end/shared` | Services, guards, directives, SEO |
| `@fe/pages` | `libs/front-end/pages` | Routed page components |
| `@fe/styles` | `libs/front-end/styles` | Global styles and PrimeNG theme tokens |
| `@fe/utils` | `libs/front-end/utils` | Pure utility functions |
| `@fe/ai-house` | `libs/front-end/features/ai-house` | AI House feature (store, components) |
| `@fe/auth` | `libs/front-end/features/auth` | Authentication UI and logic |
| `@fe/user` | `libs/front-end/features/user` | User profile feature |

### UI & Styling

- **Tailwind CSS v4** — utility-first styling
- **PrimeNG v21** — component library with customisable design tokens (Aura theme base)
- Component-level style overrides via PrimeNG `pt` (PassThrough) API or Tailwind utilities

### Testing

- **Jest** — unit tests for back-end libraries and shared code
- **Playwright** — end-to-end tests for both `ai-houses-t` and `admin-panel`
- Angular component tests use `TestBed`

## Run tasks Angular FE

To run the dev server for your app, use:

```sh
npx nx serve ai-houses-t
```

To create a production bundle:

```sh
npx nx build ai-houses-t
```

To see all available targets to run for a project, run:

```sh
npx nx show project ai-houses-t
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/angular:app demo
```

## Add Angular libraries, components, services, and more

To generate a new library, use:

```sh
npx nx g @nx/angular:lib mylib
yarn nx g @nx/angular:library libs/front-end/pages --importPath=@pages --buildable --routing    
yarn nx g @nx/angular:library libs/front-end/core --importPath=@fe/core --buildable
yarn nx g @nx/angular:library libs/front-end/shared --importPath=@shared --buildable
yarn nx g @nx/angular:library libs/front-end/styles --importPath=@fe/styles --buildable
yarn nx g @nx/angular:library libs/front-end/utils --importPath=@fe/utils --buildable

yarn nx g @nx/angular:library libs/front-end/features/user --importPath=@fe/user --name=fe-user --buildable

yarn nx g @nx/angular:library libs/front-end/features/auth --importPath=@fe/auth --name=fe-auth --buildable
yarn nx g @nx/angular:component libs/front-end/features/auth/src/lib/components/auth/auth --export
yarn nx g @nx/angular:component libs/front-end/features/auth/src/lib/components/sign-in/sign-in --export
yarn nx g @nx/angular:component libs/front-end/features/auth/src/lib/components/sign-up/sign-up --export
yarn nx g @nx/angular:component libs/front-end/shared/src/lib/components/form-control-wrapper/form-control-wrapper --export

yarn nx g @nx/angular:service services/validation-errors-service/validation-errors-service --project=fe/shared --dry-run
yarn nx g @nx/angular:service services/local-storage/local-storage --project=fe/shared --dry-run
yarn nx g @nx/angular:interceptor interceptors/auth/auth --project=fe/shared --dry-run

yarn nx g @nx/angular:library libs/front-end/features/ai-house --importPath=@fe/ai-house --name=fe-ai-house --buildable
yarn nx g @nx/angular:component libs/front-end/features/ai-house/src/lib/components/ai-houses-chunk/ai-houses-chunk --export
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/getting-started/tutorials/angular-monorepo-tutorial?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:
- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Tailwind Configuration

https://nx.dev/blog/setup-tailwind-4-angular-nx-workspace

https://angular.dev/guide/tailwind
https://nx.dev/docs/technologies/angular/guides/using-tailwind-css-with-angular-projects

https://nx.dev/docs/technologies/typescript/generators#library
https://nx.dev/docs/technologies/angular/generators#_top

## PrimeNG components styles configuration: e.g. Button

We can to customize button in two ways:

1. **General for the whole website.**  Rewrite desing tokens for the button in the file: [ai-houses.ts](/libs/front-end/styles/src/lib/themes/ai-houses.ts)
  in the way explained in the section [Component](https://primeng.org/theming/styled#component).
  Here is the [example of button preset](https://github.com/primefaces/primeuix/blob/main/packages/themes/src/presets/aura/button/index.ts) and [base primitive tokens](https://github.com/primefaces/primeuix/blob/main/packages/themes/src/presets/aura/base/index.ts) for the Aura theme.
  The link to preset of any component can be found in a component page doc at very bottom of the Theming tab.
  While rewriting preset I can use CSS values (e.g. 1rem, 10px etc), CSS variables defined earlier (e.g. in the theme CSS layer), base tokens, or custom tokens created in the way explained in the [Extend Section](https://primeng.org/theming/styled#extend).
2. **Local preset rewriting via `pt` property**. In this case we can create button preset in the same way as for the first option and pass it
  via `pt` property. It's also possible to mark component as unstyled to avoid using any presets and pass own logic via own custom css classes or Tailwind. [Example of this](https://primeng.org/theming/styled#extend)

    ```html
      <p-button
        label="Search"
        icon="pi pi-search"
        [unstyled]="true"
        [pt]="{ 
            root: 'bg-teal-500 hover:bg-teal-700 active:bg-teal-900 cursor-pointer py-2 px-4 rounded-full border-0 flex gap-2', 
            label: 'text-white font-bold text-lg', 
            icon: 'text-white !text-xl' 
        }"
      />
    ```

    where `[pt]="{ root: '...'}"` -- `root` can contain bunch of Tailwind classes OR own one custom class like `.btn`. Good example of using Tailwind utilities is in the library `primereact/passthrough/tailwind`. It's for React applications, but could be a good basis for Angular ones too. Probably there's a way to adopt it to Angular.

Sometimes we need a special variation of button that cannot be defined as primary or secondary. Then we need to extend design tokens like it is shown in the [Extend Section](https://primeng.org/theming/styled#extend) or probably create a component `<custom-btn>` with many local presets and the ability to choose the needed one. Those presets can be done via Tailwind as it shown above.

One pitfall with primeng and Tailwind in Angular is that it's not possible to use Tailwind color design tokens (`--color-blue-500`) for defining primitive primeng css tokens unless using CSS variables (not sure about it) or using a library like `primereact/passthrough/tailwind` when all styles of primeng components are defined by Tailwind utilities.

## API nest.js

Run `nx show project api-e2e` to view details about this project.
Run `nx show project api` to view details about this project.

[NX Nest.js generators](https://nx.dev/docs/technologies/node/nest/generators)

### Run tasks nest.js

To run the dev server for your app, use:

```sh
npx nx serve api
```

To create a production bundle:

```sh
npx nx build api
```

To see all available targets to run for a project, run:

```sh
npx nx show project api
```

https://nx.dev/docs/technologies/node/nest/generators
https://nx.dev/docs/technologies/node/nest/introduction

```sh
nx generate @nx/nest:library libs/back-end/shared --importPath=@be/shared --name=be/shared

npx nx generate @nx/nest:service libs/back-end/shared/src/lib/services/typeorm-config/typeorm-config

# ai-house migrations
npx nx generate @nx/nest:library libs/back-end/migrations --importPath=@be/migrations --name=be-migrations --linter=eslint --unitTestRunner=none 

# user feature
nx generate @nx/nest:library libs/back-end/features/user --importPath=@be/user --name=be-user  
nx generate @nx/nest:resource libs/back-end/features/user/src/lib/user --type=rest --crud

# user address feature
npx nx generate @nx/nest:library libs/back-end/features/address --importPath=@be/address --name=be-address --linter=eslint --unitTestRunner=jest 
npx nx generate @nx/nest:resource libs/back-end/features/address/src/lib/address --type=rest --crud

# image feature
npx nx generate @nx/nest:library libs/back-end/features/image --importPath=@be/image --name=be-image --linter=eslint --unitTestRunner=jest 
npx nx generate @nx/nest:resource libs/back-end/features/image/src/lib/image --type=rest --crud

# seo feature
npx nx generate @nx/nest:library libs/back-end/features/seo --importPath=@be/seo --name=be-seo --linter=eslint --unitTestRunner=jest 
npx nx generate @nx/nest:resource libs/back-end/features/seo/src/lib/seo --type=rest --crud

# ai-house feature
npx nx generate @nx/nest:library libs/back-end/features/ai-house --importPath=@be/ai-house --name=be-ai-house --linter=eslint --unitTestRunner=jest 
npx nx generate @nx/nest:resource libs/back-end/features/ai-house/src/lib/ai-house --type=rest --crud


# auth feature
nx generate @nx/nest:library libs/back-end/features/auth --importPath=@be/auth --name=be-auth --linter=eslint --unitTestRunner=jest 
nx generate @nx/nest:service libs/back-end/features/auth/src/lib/auth --unitTestRunner=jest
nx generate @nx/nest:controller libs/back-end/features/auth/src/lib/auth --unitTestRunner=jest


nx generate @nx/nest:library libs/back-end/features/redis --importPath=@be/redis --name=be-redis --linter=eslint --unitTestRunner=jest 
nx generate @nx/nest:service libs/back-end/features/redis/src/lib/redis --unitTestRunner=jest

nx run be-migrations:migration:run
```

https://docs.nestjs.com/fundamentals/dynamic-modules
https://github.com/nestjs/nest/tree/master/sample/25-dynamic-modules
https://docs.nestjs.com/techniques/database
https://typeorm.io/docs/relations/relations/

https://docs.nestjs.com/recipes/crud-generator

to open postgres connection in terminal:

```sh
psql postgres
```

## Database migrations

All details about database migrations and CLI usage are in the [README](./libs/back-end/migrations/README.md) of the library `be-migrations`.

## Kill process on port 4200

macOS and Linux:

- Find the Process ID (PID): Open the terminal and run:
  `lsof -i :4200`
- Kill the Process: Use the PID found from the previous step:
  `kill -9 [PID]`
- One-liner for Mac/Linux: `sudo kill -9 $(sudo lsof -t -i:4200)`.
- Quick One-Line Solution (NPM)
  If you have Node.js installed, you can use the kill-port utility directly without manually finding the PID:
  Command: `npx kill-port 4200`.

## Redis

To monitor Redis commands in real-time:

```bash
redis-cli monitor
```

## Admin Panel

Run `nx show project admin-panel-e2e` to view details about this project.
Run `nx show project admin-panel` to view details about this project.

### Run tasks for Admin Panel

To run the dev server for your app, use:

```sh
npx nx serve admin-panel
```

To create a production bundle:

```sh
npx nx build admin-panel
```

For the admin panel:

```sh
yarn nx g @nx/angular:library libs/front-end-ap/pages --importPath=@ap/pages --name=ap-pages --buildable --routing    
yarn nx g @nx/angular:library libs/front-end-ap/core --importPath=@ap/core --name=ap-core --buildable
yarn nx g @nx/angular:library libs/front-end-ap/shared --importPath=@ap/shared --name=ap-shared --buildable

yarn nx g @nx/angular:component libs/front-end-ap/core/src/lib/components/layout/layout --export
yarn nx g @nx/angular:component libs/front-end-ap/core/src/lib/components/sidebar/sidebar --export

yarn nx g @nx/angular:component libs/front-end-ap/pages/src/lib/pages/sign-in/sign-in --export

yarn nx g @nx/angular:guard guards/admin/admin --project=ap-shared --dry-run


yarn nx g @nx/angular:component libs/front-end-ap/shared/src/lib/components/form/image-uploader/image-uploader --export
yarn nx g @nx/angular:component libs/front-end-ap/shared/src/lib/components/form/color-picker/color-picker --export
yarn nx g @nx/angular:component libs/front-end-ap/shared/src/lib/components/form/quill-editor/quill-editor --export
yarn nx g @nx/angular:component libs/front-end-ap/shared/src/lib/components/form/remove-item/remove-item --export

yarn nx g @nx/angular:component libs/front-end-ap/shared/src/lib/components/form/generic-form/generic-form --export

yarn nx g @nx/angular:component libs/front-end-ap/shared/src/lib/components/toast/toast --export

yarn nx g @nx/angular:component libs/front-end-ap/pages/src/lib/pages/landing/landing --export

yarn nx g @nx/angular:service services/api-client/api-client --project=ap-shared --dry-run
yarn nx g @nx/angular:service services/global-toast/global-toast --project=ap-shared


yarn nx g @nx/angular:component libs/front-end-ap/pages/src/lib/pages/ai-house/ai-house-form/ai-house-form
libs/front-end-ap/shared/src/lib/services
```
