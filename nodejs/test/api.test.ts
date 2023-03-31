import { HMSSDK } from "../src";

let sdk: HMSSDK;

beforeEach(() => {
  sdk = new HMSSDK();
});

describe("api service", () => {
  test("get rooms endpoint is working", async () => {
    const rooms: { data: any[] } = await sdk.api.get("/rooms");
    expect(rooms.data.length).toBeGreaterThan(0);
  });
});
