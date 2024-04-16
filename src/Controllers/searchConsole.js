import { google } from "googleapis";
import { configDotenv } from "dotenv";
configDotenv();

// Initialize the Google API client
const auth = new google.auth.OAuth2({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET_KEY,
  redirectUri: process.env.GOOGLE_REDIRECT_URL,
});
const searchConsole = google.searchconsole({
  version: "v1",
  auth,
});
const searchData = async (siteUrl) => {
  try {
    const response = searchConsole.urlTestingTools.mobileFriendlyTest.run({
      requestBody: {
        urlPattern: siteUrl,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data from Search Console API:", error);
    throw error;
  }
};

export default { searchData };
