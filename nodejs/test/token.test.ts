import { HMSSDK } from "../src";
import { verify } from "jsonwebtoken";

let sdk: HMSSDK;
let accessKey = "access_key";
let secret = "secret123";

beforeEach(() => {
  sdk = new HMSSDK(accessKey, secret);
});

describe("management token", () => {
  it("should give management token without any options passed in", async () => {
    const token = await sdk.getManagementToken();
    console.log({ token });
    verify(token.token, secret);
  });

  it("should give same token if called again", async () => {
    const token1 = await sdk.getManagementToken();
    const token2 = await sdk.getManagementToken();
    expect(token1).toBe(token2);
  });
});

describe("app token", () => {
  it("should give app token", async () => {
    const withoutUserId = await sdk.getAppToken({ roomId: "room123", role: "teacher" });
    console.log("without user id", withoutUserId);
    const withUserId = await sdk.getAppToken({
      roomId: "room123",
      role: "teacher",
      userId: "user232",
    });
    console.log("with user id", withUserId);
  });
});
