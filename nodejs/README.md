<a href="https://100ms.live/">
  <img src="https://user-images.githubusercontent.com/93931528/205858417-8c0a0d1b-2d46-4710-9316-7418092fd3d6.svg" width="200" />
</a>

[![Documentation](https://img.shields.io/badge/Read-Documentation-blue)](https://www.100ms.live/docs/server-side/v2/introduction/basics)
[![Discord](https://img.shields.io/discord/843749923060711464?label=Join%20on%20Discord)](https://100ms.live/discord)
![MIT License](https://img.shields.io/badge/license-MIT-blue)
[![Register](https://img.shields.io/badge/Contact-Know%20More-blue)](https://dashboard.100ms.live/register)

# Node.js Server Side SDK

The 100ms Node.js SDK provides an easy-to-use wrapper around [100ms REST APIs](https://www.100ms.live/docs/server-side/v2/introduction/request-and-response) to be used on the server side.

🔧 **This is beta, APIs might change**

## Documentation

The `examples/nodejs` folder on root has some examples on how to use the SDK.

## Installation

Install the package with:

```
# via NPM:
npm install --save @100mslive/server-sdk

# via Yarn:
yarn add @100mslive/server-sdk
```

## Usage

Im

The SDK needs to be configured with the **Access Key** and **App Secret** from the [100ms Dashboard's Developer Section](https://dashboard.100ms.live/developer). This can be done in 2 ways:

1. Passing in the credentials when initializing the SDK.

```js
import HMS from "@100mslive/server-sdk";

const hms = new HMS.SDK(accessKey, secret);
```

**OR**

2. Configuring Environment variables with the credentials,

```
HMS_ACCESS_KEY=accessKey123 // access key
HMS_SECRET=secret456 // app secret
```

Then initializing the SDK like this:

```js
import HMS from "@100mslive/server-sdk";

const hms = new HMS.SDK();
```

### Generate Management token for server side APIs

```js
import HMS from "@100mslive/server-sdk";

const hms = new HMS.SDK();
console.log(await hms.auth.getManagementToken());
// with token options -
const tokenConfig = {
  issuedAt,
  notValidBefore,
  validForSeconds,
};
console.log(await hms.auth.getManagementToken(tokenConfig));
```

### Generating Auth token for client SDKs

```js
import HMS from "@100mslive/server-sdk";

const hms = new HMS.SDK();
const tokenConfig = { roomId, role, userId };
console.log(await hms.auth.getAuthToken());
// with additional token options -
const additionalTokenConfig = {
  roomId,
  role,
  userId,
  issuedAt,
  notValidBefore,
  validForSeconds,
};
console.log(await hms.auth.getAuthToken(additionalTokenConfig));
```

### Creating and updating room

```js
import HMS from "@100mslive/server-sdk";

const hms = new HMS.SDK();
// creating a room -
const room = await hms.rooms.create();
// with room params -
const roomCreateOptions = {
  name,
  description,
  template_id,
  recording_info,
  region,
};
const roomWithOptions = await hms.rooms.create(roomCreateOptions);

// updating a room -
const roomUpdateOptions = { name };
const updatedRoom = await hms.rooms.update(room.id, roomUpdateOptions);
console.log(room, roomWithOptions, updatedRoom);
```

### > Usage with TypeScript

The SDK supports `ts`, `esm` and `cjs` completely. Here's how you can import the types from the SDK and use them.

```ts
import HMS from "@100mslive/server-sdk";

const hms = new HMS.SDK();
// create a room with params -
let roomWithOptions: HMS.Room;
const roomCreateOptions: HMS.RoomCreateOptions = {
  name,
  description,
  template_id,
  recording_info,
  region,
};
roomWithOptions = await hms.rooms.create(roomCreateOptions);
```

### Create room codes for a room and then disable one of them

```js
import HMS from "@100mslive/server-sdk";

const hms = new HMS.SDK();
// create room codes -
const roomCodesForRoom = await hms.roomCodes.create(roomId);
console.log(roomCodesForRoom);

// disable a room code -
const disabledRoomCode = await hms.roomCodes.enableOrDisable(roomCodesForRoom[0].code, false);
console.log(disabledRoomCode);
```

### List Peers in an active room and send a message to the room

```js
import HMS from "@100mslive/server-sdk";

const hms = new HMS.SDK();
// list peers in active room -
const peers = await hms.activeRooms.retrieveActivePeers(roomId);
console.log(peers);

// send broadcast message to all peers -
await hms.activeRooms.sendMessage(roomId, { message: "test" });
```

### List all sessions and the sessions in a room

```js
import HMS from "@100mslive/server-sdk";

const hms = new HMS.SDK();
// list all sessions -
const allSessionsIterable = hms.sessions.list();
for await (const session of allSessionsIterable) {
  console.log(session);
  if (!allSessionsIterable.isNextCached) {
    console.log("the next loop is gonna take some time");
  }
}

// list sessions associated with a specific room -
const sessionFilters = {
  room_id: "test_room_id",
  limit: 10, // specifies the max no. of objects in one page
  // this means `iterable.isNextCached` will be `false` once every 10 times
};
const sessionsByRoomIterable = hms.sessions.list(sessionFilters);
for await (const session of sessionsByRoomIterable) {
  console.log(session);
}
```

## Currently Supported Endpoints

1. [Rooms APIs](https://www.100ms.live/docs/server-side/v2/api-reference/Rooms/object)
2. [Active Rooms APIs](https://www.100ms.live/docs/server-side/v2/api-reference/active-rooms/object)
3. [Room Codes APIs](https://www.100ms.live/docs/server-side/v2/api-reference/room-codes/room-code-object)
4. [Sessions](https://www.100ms.live/docs/server-side/v2/api-reference/Sessions/object)

Support for other endpoints are being added. If you want to consume them before it's available in the SDK, feel free to use the `api` property to make the API calls:

```js
import HMS from "@100mslive/server-sdk";

const hms = new HMS.SDK();
const hmsObject = await hms.api.get(path, params);
console.log(hmsObject);
```

### Errors

Errors will follow the below interface, code is HTTP Status Code.

```ts
interface SDKException {
  code?: number;
  name: string;
  message: string;
}
```

e.g.

```js
const hlsErr = {
  code: 404,
  name: "Not Found",
  message: "hls not running",
};
```
