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

### Creating and updating room

```js
const roomService = sdk.getRoomService();
// creating a room -
const room = await roomService.createRoom();
// with room options -
const roomWithOptions = await roomService.createRoom({
  name,
  description,
  template_id,
  recording_info,
  region,
});
// updating a room -
const updatedRoom = await roomService.updateRoom(room.id, { name });
console.log(room, roomWithOptions, updatedRoom);
```

### List Peers in an active room and send a message

```js
const activeRoomService = sdk.getActiveRoomService();
// list peers in active room -
const peers = await activeRoomService.getActivePeers(roomId);
console.log(peers);
// send broadcast message to all peers -
await activeRoomService.sendMessage(roomId, { message: "test" });
```

### Get all sessions and sessions in a room

```js
const sessionService = sdk.getSessionService();
// list all sessions -
const allSessionsIterable = await sessionService.getSessionsIterable();
for await (const session of allSessionsIterable) {
  console.log(session);
  if (!allSessionsIterable.isNextCached) {
    console.log("the next loop is gonna take some time");
  }
}
// list sessions associated with a specific room -
const sessionsByRoomIterable = await sessionService.getSessionsIterable({
  room_id: "test_room_id",
});
for await (const session of sessionsByRoomIterable) {
  console.log(session);
}
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
