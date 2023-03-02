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

export type HMSCreateRoomConfig = Partial<
  Pick<HMSRoom, "name" | "description" | "template_id" | "recording_info" | "region">
>;

export type HMSUpdateRoomConfig = Omit<HMSCreateRoomConfig, "template_id">;
