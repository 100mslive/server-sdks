import * as HMS from "../src";

let hms: HMS.SDK;

beforeEach(() => {
  hms = new HMS.SDK();
});

describe("session service", () => {
  test("get session details work", async () => {
    const sessionsIterable = hms.sessions.list();
    const allSessions: HMS.Session.Object[] = [];
    for await (const session of sessionsIterable) {
      allSessions.push(session);
      if (!sessionsIterable.isNextCached) {
        console.log("the next loop is gonna take some time");
      }
    }
    const firstSession = await hms.sessions.retrieveById(allSessions.at(0)!.id);
    expect(firstSession.id).toBe(allSessions.at(0)!.id);
    expect(firstSession.room_id).toBe(allSessions.at(0)!.room_id);
  });
});
