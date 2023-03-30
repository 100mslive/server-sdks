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
