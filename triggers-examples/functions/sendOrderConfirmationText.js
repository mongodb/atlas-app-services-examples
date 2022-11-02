async function sendOrderConfirmationText({ fullDocument }) {
  const accountSid = context.environment.values["TWILIO_ACCOUNT_SID"];
  const authToken = context.values.get("TWILIO_AUTH_TOKEN");
  const fromNumber = context.environment.values["TWILIO_FROM_NUMBER"];

  const { confirmationNumber, _id, orderItemName } = fullDocument;

  const twilioClient = require("twilio")(accountSid, authToken);
  await twilioClient.messages.create({
    from: fromNumber,
    to: confirmationNumber,
    body: `Thank you for purchasing ${orderItemName}!\n\nYour order ID is: ${_id}`,
  });
}
exports = sendOrderConfirmationText;
