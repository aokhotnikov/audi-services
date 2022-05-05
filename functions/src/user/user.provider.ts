/**
 * Created by Andrey Okhotnikov on 19.03.20.
 * Email: hunterov1984@gmail.com
 */
import { AxiosResponse } from 'axios';
import { URLSearchParams } from 'url';

import { Provider } from '../class/provider';
import { IUserInfo } from './user.model';
import { IToken } from './token/token.model';


export class UserProvider extends Provider {

  async login(username: string, password: string): Promise<IToken> {
    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('username', username);
    params.append('password', password);
    const response: AxiosResponse = await this.api.post(this.url('/token'), params);
    return response.data;
  }

  async getUserInfo(): Promise<IUserInfo> {
    const response: AxiosResponse = await this.api.get(this.url('/userInfo'));
    return response.data.UserInfo;
  }

  get path(): string {
    return 'core/auth/v1';
  }
}
