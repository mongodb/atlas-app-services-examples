async function materializeMonthlyProductSales({ fullDocument }) {
  const { productId, timeOfSale, amountUsd } = fullDocument;
  const year = timeOfSale.getUTCFullYear();
  const month = timeOfSale.getUTCMonth();
  // Match document with same month, year, and productId
  const query = { year, month, productId };
  // Increment the monthly total sales uses the $inc operator
  const update = {
    $set: {
      year,
      month,
      productId,
    },
    $inc: {
      totalSalesUsd: amountUsd,
    },
  };
  // Create the document if it doesn't already exist
  const options = { upsert: true };

  // Access MongoDB collection
  const monthlyProductSales = context.services
    .get("mongodb-atlas")
    .db("store")
    .collection("monthlyProductSales");
  // Update data in MongoDB using updateOne
  await monthlyProductSales.updateOne(query, update, options);
}
exports = materializeMonthlyProductSales;
