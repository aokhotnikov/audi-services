/**
 * Created by Andrey Okhotnikov
 * Email: hunterov1984@gmail.com
 */
import { ApiAudi } from './api';

export abstract class Provider {

  readonly COMPANY = 'Audi';
  readonly COUNTRY = 'DE';

  api: ApiAudi;

  constructor(access_token?: string) {
    this.api = new ApiAudi(access_token);
  }

  private get useCompany(): boolean {
    return true;
  }

  /**
   * Builds a full URL using the given parts
   * @param {string} lastPart
   * @return {string}
   */
  url(lastPart: string): string {
    let url = this.path;
    if (this.useCompany) {
      url += '/' + this.COMPANY + '/' + this.COUNTRY;
    }
    return url + lastPart;
  }

  abstract get path(): string;
}
