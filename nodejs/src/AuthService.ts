import { sign } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

export class AuthService {
  constructor(private accessKey: string, private secret: string) {}

  async getManagementToken(
    { issuedAt, notValidBefore, validForSeconds }: CreateTokenConfig = {
      validForSeconds: 24 * 3600,
    }
  ): Promise<Token> {
    const jwtid = uuidv4();
    const currTimeSeconds = Math.floor(Date.now() / 1000);
    const iat = issuedAt || currTimeSeconds;
    const nbf = notValidBefore || currTimeSeconds;
    const tokenPromise: Promise<string> = new Promise((resolve, reject) => {
      sign(
        {
          access_key: this.accessKey,
          type: "management",
          version: 2,
          iat,
          nbf,
          exp: nbf + validForSeconds,
        },
        this.secret,
        {
          algorithm: "HS256",
          jwtid,
        },
        function (err, token) {
          if (err || !token) {
            reject(err);
          } else {
            resolve(token);
          }
        }
      );
    });
    const tokenString = await tokenPromise;
    return { token: tokenString };
  }
}

export interface CreateTokenConfig {
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
  validForSeconds: number;
}

export interface Token {
  token: string;
}
