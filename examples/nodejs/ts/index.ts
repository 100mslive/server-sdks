import HMS from "@100mslive/server-sdk";
// OR, in case that doesn't work:
// import * as HMS from "@100mslive/server-sdk";

const accessKey = process.env.HMS_ACCESS_KEY;
const secret = process.env.HMS_SECRET;
const TEST_MEETING_URL = "test_meeting_id";

async function exampleUsage() {
  const hms = new HMS.SDK(accessKey, secret);

  // create room -
  const roomCreateOptions: HMS.Room.CreateParams = {
    name: "new-room",
    description: "room description",
    region: "us",
  };
  const room = await hms.rooms.create(roomCreateOptions);

  // get auth token -
  const authToken = await hms.auth.getAuthToken({
    roomId: room.id,
    role: "host",
    userId: "test_user",
  });
  console.log(`Auth Token: ${authToken.token}`);

  // create room codes -
  const roomCodesForRoom = await hms.roomCodes.create(room.id);
  console.log(roomCodesForRoom);

  // send broadcast message to all peers -
  await hms.activeRooms.sendMessage(room.id, { message: "test" });

  // start room recording -
  const recording = await hms.recordings.start(room.id, {
    meeting_url: TEST_MEETING_URL,
  });

  // wait for 30 secs and stop the recording -
  await new Promise((resolve) => setTimeout(resolve, 30000));
  await hms.recordings.stop(recording.id);

  // list sessions associated with a specific room -
  const sessionFilters: HMS.Session.FilterParams = {
    room_id: room.id,
    limit: 10, // specifies the max no. of objects in one page
    // this means `iterable.isNextCached` will be `false` once every 10 times
  };
  let latestSession: HMS.Session.Object | undefined;
  const sessionsByRoom = hms.sessions.list(sessionFilters);
  for await (const session of sessionsByRoom) {
    // store the latest session
    if (latestSession == undefined) {
      latestSession = session;
    }
    console.log(session);
  }

  // get a recording assets by session
  const recordingAssets = hms.recordingAssets.list({
    session_id: latestSession?.id,
  });
  for await (const recordingAsset of recordingAssets) {
    console.log(recordingAsset);
  }
}

exampleUsage();
