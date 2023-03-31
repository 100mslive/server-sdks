import { HMSSDK } from "../src";
import { TEST_ROOM_NAME } from "./testCommon";

let sdk: HMSSDK;

beforeEach(() => {
  sdk = new HMSSDK();
});

describe("room service", () => {
  test("create and get room works", async () => {
    // gets the prev again if already exists else create
    const room = await sdk.room.create({ name: TEST_ROOM_NAME });
    const roomById = await sdk.room.retrieveById(room.id);
    const roomByName = await sdk.room.retrieveByName(room.name);
    const inactiveRooms = sdk.room.list({ enabled: false });
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
