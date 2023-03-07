const { HMSSDK } = require("@100mslive/server-sdk");

const accessKey = process.env.HMS_ACCESS_KEY;
const secret = process.env.HMS_SECRET;

const sdk = new HMSSDK(accessKey, secret);
sdk.getManagementToken().then(console.log);