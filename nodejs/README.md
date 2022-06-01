## 100ms NodeJs Server Side SDK

## Note
## This is early alpha, APIs can break/change at any time.

## Documentation

The `examples/nodejs` folder on root has some examples.


## Docs

### Env Variables to configure
- `HMS_ACCES_KEY` => access key as present in dashboard's developer section
- `HMS_SECRET` => app secret as present in dashboard's developer section

### Create SDK Instance

```js
const sdk = new HMSSDK();
```

### Generating management token

```js
console.log(await sdk.getManagementToken());
```

### Generating app token

```js
console.log(await sdk.getAppToken({roomId, role, userId}));
```

### Creating and Updating room

You can pass in an existing room name to get the room object for previously created room.

```js
const roomService = sdk.getRoomService();
const room = await roomService.createRoom({name, description, templateId, region});
console.log(room);
```

### Start HLS For a 100ms Room from meeting URL

The HLS m3u8 url will be received in webhook response.

```js
const roomService = sdk.getRoomService();
await roomService.startHLS({roomId, meetingUrl, recording: {hlsVod, singleFilePerLayer}});
```

### Start HLS from meeting url

Pass in an url and get a m3u8 back which is obtained by converting that meeting URl to a HLS Stream.
This might take significant time.
Identifier is anything from your side to identify an HLS stream. Only one HLS can run against an identifier at a time.

```js
const transportService = new HMSSDK().getTransportService();
// to start
const hlsUrl = await transportService.startHLSSync({identifier, meetingUrl});
// to stop
await transportService.stopHLS({identifier});
```
