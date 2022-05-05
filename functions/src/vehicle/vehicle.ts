/**
 * Created by Andrey Okhotnikov on 20.03.20.
 * Email: hunterov1984@gmail.com
 */
import { classToPlain, Exclude } from 'class-transformer';
import Timestamp = FirebaseFirestore.Timestamp;
import DocumentSnapshot = FirebaseFirestore.DocumentSnapshot;
import * as moment from 'moment';
import * as _ from 'lodash';

import { IVehicle } from './vehicle.model';
import { IState } from '../state/state.model';
import { IDrive } from '../drive/drive.model';
import { ICharge } from '../charge/charge.model';
import { VehicleService } from './vehicle.service';
import { StateService } from '../state/state.service';
import { ChargeService } from '../charge/charge.service';
import { DriveService } from '../drive/drive.service';
import { TimelineService } from '../timeline/timeline.service';

export class Vehicle implements IVehicle {

  [index: string]: any;
  csid: string;
  vin: string;
  users: string[];
  registered: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastSeenCharging: Timestamp;
  lastSeenDriving: Timestamp;
  model: string;
  optionCodes: string;
  time_zone: string;
  state: IState;
  currentCharge: ICharge;
  currentDrive: IDrive;

  @Exclude()
  doc: DocumentSnapshot;

  constructor(data: IVehicle) {
    for (const key in data) {
      this[key] = data[key];
    }
  }

  static create(data: IVehicle): Vehicle {
    return new Vehicle(data);
  }

  static createFromDoc(vehicleDoc: DocumentSnapshot): Vehicle {
    const data: IVehicle = <IVehicle>vehicleDoc.data();
    const vehicle = new Vehicle(data);
    vehicle.doc = vehicleDoc;
    return vehicle;
  }

  static async createFromDocVin(vin: string): Promise<Vehicle> {
    const vehicleDoc = await VehicleService.getVehicleDocByVin(vin);
    return this.createFromDoc(vehicleDoc);
  }

  async updateState(): Promise<void> {
    try {
      this.state = await StateService.getState(this.vin, this.users);
      const interpretedStates = this.getInterpretedStates();
      const fieldsToUpdate = this.getFieldsToUpdate(interpretedStates);
      if (interpretedStates.some(s => ['JUST_STARTED_DRIVING', 'JUST_STOPPED_DRIVING', 'JUST_STARTED_CHARGING'].includes(s))) {
        TimelineService.createTimelineItem({ ...this.toPlainObj(), ...fieldsToUpdate }).catch(e => console.log(e));
      }
      await Promise.all([
        VehicleService.updateVehicleDoc(this.vin, { state: this.state, ...fieldsToUpdate }),
        StateService.createNewVehicleStateDoc(this.state)
      ]);
    } catch (err) {
      if (err.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        console.log(`Error (${this.vin}): ${err.response.data.error ? err.response.data.error.error_description : err.message}`);
      } else {
        // The request was made but no response was received or Something happened else
        console.log(`Error (${this.vin}): ${err.message}`);
      }
    }
  }

  getFieldsToUpdate(interpretedStates: string[]) {
    const fields: Partial<IVehicle> = {};

    for (const s of interpretedStates) {

      switch (s) {
        case 'JUST_STARTED_DRIVING':
          this.currentDrive = {
            vin: this.vin,
            driveId: moment().format('YYYYMMDDHHmm') + '-' + this.vin,
            startKwh: this.curBatteryCapacity,
            startBatteryLevel: this.state.stateCharge.status.batteryStatusData.stateOfCharge.content,
            startDate: moment(this.state.stateVehicle['UTC_TIME_AND_KILOMETER_STATUS'].tsCarSentUtc).toDate()
          };
          fields.currentDrive = this.currentDrive;
          break;
        case 'DRIVING':
          this.state.driveId = this.currentDrive.driveId;
          fields.lastSeenDriving = new Date();
          break;
        case 'JUST_STOPPED_DRIVING':
          DriveService.createNewDriveDoc({ ...this.currentDrive }, this);
          this.currentDrive = null;
          fields.currentDrive = null;
          break;
        case 'JUST_STARTED_CHARGING':
          this.currentCharge = {
            vin: this.vin,
            chargeId: moment().format('YYYYMMDDHHmm') + '-' + this.vin,
            startKwh: this.curBatteryCapacity,
            startBatteryLevel: this.state.stateCharge.status.batteryStatusData.stateOfCharge.content,
            startDate: moment(this.state.stateCharge.status.chargingStatusData.chargingState.timestamp).toDate()
          };
          fields.currentCharge = this.currentCharge;
          break;
        case 'CHARGING':
          this.state.chargeId = this.currentCharge.chargeId;
          fields.lastSeenCharging = new Date();
          break;
        case 'JUST_STOPPED_CHARGING':
          ChargeService.createNewChargeDoc({ ...this.currentCharge }, this);
          this.currentCharge = null;
          fields.currentCharge = null;
          break;
      }
    }

    this.state.interpretedState = _.last(interpretedStates);

    return fields;
  }

  isCharging(): boolean {
    return this.state.stateCharge && this.state.stateCharge.status.chargingStatusData.chargingState.content === 'charging';
  }

  isDriving(): boolean {
    return this.state.stateVehicle && this.state.stateVehicle['speed_ok'].value !== '0';
  }

  hasUserId(id: string): boolean {
    return this.users.includes(id);
  }

  get curBatteryCapacity(): number {
    const kwh = VehicleService.getBatteryCapacity(this.model); // battery capacity in kwh
    return +(this.state.stateCharge.status.batteryStatusData.stateOfCharge.content * kwh / 100).toFixed(2);
  }

  getInterpretedStates(): string[] {
    const states = [];
    if (!this.isCharging() && this.currentCharge) {
      states.push('JUST_STOPPED_CHARGING');
    }
    if (this.isDriving() && !this.currentDrive) {
      states.push('JUST_STARTED_DRIVING');
    }
    if (this.isDriving()) {
      states.push('DRIVING');
    }
    if (!this.isDriving() && this.currentDrive) {
      states.push('JUST_STOPPED_DRIVING');
    }
    if (this.isCharging() && !this.currentCharge) {
      states.push('JUST_STARTED_CHARGING');
    }
    if (this.isCharging()) {
      states.push('CHARGING');
    }
    if (!states.length) {
      states.push('PARKING');
    }
    return states;
  }

  toPlainObj(): IVehicle {
    return classToPlain(this) as IVehicle;
  }

}