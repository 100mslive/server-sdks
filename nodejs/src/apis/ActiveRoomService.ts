import { APIService } from "../services/APIService";
import {
  ActivePeersResponse,
  ActiveRoom,
  ActiveRoomPeer,
  ActiveRoomPeerWithTrack,
  EndActiveRoomOptions,
  PeerUpdateOptions,
  RemovePeerByIdOptions,
  RemovePeerByRoleOptions,
  RoomMessageOptions,
} from "../types";

/**
 * The wrapper class that implements all
 * {@link https://www.100ms.live/docs/server-side/v2/api-reference/active-rooms/object Active Room API} calls.
 */
export class ActiveRoomService {
  private basePath = "/active-rooms";

  constructor(private apiService: APIService) {}

  /**
   * Get the details of an active room by specifying room id.
   * @param roomId Room ID
   * @returns a `HMS.ActiveRoom` object
   */
  async getActiveRoomDetails(roomId: string): Promise<ActiveRoom> {
    return this.apiService.get(`${this.basePath}/${roomId}`);
  }

  /**
   * Get the details of a specific peer in an active room with
   * room id and peer id.
   * @param roomId Room ID
   * @param peerId Peer ID
   * @returns a `HMS.ActiveRoomPeerWithTrack` object
   */
  async getPeerDetails(roomId: string, peerId: string): Promise<ActiveRoomPeerWithTrack> {
    return this.apiService.get(`${this.basePath}/${roomId}/peers/${peerId}`);
  }

  /**
   * Get the list of peers currently present in an active room
   * with the room id. The returned list is a `Record` where every
   * `HMS.ActiveRoomPeer` object is matched by its corresponding peer id.
   * ### Example
   * ```ts
   * Record<string, HMS.ActiveRoomPeer>{
   *  "peer_id_1": peerObj1
   *  "peer_id_2": peerObj2
   *  ...
   * }
   * ```
   * @param roomId Room ID
   * @returns a `Record<string, HMS.ActiveRoomPeer>` object
   */
  async getActivePeers(roomId: string): Promise<Record<string, ActiveRoomPeer>> {
    const activePeers = await this.apiService.get<ActivePeersResponse>(
      `${this.basePath}/${roomId}/peers`
    );
    return activePeers.peers;
  }

  /**
   * Update the `name`, `role` and `metadata` of a peer in an active room with
   * the room id and peer id. Specify the optional fields that need to be updated in
   * the `options` param.
   * @param roomId Room ID
   * @param peerId Peer ID
   * @param options Options of the Peer to be updated
   * @returns a `HMS.ActiveRoomPeerWithTrack` object
   */
  async updatePeer(
    roomId: string,
    peerId: string,
    options: PeerUpdateOptions
  ): Promise<ActiveRoomPeerWithTrack> {
    return this.apiService.post(`${this.basePath}/${roomId}/peers/${peerId}`, options);
  }

  /**
   * Send a message to an active room. Specifying the receiver in `options`:
   * 1. `peer_id` - only that peer
   * 2. `role` - peers of that role
   * 3. `peer_id` and `role` - only to that peer (peer id has higher precedence)
   * 4. no `peer_id` or `role` specified - message broadcast to all peers
   * @param roomId Room ID
   * @param options Options of the Message to be sent
   */
  async sendMessage(roomId: string, options: RoomMessageOptions): Promise<void> {
    await this.apiService.post(`${this.basePath}/${roomId}/send-message`, options);
    return;
  }

  /**
   * Remove a specific peer or a group of peers with same `role` in an active
   * room.
   * @param roomId Room ID
   * @param options Options for removing a Peer
   */
  async removePeer(
    roomId: string,
    options: RemovePeerByIdOptions | RemovePeerByRoleOptions
  ): Promise<void> {
    await this.apiService.post(`${this.basePath}/${roomId}/remove-peers`, options);
    return;
  }

  /**
   * End the ongoing session in a room by removing all the peers. Use the `lock` field
   * in `options` to disable the room. No peer can join until the room is enabled once again(refer `RoomService`).
   * @param roomId Room ID
   * @param options Options for Ending an Active Room
   */
  async endActiveRoom(roomId: string, options: EndActiveRoomOptions): Promise<void> {
    await this.apiService.post(`${this.basePath}/${roomId}/end-room`, options);
    return;
  }
}
