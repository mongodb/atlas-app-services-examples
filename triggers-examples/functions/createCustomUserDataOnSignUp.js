async function createCustomUserDataOnSignUp(authEvent) {
  const {
    user: { id, type, identities },
  } = authEvent;

  const customUserData = context.services
    .get("mongodb-atlas")
    .db("store")
    .collection("userData");
  const userData = {
    _id: id,
    type,
    identities,
    accountCreationTime: new Date(),
  };
  await customUserData.insertOne(userData);
}

exports = createCustomUserDataOnSignUp;
