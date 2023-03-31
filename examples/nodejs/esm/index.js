import { HMSSDK } from "@100mslive/server-sdk";

const sdk = new HMSSDK("access_key", "app_secret");
sdk.getManagementToken().then(console.log);
