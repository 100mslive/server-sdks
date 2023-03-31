import { SDK } from "../src";
import { TEST_ROOM_NAME } from "./testCommon";

let sdk: SDK;

beforeEach(() => {
  sdk = new SDK();
});

describe("room service", () => {
  test("create and get room works", async () => {
    // gets the prev again if already exists else create
    const room = await sdk.rooms.create({ name: TEST_ROOM_NAME });
    const roomById = await sdk.rooms.retrieveById(room.id);
    const roomByName = await sdk.rooms.retrieveByName(room.name);
    const inactiveRooms = sdk.rooms.list({ enabled: false });
    console.log(room);
    for await (const inactiveRoom of inactiveRooms) {
      expect(room.id).not.toBe(inactiveRoom.id);
    }
    expect(room.id).toBe(roomById.id);
    expect(room.id).toBe(roomByName.id);
    expect(room.name).toBe(roomById.name);
    expect(room.name).toBe(roomByName.name);
  });
});
