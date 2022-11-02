# Contributing to the Triggers Examples

Guidelines:

1. Add integration test for all examples. Add these tests to the `test/integration`
   directory.
1. When doing local development, you can add your own App ID to the
   `realm_config.json` file.
1. Don't commit secrets. Add secrets to a local `.env` file, prefixing the name
   with `APP_SECRET`. The secret deployment script automatically adds these to
   your app when you run `npm run build` or npm run build:secrets`.
1. Document all examples. Make sure to include information about them in the README,
   both in the table toward the top fo the page and in a section below.
   Refer to the README for examples.
