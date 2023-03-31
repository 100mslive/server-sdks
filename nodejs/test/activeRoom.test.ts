import { HMSSDK } from "../src";
import { TEST_ROOM_ID } from "./testCommon";

let sdk: HMSSDK;

beforeEach(() => {
  sdk = new HMSSDK();
});

describe("active room service", () => {
  test.skip("gets active room details and send a message", async () => {
    const activeRoom = await sdk.activeRoom.retrieve(TEST_ROOM_ID);
    const peerDetails = await sdk.activeRoom.retrievePeerDetails(
      TEST_ROOM_ID,
      activeRoom.session.peers[0]
    );
    await sdk.activeRoom.sendMessage(TEST_ROOM_ID, { message: "hello room" });
    expect(activeRoom.session.peers[0]).toBe(peerDetails.id);
  });
});
