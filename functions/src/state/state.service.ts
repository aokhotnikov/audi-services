/**
 * Created by Andrey Okhotnikov
 * Email: hunterov1984@gmail.com
 */
import WriteResult = FirebaseFirestore.WriteResult;

import { User } from '../user/user';
import { IState } from './state.model';
import { Collection } from '../class/collection';
import { StateClimateService } from './stateClimate/stateClimate.service';
import { StateChargeService } from './stateCharge/stateCharge.service';
import { StateVehicleService } from './stateVehicle/stateVehicle.service';
import { StateLocationService } from './stateLocation/stateLocation.service';

export class StateService {

  static async getState(vin: string, users: string[]): Promise<IState> {
    const user = await User.createFromDocId(users[0]);

    const [ stateClimate, stateCharge, stateVehicle, stateLocation ] = await Promise.all([
      StateClimateService.getClimateState(user, vin),
      StateChargeService.getChargeState(user, vin),
      StateVehicleService.getVehicleState(user, vin),
      StateLocationService.getLocationState(user, vin)
    ]);
    return { stateClimate, stateCharge, stateVehicle, ...(stateLocation && {stateLocation}), vin };
  }

  static async createNewVehicleStateDoc(state: IState): Promise<WriteResult> {
    state.createdAt = new Date();
    return Collection.VEHICLE_STATES.doc().set(state);
  }
}
