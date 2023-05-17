export interface BaseTokenConfig {
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

export interface ManagementTokenConfig extends BaseTokenConfig {
  /**
   * always generate new token even if prev is unexpired
   */
  forceNew?: boolean;
}

export interface AuthTokenConfig extends BaseTokenConfig {
  /**
   * Room id for which the auth token needs to be generated
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

export interface AuthToken {
  token: string;
}
export interface ManagementToken {
  token: string;
}

export enum TokenType {
  Management = "management",
  Auth = "app",
}
