import APIService from "../services/APIService";
import { RecordingAsset } from "../types";
import { QueryObjectIterator } from "../utils/QueryObjectIterator";

/**
 * The wrapper class that implements all
 * {@link https://www.100ms.live/docs/server-side/v2/api-reference/recording-assets/overview Recording Asset API} calls.
 */
export default class RecordingAssetWrapper {
  private basePath = "/recording-assets";

  constructor(private apiService: APIService) {}

  /**
   * Get a list of recording asset objects that satisfy the `filter` params. A
   * `HMS.RecordingAsset.Object` iterable is returned that can be iterated with a `for await` loop.
   * @param filters Recording asset filters like room ID and status
   * @returns a `HMS.QueryObjectIterator<HMS.RecordingAsset.Object>` object
   */
  list(filters?: RecordingAsset.FilterParams): QueryObjectIterator<RecordingAsset.Object> {
    const queryObjectIterable = new QueryObjectIterator<RecordingAsset.Object>(
      (queryParams: Record<string, any>) => this.apiService.get(this.basePath, queryParams),
      filters ?? {}
    );
    return queryObjectIterable;
  }

  /**
   * Get the details of recording asset by asset id.
   * @param assetId Asset ID
   * @returns a `HMS.RecordingAsset.Object` object
   */
  retrieve(assetId: string): Promise<RecordingAsset.Object> {
    return this.apiService.get(`${this.basePath}/${assetId}`);
  }

  /**
   * Generate a short-lived pre-signed URL to access the recording asset.
   * @param assetId Asset ID
   * @param params Params to generate pre-signed URL
   * @returns a `HMS.RecordingAsset.PreSignedURL` object
   */
  generatePreSignedURL(
    assetId: string,
    presign_duration: number = 3600
  ): Promise<RecordingAsset.PreSignedURL> {
    return this.apiService.get(`${this.basePath}/${assetId}/presigned-url`, { presign_duration });
  }
}
