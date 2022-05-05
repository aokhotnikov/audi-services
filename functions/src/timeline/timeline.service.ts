/**
 * Created by Andrey Okhotnikov on 06.04.20.
 * Email: hunterov1984@gmail.com
 */
import { QueryDocumentSnapshot } from "@google-cloud/firestore";
import WriteResult = FirebaseFirestore.WriteResult;
import DocumentSnapshot = FirebaseFirestore.DocumentSnapshot;
import * as moment from 'moment-timezone';

import { Collection } from '../class/collection';
import { IVehicle } from '../vehicle/vehicle.model';
import { Vehicle } from '../vehicle/vehicle';
import { Timeline } from './timeline';
import { ITimelineItem } from './item/item.model';
import { TimelineItem } from './item/item';
import { ITimeline } from './timeline.model';

export class TimelineService {

  /**
   * The method is run each time the vehicle starts to charge, drive or park
   * @param {IVehicle} vehicleData
   * @return {Promise<void>}
   */
  static async createTimelineItem(vehicleData: IVehicle) {
    vehicleData.time_zone = 'Europe/Oslo';  // todo: determinate zone for vehicle
    const tz = vehicleData.time_zone;
    const docName = moment().tz(tz).format('YYYYMMDD') + '-' + vehicleData.vin;
    const doc = await this.getTimelineDocById(docName, vehicleData.vin);

    if (doc.exists) {
      await Timeline.createFromDoc(doc).update(vehicleData);
    } else {
      await this.createNewTimelineDoc(vehicleData);
    }
  }

  static async getTimelineDocById(id: string, vin = ''): Promise<DocumentSnapshot> {
    const v = vin || id.split('-')[1];
    return Collection.TIMELINES(v).doc(id).get();
  }

  /**
   * This method is run by CRON and creates a new document if a new day comes
   * @param {QueryDocumentSnapshot} vehicleDoc
   * @returns {Promise<void>}
   */
  static async addDocument(vehicleDoc: QueryDocumentSnapshot) {
    const vehicle = Vehicle.createFromDoc(vehicleDoc);
    vehicle.time_zone = 'Europe/Oslo';  // todo: determinate zone for vehicle
    const tz = vehicle.time_zone;

    if (moment().tz(tz).format('HH') !== '00') {
      return;
    }

    let timelineItem = null;
    const yesterdayDoc = await TimelineService.getPreviousDocument(vehicle);
    if (yesterdayDoc.exists) {
      const { items } = yesterdayDoc.data();
      timelineItem = items[items.length - 1]; // last item of the previous day
    }

    await TimelineService.createNewTimelineDoc(vehicle, timelineItem);
  }

  /**
   * The method returns past Timeline document
   * @param {IVehicle} vehicle
   * @param {number} day
   * @return {Promise<DocumentSnapshot>}
   */
  static async getPreviousDocument(vehicle: IVehicle, day = 1): Promise<DocumentSnapshot> {
    const yesterdayDocName = moment().tz(vehicle.time_zone).subtract(day, 'd').format('YYYYMMDD') + '-' + vehicle.vin;
    return Collection.TIMELINES(vehicle.vin).doc(yesterdayDocName).get();
  }

  /**
   * The method writes new timeline document to db
   * @param {IVehicle} vehicleData
   * @param {ITimelineItem} timelineItem
   * @return {Promise<WriteResult>}
   */
  static async createNewTimelineDoc(vehicleData: IVehicle, timelineItem: ITimelineItem = null): Promise<WriteResult> {

    const newDocName = moment().tz(vehicleData.time_zone).format('YYYYMMDD') + '-' + vehicleData.vin;
    const newTimeline = timelineItem || TimelineItem.init(vehicleData);

    return Collection.TIMELINES(vehicleData.vin).doc(newDocName).set({
      items: [newTimeline],
      vin: vehicleData.vin,
      users: vehicleData.users,
      date: moment().tz(vehicleData.time_zone).format('YYYY-MM-DD')
    });
  }

  /**
   * The method closes past day in the `timelines` collection
   * @param {IVehicle} vehicleData
   * @param {ITimelineItem} timelineItem
   * @param {number} day
   * @return {Promise<void>}
   */
  static async closePastDay(vehicleData: IVehicle, timelineItem: ITimelineItem, day = 1) {
    const yesterdayDoc = await this.getPreviousDocument(vehicleData, day);
    if (yesterdayDoc.exists) {
      const { items } = <ITimeline>yesterdayDoc.data();
      items[items.length - 1] = timelineItem;
      await yesterdayDoc.ref.update({ items });
      if (items.length === 1) {
        await this.closePastDay(vehicleData, timelineItem, day + 1);
      }
    }
  }

}