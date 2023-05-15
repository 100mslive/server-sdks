import * as HMS from "../src";
import { TEST_ROOM_NAME } from "./testCommon";

let hms: HMS.SDK;

beforeEach(() => {
  hms = new HMS.SDK();
});

describe("room service", () => {
  test("create and get room works", async () => {
    // gets the prev again if already exists else create
    const room = await hms.rooms.create({ name: TEST_ROOM_NAME });
    const roomById = await hms.rooms.retrieveById(room.id);
    const roomByName = await hms.rooms.retrieveByName(room.name);
    const inactiveRooms = hms.rooms.list({ enabled: false });

    for await (const inactiveRoom of inactiveRooms) {
      expect(room.id).not.toBe(inactiveRoom.id);
    }
    expect(room.id).toBe(roomById.id);
    expect(room.id).toBe(roomByName.id);
    expect(room.name).toBe(roomById.name);
    expect(room.name).toBe(roomByName.name);
  });
});
