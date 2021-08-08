import { google } from "googleapis";
import { getArgs, makeOAuth2Client } from "./shared";

async function makeCalendarClient() {
  const { clientId, clientSecret, refreshToken } = await getArgs();
  const oauth2Client = makeOAuth2Client({ clientId, clientSecret });
  oauth2Client.setCredentials({
    refresh_token: refreshToken
  });

  const calendarClient = google.calendar({
    version: "v3",
    auth: oauth2Client,
  });
  return calendarClient;
}


async function getCalendar() {
  const calendarClient = await makeCalendarClient();

  const { data: calendars, status } = await calendarClient.calendarList.list();

  if (status === 200) {
    console.log('calendars', calendars);
  } else {
    console.log('there was an issue...', status);
  }

}

getCalendar();
