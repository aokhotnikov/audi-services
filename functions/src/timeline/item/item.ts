/**
 * Created by Andrey Okhotnikov on 06.04.20.
 * Email: hunterov1984@gmail.com
 */
import { classToPlain } from 'class-transformer';
import Timestamp = FirebaseFirestore.Timestamp;
import * as moment from 'moment';

import { ITimelineItem, TIMELINE_TYPE } from './item.model';
import { IVehicle } from '../../vehicle/vehicle.model';

export class TimelineItem implements ITimelineItem {

  chargeIds: string[];
  driveIds: string[];
  startBatteryLevel: number;
  finishBatteryLevel: number;
  duration: number;
  startDate: Timestamp | Date;
  finishDate: Timestamp | Date;
  type: TIMELINE_TYPE;

  constructor(partial: Partial<ITimelineItem>) {
    Object.assign(this, partial);
  }

  /**
   * Init TimelineItem
   * @param {IVehicle} vehicle
   * @return {ITimelineItem}
   */
  static init(vehicle: IVehicle): ITimelineItem {

    const type: TIMELINE_TYPE = vehicle.currentDrive ? TIMELINE_TYPE.DRIVE : vehicle.currentCharge ? TIMELINE_TYPE.CHARGE : TIMELINE_TYPE.PARK;
    switch (type) {
      case TIMELINE_TYPE.DRIVE:
        return {
          type,
          startDate: vehicle.currentDrive.startDate,
          driveIds: [vehicle.currentDrive.driveId]
        };
      case TIMELINE_TYPE.PARK:
        return {
          type,
          startDate: moment(vehicle.state.stateVehicle['UTC_TIME_AND_KILOMETER_STATUS'].tsCarSentUtc).toDate(),
          startBatteryLevel: vehicle.state.stateCharge.status.batteryStatusData.stateOfCharge.content
        };
      case TIMELINE_TYPE.CHARGE:
        return {
          type: TIMELINE_TYPE.PARK,
          startDate: vehicle.currentCharge.startDate,
          startBatteryLevel: vehicle.currentCharge.startBatteryLevel,
          chargeIds: [vehicle.currentCharge.chargeId]
        };
      default:
        console.log(`Unknown timeline type`);
        return null;
    }
  }

  toPlainObj(): ITimelineItem {
    return classToPlain(this) as ITimelineItem;
  }

}