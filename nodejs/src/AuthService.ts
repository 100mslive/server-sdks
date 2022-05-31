import { sign, decode, SignOptions, JwtPayload } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { logger } from "./LoggerService";

export class AuthService {
  private managementToken?: ManagementToken;
  constructor(private accessKey: string, private secret: string) {}

  async getManagementToken(tokenConfig?: ManagementTokenConfig): Promise<ManagementToken> {
    if (!this.managementToken || this.isTokenExpired(this.managementToken.token)) {
      logger.info("generating management token");
      this.managementToken = await this.generateToken(TokenType.Management, tokenConfig);
    }
    return this.managementToken;
  }

  async getAppToken(tokenConfig: AppTokenConfig) {
    const details: Record<string, string> = {
      room_id: tokenConfig.roomId,
      role: tokenConfig.role,
    };
    if (tokenConfig.userId) {
      details.user_id = tokenConfig.userId;
    }
    return this.generateToken(TokenType.App, tokenConfig, details);
  }

  private async generateToken(
    type: TokenType,
    { issuedAt, notValidBefore, validForSeconds }: BaseTokenConfig = {},
    extras: Record<string, any> = {}
  ): Promise<ManagementToken> {
    // buffer to handle slight mismatch between time of token creating server and HMS backend
    const bufferSeconds = 10;
    const currTimeSeconds = Math.floor(Date.now() / 1000);
    const iat = issuedAt || currTimeSeconds - bufferSeconds;
    const nbf = notValidBefore || iat;
    const exp = nbf + (validForSeconds || 24 * 3600);
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

interface BaseTokenConfig {
  /**
   * value in seconds
   */
  issuedAt?: number;
  /**
   * value in seconds
   */
  notValidBefore?: number;
  /**
   * value in seconds, once the token is valid how long will it stay valid
   */
  validForSeconds?: number;
}

export interface ManagementTokenConfig extends BaseTokenConfig {}

export interface AppTokenConfig extends BaseTokenConfig {
  /**
   * room id for which the app token needs to be generated
   */
  roomId: string;
  /**
   * a reference user id from your side
   */
  userId?: string;
  /**
   * The role should exist in your dashboard account
   */
  role: string;
}

export interface ManagementToken {
  token: string;
}

enum TokenType {
  Management = "management",
  App = "app",
}
