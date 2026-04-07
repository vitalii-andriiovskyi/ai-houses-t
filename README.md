# AiHousesT

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ Your new, shiny [Nx workspace](https://nx.dev) is ready ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/getting-started/tutorials/angular-monorepo-tutorial?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

## Run tasks

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

```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Set up CI!

### Step 1

To connect to Nx Cloud, run the following command:

```sh
npx nx connect
```

Connecting to Nx Cloud ensures a [fast and scalable CI](https://nx.dev/ci/intro/why-nx-cloud?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) pipeline. It includes features such as:

- [Remote caching](https://nx.dev/ci/features/remote-cache?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task distribution across multiple machines](https://nx.dev/ci/features/distribute-task-execution?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Automated e2e test splitting](https://nx.dev/ci/features/split-e2e-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task flakiness detection and rerunning](https://nx.dev/ci/features/flaky-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

### Step 2

Use the following command to configure a CI workflow for your workspace:

```sh
npx nx g ci-workflow
```

[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

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

    where `[pt]="{ root: '...'}"` -- `root` can contain bunch of Tailwind classes OR own one custom class like `.btn`. Good example of using Tailwind utilities is in the library `primereact/passthrough/tailwind`. It's for React applications, but could be a good basis for Angular ones too. Probably there's a way to adopt it to Anglar.

Sometimes we need a special variation of button that cannot be defined as primary or secondary. Then we need to extend design tokens like it is shown in the [Extend Section](https://primeng.org/theming/styled#extend) or probably create a component `<custom-btn>` with many local presets and the ability to choose the needed one. Those presets can be done via Tailwind as it shown above.

One pitfall with primeng and Tailwind in Angular is that it's not possible to use Tailwind color design tokens (`--color-blue-500`) for defining primitive primeng css tokens unless using CSS variables (not sure about it) or using a library like `primereact/passthrough/tailwind` when all styles of 
primeng components are defined by Tailwind utilities.

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


macOS and Linux
Find the Process ID (PID): Open the terminal and run:
`lsof -i :4200`
Kill the Process: Use the PID found from the previous step:
`kill -9 [PID]`
One-liner for Mac/Linux: sudo kill -9 $(sudo lsof -t -i:4200). 
Stack Overflow
Stack Overflow
3. Quick One-Line Solution (NPM) 
If you have Node.js installed, you can use the kill-port utility directly without manually finding the PID: 
Command: `npx kill-port 4200`.
