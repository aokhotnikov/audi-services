/**
 * Created by Andrey Okhotnikov
 * Email: hunterov1984@gmail.com
 */
import DocumentSnapshot = FirebaseFirestore.DocumentSnapshot;
import Timestamp = FirebaseFirestore.Timestamp;
import * as _ from 'lodash';
import * as moment from 'moment';

import { ITimeline } from './timeline.model';
import { ITimelineItem } from './item/item.model';
import { TimelineService } from './timeline.service';
import { IVehicle } from '../vehicle/vehicle.model';
import { TimelineItem } from './item/item';

export class Timeline implements ITimeline {
  date: string;         // YYYY-MM-DD
  items: ITimelineItem[];
  users: string[];
  vin: string;

  doc: DocumentSnapshot;

  constructor(partial: Partial<ITimeline>) {
    Object.assign(this, partial);
  }

  static create(data: ITimeline): Timeline {
    return new Timeline(data);
  }

  static createFromDoc(timelineDoc: DocumentSnapshot): Timeline {
    const data: ITimeline = <Timeline>timelineDoc.data();
    const timeline = Timeline.create(data);
    timeline.doc = timelineDoc;
    return timeline;
  }

  static async createFromDocId(id: string): Promise<Timeline> {
    const docSnapshot = await TimelineService.getTimelineDocById(id);
    return this.createFromDoc(docSnapshot);
  }

  async update(vehicleData: IVehicle) {
    const newTimeline: ITimelineItem = await TimelineItem.init(vehicleData);
    const lastTimeline: ITimelineItem = _.last(this.items);

    console.log(`VIN: `, vehicleData.vin, `lastTimeLine: `, lastTimeline, 'newTimeLine: ', newTimeline);

    if (lastTimeline) {
      // change the last item of array: `finishDate`, `duration` and, if necessary, `finishBatteryLevel`
      lastTimeline.finishDate = moment(vehicleData.state.stateVehicle['UTC_TIME_AND_KILOMETER_STATUS'].tsCarSentUtc).toDate();
      lastTimeline.duration = moment(lastTimeline.finishDate.getTime()).diff((<Timestamp>lastTimeline.startDate).toMillis(), 'm');
      if (lastTimeline.startBatteryLevel) {
        lastTimeline.finishBatteryLevel = vehicleData.state.stateCharge.status.batteryStatusData.stateOfCharge.content;
      }
    }

    if (lastTimeline && lastTimeline.type !== newTimeline.type) {	// check same states(P->P, D->D)
      this.items.push(newTimeline);
    } else {
      console.log(`${vehicleData.vin}: lastTimeLine & newTimeLine have same types`);

      if (newTimeline.chargeIds && lastTimeline.chargeIds) {
        lastTimeline.chargeIds = [...new Set([...lastTimeline.chargeIds, ...newTimeline.chargeIds])];
      } else if (newTimeline.chargeIds) {
        lastTimeline.chargeIds = [...new Set([...newTimeline.chargeIds])];
      }
      if (newTimeline.driveIds && lastTimeline.driveIds) {
        lastTimeline.driveIds = [...new Set([...lastTimeline.driveIds, ...newTimeline.driveIds])];
      }

      delete lastTimeline.duration;
      delete lastTimeline.finishDate;
      delete lastTimeline.finishBatteryLevel;

    }

    // close previous day
    if (this.items.length <= 2) {
      await TimelineService.closePastDay(vehicleData, this.items[0]);
    }

    return this.doc.ref.update({ items: this.items });
  }

}
