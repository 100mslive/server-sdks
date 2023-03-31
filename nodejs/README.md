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
npm install @100mslive/server-sdk --save
# or
yarn add @100mslive/server-sdk
```

## Usage

The SDK needs to be configured with the **Access Key** and **App Secret** from the [100ms Dashboard's Developer Section](https://dashboard.100ms.live/developer). This can be done in 2 ways:
1. Passing in the credentials when initializing the SDK.
```js
import { HMSSDK } from "@100mslive/server-sdk";

const sdk = new HMSSDK(accessKey, secret);
```

**OR**

2. Configuring Environment variables with the credentials,
```
HMS_ACCESS_KEY=accessKey123 // access key
HMS_SECRET=secret456 // app secret
```
Then initializing the SDK like this:
```js
import { HMSSDK } from "@100mslive/server-sdk";

const sdk = new HMSSDK();
```

### Generate Management token for server side APIs

```js
import { HMSSDK } from "@100mslive/server-sdk";

const sdk = new HMSSDK();
console.log(await sdk.auth.getManagementToken());
// with token options -
const tokenConfig = {
  issuedAt,
  notValidBefore,
  validForSeconds,
};
console.log(await sdk.auth.getManagementToken(tokenConfig));
```

### Generating Auth token for client SDKs

```js
import { HMSSDK } from "@100mslive/server-sdk";

const sdk = new HMSSDK();
const tokenConfig = { roomId, role, userId };
console.log(await sdk.auth.getAuthToken());
// with additional token options -
const additionalTokenConfig = {
  roomId,
  role,
  userId,
  issuedAt,
  notValidBefore,
  validForSeconds,
};
console.log(await sdk.auth.getAuthToken(additionalTokenConfig));
```

### Creating and updating room

```js
import { HMSSDK } from "@100mslive/server-sdk";

const sdk = new HMSSDK();
// creating a room -
const room = await sdk.rooms.create();
// with room options -
const roomCreateOptions = {
  name,
  description,
  template_id,
  recording_info,
  region,
};
const roomWithOptions = await sdk.rooms.create(roomOptions);

// updating a room -
const roomUpdateOptions = { name };
const updatedRoom = await sdk.rooms.update(room.id, roomUpdateOptions);
console.log(room, roomWithOptions, updatedRoom);
```

### > Usage with TypeScript
The SDK supports `ts`, `esm` and `cjs` completely. Here's how you can import the types from the SDK and use them.
```ts
import { HMSSDK, HMS } from "@100mslive/server-sdk";

const sdk = new HMSSDK();
// create a room with options -
let roomWithOptions: HMS.Room;
const roomCreateOptions: HMS.RoomCreateOptions = {
  name,
  description,
  template_id,
  recording_info,
  region,
};
roomWithOptions = await sdk.rooms.create(roomOptions);
```

### List Peers in an active room and send a message to the room

```js
import { HMSSDK } from "@100mslive/server-sdk";

const sdk = new HMSSDK();
// list peers in active room -
const peers = await sdk.activeRooms.retrieveActivePeers(roomId);
console.log(peers);

// send broadcast message to all peers -
await sdk.activeRooms.sendMessage(roomId, { message: "test" });
```

### List all sessions and the sessions in a room

```js
import { HMSSDK } from "@100mslive/server-sdk";

const sdk = new HMSSDK();
// list all sessions -
const allSessionsIterable = sdk.sessions.list();
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
const sessionsByRoomIterable = sdk.sessions.list(sessionFilters);
for await (const session of sessionsByRoomIterable) {
  console.log(session);
}
```

### Create room codes for a room and then disable one of them
```js
import { HMSSDK } from "@100mslive/server-sdk";

const sdk = new HMSSDK();
// create room codes -
const roomCodesForRoom = await sdk.roomCodes.create(roomId);
console.log(roomCodesForRoom);

// disable a room code -
const disabledRoomCode = await sdk.roomCodes.enableOrDisable(
  roomCodesForRoom[0].code,
  false
);
console.log(disabledRoomCode);
```
## Currently Supported Endpoints
1. [Rooms APIs](https://www.100ms.live/docs/server-side/v2/api-reference/Rooms/object)
2. [Active Rooms APIs](https://www.100ms.live/docs/server-side/v2/api-reference/active-rooms/object)
3. [Room Codes APIs](https://www.100ms.live/docs/server-side/v2/api-reference/room-codes/room-code-object)
4. [Sessions](https://www.100ms.live/docs/server-side/v2/api-reference/Sessions/object)

Support for other endpoints are being added. If you want to consume them before it's available in the SDK, feel free to use the `api` property to make the API calls:
```js
import { HMSSDK } from "@100mslive/server-sdk";

const sdk = new HMSSDK();
const hmsObject = await sdk.api.get(path, params);
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
