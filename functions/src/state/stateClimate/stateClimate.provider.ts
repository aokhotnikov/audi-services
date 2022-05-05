/**
 * Created by Andrey Okhotnikov on 23.03.20.
 * Email: hunterov1984@gmail.com
 */
import { AxiosResponse } from 'axios';

import { Provider } from '../../class/provider';
import { IStateClimateResponse } from './stateClimate.model';

export class StateClimateProvider extends Provider {

  async getClimateData(vin: string): Promise<IStateClimateResponse> {
    const response: AxiosResponse = await this.api.get(this.url(`/vehicles/${vin}/climater`));
    return response.data;
  }

  get path(): string {
    return 'bs/climatisation/v1';
  }
}