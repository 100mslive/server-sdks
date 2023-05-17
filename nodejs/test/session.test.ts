import * as HMS from "../src";

let hms: HMS.SDK;

beforeEach(() => {
  hms = new HMS.SDK();
});

describe("session service", () => {
  test("get session details work", async () => {
    const sessionsIterable = hms.sessions.list();
    let firstSessionFromList: HMS.Session.Object;
    for await (const session of sessionsIterable) {
      firstSessionFromList = session;
      break;
    }

    const sameSession = await hms.sessions.retrieveById(firstSessionFromList!.id);
    expect(firstSessionFromList!.id).toBe(sameSession.id);
    expect(firstSessionFromList!.room_id).toBe(sameSession.room_id);
  });
});
