# App Services Examples

This repository contains example use cases for [MongoDB Atlas App Services](https://www.mongodb.com/docs/atlas/app-services/).

## Triggers

This repository contains the following example [Atlas Triggers](https://www.mongodb.com/docs/atlas/app-services/triggers/overview/).

| Name                                                                                                                        | Trigger Type   | Description                                                                                                                                                                            |
| :-------------------------------------------------------------------------------------------------------------------------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`sendOrderConfirmationText`](#sendorderconfirmationtext)                                                                   | Database       | Sends an SMS message with the Twilio SMS API when a document is added to a collection.                                                                                                 |
| [`materializeMonthlyProductSales`](#materializemonthlyproductsales)                                                         | Database       | Update a materialized view document when a document is added to a collection.                                                                                                          |
| [`updateCustomUserDataOnLogin`](#updateCustomUserDataOnLogin)                                                               | Authentication | Upsert a [Custom User Data](https://www.mongodb.com/docs/atlas/app-services/users/enable-custom-user-data/) Object when a user signs into an account with App Services Authentication. |
| [`generatePreviousMonthSalesReport`](#generatepreviousmonthsalesreport)                                                     | Scheduled      | Post a CSV report of previous month's sales totals to an AWS S3 bucket.                                                                                                                |
| [`scaleDownClusterDuringNight` and `scaleUpClusterDuringDay`](#scaledownclusterduringnight-and-scaleupclusterduringday) and | Scheduled      | Scale an Atlas cluster up and down based on time of day.                                                                                                                               |

### sendOrderConfirmationText

Database Trigger that sends an SMS message with the Twilio SMS API
when a document is added to the `orders` collection.

Relevant files:

- [`triggers/sendOrderConfirmationText.json`](./triggers/sendOrderConfirmationText.json):
  Trigger configuration file
- [`functions/sendOrderConfirmationText.js`](./functions/sendOrderConfirmationText.js):
  Function invoked by Trigger
- [`functions/config.json`](./functions/config.json): Function configuration

### materializeMonthlyProductSales

Database Trigger that updates a materialized view document in the `monthlyProductSales`
when a document is added to the `sales` collection.

Relevant files:

- [`triggers/materializeMonthlyProductSales.json`](./triggers/materializeMonthlyProductSales.json):
  Trigger configuration file
- [`functions/materializeMonthlyProductSales.js`](./functions/materializeMonthlyProductSales.js):
  Function invoked by Trigger
- [`functions/config.json`](./functions/config.json): Function configuration

### updateCustomUserDataOnLogin

Authentication Trigger that upserts (create or update) a [Custom User Data](https://www.mongodb.com/docs/atlas/app-services/users/enable-custom-user-data/)
object when a user logs in with App Services Authentication.

Relevant files:

- [`triggers/materializeMonthlyProductSales.json`](./triggers/materializeMonthlyProductSales.json):
  Trigger configuration file
- [`functions/materializeMonthlyProductSales.js`](./functions/materializeMonthlyProductSales.js):
  Function invoked by Trigger
- [`functions/config.json`](./functions/config.json): Function configuration

### generatePreviousMonthSalesReport

Scheduled Trigger that posts a CSV report of previous month's sales totals
to an AWS S3 bucket. Runs at the beginning of each month to report on the previous month.

Relevant files:

- [`triggers/generatePreviousMonthSalesReport.json`](./triggers/generatePreviousMonthSalesReport.json):
  Trigger configuration file
- [`functions/generateMonthlySalesReport.js`](./functions/generateMonthlySalesReport.js):
  Function invoked by Trigger
- [`functions/config.json`](./functions/config.json): Function configuration

### scaleDownClusterDuringNight and scaleUpClusterDuringDay

Scheduled Triggers that scale up and down an Atlas cluster.
`scaleDownClusterDuringNight` reduces the cluster size every weekday night and
`scaleUpClusterDuringDay` increases the cluster size every weekday morning.

Relevant files:

- [`triggers/scaleDownClusterDuringNight.json`](./triggers/scaleDownClusterDuringNight.json):
  Trigger configuration file
- [`triggers/scaleUpClusterDuringDay.json`](./triggers/scaleUpClusterDuringDay.json):
  Trigger configuration file
- [`functions/getClusterScalingInfo.js`](./functions/getClusterScalingInfo.js):
  Helper Function that gets cluster scaling configuration information
- [`functions/scaleCluster.js`](./functions/scaleCluster.js):
  Helper Function that calls the Atlas Admin API to scale cluster
- [`functions/scaleDownCluster.js`](./functions/scaleDownCluster.js):
  Function called by Scheduled Trigger that handles scaling down of cluster
- [`functions/scaleUpCluster.js`](./functions/scaleUpCluster.js):
  Function called by Scheduled Trigger that handles scaling up of cluster
- [`functions/config.json`](./functions/config.json): Configuration for all
  relevant Functions

## Integration Tests

All the examples in this repository include integration tests to validate functionality
which you can find in the [`test/integration` directory](./test/integration/).
