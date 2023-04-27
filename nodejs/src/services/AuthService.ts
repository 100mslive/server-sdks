import { sign, decode, SignOptions, JwtPayload } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import {
  AuthToken,
  AuthTokenConfig,
  BaseTokenConfig,
  ManagementToken,
  ManagementTokenConfig,
  TokenType,
} from "../types";
import { logger } from "./LoggerService";

export default class AuthService {
  private managementToken?: ManagementToken;
  constructor(private accessKey: string, private secret: string) {}

  /**
   * Management token allows to make API calls to 100ms backend.
   * @returns Management token of type `ManagementToken`
   */
  async getManagementToken(tokenConfig?: ManagementTokenConfig): Promise<ManagementToken> {
    if (
      tokenConfig?.forceNew ||
      !this.managementToken ||
      this.isTokenExpired(this.managementToken.token)
    ) {
      logger.debug("generating management token", tokenConfig);
      this.managementToken = await this.generateToken(TokenType.Management, tokenConfig);
    }
    return this.managementToken;
  }

  /**
   * Auth Token allows for joining Room on client side.
   * @returns Auth token of type `AuthToken`
   */
  async getAuthToken(tokenConfig: AuthTokenConfig): Promise<AuthToken> {
    const details: Record<string, string> = {
      room_id: tokenConfig.roomId,
      role: tokenConfig.role,
    };
    if (tokenConfig.userId) {
      details.user_id = tokenConfig.userId;
    }
    return this.generateToken(TokenType.Auth, tokenConfig, details);
  }

  private async generateToken(
    type: TokenType.Auth,
    config: AuthTokenConfig,
    extras: Record<string, any>
  ): Promise<AuthToken>;
  private async generateToken(
    type: TokenType.Management,
    config?: ManagementTokenConfig
  ): Promise<ManagementToken>;
  private async generateToken(
    type: TokenType,
    config: BaseTokenConfig = {},
    extras: Record<string, any> = {}
  ): Promise<AuthToken | ManagementToken> {
    // buffer to handle slight mismatch between time of token creating server and HMS backend
    const bufferSeconds = 10;
    const currTimeSeconds = Math.floor(Date.now() / 1000);
    const iat = config.issuedAt || currTimeSeconds - bufferSeconds;
    const nbf = config.notValidBefore || iat;
    const exp = nbf + (config.validForSeconds || 24 * 3600);
    const payload = {
      access_key: this.accessKey,
      type,
      version: 2,
      iat,
      nbf,
      exp,
      ...extras,
    };
    const token = await this.signAndGetJwt(payload);
    return { token };
  }

  private isTokenExpired(token: string) {
    try {
      const { exp } = decode(token) as JwtPayload;
      const buffer = 30; // generate new if it's going to expire soon
      const currTimeSeconds = Math.floor(Date.now() / 1000);
      return !exp || exp + buffer < currTimeSeconds;
    } catch (err) {
      logger.error("error in decoding token", err);
    }
  }

  private async signAndGetJwt(payload: Record<string, any>) {
    const jwtid = uuidv4();
    const options: SignOptions = {
      algorithm: "HS256",
      jwtid,
    };
    return new Promise<string>((resolve, reject) => {
      sign(payload, this.secret, options, (err, token) => {
        if (err || !token) {
          reject(err);
        } else {
          resolve(token);
        }
      });
    });
  }
}
