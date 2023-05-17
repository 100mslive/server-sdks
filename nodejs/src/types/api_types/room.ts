export interface Object {
  id: string;
  name: string;
  enabled: boolean;
  description: string;
  customer_id: string;
  app_id: string;
  recording_source_template?: boolean;
  enabled_source_template?: boolean;
  recording_info?: RecordingInfo;
  template_id: string;
  template: string;
  region: string;
  created_at: Date;
  updated_at: Date;
  customer: string;
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

//param types
export interface FilterParams {
  enabled?: boolean;
  before?: Date;
  after?: Date;
  limit?: number;
}

export interface UpdateParams {
  name?: string;
  description?: string;
  recording_info?: RecordingInfo;
  region?: string;
}

export interface CreateParams extends UpdateParams {
  template_id?: string;
}
