export interface Room {
  id: string;
  name: string;
  enabled: boolean;
  description: string;
  customer_id: string;
  app_id: string;
  recording_source_template?: boolean;
  enabled_source_template?: boolean;
  recording_info?: RoomRecordingInfo;
  template_id: string;
  template: string;
  region: string;
  created_at: Date;
  updated_at: Date;
  customer: string;
}

export interface RoomRecordingInfo {
  enabled: boolean;
  upload_info?: RoomRecordingUploadInfo;
}

export interface RoomRecordingUploadInfo {
  type: string;
  location: string;
  prefix?: string;
  options?: {
    region: string;
  };
  credentials?: {
    key: string;
    secret: string;
  };
}

//param types
export interface RoomFilterOptions {
  enabled?: boolean;
  before?: Date;
  after?: Date;
  limit?: number;
}

export interface RoomUpdateOptions {
  name?: string;
  description?: string;
  recording_info?: RoomRecordingInfo;
  region?: string;
}

export interface RoomCreateOptions extends RoomUpdateOptions {
  template_id?: string;
}
