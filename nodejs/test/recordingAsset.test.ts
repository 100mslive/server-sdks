import * as HMS from "../src";

let hms: HMS.SDK;

beforeEach(() => {
  hms = new HMS.SDK();
});

describe("recording asset service", () => {
  test("lists recording assets and generates a presigned URL for the first, the checks the asset id", async () => {
    const recordingAssets = hms.recordingAssets.list();
    let oneRecordingAsset: HMS.RecordingAsset.Object;
    for await (const recordingAsset of recordingAssets) {
      oneRecordingAsset = recordingAsset;
      break;
    }

    const preSignedURL = await hms.recordingAssets.generatePreSignedURL(oneRecordingAsset!.id);
    expect(preSignedURL.id).toBe(oneRecordingAsset!.id);
  });
});
