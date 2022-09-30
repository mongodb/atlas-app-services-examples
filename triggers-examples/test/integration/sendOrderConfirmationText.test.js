const { connectToMongoDbClient } = require("./utils");

describe("Order confirmation text", () => {
  let client;
  beforeAll(async () => {
    client = connectToMongoDbClient();
  });
  afterAll(async () => {
    await client.close();
  });
  test("Should send text on DB post", async () => {
    const orders = client.db("store").collection("orders");

    const orderInfo = {
      confirmationNumber: "+19145895304",
      orderItemName: "String cheese",
    };
    await orders.insertOne(orderInfo);
    // TEST REQUIRES MANUAL VALIDATION ON PHONE THAT RECEIVES THE TEXT
  });
});
