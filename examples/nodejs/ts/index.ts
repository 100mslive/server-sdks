import HMS from "@100mslive/server-sdk";

const accessKey = process.env.HMS_ACCESS_KEY;
const secret = process.env.HMS_SECRET;

const hms = new HMS.SDK(accessKey, secret);

// Get Auth Token
hms.auth
  .getAuthToken({
    roomId: "test_room_id",
    role: "host",
    userId: "test_user",
  })
  .then((tokenObj) => console.log(`Auth Token: ${tokenObj.token}`));

// Get Management Token
hms.auth
  .getManagementToken()
  .then((tokenObj) => console.log(`Management Token: ${tokenObj.token}`));

// Rooms Example
async function roomsExample() {
  // creating a room -
  const room = await hms.rooms.create();
  // with room options -
  const roomCreateOptions: HMS.RoomCreateOptions = {
    name: "room-name",
    description: "room description",
    region: "us",
  };
  const roomWithOptions = await hms.rooms.create(roomCreateOptions);

  // updating a room -
  const roomUpdateOptions: HMS.RoomUpdateOptions = { name: "new-room-name" };
  const updatedRoom = await hms.rooms.update(room.id, roomUpdateOptions);
  console.log(room, roomWithOptions, updatedRoom);
}

// Room Codes Example
async function roomCodesExample() {
  // create room codes -
  const roomCodesForRoom = await hms.roomCodes.create("roomId");
  console.log(roomCodesForRoom);

  // disable a room code -
  const disabledRoomCode = await hms.roomCodes.enableOrDisable(
    roomCodesForRoom[0].code,
    false
  );
  console.log(disabledRoomCode);
}

// Active Rooms Example
async function activeRoomsExample() {
  // list peers in active room -
  const peers = await hms.activeRooms.retrieveActivePeers("roomId");
  console.log(peers);

  // send broadcast message to all peers -
  await hms.activeRooms.sendMessage("roomId", { message: "test" });
}

// Sessions Example
async function sessionsExample() {
  // list all sessions -
  const allSessionsIterable = hms.sessions.list();
  for await (const session of allSessionsIterable) {
    console.log(session);
    if (!allSessionsIterable.isNextCached) {
      console.log("the next loop is gonna take some time");
    }
  }

  // list sessions associated with a specific room -
  const sessionFilters = {
    room_id: "test_room_id",
    limit: 10, // specifies the max no. of objects in one page
    // this means `iterable.isNextCached` will be `false` once every 10 times
  };
  const sessionsByRoomIterable = hms.sessions.list(sessionFilters);
  for await (const session of sessionsByRoomIterable) {
    console.log(session);
  }

  // get the active session in a room
  const anotherSessionFilters = {
    room_id: "test_room_id",
    active: true,
  };
  const activeSessionInRoom = hms.sessions.list(anotherSessionFilters);
  let flag = false;
  for await (const session of activeSessionInRoom) {
    flag = true;
    console.log("A session is active in the room: ", session);
  }
  if (!flag) {
    console.log("No active session found!");
  }
}

roomsExample();
roomCodesExample();
activeRoomsExample();
sessionsExample();
