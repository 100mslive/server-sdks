export interface HMSActiveRoom {
  id: string;
  name: string;
  customer_id: string;
  session: HMSActiveRoomSession;
}

export interface HMSActiveRoomSession {
  id: string;
  created_at: string;
  peers: string[];
}

export interface HMSPeer {
  id: string;
  name: string;
  user_id: string;
  metadata: string;
  role: string;
  joined_at: string;
  tracks: Record<string, HMSPeerTrack>;
}

export interface HMSPeerTrack {
  id: string;
  stream_id: string;
  mute: boolean;
  type: string;
  source: string;
  started_at: string;
  description: string;
}

export type HMSBasicPeer = Omit<HMSPeer, "tracks">;

export type HMSPeerUpdateConfig = Partial<Pick<HMSPeer, "name" | "role" | "metadata">>;

export interface HMSRoomMessageConfig {
  peerId?: string;
  role?: string;
  message: string;
  type?: string;
}
