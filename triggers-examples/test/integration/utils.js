const { MongoClient } = require("mongodb");
const Realm = require("realm");
require("dotenv").config();

function getRealmApp() {
  const app = new Realm.App(process.env.APP_ID);
  return app;
}

function connectToMongoDbClient() {
  const { DB_USER, DB_PASSWORD } = process.env;
  const mongoDbConnectionUri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.bcup9.mongodb.net/?retryWrites=true&w=majority`;

  const client = new MongoClient(mongoDbConnectionUri);
  return client;
}

function initS3Client() {
  const { S3Client } = require("@aws-sdk/client-s3");
  const s3 = new S3Client({
    credentials: {
      accessKeyId: "AKIAZ6OLG2JWZRUEWQHR",
      secretAccessKey: process.env.APP_SECRET_S3_SECRET_KEY,
    },
    region: "us-east-1",
  });
  return s3;
}

const streamToString = (stream) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });

function getLastMonthAndYear() {
  const now = new Date();
  const thisMonth = now.getUTCMonth();
  const thisYear = now.getUTCFullYear();
  const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
  const lastMonthYear = now.getUTCMonth() === 0 ? thisYear - 1 : thisYear;
  return { lastMonth, lastMonthYear };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = {
  getRealmApp,
  connectToMongoDbClient,
  initS3Client,
  streamToString,
  getLastMonthAndYear,
  sleep,
};
