const util = require("util");
const sendWhatsapp = async (options) => {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require("twilio")(accountSid, authToken);

    const createMessage = util.promisify(client.messages.create);

    const message = await createMessage({
      from: "whatsapp:+14155238886",
      body: options.message,
      to: `whatsapp:+91${options.number}`,
    });

    console.log(message.sid);
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
  }
};

module.exports = sendWhatsapp;
