import * as HMS from "../src";
import { TEST_ROOM_ID } from "./testCommon";

let hms: HMS.SDK;

beforeEach(() => {
  hms = new HMS.SDK();
});

describe("analytics service", () => {
  test("gets the track events and checks the room id", async () => {
    const trackEvents = hms.analytics.listTrackEvents({
      room_id: TEST_ROOM_ID,
      type: ["track.add.success", "track.remove.success"],
    });
    for await (const trackEvent of trackEvents) {
      expect(trackEvent.data.room_id).toBe(TEST_ROOM_ID);
      break;
    }
  });
  test.skip("gets the recording events and checks the room id", async () => {
    const recordingEvents = hms.analytics.listRecordingEvents({
      room_id: TEST_ROOM_ID,
      type: "beam.recording.success",
    });
    for await (const recordingEvent of recordingEvents) {
      expect(recordingEvent.data.room_id).toBe(TEST_ROOM_ID);
      break;
    }
  });
});
