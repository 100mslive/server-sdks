import { SDK } from "../src";
import { TEST_ROOM_ID } from "./testCommon";

let hms: SDK;

beforeEach(() => {
  hms = new SDK();
});

describe("room codes service", () => {
  test.skip("creates room codes and then get them", async () => {
    const roomCodes = await hms.roomCodes.create(TEST_ROOM_ID);
    const roomCodesFromSameRoom = hms.roomCodes.list(roomCodes[0].room_id);

    let index = 0;
    for await (const roomCode of roomCodesFromSameRoom) {
      expect(roomCodes).toContainEqual(roomCode);
      index++;
    }
  });
});
