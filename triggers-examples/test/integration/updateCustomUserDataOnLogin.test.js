const Realm = require("realm");
const { faker } = require("@faker-js/faker");
const { sleep, connectToMongoDbClient, getRealmApp } = require("./utils");

require("dotenv").config();

const app = getRealmApp();
let user;
const email = faker.internet.email();
const password = faker.internet.password();
beforeEach(async () => {
  await app.emailPasswordAuth.registerUser({ email, password });
  user = await app.logIn(Realm.Credentials.emailPassword(email, password));
  await user.logOut();
});
afterEach(async () => {
  const userId = user.id;
  await app.deleteUser(user);
  user && (await user.logOut());
  await client.db("store").collection("userData").deleteOne({ _id: userId });
});

let client;
beforeAll(async () => {
  client = connectToMongoDbClient();
});
afterAll(async () => {
  await client.close();
});
test("Updates custom user data on email/password log in", async () => {
  await app.logIn(Realm.Credentials.emailPassword(email, password));
  // Give time for Trigger to execute
  await sleep(1000);
  const userData = client.db("store").collection("userData");
  const customUserData = await userData.findOne({ _id: user.id });
  expect(customUserData._id).toBe(user.id);
  expect(customUserData.lastLogIn.getTime() < Date.now()).toBe(true);
});
