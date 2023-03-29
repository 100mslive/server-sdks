import { HMSSDK } from "../src";
import { TEST_ROOM_ID } from "./testCommon";

let sdk: HMSSDK;

beforeEach(() => {
  sdk = new HMSSDK();
});

describe("active room service", () => {
  test.skip("gets active room details and send a message", async () => {
    const activeRoomService = sdk.getActiveRoomService();
    const activeRoom = await activeRoomService.getActiveRoomDetails(TEST_ROOM_ID);
    const peerDetails = await activeRoomService.getPeerDetails(
      TEST_ROOM_ID,
      activeRoom.session.peers[0]
    );
    await activeRoomService.sendMessage(TEST_ROOM_ID, { message: "hello room" });
    expect(activeRoom.session.peers[0]).toBe(peerDetails.id);
  });
});
