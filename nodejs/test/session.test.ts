import { SDK, Session } from "../src";

let sdk: SDK;

beforeEach(() => {
  sdk = new SDK();
});

describe("session service", () => {
  test("get session details work", async () => {
    const sessionsIterable = sdk.sessions.list();
    const allSessions: Session[] = [];
    for await (const session of sessionsIterable) {
      allSessions.push(session);
      if (!sessionsIterable.isNextCached) {
        console.log("the next loop is gonna take some time");
      }
    }
    const firstSession = await sdk.sessions.retrieveById(allSessions.at(0)!.id);
    expect(firstSession.id).toBe(allSessions.at(0)!.id);
    expect(firstSession.room_id).toBe(allSessions.at(0)!.room_id);
  });
});
