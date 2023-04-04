import { SDK } from "../src";
import { TEST_ROOM_ID } from "./testCommon";

let hms: SDK;

beforeEach(() => {
  hms = new SDK();
});

describe("active room service", () => {
  test.skip("gets active room details and send a message", async () => {
    const activeRoom = await hms.activeRooms.retrieve(TEST_ROOM_ID);
    const peerDetails = await hms.activeRooms.retrievePeerDetails(
      TEST_ROOM_ID,
      activeRoom.session.peers[0]
    );
    await hms.activeRooms.sendMessage(TEST_ROOM_ID, { message: "hello room" });
    expect(activeRoom.session.peers[0]).toBe(peerDetails.id);
  });
});
