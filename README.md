# Demerzel

The repository contains basic setup to quickly bootstrap a Web Application.

## Features

- Server Side Rendering [SSR].
- Progressive Web App [PWA].
- Code Linting and Prettifying.
- Configured testing framework.
- TypeScript support for type safety code.

## Monorepo

The repository has a monorepository structure. The idea behind such structure, is to have a package architecture, that simplifies the process of developing modular software, by allowing for better code sharing, simpler dependency management, and build process optimization. Moreover, it helps to manage:

- Cross dependencies.
- Tests configuration.
- Linting configuration.
- Pull requests templates.
- Deployment scripts.
- Code quiality.

The support for such an architecure comes with [workspaces](https://yarnpkg.com/lang/en/docs/workspaces) in Yarn package manager, and it can be extended with [Lerna](https://github.com/lerna/lerna), which offers additional fetures on top of workspaces. Some background information can be found in the article: [Monorepos in the Wild](https://medium.com/@maoberlehner/monorepos-in-the-wild-33c6eb246cb9).

# Packages

The modules are placed inside `packages` directory:

- **components**: library of React components. Uses [styleguidist](https://github.com/styleguidist/react-styleguidist) for presentation.
- **config**: sharable build configuration for [Webpack](https://webpack.js.org) bundler.
- **utils**: utils and tools.
- **webapp**: Web Application.

Each module in the `packages` directory should be treated as a standalone `npm` package, with it's own scripts and depenencies.

For most of the modules, one should be able to run at least `yarn start` and `yarn build` command.

Some modules are marked as `private` in their local `package.json` file, which means, that they can be excluded from the workflow when using Lerna.

# Installation

_Note: It is recommended to update Node.js to it's recent version._

Clone the repository:

```sh
git clone https://github.com/schabluk/demerzel.git
```

Install and link all dependencies, then build all modules (_note, that Lerna will create an appropriate build order_):

```sh
cd demerzel
yarn install && yarn boot && yarn build
```

Go to the `webapp` and lauch the prototype in `development` mode.

```sh
cd packages/webapp/
yarn dev
```

# Development cycle

Prototyping in JavaScript [JS], delivering in TypeScript [TS]. Tests are written for validated TS components only.

## Testing

Tests are executer using [Jest](https://jestjs.io/) runner, and written with [React Testing Library](https://testing-library.com/react) for React components.

![Components Testing](images/jest-tests.png)

The main Jest configuration files is located in the top-level project directory: [jest.config.js](jest.config.js), however, a package can extend this configuration from it's local directory, like here: [packages/webapp/jest.config.js](packages/webapp/jest.config.js).

Example tests:

- for JavaScript: [packages/webapp/modules/Foo.test.jsx](packages/webapp/modules/Foo.test.jsx)
- for TypeScript: [packages/webapp/modules/Bar.test.tsx](packages/webapp/modules/Bar.test.tsx)

ToDo:

- testing Node.js modules.
- end to end with Cypress.
- testing REST end-points.

## Quality

The code quality is assured with the help of [ESLint](https://eslint.org) and [Prettier](https://prettier.io). The settings for [code styling](.eslintrc.js) and [formating](.prettierrc) are higly opinionated, but they must be followed to keep consistency across the whole codebase.

The main [package.json](package.json) file is configured with [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged), to prevent from commiting baddly written, or erroneous code to the repository.

ToDo:

- add test runner to lint-staged.

# Architecture

- Data Storage: [MongoDB](https://www.mongodb.com)
- Headless CMS: [Strapi](https://strapi.io)
- Chat Server: [Zulip](https://github.com/zulip/zulip)

## MongoDB

?

# Workflow commands

Here are some commands for performing daily tasks in monorepo. To learn about all the commands offered by Lerna, see the [github docs](https://github.com/lerna/lerna).

**Listing all packages (except for private):**

To see which packages are visible to lerna by default, use `list` sub-command.

```sh
lerna ll
```

or, to print the output as JSON:

```sh
lerna ll --json
```

**Installing top-level dependency:**

There are few cases for installing top-level dependecies. Usually, these are related to linting, testing, or git hooks (husky), which are set up globally for the whole repository. To install a top-level dependency, one must use **-W** option (ignores workspaces).

```sh
yarn add --dev -W eslint
```

The `--dev` option will work in the same way as with yarn/npm - installing the package as `devDependency`.

**Installing cross dependencies:**

To install a dependency into _all_ packages withing monorepository, run:

```sh
lerna add --no-private --dev @babel/core
```

One should always use `--no-private` option, to exclude private packages from installation, as they might have their own specific versions of the package being installed.

**Installing scoped dependencies:**

To install a dependency into a _single_ package within monorepository, run:

```sh
lerna add --scope=components react-powerplug
```

The above command will install `react-powerplug` library into `components` package.

**Note:** It is also possible, to install local packages, _as they were already published_ into npm. The following command, will install local `utils` package into local `pqleditor` package.

```sh
lerna add --scope=webapp utils
```

The way it works, is Lerna will install the `utils` package into the top-level `node_modules` directory, treating it as a **compiled NPM module**. It means, that in order for it to work, **the package need's to be built** with `yarn build` command, executed either from top-level directory, or from local package directory.

**Removing dependencies:**

To remove dependecy from all packages run:

```sh
lerna exec -- yarn remove babel-core
```

The `lerna exec` command, allows to run a specific command in every package within monorepo. To lern more about this command see the [docs](https://github.com/lerna/lerna/tree/master/commands/exec#readme).

**Building:**

To build all packages inside monorepo, run:

```sh
lerna run --no-private build
```

This command will run `build` script (if existst), in every package within monorepo, so the `build` commands are defined per-package.

**Cleaning:**

In monorepo, all cross-dependencies will be installed into the top-level `node_modules` directory, however some packages, that are installed only for single package within monorepo, will be installed into it's local `node_modules` folder.

To cleanup `node_modules`, `dist` and `build` folders in `packages/*` directory, run:

```sh
lerna clean
```
