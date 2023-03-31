import { BasePeer } from "./common";

export interface ActiveRoom {
  id: string;
  name: string;
  customer_id: string;
  session: ActiveRoomSession;
}

export interface ActiveRoomSession {
  id: string;
  created_at: Date;
  peers: string[];
}

export interface ActiveRoomPeer extends BasePeer {
  metadata: string;
}

export interface ActiveRoomPeerWithTrack extends ActiveRoomPeer {
  tracks: Record<string, PeerTrack>;
}

export interface PeerTrack {
  id: string;
  stream_id: string;
  mute: boolean;
  type: string;
  source: string;
  started_at: Date;
  description: string;
}

// param types
export interface ActivePeersResponse {
  peers: Record<string, ActiveRoomPeer>;
}

export interface PeerUpdateOptions {
  name?: string;
  role?: string;
  metadata?: string;
}

export interface RoomMessageOptions {
  peerId?: string;
  role?: string;
  message: string;
  type?: string;
}

export interface RemovePeerByIdOptions {
  peer_id: string;
  reason?: string;
}

export interface RemovePeerByRoleOptions {
  role: string;
  reason?: string;
}

export interface EndActiveRoomOptions {
  reason?: string;
  lock?: boolean;
}
