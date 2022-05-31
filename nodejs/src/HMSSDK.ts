import { AppTokenConfig, AuthService, ManagementTokenConfig } from "./AuthService";

export class HMSSDK {
  private authService: AuthService;

  constructor(accessKey: string, secret: string) {
    this.authService = new AuthService(accessKey, secret);
  }

  /**
   * management token allows to make API calls to 100ms backend
   */
  async getManagementToken(tokenConfig?: ManagementTokenConfig) {
    return this.authService.getManagementToken(tokenConfig);
  }

  /**
   * App Token allows for joining room
   */
  async getAppToken(tokenConfig: AppTokenConfig) {
    return this.authService.getAppToken(tokenConfig);
  }
}
