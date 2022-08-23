## 100ms NodeJs Server Side SDK

## Note
## This is beta, APIs might change

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
await roomService.startHLS({roomId, meetingUrl, recording: {hlsVod: true, singleFilePerLayer: true}});
```

### Start HLS from meeting url

Pass in an url and get a m3u8 back which is obtained by converting that meeting URl to a HLS Stream.
This might take significant time.
Identifier is anything from your side to identify an HLS stream. Only one HLS can run against an identifier at a time.

There is also an optional field `scheduleAt` if you want to schedule the HLS to run at some time in future than start right away.

```js
const destinationService = sdk.getDestinationService();
// to start
const recording = { hlsVod: true, singleFilePerLayer: true }; // optional
const templateId = "1234" // optional
const hlsUrl = await destinationService.startHLSAndGetUrl({ identifier, appUrl, recording, templateId });

// scheduling a start for future
const scheduleAt = new Date(new Date().getTime() + (2*24*60*60*1000)); // after 2 days
// the hls url received will become functional once hls has started at scheduled time
const hlsUrl = await destinationService.startHLSAndGetUrl({ identifier, appUrl, scheduleAt });

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
