import { HMSSDK } from "../src";
import { verify, Secret } from "jsonwebtoken";

let sdk: HMSSDK;
let secret: Secret = process.env.HMS_SECRET!;

beforeEach(() => {
  sdk = new HMSSDK();
});

describe("management token", () => {
  it("should give management token without any options passed in", async () => {
    const token = await sdk.getManagementToken({ validForSeconds: 30 * 24 * 3600 });
    console.log({ token });
    verify(token.token, secret);
  });

  it("should give same token if called again", async () => {
    const token1 = await sdk.getManagementToken();
    const token2 = await sdk.getManagementToken();
    const token3 = await sdk.getManagementToken({ forceNew: true });
    expect(token1).toBe(token2);
    expect(token1).not.toBe(token3);
  });
});

describe("auth token", () => {
  it("should give auth token", async () => {
    const withoutUserId = await sdk.getAuthToken({ roomId: "room123", role: "teacher" });
    console.log("without user id", withoutUserId);
    const withUserId = await sdk.getAuthToken({
      roomId: "room123",
      role: "teacher",
      userId: "user232",
    });
    console.log("with user id", withUserId);
  });
});
