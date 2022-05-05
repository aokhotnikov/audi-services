/**
 * Created by Andrey Okhotnikov on 24.03.20.
 * Email: hunterov1984@gmail.com
 */
import { AxiosResponse } from 'axios';

import { Provider } from '../../class/provider';
import { IStateLocationResponse } from './stateLocation.model';

export class StateLocationProvider extends Provider {

  async getLocationData(vin: string): Promise<IStateLocationResponse> {
    const response: AxiosResponse = await this.api.get(this.url(`/vehicles/${vin}/position`));
    return response.data;
  }

  get path(): string {
    return 'bs/cf/v1';
  }
}