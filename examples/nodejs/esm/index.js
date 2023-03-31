import HMS from "@100mslive/server-sdk";

const sdk = new HMS.SDK("access_key", "app_secret");
sdk.auth.getManagementToken().then(console.log);
