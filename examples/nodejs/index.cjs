const { HMSSDK } = require("@100mslive/server-sdk");

const sdk = new HMSSDK("access_key", "secret123");
sdk.getManagementToken().then(console.log);
