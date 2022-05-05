/**
 * Created by Andrey Okhotnikov
 * Email: hunterov1984@gmail.com
 */
import Timestamp = FirebaseFirestore.Timestamp;
import * as moment from 'moment';

import { Collection } from '../class/collection';
import { Vehicle } from '../vehicle/vehicle';
import { ICharge } from './charge.model';

export class ChargeService {

  static createNewChargeDoc(charge: ICharge, vehicle: Vehicle): void {
    charge.finishBatteryLevel = vehicle.state.stateCharge.status.batteryStatusData.stateOfCharge.content;
    charge.finishDate = moment(vehicle.state.stateCharge.status.chargingStatusData.chargingState.timestamp).toDate();
    charge.finishKwh = vehicle.curBatteryCapacity;
    charge.addedKwh = +(charge.finishKwh - charge.startKwh).toFixed(2);
    charge.duration = moment(charge.finishDate.getTime()).diff((<Timestamp>charge.startDate).toMillis(), 'm');
    charge.createdAt = new Date();
    Collection.CHARGES(charge.vin).doc(charge.chargeId).set(charge).catch(e => console.log(e));
  }
}
