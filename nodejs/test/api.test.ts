import { SDK } from "../src";

let sdk: SDK;

beforeEach(() => {
  sdk = new SDK();
});

describe("api service", () => {
  test("get rooms endpoint is working", async () => {
    const rooms: { data: any[] } = await sdk.api.get("/rooms");
    expect(rooms.data.length).toBeGreaterThan(0);
  });
});
