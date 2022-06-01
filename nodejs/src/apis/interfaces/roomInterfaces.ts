export interface HMSRoom {
  id: string;
  name: string;
  description: string;
  active: boolean;
  recording_info: {
    enabled: boolean;
  };
  user_id: string;
  customer_id: string;
  created_at: string;
  updated_at: string;
}

export interface HMSRoomRecordingConfig {
  enabled: boolean;
  upload_info?: {
    type: string;
    location: string;
    prefix: string;
    credentials?: {
      key: string;
      secret: string;
    };
    options?: {
      region: string;
    };
  };
}
