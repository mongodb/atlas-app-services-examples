const Realm = require("realm");
const { GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const {
  getRealmApp,
  connectToMongoDbClient,
  sleep,
  initS3Client,
  streamToString,
  getLastMonthAndYear,
} = require("./utils");

// The `generateMonthlySalesReport` Atlas Function can be long running.
// Set Jest to not timeout until after 30 seconds.
jest.setTimeout(30000);

const app = getRealmApp();
const s3Client = initS3Client();
const s3BucketName = "app-services-integration-testing";
const generateReportName = (year, month) => `${year}-${month}-sales-report.csv`;
const april = 3; // starting with January as 0 index
const twenty22 = 2022;

const { lastMonth, lastMonthYear } = getLastMonthAndYear();

const lastMonthParams = {
  Bucket: s3BucketName,
  Key: generateReportName(lastMonthYear, lastMonth),
};

const april2022ReportParams = {
  Bucket: s3BucketName,
  Key: generateReportName(twenty22, april),
};

let client;
beforeAll(async () => {
  await app.logIn(Realm.Credentials.apiKey(process.env.LOCAL_TEST_KEY));
  client = connectToMongoDbClient();
});

afterAll(async () => {
  await app.currentUser.logOut();
  await client
    .db("store")
    .collection("monthlyProductSales")
    .deleteMany({ month: april, year: twenty22 });
  await client.close();
  await s3Client.send(new DeleteObjectCommand(april2022ReportParams));
  await s3Client.send(new DeleteObjectCommand(lastMonthParams));
});

test("Generate monthly sales report, specifying month", async () => {
  const materializedSales = client
    .db("store")
    .collection("monthlyProductSales");

  const materializedSales1 = {
    year: twenty22,
    month: april,
    productId: "Ramen",
    totalSalesUsd: 15,
  };
  const materializedSales2 = {
    year: twenty22,
    month: april,
    productId: "Salmon skin hand roll",
    totalSalesUsd: 200,
  };
  const materializedSales3 = {
    year: twenty22,
    month: april,
    productId: "Ceviche",
    totalSalesUsd: 1000,
  };

  await materializedSales.insertMany([
    materializedSales1,
    materializedSales2,
    materializedSales3,
  ]);
  sleep(500);

  const response = await app.currentUser.functions.generateMonthlySalesReport(
    april,
    twenty22
  );
  const data = await s3Client.send(new GetObjectCommand(april2022ReportParams));
  const report = await streamToString(data.Body);
  expect(
    report.startsWith('"_id","year","month","productId","totalSalesUsd"')
  ).toBe(true);
  expect(response.$metadata.httpStatusCode).toBe(200);
});

test("Generate monthly sales report, last month (Function default)", async () => {
  const materializedSales = client
    .db("store")
    .collection("monthlyProductSales");

  // TODO: calculate and set to last month for month/year
  const materializedSales1 = {
    year: lastMonthYear,
    month: lastMonth,
    productId: "Ramen",
    totalSalesUsd: 15,
  };
  const materializedSales2 = {
    year: lastMonthYear,
    month: lastMonth,
    productId: "Salmon skin hand roll",
    totalSalesUsd: 200,
  };
  const materializedSales3 = {
    year: lastMonthYear,
    month: lastMonth,
    productId: "Ceviche",
    totalSalesUsd: 1000,
  };
  await materializedSales.insertMany([
    materializedSales1,
    materializedSales2,
    materializedSales3,
  ]);
  sleep(500);
  const response = await app.currentUser.functions.generateMonthlySalesReport();
  const data = await s3Client.send(new GetObjectCommand(lastMonthParams));
  const report = await streamToString(data.Body);
  expect(
    report.startsWith('"_id","year","month","productId","totalSalesUsd"')
  ).toBe(true);
  expect(response.$metadata.httpStatusCode).toBe(200);
});
