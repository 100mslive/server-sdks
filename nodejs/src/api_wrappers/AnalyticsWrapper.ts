import APIService from "../services/APIService";
import { Analytics } from "../types";
import { QueryObjectIterator } from "../utils/QueryObjectIterator";

/**
 * The wrapper class that implements all
 * {@link https://www.100ms.live/docs/server-side/v2/api-reference/analytics/overview Analytics API} calls.
 */
export default class AnalyticsWrapper {
  private basePath = "/analytics/events";

  constructor(private apiService: APIService) {}

  /**
   * Get a list of all track events that satisfy the `filter` params. Track events can be used to
   * understand the participant's activity during the session. It would get you the reference
   * points in time e.g. when the user has unmuted audio, shared screen, or stopped the video.
   * A `HMS.Analytics.RecordingEvent.Object` iterable is returned that can be iterated
   * with a `for await` loop.
   * @param filters Track event filters like event types and room id
   * @returns a `HMS.QueryObjectIterator<HMS.Analytics.TrackEvent.Object>` object
   */
  listTrackEvents(
    filters: Analytics.TrackEvent.FilterParams
  ): QueryObjectIterator<Analytics.TrackEvent.Object> {
    const queryObjectIterable = new QueryObjectIterator<Analytics.TrackEvent.Object>(
      (queryParams: Record<string, any>) => this.apiService.get(this.basePath, queryParams),
      filters ?? {}
    );
    return queryObjectIterable;
  }

  /**
   * Get a list of all recording events that satisfy the `filter` params. Recording events describe room recordings similar to
   * {@link https://www.100ms.live/docs/server-side/v2/how-to-guides/configure-webhooks/webhook#beamrecordingsuccess this webhook}.
   * A `HMS.Analytics.RecordingEvent.Object` iterable is returned that can be iterated with a `for await` loop.
   * @param filters Recording event filters like event types and room id
   * @returns a `HMS.QueryObjectIterator<HMS.Analytics.RecordingEvent.Object>` object
   */
  listRecordingEvents(
    filters: Analytics.RecordingEvent.FilterParams
  ): QueryObjectIterator<Analytics.RecordingEvent.Object> {
    const queryObjectIterable = new QueryObjectIterator<Analytics.RecordingEvent.Object>(
      (queryParams: Record<string, any>) => this.apiService.get(this.basePath, queryParams),
      filters ?? {}
    );
    return queryObjectIterable;
  }
}
