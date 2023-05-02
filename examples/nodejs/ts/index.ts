import HMS from "@100mslive/server-sdk";

// OR, in case that doesn't work:
// import * as HMS from "@100mslive/server-sdk";

const accessKey = process.env.HMS_ACCESS_KEY;
const secret = process.env.HMS_SECRET;

const hms = new HMS.SDK(accessKey, secret);

// Get Auth Token
hms.auth
  .getAuthToken({
    roomId: "test_room_id",
    role: "host",
    userId: "test_user",
  })
  .then((tokenObj) => console.log(`Auth Token: ${tokenObj.token}`));

// Get Management Token
hms.auth
  .getManagementToken()
  .then((tokenObj) => console.log(`Management Token: ${tokenObj.token}`));

class APIExamples {
  // Active Rooms Example
  static async activeRooms() {
    // list peers in active room -
    const peers = await hms.activeRooms.retrieveActivePeers("roomId");
    console.log(peers);

    // send broadcast message to all peers -
    await hms.activeRooms.sendMessage("roomId", { message: "test" });
  }

  static async analytics() {
    // list track events by room id and type
    const trackEventFilters: HMS.Analytics.TrackEvent.FilterParams = {
      room_id: "roomId",
      type: ["track.add.success", "track.remove.success"],
    };
    const trackEventsIterable =
      hms.analytics.listTrackEvents(trackEventFilters);
    for await (const trackEvent of trackEventsIterable) {
      console.log(trackEvent);
    }

    // list recording events by room id and type
    const recordingEventFilters: HMS.Analytics.RecordingEvent.FilterParams = {
      room_id: "roomId",
      type: "beam.recording.success",
    };
    const recordingEventsIterable = hms.analytics.listRecordingEvents(
      recordingEventFilters
    );
    for await (const recordingEvent of recordingEventsIterable) {
      console.log(recordingEvent);
    }
  }

  static async externalStreams() {
    // start a new external stream
    const externalStreamStartParams: HMS.ExternalStream.StartParams = {
      meeting_url: "meetingURL",
      rtmp_urls: ["rtmpURL1", "rtmpURL2"],
    };
    const newExternalStream = await hms.externalStreams.start(
      "roomId",
      externalStreamStartParams
    );

    // stop an external stream by id
    const stoppedExternalStream = await hms.externalStreams.stop(
      newExternalStream.id
    );
    console.log(newExternalStream, stoppedExternalStream);
  }

  static async liveStreams() {
    // get a live stream object by its stream id
    const liveStream = await hms.liveStreams.retrieve("streamID");

    // send timed metadata to that live stream
    const timedMetadataParams: HMS.LiveStream.TimedMetadataParams = {
      payload: "Hello, this is the message",
      duration: 5000,
    };
    const sameLiveStream = await hms.liveStreams.sendTimedMetadata(
      liveStream.id,
      timedMetadataParams
    );

    console.log(liveStream, sameLiveStream);
  }

  static async recordingAssets() {
    // get a recording asset by id
    const recordingAsset = await hms.recordingAssets.retrieve("assetId");

    // generate a pre-signed URL to access that
    const preSignedURL = await hms.recordingAssets.generatePreSignedURL(
      recordingAsset.id
    );
    console.log("URL: " + preSignedURL.url);
    console.log("Path: " + preSignedURL.path);
  }

  static async recordings() {
    // check a recording's room id and stop it
    const recording = await hms.recordings.retrieve("objectID");
    if (recording.room_id == "roomID") {
      hms.recordings.stop(recording.id);
    } else {
      // stop all recordings in that room
      const stoppedRecordings = await hms.recordings.stopAll("roomID");
      console.log(stoppedRecordings);
    }
  }

  // Room Codes Example
  static async roomCodes() {
    // create room codes -
    const roomCodesForRoom = await hms.roomCodes.create("roomId");
    console.log(roomCodesForRoom);

    // disable a room code -
    const disabledRoomCode = await hms.roomCodes.enableOrDisable(
      roomCodesForRoom[0].code,
      false
    );
    console.log(disabledRoomCode);
  }

  // Rooms Example
  static async rooms() {
    // creating a room -
    const room = await hms.rooms.create();
    // with room options -
    const roomCreateOptions: HMS.Room.CreateParams = {
      name: "room-name",
      description: "room description",
      region: "us",
    };
    const roomWithOptions = await hms.rooms.create(roomCreateOptions);

    // updating a room -
    const roomUpdateOptions: HMS.Room.UpdateParams = { name: "new-room-name" };
    const updatedRoom = await hms.rooms.update(room.id, roomUpdateOptions);
    console.log(room, roomWithOptions, updatedRoom);
  }

  // Sessions Example
  static async sessions() {
    // list sessions associated with a specific room -
    const sessionFilters: HMS.Session.FilterParams = {
      active: true,
      limit: 10, // specifies the max no. of objects in one page
      // this means `iterable.isNextCached` will be `false` once every 10 times
    };
    const sessionsByRoomIterable = hms.sessions.list(sessionFilters);
    for await (const session of sessionsByRoomIterable) {
      console.log(session);
    }

    // get the active session in a room
    try {
      const activeSessionInRoom = hms.sessions.retrieveActiveByRoom("roomId");
      console.log(activeSessionInRoom);
    } catch (error) {
      console.log("No active session found in the room!");
    }
  }
}

APIExamples.activeRooms();
APIExamples.analytics();
APIExamples.externalStreams();
APIExamples.liveStreams();
APIExamples.recordingAssets();
APIExamples.recordings();
APIExamples.roomCodes();
APIExamples.rooms();
APIExamples.sessions();
