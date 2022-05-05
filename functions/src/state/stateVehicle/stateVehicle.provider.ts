/**
 * Created by Andrey Okhotnikov
 * Email: hunterov1984@gmail.com
 */
import { AxiosResponse } from 'axios';

import { Provider } from '../../class/provider';
import { IVehicleDataResponse } from './stateVehicle.model';

export class StateVehicleProvider extends Provider {

  async getVehicleData(vin: string): Promise<IVehicleDataResponse> {
    const response: AxiosResponse = await this.api.get(this.url(`/vehicles/${vin}/status`));
    return response.data;
  }

  get path(): string {
    return 'bs/vsr/v1';
  }
}
