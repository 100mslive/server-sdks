const { HMSSDK } = require("@100mslive/server-sdk");

const sdk = new HMSSDK("access_key", "app_secret");
sdk.auth.getManagementToken().then(console.log);
