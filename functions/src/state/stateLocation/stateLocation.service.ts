/**
 * Created by Andrey Okhotnikov
 * Email: hunterov1984@gmail.com
 */
import { User } from '../../user/user';
import { StateLocationProvider } from './stateLocation.provider';
import { IStateLocation, IStateLocationResponse } from './stateLocation.model';

export class StateLocationService {

  static async getLocationState(user: User, vin: string): Promise<IStateLocation> {
    const stateLocationProvider = new StateLocationProvider(user.access_token);
    const res: IStateLocationResponse = await stateLocationProvider.getLocationData(vin);
    const { Position, parkingTimeUTC = '' } = res.findCarResponse || {};
    return Position && { ...Position, parkingTimeUTC };
  }
}
