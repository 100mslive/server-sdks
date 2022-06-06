## 100ms NodeJs Server Side SDK

## Note
## This is early alpha, APIs can break/change at any time.

## Documentation

The `examples/nodejs` folder on root has some examples.


## Docs

### Env Variables to configure(optional)
- `HMS_ACCES_KEY` => access key as present in dashboard's developer section
- `HMS_SECRET` => app secret as present in dashboard's developer section

### Create SDK Instance

```js
const sdk = new HMSSDK(accessKey, secret);
```

### Generating management token

```js
console.log(await sdk.getManagementToken());
// with token options -
console.log(await sdk.getManagementToken({issuedAt, notValidBefore, validForSeconds}));
```

### Generating app token

```js
console.log(await sdk.getAppToken({roomId, role, userId}));
// with token options -
console.log(await sdk.getAppToken({roomId, role, userId, issuedAt, notValidBefore, validForSeconds}));
```

### Creating and Updating room

You can pass in an existing room name to get the room object for previously created room.

```js
const roomService = sdk.getRoomService();
const room = await roomService.createRoom();
// with room options -
const roomWithOptions = await roomService.createRoom({name, description, templateId, region});
console.log(room, roomWithOptions);
```

### Start HLS For a 100ms Room from meeting URL

The HLS m3u8 url will be received in webhook response.

```js
const roomService = sdk.getRoomService();
await roomService.startHLS({roomId, meetingUrl})
// with recording -
await roomService.startHLS({roomId, meetingUrl, recording: {hlsVod, singleFilePerLayer}});
```

### Start HLS from meeting url

Pass in an url and get a m3u8 back which is obtained by converting that meeting URl to a HLS Stream.
This might take significant time.
Identifier is anything from your side to identify an HLS stream. Only one HLS can run against an identifier at a time.

```js
const destinationService = sdk.getDestinationService();
// to start
const hlsUrl = await destinationService.startHLSAndGetUrl({ identifier, appUrl });
// to stop
await destinationService.stopHLS({ identifier });
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
  message: "hls not running"
}
```
