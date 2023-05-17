import HMS from "@100mslive/server-sdk";

// OR, in case that doesn't work:
// import * as HMS from "@100mslive/server-sdk";

const hms = new HMS.SDK("access_key", "app_secret");
hms.auth.getManagementToken().then(console.log);
