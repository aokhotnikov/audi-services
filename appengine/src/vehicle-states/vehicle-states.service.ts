import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import CollectionReference = FirebaseFirestore.CollectionReference;
import Timestamp = FirebaseFirestore.Timestamp;

import { FirestoreService } from '../cloud/firestore.service';
import { State } from './state.interface';

@Injectable()
export class VehicleStatesService {

  readonly collection: CollectionReference;

  constructor(private firestore: FirestoreService) {
    this.collection = this.firestore.collection('vehicleStates');
  }

  async getLastStatesByVin(vin: string, count = 20): Promise<State[]> {
    const q = await this.collection
      .where('vin', '==', vin)
      .orderBy('createdAt', 'desc')
      .limit(+count)
      .get();
    const states = q.docs.map(doc => {
      const state = <State>doc.data();
      state.createdAt = (state.createdAt as Timestamp).toDate();
      return state;
    });
    return states;
  }

  async getStatesByChargeId(id: string): Promise<{[k:string]: any}[]> {
    const q = await this.collection
      .where('chargeId', '==', id)
      .orderBy('createdAt', 'asc')
      // .select('stateCharge.status', 'stateClimate.status', 'createdAt')
      .get();
    return q.docs.map(d => {
      const { interpretedState, createdAt, stateCharge, stateClimate, stateVehicle, stateLocation } = <State>d.data();
      const { chargingStatusData, batteryStatusData, plugStatusData } = stateCharge.status;
      const { climatisationStatusData } = stateClimate.status;
      const { STATE_OF_CHARGE, TOTAL_RANGE, UTC_TIME_AND_KILOMETER_STATUS, speed_ok } = stateVehicle;
      const { carCoordinate } = stateLocation || {};
      return {
        SPEED: speed_ok.value + speed_ok.unit,
        ODOMETER: UTC_TIME_AND_KILOMETER_STATUS.value + UTC_TIME_AND_KILOMETER_STATUS.unit,
        STATE_OF_CHARGE: STATE_OF_CHARGE.value + STATE_OF_CHARGE.unit,
        TOTAL_RANGE: TOTAL_RANGE.value + TOTAL_RANGE.unit,
        climate_state: {
          conditioning: climatisationStatusData.climatisationState.content,
          remaining_climate_time: climatisationStatusData.remainingClimatisationTime.content,
        },
        charge_state: {
          plug_state: plugStatusData.plugState.content,
          battery_level: batteryStatusData.stateOfCharge.content,
          remaining_charging_time: batteryStatusData.remainingChargingTime.content,
          charging: chargingStatusData.chargingState.content,
          power: chargingStatusData.chargingPower.content,
          km_per_h: chargingStatusData.actualChargeRate.content,
          mode: chargingStatusData.chargingMode.content,  // off, conditioning, AC
          energy_flow: chargingStatusData.energyFlow.content,
        },
        carCoordinate,
        interpretedState,
        createdAt: (createdAt as Timestamp).toDate()
      };
    });
      // .filter(el => el.climate_state.conditioning !== 'off');
  }

  async getStatesByDriveId(id: string): Promise<{[k:string]: any}[]> {
    const q = await this.collection
      .where('driveId', '==', id)
      .orderBy('createdAt', 'asc')
      .get();
    return q.docs.map(d => {
      const { interpretedState, createdAt, stateVehicle, stateLocation } = <State>d.data();
      const { STATE_OF_CHARGE, TOTAL_RANGE, UTC_TIME_AND_KILOMETER_STATUS, speed_ok } = stateVehicle;
      const { carCoordinate } = stateLocation || {};
      return {
        SPEED: speed_ok.value + speed_ok.unit,
        ODOMETER: UTC_TIME_AND_KILOMETER_STATUS.value + UTC_TIME_AND_KILOMETER_STATUS.unit,
        STATE_OF_CHARGE: STATE_OF_CHARGE.value + STATE_OF_CHARGE.unit,
        TOTAL_RANGE: TOTAL_RANGE.value + TOTAL_RANGE.unit,
        carCoordinate,
        interpretedState,
        tsCarSent: moment(UTC_TIME_AND_KILOMETER_STATUS.tsCarSentUtc).toDate(),
        createdAt: (createdAt as Timestamp).toDate()
      };
    });
  }

  async getDrivingDataFromDate(vin: string, date: Date, count = 20): Promise<{[k:string]: any}[]> {
    const q = await this.collection
      .where('vin', '==', vin)
      .where('createdAt', '>', date)
      .orderBy('createdAt', 'asc')
      .limit(count)
      .get();
    return q.docs.map(d => {
      const { interpretedState, createdAt, stateVehicle, stateLocation } = <State>d.data();
      const { STATE_OF_CHARGE, TOTAL_RANGE, UTC_TIME_AND_KILOMETER_STATUS, speed_ok } = stateVehicle;
      const { carCoordinate } = stateLocation || {};
      return {
        SPEED: speed_ok.value + speed_ok.unit,
        ODOMETER: UTC_TIME_AND_KILOMETER_STATUS.value + UTC_TIME_AND_KILOMETER_STATUS.unit,
        STATE_OF_CHARGE: STATE_OF_CHARGE.value + STATE_OF_CHARGE.unit,
        TOTAL_RANGE: TOTAL_RANGE.value + TOTAL_RANGE.unit,
        carCoordinate,
        interpretedState,
        createdAt: (createdAt as Timestamp).toDate()
      };
    });
  }
}
