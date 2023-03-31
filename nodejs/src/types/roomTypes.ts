export interface HMSRoom {
  id: string;
  name: string;
  enabled: boolean;
  description: string;
  customer_id: string;
  app_id: string;
  recording_source_template?: boolean;
  enabled_source_template?: boolean;
  recording_info?: HMSRoomRecordingInfo;
  template_id: string;
  template: string;
  region: string;
  created_at: Date;
  updated_at: Date;
  customer: string;
}

export interface HMSRoomRecordingInfo {
  enabled: boolean;
  upload_info?: HMSRoomRecordingUploadInfo;
}

export interface HMSRoomRecordingUploadInfo {
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
export interface HMSRoomFilterOptions {
  enabled?: boolean;
  before?: Date;
  after?: Date;
  limit?: number;
}

export interface HMSRoomUpdateOptions {
  name?: string;
  description?: string;
  recording_info?: HMSRoomRecordingInfo;
  region?: string;
}

export interface HMSRoomCreateOptions extends HMSRoomUpdateOptions {
  template_id?: string;
}
