# NestJs API Gateway 

The main purpose of this repository is to show a working Nest.js API Gateway Server with microservices in TypeScript.

**Live Demo**: [https://api-gateway.nidinpereira.com/](https://github-search-api.nidinpereira.com/)

**Api Docs**: [https://api-gateway.nidinpereira.com/docs/](https://api-gateway.nidinpereira.com/docs/)


# Table of contents:

- [Pre-reqs](#pre-reqs)
- [Getting started](#getting-started)
- [Deploying the app](#deploying-the-app)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [ESLint](#eslint)
- [Dependencies](#dependencies)
    - [`dependencies`](#dependencies)
    - [`devDependencies`](#devdependencies)

# Pre-reqs
To build and run this app locally you will need a few things:
- Install [Node.js](https://nodejs.org/en/)
- Install [VS Code](https://code.visualstudio.com/) or [Intellij](https://www.jetbrains.com/idea/)

# Getting started
- Clone the repository
```
git clone --depth=1 https://github.com/nidinpereira/github-search-typescrip-nodejs-redis.git <project_name>
```
- Install dependencies
```
cd <project_name>
npm install
```

- Build and run the project
```
npm run build
npm start
```
Or, if you're using VS Code, you can use `cmd + shift + b` to run the default build task (which is mapped to `npm run build`), and then you can use the command palette (`cmd + shift + p`) and select `Tasks: Run Task` > `npm: start` to run `npm start` for you.

Finally, navigate to `http://localhost:3000` and you should able to see on your console that the server is up and running!

# Deploying the app
There are many ways to deploy a Node app, and in general, nothing about the deployment process changes because you're using TypeScript.

### Build the app
Building the app locally is required to generate a zip to deploy because the App Service won't execute build tasks.
Build the app however you normally would:
- `ctrl + shift + b` - kicks off default build in VS Code
- execute `npm run build` from a terminal window

## Project Structure
The most obvious difference in a TypeScript + Node project is the folder structure.
In a TypeScript project, it's best to have separate _source_  and _distributable_ files.
TypeScript (`.ts`) files live in your `src` folder and after compilation are output as JavaScript (`.js`) in the `dist` folder.
The `test` and `views` folders remain top level as expected.

The full folder structure of this app is explained below:

> **Note!** Make sure you have already built the app using `npm run build`

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **.vscode**              | Contains VS Code specific settings                                                            |
| **.idea**                | Contains intellij specific settings                                                           |
| **.github**              | Contains GitHub settings and configurations, including the GitHub Actions workflows           |
| **build*                 | Contains the distributable (or output) from your TypeScript build. This is the code you ship  |
| **node_modules**         | Contains all your npm dependencies                                                            |
| **src**                  | Contains your source code that will be compiled to the dist dir                               |
| **src/config**           | All your apps secrets and configurations are stored here.                                     |
| **src/models**           | Models and interfaces that will serve as schemas for api calls or database schemas            |
| **src/utils**            | Utility classes that server as common classes shared across modules                           |
| **src/middlewares**      | Middleware functions that are processed before or after the request is served                 |
| **src/modules**          | All the api modules of the server will be included here.                                      |
| **src/modules/<module_name>/<module>.controller.ts** | Controllers are responsible for handling the http requests and fetching data from different services.                                      |
| **src/modules/<module_name>/<module>.service.ts** | Service classes are responsible for fetching data from external services like a DB or other http sources.                                      |
| **test**                 | Contains your tests. Separate from source because there is a different build process.         |
| .env.example             | API keys, tokens, passwords, database URI. Clone this, but don't check it in to public repos. |
| .travis.yml              | Used to configure Travis CI build                                                             |
| Docker                   | Used for containerization of the build                                                             |
| jest.config.js           | Used to configure Jest running tests written in TypeScript                                    |
| package.json             | File that contains npm dependencies as well as [build scripts]                       |
| tsconfig.json            | Config settings for compiling server code written in TypeScript                               |
| tsconfig.tests.json      | Config settings for compiling tests written in TypeScript                                     |
| .eslintrc                | Config settings for ESLint code style checking                                                |
| .eslintignore            | Config settings for paths to exclude from linting                                             |

### Configuring TypeScript compilation
TypeScript uses the file `tsconfig.json` to adjust project compile options.
Let's dissect this project's `tsconfig.json`, starting with the `compilerOptions` which details how your project is compiled.
```json
"compilerOptions": {
    "module": "commonjs",
    "esModuleInterop": true,
    "target": "es6",
    "noImplicitAny": true,
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist",
    "baseUrl": ".",
    "paths": {
        "*": [
            "node_modules/*",
            "src/types/*"
        ]
    }
},
```

| `compilerOptions` | Description |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `"module": "commonjs"`             | The **output** module type (in your `.js` files). Node uses commonjs, so that is what we use            |
| `"esModuleInterop": true,`         | Allows usage of an alternate module import syntax: `import foo from 'foo';`                            |
| `"target": "es6"`                  | The output language level. Node supports ES6, so we can target that here                               |
| `"noImplicitAny": true`            | Enables a stricter setting which throws errors when something has a default `any` value                |
| `"moduleResolution": "node"`       | TypeScript attempts to mimic Node's module resolution strategy. Read more [here](https://www.typescriptlang.org/docs/handbook/module-resolution.html#node)                                                                    |
| `"sourceMap": true`                | We want source maps to be output along side our JavaScript.     |
| `"outDir": "dist"`                 | Location to output `.js` files after compilation                                                        |
| `"baseUrl": "."`                   | Part of configuring module resolution.  |
| `paths: {...}`                     | Part of configuring module resolution. |

The rest of the file define the TypeScript project context.
The project context is basically a set of options that determine which files are compiled when the compiler is invoked with a specific `tsconfig.json`.
In this case, we use the following to define our project context:
```json
"include": [
    "src/**/*"
]
```
`include` takes an array of glob patterns of files to include in the compilation.
This project is fairly simple and all of our .ts files are under the `src` folder.
For more complex setups, you can include an `exclude` array of glob patterns that removes specific files from the set defined with `include`.
There is also a `files` option which takes an array of individual file names which overrides both `include` and `exclude`.


### Running the build
All the different build steps are orchestrated via [npm scripts](https://docs.npmjs.com/misc/scripts).
Npm scripts basically allow us to call (and chain) terminal commands via npm.
This is nice because most JavaScript tools have easy to use command line utilities allowing us to not need grunt or gulp to manage our builds.
If you open `package.json`, you will see a `scripts` section with all the different scripts you can call.
To call a script, simply run `npm run <script-name>` from the command line.
You'll notice that npm scripts can call each other which makes it easy to compose complex builds out of simple individual build scripts.
Below is a list of all the scripts this template has available:


| Npm Script | Description  |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `build-ts`                | Compiles all source `.ts` files to `.js` files in the `dist` folder                               |
| `build`                   | Full build. Runs ALL build tasks (`build-sass`, `build-ts`, `lint`, `copy-static-assets`)         |
| `copy-static-assets`      | Calls script that copies JS libs, fonts, and images to dist directory                             |
| `debug`                   | Performs a full build and then serves the app in watch mode                                       |
| `lint`                    | Runs ESLint on project files                                                                      |
| `serve-debug`             | Runs the app with the --inspect flag                                                              |
| `serve`                   | Runs node on `dist/server.js` which is the apps entry point                                       |
| `start`                   | Does the same as 'npm run serve'. Can be invoked with `npm start`                                 |
| `test`                    | Runs tests using Jest test runner                                                                 |
| `test:e2e`                | Runs end to end tests using Jest test runner                                                      |
| `test:cov`                | generate coverage report using Jest test runner                                                                 |
| `watch-debug`             | The same as `watch` but includes the --inspect flag so you can attach a debugger                  |
| `watch-node`              | Runs node with nodemon so the process restarts if it crashes. Used in the main watch task         |
| `watch-test`              | Runs tests in watch mode                                                                          |
| `watch-ts`                | Same as `build-ts` but continuously watches `.ts` files and re-compiles when needed               |
| `watch`                   | Runs all watch tasks (TypeScript, Sass, Node). Use this if you're not touching static assets.     |

### Using the debugger in VS Code
Debugging is one of the places where VS Code really shines over other editors.
Node.js debugging in VS Code is easy to set up and even easier to use.
This project comes pre-configured with everything you need to get started.

When you hit `F5` in VS Code, it looks for a top level `.vscode` folder with a `launch.json` file.

You can debug in the following ways:
* **Launch Program** - transpile typescript to javascript via npm build, then launch the app with the debugger attached on startup
* **Attach by Process ID** - run the project in debug mode. This is mostly identical to the "Node.js: Attach by Process ID" template with one minor change.
  We added `"protocol": "inspector"` which tells VS Code that we're using the latest version of Node which uses a new debug protocol.
* **Jest Current File** - have a Jest test file open and active in VSCode, then debug this specific file by setting break point. All tests are not run.
* **Jest all** -  run all tests, set a break point.

In this file, you can tell VS Code exactly what you want to do:
```json
[
        {
            "name": "Launch Program",
            "type": "node",
            "program": "${workspaceFolder}/dist/server.js",
            "request": "launch",
            "preLaunchTask": "npm: build"
        },
        {
            "type": "node",
            "request": "attach",
            "name": "Attach by Process ID",
            "processId": "${command:PickProcess}",
            "protocol": "inspector"
        },
        {
            "type": "node",
            "request": "launch",
            "name": "Jest Current File",
            "program": "${workspaceFolder}/node_modules/.bin/jest",
            "args": [
                "${fileBasenameNoExtension}",
                "--detectOpenHandles"
            ],
            "console": "integratedTerminal",
            "internalConsoleOptions": "neverOpen",
            "disableOptimisticBPs": true,
            "windows": {
                "program": "${workspaceFolder}/node_modules/jest/bin/jest",
            }
        },
        {
            "type": "node",
            "request": "launch",
            "name": "Jest all",
            "runtimeExecutable": "npm",
            "runtimeArgs": [
                "run-script",
                "test"
            ],
            "port": 9229,
            "skipFiles": [
                "<node_internals>/**"
            ]
        },
    ]
```

With this file in place, you can hit `F5` to attach a debugger.
You will probably have multiple node processes running, so you need to find the one that shows `node dist/server.js`.
Now just set your breakpoints and go!

## Testing
For this project, I chose [Jest](https://facebook.github.io/jest/) as our test framework.

### Install the components
To add TypeScript + Jest support, first install a few npm packages:
```
npm install -D jest ts-jest
```
`jest` is the testing framework itself, and `ts-jest` is just a simple function to make running TypeScript tests a little easier.

### Configure Jest
Jest's configuration lives in `jest.config.js`, so let's open it up and add the following code:
```js
module.exports = {
    globals: {
        'ts-jest': {
            tsconfigFile: 'tsconfig.json'
        }
    },
    moduleFileExtensions: [
        'ts',
        'js'
    ],
    transform: {
        '^.+\\.(ts|tsx)$': './node_modules/ts-jest/preprocessor.js'
    },
    testMatch: [
        '**/test/**/*.test.(ts|js)'
    ],
    testEnvironment: 'node'
};
```
Basically we are telling Jest that we want it to consume all files that match the pattern `"**/test/**/*.test.(ts|js)"` (all `.test.ts`/`.test.js` files in the `test` folder), but we want to preprocess the `.ts` files first.
This preprocess step is very flexible, but in our case, we just want to compile our TypeScript to JavaScript using our `tsconfig.json`.
This all happens in memory when you run the tests, so there are no output `.js` test files for you to manage.

### Running tests
Simply run `npm run test`.
Note this will also generate a coverage report.

## ESLint
ESLint is a code linter which mainly helps catch quickly minor code quality and style issues.

### ESLint rules
Like most linters, ESLint has a wide set of configurable rules as well as support for custom rule sets.
All rules are configured through `.eslintrc` configuration file.
In this project, we are using a fairly basic set of rules with no additional custom rules.

### Running ESLint
Like the rest of our build steps, we use npm scripts to invoke ESLint.
To run ESLint you can call the main build script or just the ESLint task.
```
npm run build   // runs full build including ESLint
npm run lint    // runs only ESLint
```

# Dependencies
Dependencies are managed through `package.json`.
In that file you'll find two sections:

## `dependencies`

| Package                         | Description                                                           |
| ------------------------------- | --------------------------------------------------------------------- |
| async                           | Utility library that provides asynchronous control flow.               |
| body-parser                     | Express 4 middleware.                                                 |
| class-transformer               | Library to transform plain objects to classes and vice versa.                                                 |
| class-validator                 | Validation library that uses annotations.                                                 |
| compression                     | Express 4 middleware.                                                 |
| connect-mongo                   | MongoDB session store for Express.                                    |
| dotenv                          | Loads environment variables from .env file.                            |
| errorhandler                    | Express 4 middleware.                                                 |
| express                         | Node.js web framework.                                                |
| express-validator               | Easy form validation for Express.                                     |
| request                         | Simplified HTTP request library.                                       |
| nestjs                          | Typescript framework library that works along side express and annotations for routing and controllers            |
| winston                         | Logging library                                                       |

## `devDependencies`

| Package                         | Description                                                            |
| ------------------------------- | ---------------------------------------------------------------------- |
| @types                          | Dependencies in this folder are `.d.ts` files used to provide types    |
| concurrently                    | Utility that manages multiple concurrent tasks. Used with npm scripts  |
| jest                            | Testing library for JavaScript.                                        |
| nodemon                         | Utility that automatically restarts node process when it crashes       |
| supertest                       | HTTP assertion library.                                                |
| ts-jest                         | A preprocessor with sourcemap support to help use TypeScript with Jest.|
| ts-node                         | Enables directly running TS files. Used to run `copy-static-assets.ts` |
| eslint                          | Linter for JavaScript and TypeScript files                             |
| typescript                      | JavaScript compiler/type checker that boosts JavaScript productivity   |

To install or update these dependencies you can use `npm install` or `npm update`.
