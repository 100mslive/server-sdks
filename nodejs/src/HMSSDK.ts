import { AuthService, CreateTokenConfig } from "./AuthService";

export class HMSSDK {
  private authService: AuthService;

  constructor(accessKey: string, secret: string) {
    this.authService = new AuthService(accessKey, secret);
  }

  async getManagementToken(tokenConfig?: CreateTokenConfig) {
    return this.authService.getManagementToken(tokenConfig);
  }
}
