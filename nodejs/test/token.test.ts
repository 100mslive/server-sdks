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
});
