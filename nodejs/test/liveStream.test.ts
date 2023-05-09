import * as HMS from "../src";
import { TEST_MEETING_URL, TEST_ROOM_ID } from "./testCommon";

let hms: HMS.SDK;

beforeEach(() => {
  hms = new HMS.SDK();
});

describe("live stream service", () => {
  test("starts and stops a live stream, then checks if it's present in list", async () => {
    const startedLiveStream = await hms.liveStreams.start(TEST_ROOM_ID, {
      meeting_url: TEST_MEETING_URL,
    });
    // wait for 1 minute
    await new Promise((resolve) => setTimeout(resolve, 60000));
    const stoppedLiveStream = await hms.liveStreams.stop(startedLiveStream.id);
    expect(stoppedLiveStream.session_id).toEqual(startedLiveStream.session_id);

    const allLiveStreams = hms.liveStreams.list();
    let flag = false;
    for await (const liveStream of allLiveStreams) {
      if (liveStream.id == startedLiveStream.id) {
        flag = true;
        break;
      }
    }
    expect(flag).toBeTruthy;
  }, 120000);
});
