## 100ms NodeJs Server Side SDK

## Note

## This is beta, APIs might change

## Documentation

The `examples/nodejs` folder on root has some examples.

## Docs

### Env Variables to configure(optional)

- `HMS_ACCESS_KEY` => access key as present in dashboard's developer section
- `HMS_SECRET` => app secret as present in dashboard's developer section

### Create SDK Instance

```js
const sdk = new HMSSDK(accessKey, secret);
```

### Generating management token

```js
console.log(await sdk.getManagementToken());
// with token options -
console.log(await sdk.getManagementToken({ issuedAt, notValidBefore, validForSeconds }));
```

### Generating Auth token

```js
console.log(await sdk.getAuthToken({ roomId, role, userId }));
// with token options -
console.log(
  await sdk.getAuthToken({ roomId, role, userId, issuedAt, notValidBefore, validForSeconds })
);
```

### Creating and Updating Room

```js
const roomService = sdk.getRoomService();
const room = await roomService.createRoom();
// with room options -
const roomWithOptions = await roomService.createRoom({ name, description, recording_info, region });

const updatedRoom = await roomService.updateRoom(room.id, { name });
console.log(room, roomWithOptions, updatedRoom);
```

### List Peers in an Active Room and send a Message

```js
const activeRoomService = sdk.getActiveRoomService();
const peers = await activeRoomService.getActivePeers(roomId);
console.log(peers);

await activeRoomService.sendMessage(roomId, { message: "test" });
```

### Get all Sessions

```js
const sessionService = sdk.getSessionService();
const allSessionsIterable = await sessionService.getAllSessionsIterable();

const allSessions = [];
while (true) {
  const someSessions = await allSessionsIterable.next();
  if (someSessions.length == 0) break;
  allSessions.push(...someSessions);
}
console.log(allSessions);
```

### Errors

Errors will follow the below interface, code is HTTP Status Code.

```ts
interface HMSException {
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
