# @ahoylabs/env-ts

`env-ts` is a tool to manage and **type check environment variables** (unlike `.env`).

It's written in TypeScript and designed for monorepo setups (like [Turborepo](https://turbo.build/)).

It generates code to make sure that environment variables that your app needs are never undefined.

## Install

```sh
# add the package
yarn add --dev @ahoylabs/env-ts
# init the tool
yarn env-ts init
```

## Usage

### In `package.json`

Usages: `env-ts [env-file-name] [app-name] [optional-filter-for-env-names] && env $(env-ts [env-file-name] [app-name]) [command]`

For example, in `repos/app/package.json`:

```js
{
  "scripts": {
    // check the `env.ts` file's sub-repo `app` for valid env vars,
    // creating a generated `_env.ts` only for vars that start with `NEXT_PUBLIC_`
    "check-env": "env-ts env.ts app NEXT_PUBLIC_",
    // check then inject the
    "start": "yarn check-env && env $(env-ts env.ts app) next dev"
  }
}
```

### In Your App

```ts
// first import the auto-generated env object
import { env } from './__generated__/env.ts`

// now you have the fully typed env vars
console.log(env.EXAMPLE_ENV)
```

## License

MIT © [Ahoy Labs, Inc.](https://ahoylabs.xyz)
