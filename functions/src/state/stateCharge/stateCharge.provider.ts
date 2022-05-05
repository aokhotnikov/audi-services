/**
 * Created by Andrey Okhotnikov on 23.03.20.
 * Email: hunterov1984@gmail.com
 */
import { AxiosResponse } from 'axios';

import { Provider } from '../../class/provider';
import { IStateChargeResponse } from './stateCharge.model';

export class StateChargeProvider extends Provider {

  async getChargeData(vin: string): Promise<IStateChargeResponse> {
    const response: AxiosResponse = await this.api.get(this.url(`/vehicles/${vin}/charger`));
    return response.data;
  }

  get path(): string {
    return 'bs/batterycharge/v1';
  }
}