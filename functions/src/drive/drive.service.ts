/**
 * Created by Andrey Okhotnikov
 * Email: hunterov1984@gmail.com
 */
import Timestamp = FirebaseFirestore.Timestamp;
import * as moment from 'moment';

import { Collection } from '../class/collection';
import { Vehicle } from '../vehicle/vehicle';
import { IDrive } from './drive.model';

export class DriveService {

  static createNewDriveDoc(drive: IDrive, vehicle: Vehicle): void {
    drive.finishBatteryLevel = vehicle.state.stateCharge.status.batteryStatusData.stateOfCharge.content;
    drive.finishDate = moment(vehicle.state.stateVehicle['UTC_TIME_AND_KILOMETER_STATUS'].tsCarSentUtc).toDate();
    drive.finishKwh = vehicle.curBatteryCapacity;
    drive.kwhSpent = +(drive.startKwh - drive.finishKwh).toFixed(2);
    drive.duration = moment(drive.finishDate.getTime()).diff((<Timestamp>drive.startDate).toMillis(), 'm');
    drive.createdAt = new Date();
    Collection.DRIVES(drive.vin).doc(drive.driveId).set(drive).catch(e => console.log(e));
  }
}
