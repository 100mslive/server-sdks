import { HMSSDK } from "@100mslive/server-sdk";
import { HMSSession } from "@100mslive/server-sdk/dist/types/apis/interfaces/sessionInterfaces";

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
  const allSessionsIterable = await sessionService.getAllSessionsIterable();
  const allSessions: HMSSession[] = [];
  while (true) {
    const someSessions = await allSessionsIterable.next();
    if (someSessions.length == 0) break;
    allSessions.push(...someSessions);
  }
  console.log(allSessions);
}

roomOperationsExample();
activeRoomOperationsExample();
sessionOperationsExample();
