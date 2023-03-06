import { HMSSDK } from "../src";
import { HMSSession } from "../src/apis/interfaces/sessionInterfaces";
import { TEST_ROOM_NAME } from "./testCommon";

let sdk: HMSSDK;

beforeEach(() => {
  sdk = new HMSSDK();
});

describe("session service", () => {
  test("get session details work", async () => {
    const sessionService = sdk.getSessionService();
    const allSessionsIterable = sessionService.getAllSessionsIterable();
    const allSessions: HMSSession[] = [];
    while (true) {
      const severalSessions = await allSessionsIterable.next();
      if (severalSessions.length == 0) break;
      allSessions.push(...severalSessions);
    }
    const firstSession = await sessionService.getSessionById(allSessions.at(0)!.id);
    expect(firstSession.id).toBe(allSessions.at(0)!.id);
    expect(firstSession.room_id).toBe(allSessions.at(0)!.room_id);
  });
});
