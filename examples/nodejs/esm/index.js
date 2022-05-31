import { HMSSDK } from "@100mslive/server-sdk";

const sdk = new HMSSDK("access_key", "secret123");
console.log(await sdk.getManagementToken());
