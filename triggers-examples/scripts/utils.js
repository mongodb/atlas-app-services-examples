const util = require("util");
const axios = require("axios");
const exec = util.promisify(require("child_process").exec);

async function execWithHandler(command) {
  const { stdout, stderr } = await exec(command);
  if (stderr) {
    throw new Error(stderr);
  }
  console.log(stdout);
  return stdout;
}

async function getAuthTokens(publicApiKey, privateApiKey) {
  const endpoint =
    "https://realm.mongodb.com/api/admin/v3.0/auth/providers/mongodb-cloud/login";
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const data = {
    username: publicApiKey,
    apiKey: privateApiKey,
  };

  const { data: res } = await axios.post(endpoint, data, { headers });
  const { access_token, refresh_token } = res;
  return { access_token, refresh_token };
}

module.exports = { execWithHandler, getAuthTokens };
