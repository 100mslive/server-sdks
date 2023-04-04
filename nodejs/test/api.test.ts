import { SDK } from "../src";

let hms: SDK;

beforeEach(() => {
  hms = new SDK();
});

describe("api service", () => {
  test("get rooms endpoint is working", async () => {
    const rooms: { data: any[] } = await hms.api.get("/rooms");
    expect(rooms.data.length).toBeGreaterThan(0);
  });
});
