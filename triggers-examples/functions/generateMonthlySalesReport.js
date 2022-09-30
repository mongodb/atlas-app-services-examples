function generateCsvReport(documents) {
  const { parse } = require("json2csv");
  const fields = Object.keys(documents[0]);
  // Note: You must explicitly set the end of line delimiter `eol` to use
  // the json2csv module with the Atlas Functions JavaScript runtime.
  const opts = { fields, eol: "\n" };
  const csvString = parse(documents, opts);
  return csvString;
}

async function putReportInS3(reportName, reportBody) {
  const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
  const accessKeyId = context.environment.values["AWS_S3_ACCESS_KEY_ID"];
  const secretAccessKey = context.values.get("AWS_S3_ACCESS_KEY_SECRET");
  const s3Bucket = context.environment.values["AWS_S3_BUCKET_NAME"];
  const region = context.environment.values["AWS_S3_BUCKET_REGION"];

  console.log("report body::\n\n" + reportBody);

  // Add CSV report to S3 bucket
  const s3 = new S3Client({
    credentials: { accessKeyId, secretAccessKey },
    region,
  });
  const commandInput = {
    Bucket: s3Bucket,
    Key: reportName,
    Body: reportBody,
    ContentType: "text/csv",
  };
  const command = new PutObjectCommand(commandInput);
  const s3Response = await s3.send(command);

  return s3Response;
}

async function generateMonthlySalesReport(monthZeroEleven, year) {
  let monthToReport, yearToReport;

  // For when arguments not provided to the Function,
  // such as when used in the `generatePreviousMonthSalesReport` Scheduled Trigger,
  // the Function generates the report for the previous month.
  if (!monthZeroEleven || !year) {
    const now = new Date();
    const thisMonth = now.getUTCMonth();
    const thisYear = now.getUTCFullYear();
    const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
    const lastMonthYear = now.getUTCMonth() === 0 ? thisYear - 1 : thisYear;
    monthToReport = lastMonth;
    yearToReport = lastMonthYear;
  } else {
    monthToReport = monthZeroEleven;
    yearToReport = year;
  }

  const monthlySalesMaterializations = context.services
    .get("mongodb-atlas")
    .db("store")
    .collection("monthlyProductSales");

  const lastMonthsMaterializedSales = await monthlySalesMaterializations
    .find({ month: monthToReport, year: yearToReport })
    .toArray();

  const csvReport = generateCsvReport(lastMonthsMaterializedSales);
  const reportName = `${yearToReport}-${monthToReport}-sales-report.csv`;
  const s3Response = await putReportInS3(reportName, csvReport);
  return s3Response;
}

exports = generateMonthlySalesReport;
