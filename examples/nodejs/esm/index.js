import { HMSSDK } from "@100mslive/server-sdk";

// initialise sdk
const sdk = new HMSSDK();
const transport = sdk.getTransportService();

// start hls and get m3u8 url back
const hlsIdentifier = "referenceId"; // use this to call stop
const appUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
try {
  const { url: urlWithStart } = await transport.startHLSAndGetUrl({
    identifier: hlsIdentifier,
    appUrl,
  });
  console.log(
    `started hls for appUrl - ${appUrl} at hls url - ${urlWithStart}`
  );

  const { url: urlLater } = await transport.getHlsState({
    identifier: hlsIdentifier,
  });
  console.log("hls url retrieved later", urlLater);
} catch (err) {
  console.error("failed to start hls and get url ", err);
}

await transport.stopHLS({ identifier: hlsIdentifier });
