import { HMSSDK } from "../src";

let sdk: HMSSDK;

beforeEach(() => {
  sdk = new HMSSDK();
});

describe.skip("transport service", () => {
  test("start hls for a url", async () => {
    const transportService = sdk.getTransportService();
    // gets the prev again if already exists else create
    await transportService.startHLSSync({
      identifier: "test-room",
      appUrl: "https://www.google.com/",
    });
  });

  test("stop hls", async () => {
    await sdk.getTransportService().stopHLS({ identifier: "test-room" });
  });
});
