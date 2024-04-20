import sendpulse from "sendpulse-api";
import { configDotenv } from "dotenv";

configDotenv();

const API_USER_ID = process.env.SENDPULSE_SMTP_USERNAME;
const API_SECRET = process.env.SENDPULSE_API_KEY;
const TOKEN_STORAGE = "/tmp/";

sendpulse.init(API_USER_ID, API_SECRET, TOKEN_STORAGE, (token) => {
  if (token && token.is_error) {
    console.error("SendPulse error:", token.message);
  } else {
    console.log("SendPulse token:", token);
  }
});

function sendWelcomeEmail(email, name) {
  const welcomeEmail = {
    html: `<h1>Welcome to our Platform, ${name}!</h1>
            <p>Thank you for signing up. We're excited to have you on board.</p>
            `,
    text: `Welcome to our Platform, ${name}! Thank you for signing up.`,
    subject: "Welcome to Grrow",
    from: {
      name: "brajagopal",
      email: "brajagopalmukherjee21@gmail.com",
    },
    to: [
      {
        name: name,
        email: email,
      },
    ],
  };

  sendpulse.smtpSendMail((data) => {
    if (data && data.is_error) {
      console.error("SendPulse error sending email:", data.message);
    } else {
      console.log("Welcome email sent successfully:", data);
    }
  }, welcomeEmail);
}

export default sendWelcomeEmail;
