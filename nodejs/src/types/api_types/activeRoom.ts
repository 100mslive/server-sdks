import { BasePeer } from "./common";

export interface Object {
  id: string;
  name: string;
  customer_id: string;
  session: Session;
}

export interface Session {
  id: string;
  created_at: Date;
  peers: string[];
}

export interface Peer extends BasePeer {
  metadata: string;
}

export interface PeerWithTrack extends Peer {
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
  peers: Record<string, Peer>;
}

export interface PeerUpdateParams {
  name?: string;
  role?: string;
  metadata?: string;
}

export interface RoomMessageParams {
  peerId?: string;
  role?: string;
  message: string;
  type?: string;
}

export interface RemovePeerByIdParams {
  peer_id: string;
  reason?: string;
}

export interface RemovePeerByRoleParams {
  role: string;
  reason?: string;
}

export interface EndRoomParams {
  reason?: string;
  lock?: boolean;
}
