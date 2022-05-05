/**
 * Created by Andrey Okhotnikov
 * Email: hunterov1984@gmail.com
 */
import { User } from '../../user/user';
import { StateChargeProvider } from './stateCharge.provider';
import { IStateCharge, IStateChargeResponse } from './stateCharge.model';

export class StateChargeService {

  static async getChargeState(user: User, vin: string): Promise<IStateCharge> {
    const stateChargeProvider = new StateChargeProvider(user.access_token);
    const res: IStateChargeResponse = await stateChargeProvider.getChargeData(vin);
    return res.charger;
  }
}
