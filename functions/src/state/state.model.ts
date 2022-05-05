/**
 * Created by Andrey Okhotnikov on 24.03.20.
 * Email: hunterov1984@gmail.com
 */
import Timestamp = FirebaseFirestore.Timestamp;
import { IStateCharge } from './stateCharge/stateCharge.model';
import { IStateClimate } from './stateClimate/stateClimate.model';
import { IProperty } from './stateVehicle/stateVehicle.model';
import { IStateLocation } from './stateLocation/stateLocation.model';

export interface IState {
  vin?: string;
  chargeId?: string;
  driveId?: string;
  interpretedState?: string;
  stateCharge?: IStateCharge;
  stateClimate?: IStateClimate;
  stateLocation?: IStateLocation;
  stateVehicle?: {[k: string]: IProperty};
  createdAt?: Timestamp | Date;
}