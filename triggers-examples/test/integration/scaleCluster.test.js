const { Credentials } = require("realm");
const { getRealmApp } = require("./utils");
const app = getRealmApp();
beforeAll(async () => {
  await app.logIn(Credentials.serverApiKey(process.env.LOCAL_TEST_KEY));
});
afterAll(async () => {
  await app.currentUser.logOut();
});

// Note: this test is skipped by default since it requires performing some
// heavy database operations that you probably do not want to run every time
// that you run the integration tests suite.
test.skip("Scale cluster", async () => {
  const {
    PUBLIC_API_KEY: username,
    PRIVATE_API_KEY: password,
    ADMIN_API_GROUP_ID: projectId,
  } = process.env;
  const clusterName = "Cluster1";
  const clusterProvider = "AWS";
  const scaleInstanceSize = "M10";

  const res = await app.currentUser.functions.scaleCluster(
    username,
    password,
    projectId,
    clusterName,
    clusterProvider,
    scaleInstanceSize
  );
  console.log(Object.keys(res.providerSettings));
  expect(res.providerSettings.instanceSizeName).toBe("M10");
  console.log(JSON.stringify(res, null, 4));
});
