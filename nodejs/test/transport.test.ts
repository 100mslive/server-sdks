import { HMSSDK } from "../src";
import { TEST_ROOM_NAME } from "./testCommon";

let sdk: HMSSDK;

beforeEach(() => {
  sdk = new HMSSDK();
});

describe("test hls start stop", () => {
  test(
    "start hls for a url",
    async () => {
      const transportService = sdk.getTransportService();
      // gets the prev again if already exists else create
      const hlsState = await transportService.startHLSAndGetUrl({
        identifier: TEST_ROOM_NAME,
        appUrl: "https://www.google.com/",
      });
      expect(hlsState.running).toBe(true);
      await sdk.getTransportService().stopHLS({ identifier: TEST_ROOM_NAME });
    },
    120 * 1000
  );

  test.skip("stop hls", async () => {
    await sdk.getTransportService().stopHLS({ identifier: TEST_ROOM_NAME });
  });
});
