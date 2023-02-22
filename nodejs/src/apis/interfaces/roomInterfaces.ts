export interface HMSRoom {
  id: string
  name: string
  enabled: boolean
  description: string
  customer_id: string
  app_id: string
  // not sure about the next two
  recording_source_template?: boolean
  enabled_source_template?: boolean
  recording_info?: RecordingInfo
  template_id: string
  template: string
  region: string
  created_at: string
  updated_at: string
  customer: string
}

export interface RecordingInfo {
  enabled: boolean;
  upload_info?: RecordingUploadInfo;
}

export interface RecordingUploadInfo {
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

export type HMSCreateRoomConfig = Partial<Pick<HMSRoom, 'name' | 'description' | 'template_id' | 'recording_info' | 'region'>>

export type HMSUpdateRoomConfig = Omit<HMSCreateRoomConfig, 'template_id'>