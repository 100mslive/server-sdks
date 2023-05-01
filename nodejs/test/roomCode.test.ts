import * as HMS from "../src";
import { TEST_ROOM_ID } from "./testCommon";

let hms: HMS.SDK;

beforeEach(() => {
  hms = new HMS.SDK();
});

describe("room codes service", () => {
  test("creates room codes and then get them", async () => {
    const roomCodes = await hms.roomCodes.create(TEST_ROOM_ID);
    const roomCodesFromSameRoom = hms.roomCodes.list(roomCodes[0].room_id);

    for await (const roomCode of roomCodes) {
      expect(roomCodesFromSameRoom).toContainEqual(roomCode);
    }
  });
});
