import { google } from "googleapis";

// Initialize the Google API client
const auth = new google.auth.OAuth2({
  clientId: "YOUR_CLIENT_ID",
  clientSecret: "YOUR_CLIENT_SECRET",
  redirectUri: "YOUR_REDIRECT_URI",
});
const searchConsole = google.searchconsole({
  version: "v1",
  auth,
});
async function searchData(siteUrl) {
  try {
    const response = await searchConsole.urlTestingTools.mobileFriendlyTest.run(
      {
        requestBody: {
          urlPattern: siteUrl,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data from Search Console API:", error);
    throw error;
  }
}

export default { searchData };
