/**
 * Created by Andrey Okhotnikov
 * Email: hunterov1984@gmail.com
 */
import { User } from '../../user/user';
import { StateClimateProvider } from './stateClimate.provider';
import { IStateClimate, IStateClimateResponse } from './stateClimate.model';

export class StateClimateService {

  static async getClimateState(user: User, vin: string): Promise<IStateClimate> {
    const stateClimateProvider = new StateClimateProvider(user.access_token);
    const res: IStateClimateResponse = await stateClimateProvider.getClimateData(vin);
    return res.climater;
  }
}
