import { APIService } from "../services/APIService";
import { RecordingEvent, RecordingEventFilterParams, TrackEventFilterParams } from "../types";
import { QueryObjectIterator } from "../utils/QueryObjectIterator";

export class AnalyticsService {
  private basePath = "/analytics/events";

  constructor(private apiService: APIService) {}

  listTrackEvents(filters: TrackEventFilterParams): QueryObjectIterator<TrackEvent> {
    const queryResultsIterable = new QueryObjectIterator<TrackEvent>(
      (queryParams: Record<string, any>) => this.apiService.get(this.basePath, queryParams),
      filters ?? {}
    );
    return queryResultsIterable;
  }

  listRecordingEvents(filters: RecordingEventFilterParams): QueryObjectIterator<RecordingEvent> {
    const queryResultsIterable = new QueryObjectIterator<RecordingEvent>(
      (queryParams: Record<string, any>) => this.apiService.get(this.basePath, queryParams),
      filters ?? {}
    );
    return queryResultsIterable;
  }
}
