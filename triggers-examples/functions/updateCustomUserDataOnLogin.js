async function createCustomUserDataOnSignUp(authEvent) {
  const {
    user: { id },
  } = authEvent;

  const customUserData = context.services
    .get("mongodb-atlas")
    .db("store")
    .collection("userData");
  const query = { _id: id };
  const update = {
    $set: {
      lastLogIn: new Date(),
    },
  };
  const options = { upsert: true };
  await customUserData.updateOne(query, update, options);
}

exports = createCustomUserDataOnSignUp;
