import { configDotenv } from "dotenv";
configDotenv();
const sendpulse = require("sendpulse-api");

const apiKey = process.env.SENDPULSE_API_KEY;
const username = process.env.SENDPULSE_SMTP_USERNAME;

async function sendEmail(recipientEmail, subject, body) {
  sendpulse.init(apiKey);

  const email = {
    from: {
      email: username,
      name: "Grrow Company",
    },
    to: [
      {
        email: recipientEmail,
      },
    ],
    subject,
    html: body,
  };

  try {
    const response = await sendpulse.smtpSendEmail(email);
    console.log("Email sent successfully:", response.data);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = {
  sendEmail,
};
