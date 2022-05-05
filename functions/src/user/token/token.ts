/**
 * Created by Andrey Okhotnikov
 * Email: hunterov1984@gmail.com
 */
import { IToken } from './token.model';

export class Token implements IToken {

  access_token: string;
  token_type: string;
  expires_in: number;

  constructor({ access_token = '', token_type = '', expires_in = 0 }) {
    this.access_token = access_token;
    this.token_type = token_type;
    this.expires_in = expires_in;
  }

  static createToken(data: IToken, use_timestamp = true): Token {
    const token = new Token(data);
    if (use_timestamp) {
      token.expires_in = token.expires_in * 1000 + Date.now();
    }
    return token;
  }

  /**
   * Checks if this token is still valid
   * @return {boolean}
   */
  isTokenValid(): boolean {
    return this.expires_in > Date.now();
  }

  toString(): string {
    return 'Access token: ' + this.access_token;
  }

  toPlainObj(): IToken {
    return {
      access_token: this.access_token,
      expires_in: this.expires_in,
      token_type: this.token_type
    };
  }

}
