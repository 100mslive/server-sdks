import { APIService } from "../services/APIService";
import {
  HMSActiveRoom,
  HMSActiveRoomPeerWithTrack,
  HMSPeerUpdateOptions,
  HMSRoomMessageOptions,
  HMSActiveRoomPeer,
  HMSRemovePeerOptionsById,
  HMSRemovePeerOptionsByRole,
  HMSEndActiveRoomOptions,
  HMSActivePeersResponse,
} from "./interfaces/activeRoomInterfaces";

export class ActiveRoomService {
  private basePath = "/active-rooms";

  constructor(private apiService: APIService) {}

  /**
   *
   * @param roomId Room ID
   * @returns a `HMSActiveRoom` object
   */
  async getActiveRoomDetails(roomId: string): Promise<HMSActiveRoom> {
    return this.apiService.get(`${this.basePath}/${roomId}`);
  }

  /**
   *
   * @param roomId Room ID
   * @param peerId Peer ID
   * @returns a `HMSActiveRoomPeerWithTrack` object
   */
  async getPeerDetails(roomId: string, peerId: string): Promise<HMSActiveRoomPeerWithTrack> {
    return this.apiService.get(`${this.basePath}/${roomId}/peers/${peerId}`);
  }

  /**
   *
   * @param roomId Room ID
   * @returns a `Record<string, HMSActiveRoomPeer>` object
   */
  async getActivePeers(roomId: string): Promise<Record<string, HMSActiveRoomPeer>> {
    const activePeers = await this.apiService.get<HMSActivePeersResponse>(
      `${this.basePath}/${roomId}/peers`
    );
    return activePeers.peers;
  }

  /**
   *
   * @param roomId Room ID
   * @param peerId Peer ID
   * @param options Options of the Peer to be updated
   * @returns a `HMSActiveRoomPeerWithTrack` object
   */
  async updatePeer(
    roomId: string,
    peerId: string,
    options: HMSPeerUpdateOptions
  ): Promise<HMSActiveRoomPeerWithTrack> {
    return this.apiService.post(`${this.basePath}/${roomId}/peers/${peerId}`, options);
  }

  /**
   *
   * @param roomId Room ID
   * @param options Options of the Message to be sent
   */
  async sendMessage(roomId: string, options: HMSRoomMessageOptions): Promise<void> {
    await this.apiService.post(`${this.basePath}/${roomId}/send-message`, options);
    return;
  }

  /**
   *
   * @param roomId Room ID
   * @param options Options for removing a Peer
   */
  async removePeer(
    roomId: string,
    options: HMSRemovePeerOptionsById | HMSRemovePeerOptionsByRole
  ): Promise<void> {
    await this.apiService.post(`${this.basePath}/${roomId}/remove-peers`, options);
    return;
  }

  /**
   *
   * @param roomId Room ID
   * @param options OPtions for Ending an Active Room
   */
  async endActiveRoom(roomId: string, options: HMSEndActiveRoomOptions): Promise<void> {
    await this.apiService.post(`${this.basePath}/${roomId}/end-room`, options);
    return;
  }
}
