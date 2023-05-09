import * as HMS from "../src";
import { TEST_MEETING_URL, TEST_ROOM_ID } from "./testCommon";

let hms: HMS.SDK;

beforeEach(() => {
  hms = new HMS.SDK();
});

describe("recording service", () => {
  test("starts and stops a recording, then checks if it's present in list", async () => {
    const startedRecording = await hms.recordings.start(TEST_ROOM_ID, {
      meeting_url: TEST_MEETING_URL,
    });
    // wait for 30 secs
    await new Promise((resolve) => setTimeout(resolve, 30000));
    const stoppedRecording = await hms.recordings.stop(startedRecording.id);
    expect(stoppedRecording.session_id).toEqual(startedRecording.session_id);

    const allRecordings = hms.recordings.list();
    let flag = false;
    for await (const recording of allRecordings) {
      if (recording.id == startedRecording.id) {
        flag = true;
        break;
      }
    }
    expect(flag).toBeTruthy;
  }, 40000);
});
