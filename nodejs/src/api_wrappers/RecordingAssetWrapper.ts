import { APIService } from "../services/APIService";
import { Object, RecordingAssetFilterParams, RecordingAssetPreSignedURLParams } from "../types";
import { QueryObjectIterator } from "../utils/QueryObjectIterator";

export default class RecordingAssetWrapper {
  private basePath = "/recording-assets";

  constructor(private apiService: APIService) {}

  list(filters?: RecordingAssetFilterParams): QueryObjectIterator<Object> {
    const queryResultsIterable = new QueryObjectIterator<Object>(
      (queryParams: Record<string, any>) => this.apiService.get(this.basePath, queryParams),
      filters ?? {}
    );
    return queryResultsIterable;
  }

  retrieve(assetId: string): Promise<Object> {
    return this.apiService.get(`${this.basePath}/${assetId}`);
  }

  generatePreSignedURL(assetId: string, params: RecordingAssetPreSignedURLParams): Promise<Object> {
    return this.apiService.get(`${this.basePath}/${assetId}/presigned-url`, params);
  }
}
