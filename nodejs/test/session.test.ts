import { HMSSDK, HMS } from "../src";

let sdk: HMSSDK;

beforeEach(() => {
  sdk = new HMSSDK();
});

describe("session service", () => {
  test("get session details work", async () => {
    const sessionsIterable = sdk.session.list();
    const allSessions: HMS.Session[] = [];
    for await (const session of sessionsIterable) {
      allSessions.push(session);
      if (!sessionsIterable.isNextCached) {
        console.log("the next loop is gonna take some time");
      }
    }
    const firstSession = await sdk.session.retrieveById(allSessions.at(0)!.id);
    expect(firstSession.id).toBe(allSessions.at(0)!.id);
    expect(firstSession.room_id).toBe(allSessions.at(0)!.room_id);
  });
});
