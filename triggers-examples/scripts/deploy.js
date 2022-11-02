const { execWithHandler } = require("./utils");
require("dotenv").config();

const realmCliBin = "node_modules/.bin/realm-cli";

async function run() {
  // log user in if running in CI
  const { CI, PUBLIC_API_KEY, PRIVATE_API_KEY } = process.env;
  if (CI) {
    const loginCommand = `${realmCliBin} login --api-key ${PUBLIC_API_KEY} --private-api-key ${PRIVATE_API_KEY}`;
    await execWithHandler(loginCommand);
  }

  let command = `${realmCliBin} push --include-package-json --yes`;
  const { APP_ID } = process.env;
  if (APP_ID) {
    command += ` --remote ${APP_ID}`;
  }

  const { stdout, stderr } = await execWithHandler(command);
  if (stderr) {
    throw new Error(stderr);
  }
  console.log(stdout);
}

module.exports = run();
