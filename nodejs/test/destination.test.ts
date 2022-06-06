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
      const destinationService = sdk.getDestinationService();
      // gets the prev again if already exists else create
      const hlsState = await destinationService.startHLSAndGetUrl({
        identifier: TEST_ROOM_NAME,
        appUrl: "https://www.google.com/",
      });
      expect(hlsState.running).toBe(true);
      const hlsState2 = await destinationService.getHlsState({ identifier: TEST_ROOM_NAME });
      expect(hlsState2.url).toBe(hlsState.url);
      await sdk.getDestinationService().stopHLS({ identifier: TEST_ROOM_NAME });
      let notFoundError;
      try {
        await destinationService.getHlsState({ identifier: TEST_ROOM_NAME });
      } catch (err: any) {
        console.log(err);
        notFoundError = err;
      }
      expect(notFoundError?.code).toBe(404);
    },
    120 * 1000
  );

  test.skip("stop hls", async () => {
    await sdk.getDestinationService().stopHLS({ identifier: TEST_ROOM_NAME });
  });
});
