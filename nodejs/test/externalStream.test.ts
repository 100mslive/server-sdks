import * as HMS from "../src";
import { TEST_MEETING_URL, TEST_ROOM_ID } from "./testCommon";

let hms: HMS.SDK;

beforeEach(() => {
  hms = new HMS.SDK();
});

describe("external stream service", () => {
  test("starts and stops an external stream, then checks if it's present in list", async () => {
    const startedExternalStream = await hms.externalStreams.start(TEST_ROOM_ID, {
      meeting_url: TEST_MEETING_URL,
      rtmp_urls: [],
    });
    const stoppedExternalStream = await hms.externalStreams.stop(startedExternalStream.id);
    expect(stoppedExternalStream).toEqual(startedExternalStream);

    const allExternalStreams = hms.externalStreams.list();
    let flag = false;
    for await (const externalStream of allExternalStreams) {
      if (externalStream.id == startedExternalStream.id) {
        flag = true;
        break;
      }
    }
    expect(flag).toBeTruthy;
  });
});
