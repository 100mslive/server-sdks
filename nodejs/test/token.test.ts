import * as HMS from "../src";
import { verify, Secret } from "jsonwebtoken";

let hms: HMS.SDK;
let secret: Secret = process.env.HMS_SECRET!;

beforeEach(() => {
  hms = new HMS.SDK();
});

describe("management token", () => {
  it("should give management token without any options passed in", async () => {
    const token = await hms.auth.getManagementToken({ validForSeconds: 30 * 24 * 3600 });
    console.log({ token });
    verify(token.token, secret);
  });

  it("should give same token if called again", async () => {
    const token1 = await hms.auth.getManagementToken();
    const token2 = await hms.auth.getManagementToken();
    const token3 = await hms.auth.getManagementToken({ forceNew: true });
    expect(token1).toBe(token2);
    expect(token1).not.toBe(token3);
  });
});

describe("auth token", () => {
  it("should give auth token", async () => {
    const withoutUserId = await hms.auth.getAuthToken({ roomId: "room123", role: "teacher" });
    console.log("without user id", withoutUserId);
    const withUserId = await hms.auth.getAuthToken({
      roomId: "room123",
      role: "teacher",
      userId: "user232",
    });
    console.log("with user id", withUserId);
  });
});
