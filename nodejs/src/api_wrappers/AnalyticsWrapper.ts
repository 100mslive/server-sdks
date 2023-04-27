import { APIService } from "../services/APIService";
import { Analytics } from "../types";
import { QueryObjectIterator } from "../utils/QueryObjectIterator";

export default class AnalyticsWrapper {
  private basePath = "/analytics/events";

  constructor(private apiService: APIService) {}

  listTrackEvents(filters: Analytics.TrackEventFilterParams): QueryObjectIterator<TrackEvent> {
    const queryResultsIterable = new QueryObjectIterator<TrackEvent>(
      (queryParams: Record<string, any>) => this.apiService.get(this.basePath, queryParams),
      filters ?? {}
    );
    return queryResultsIterable;
  }

  listRecordingEvents(
    filters: Analytics.RecordingEventFilterParams
  ): QueryObjectIterator<Analytics.RecordingEvent> {
    const queryResultsIterable = new QueryObjectIterator<Analytics.RecordingEvent>(
      (queryParams: Record<string, any>) => this.apiService.get(this.basePath, queryParams),
      filters ?? {}
    );
    return queryResultsIterable;
  }
}
