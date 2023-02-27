import { APIService } from "../services/APIService";
import {
  HMSActiveRoom,
  HMSActiveRoomPeerWithTrack,
  HMSPeerUpdateConfig,
  HMSRoomMessageConfig,
  HMSActiveRoomPeer,
} from "./interfaces/activeRoomInterfaces";

export class ActiveRoomAPIs {
  private basePath = "/active-rooms";

  constructor(private apiService: APIService) {}

  async getActiveRoomDetails(roomId: string): Promise<HMSActiveRoom> {
    return this.apiService.get(`${this.basePath}/${roomId}`);
  }

  async getPeerDetails(roomId: string, peerId: string): Promise<HMSActiveRoomPeerWithTrack> {
    return this.apiService.get(`${this.basePath}/${roomId}/peers/${peerId}`);
  }

  async getActivePeers(roomId: string): Promise<Record<string, HMSActiveRoomPeer>> {
    const activePeers = await this.apiService.get<GetActivePeersResponse>(
      `${this.basePath}/${roomId}/peers`
    );
    return activePeers.peers;
  }

  async updatePeer(
    roomId: string,
    peerId: string,
    config: HMSPeerUpdateConfig
  ): Promise<HMSActiveRoomPeerWithTrack> {
    return this.apiService.post(`${this.basePath}/${roomId}/peers/${peerId}`, config);
  }

  async sendMessage(roomId: string, config: HMSRoomMessageConfig): Promise<boolean> {
    await this.apiService.post(`${this.basePath}/${roomId}/send-message`, config);
    return true;
  }

  async removePeer(
    roomId: string,
    config: RemovePeerConfigById | RemovePeerConfigByRole
  ): Promise<boolean> {
    await this.apiService.post(`${this.basePath}/${roomId}/remove-peers`, config);
    return true;
  }

  async endActiveRoom(roomId: string, config: EndActiveRoomConfig): Promise<boolean> {
    await this.apiService.post(`${this.basePath}/${roomId}/end-room`, config);
    return true;
  }
}

export interface GetActivePeersResponse {
  peers: Record<string, HMSActiveRoomPeer>;
}

export interface RemovePeerConfigById {
  peer_id: string;
  reason?: string;
}

export interface RemovePeerConfigByRole {
  role: string;
  reason?: string;
}

export interface EndActiveRoomConfig {
  reason?: string;
  lock?: boolean;
}
