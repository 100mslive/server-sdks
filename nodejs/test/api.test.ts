import * as HMS from "../src";

let hms: HMS.SDK;

beforeEach(() => {
  hms = new HMS.SDK();
});

describe("api service", () => {
  test("get rooms endpoint is working", async () => {
    const rooms: { data: any[] } = await hms.api.get("/rooms");
    expect(rooms.data.length).toBeGreaterThan(0);
  });
});
