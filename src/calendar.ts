import { google } from "googleapis";
import { getArgs, makeOAuth2Client } from "./shared";

async function makeCalendarClient() {
  const { clientId, clientSecret, refreshToken } = await getArgs();
  const oauth2Client = makeOAuth2Client({ clientId, clientSecret });
  oauth2Client.credentials.refresh_token = refreshToken;

  const calendarClient = google.calendar({
    version: "v3",
    auth: oauth2Client,
  });
  return calendarClient;
}

// getToken();
