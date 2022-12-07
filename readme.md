# `@ahoylabs/env-ts`

Usages: `env-ts [env-file-name] [app-name] [file-to-env] [optional-filter-for-env-names] && env $(env-ts [env-file-name] [app-name]) [command-with-env]`

For example, in `repos/app/package.json`:

```js
{
  "scripts": {
    // check the `env.ts` file's sub-repo `app` for valid env vars, creating a generated `_env.ts` only for vars
    // that start with `NEXT_PUBLIC_`
    "start": "env-ts env.ts app ./src/__generated__/_env.ts NEXT_PUBLIC_ && env $(env-ts app) next dev"
  }
}
```

## License

MIT © [Ahoy Labs, Inc.](https://ahoy.fund)
