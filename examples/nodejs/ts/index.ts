import { HMSSDK } from "@100mslive/server-sdk";

const accessKey = process.env.HMS_ACCESS_KEY;
const secret = process.env.HMS_SECRET;

const sdk = new HMSSDK(accessKey, secret);

// Get Auth Token
sdk
  .getAuthToken({
    roomId: "test_room_id",
    role: "host",
    userId: "test_user",
  })
  .then((tokenObj) => console.log(`Auth Token: ${tokenObj.token}`));

// Get Management Token
sdk
  .getManagementToken()
  .then((tokenObj) => console.log(`Management Token: ${tokenObj.token}`));

// Room Operations
async function roomOperationsExample() {
  // get the RoomService instance
  const roomService = sdk.getRoomService();

  // create a new room with config
  const testRoom = await roomService.createRoom({
    name: "test_room",
    description: "this is a test room created from the NodeJs SDK example",
  });

  // retrieve the room by the name
  const sameRoom = await roomService.getRoomByName("test_room");
  if (testRoom == sameRoom) {
    console.log("this is the room we just created");
  }
}

// Active Room Operations
async function activeRoomOperationsExample() {
  // get the ActiveRoomService instance
  const activeRoomService = sdk.getActiveRoomService();

  // get the peer object from an active room
  const activePeersRecord = await activeRoomService.getActivePeers(
    "test_room_id"
  );
  console.log(activePeersRecord);

  // send a message to a specific peer
  const lastPeerId = Object.keys(activePeersRecord).at(-1);
  await activeRoomService.sendMessage("test_room_id", {
    message: "hello last peer!",
    peerId: lastPeerId,
  });
}

// Session Operations
async function sessionOperationsExample() {
  // get the SessionService instance
  const sessionService = sdk.getSessionService();

  // get all sessions
  const allSessions = sessionService.getSessionsIterable({
    limit: 10,
  });
  for await (const session of allSessions) {
    console.log(session);
    if (!allSessions.isNextCached) {
      console.log("the next session will take some time to load");
      console.log("this happens once every `limit` times i.e 10 in this case");
    }
  }

  // get the active session in a room
  const activeSessionInRoom = sessionService.getSessionsIterable({
    room_id: "test_room_id",
    active: true,
  });
  let flag = false;
  for await (const session of activeSessionInRoom) {
    flag = true;
    console.log("A session is active in the room: ", session);
  }
  if (!flag) {
    console.log("No active session found!");
  }
}

roomOperationsExample();
activeRoomOperationsExample();
sessionOperationsExample();
