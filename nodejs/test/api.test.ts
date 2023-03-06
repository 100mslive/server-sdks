import { HMSSDK } from "../src";

let sdk: HMSSDK;

beforeEach(() => {
  sdk = new HMSSDK();
});

describe("api service", () => {
  test("get rooms endpoint is working", async () => {
    const apiService = sdk.getAPIService();
    const rooms: { data: any[] } = await apiService.get("/rooms");
    expect(rooms.data.length).toBeGreaterThan(0);
  });
});
