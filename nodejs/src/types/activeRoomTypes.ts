import { HMSBasePeer } from "./common";

export interface HMSActiveRoom {
  id: string;
  name: string;
  customer_id: string;
  session: HMSActiveRoomSession;
}

export interface HMSActiveRoomSession {
  id: string;
  created_at: Date;
  peers: string[];
}

export interface HMSActiveRoomPeer extends HMSBasePeer {
  metadata: string;
}

export interface HMSActiveRoomPeerWithTrack extends HMSActiveRoomPeer {
  tracks: Record<string, HMSPeerTrack>;
}

export interface HMSPeerTrack {
  id: string;
  stream_id: string;
  mute: boolean;
  type: string;
  source: string;
  started_at: Date;
  description: string;
}

// param types
export interface HMSActivePeersResponse {
  peers: Record<string, HMSActiveRoomPeer>;
}

export interface HMSPeerUpdateOptions {
  name?: string;
  role?: string;
  metadata?: string;
}

export interface HMSRoomMessageOptions {
  peerId?: string;
  role?: string;
  message: string;
  type?: string;
}

export interface HMSRemovePeerByIdOptions {
  peer_id: string;
  reason?: string;
}

export interface HMSRemovePeerByRoleOptions {
  role: string;
  reason?: string;
}

export interface HMSEndActiveRoomOptions {
  reason?: string;
  lock?: boolean;
}
