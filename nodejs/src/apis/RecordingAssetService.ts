import { APIService } from "../services/APIService";
import {
  RecordingAsset,
  RecordingAssetFilterParams,
  RecordingAssetPreSignedURLParams,
} from "../types";
import { QueryObjectIterator } from "../utils/QueryObjectIterator";

export class RecordingAssetService {
  private basePath = "/recording-assets";

  constructor(private apiService: APIService) {}

  list(filters?: RecordingAssetFilterParams): QueryObjectIterator<RecordingAsset> {
    const queryResultsIterable = new QueryObjectIterator<RecordingAsset>(
      (queryParams: Record<string, any>) => this.apiService.get(this.basePath, queryParams),
      filters ?? {}
    );
    return queryResultsIterable;
  }

  retrieve(assetId: string): Promise<RecordingAsset> {
    return this.apiService.get(`${this.basePath}/${assetId}`);
  }

  generatePreSignedURL(
    assetId: string,
    params: RecordingAssetPreSignedURLParams
  ): Promise<RecordingAsset> {
    return this.apiService.get(`${this.basePath}/${assetId}/presigned-url`, params);
  }
}
