/**
 * Created by Andrey Okhotnikov on 20.03.20.
 * Email: hunterov1984@gmail.com
 */
import { AxiosResponse } from 'axios';

import { IVehiclesResponse } from './vehicle.model';
import { Provider } from '../class/provider';

export class VehicleProvider extends Provider {

  async getVehicleSpecification(csid: string): Promise<{[k: string]: string}> {
    const response: AxiosResponse = await this.api.get(this.url('/vehicle/' + csid));
    return response.data.getVehicleDataResponse.VehicleSpecification;
  }

  async getAllVehiclesByUser(): Promise<IVehiclesResponse> {
    const response: AxiosResponse = await this.api.get(this.url('/vehicles'));
    return response.data;
  }

  get path(): string {
    return 'myaudi/carservice/v2';
  }
}