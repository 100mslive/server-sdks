import { HMSSDK } from "../src";

let sdk: HMSSDK;

beforeEach(() => {
  sdk = new HMSSDK();
});

describe("transport service", () => {
  test.skip("start hls for a url", async () => {
    const transportService = sdk.getTransportService();
    // gets the prev again if already exists else create
    await transportService.startHLSSync({
      identifier: "test-room",
      appUrl: "https://www.google.com/",
    });
  });
});
