export interface QueryResults<T> {
  limit: number;
  data?: T[];
  last?: string;
}

export interface HMSBasicPeer {
  id: string;
  name: string;
  role: string;
  user_id: string;
  joined_at: Date;
}
