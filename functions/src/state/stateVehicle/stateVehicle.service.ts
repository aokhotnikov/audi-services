/**
 * Created by Andrey Okhotnikov
 * Email: hunterov1984@gmail.com
 */
import * as _ from 'lodash';

import { User } from '../../user/user';
import { StateVehicleProvider } from './stateVehicle.provider';
import { IProperty, IStateField, IVehicleDataResponse } from './stateVehicle.model';

export class StateVehicleService {

  static readonly IDS: {[k: string]: string} = {
    '0x0': 'UNKNOWN',
    '0x0101010002': 'UTC_TIME_AND_KILOMETER_STATUS',
    '0x0203010001': 'MAINTENANCE_INTERVAL_DISTANCE_TO_OIL_CHANGE',
    '0x0203010002': 'MAINTENANCE_INTERVAL_TIME_TO_OIL_CHANGE',
    '0x0203010003': 'MAINTENANCE_INTERVAL_DISTANCE_TO_INSPECTION',
    '0x0203010004': 'MAINTENANCE_INTERVAL_TIME_TO_INSPECTION',
    '0x0203010006': 'MAINTENANCE_INTERVAL_ALARM_INSPECTION',
    '0x0203010007': 'MAINTENANCE_INTERVAL_MONTHLY_MILEAGE',
    '0x0203010005': 'WARNING_OIL_CHANGE',
    '0x0204040001': 'OIL_LEVEL_AMOUNT_IN_LITERS',
    '0x0204040002': 'OIL_LEVEL_MINIMUM_WARNING',
    '0x0204040003': 'OIL_LEVEL_DIPSTICKS_PERCENTAGE',
    '0x02040C0001': 'ADBLUE_RANGE',
    '0x0301010001': 'LIGHT_STATUS',
    '0x0301030001': 'BRAKING_STATUS',
    '0x0301030005': 'TOTAL_RANGE',
    '0x030103000A': 'TANK_LEVEL_IN_PERCENTAGE',
    '0x0301040001': 'LOCK_STATE_LEFT_FRONT_DOOR',
    '0x0301040002': 'OPEN_STATE_LEFT_FRONT_DOOR',
    '0x0301040003': 'SAFETY_STATE_LEFT_FRONT_DOOR',
    '0x0301040004': 'LOCK_STATE_LEFT_REAR_DOOR',
    '0x0301040005': 'OPEN_STATE_LEFT_REAR_DOOR',
    '0x0301040006': 'SAFETY_STATE_LEFT_REAR_DOOR',
    '0x0301040007': 'LOCK_STATE_RIGHT_FRONT_DOOR',
    '0x0301040008': 'OPEN_STATE_RIGHT_FRONT_DOOR',
    '0x0301040009': 'SAFETY_STATE_RIGHT_FRONT_DOOR',
    '0x030104000A': 'LOCK_STATE_RIGHT_REAR_DOOR',
    '0x030104000B': 'OPEN_STATE_RIGHT_REAR_DOOR',
    '0x030104000C': 'SAFETY_STATE_RIGHT_REAR_DOOR',
    '0x030104000D': 'LOCK_STATE_TRUNK_LID',
    '0x030104000E': 'OPEN_STATE_TRUNK_LID',
    '0x030104000F': 'SAFETY_STATE_TRUNK_LID',
    '0x0301040010': 'LOCK_STATE_HOOD',
    '0x0301040011': 'OPEN_STATE_HOOD',
    '0x0301040012': 'SAFETY_STATE_HOOD',
    '0x0301050001': 'STATE_LEFT_FRONT_WINDOW',
    '0x0301050003': 'STATE_LEFT_REAR_WINDOW',
    '0x0301050005': 'STATE_RIGHT_FRONT_WINDOW',
    '0x0301050007': 'STATE_RIGHT_REAR_WINDOW',
    '0x0301050009': 'STATE_DECK',
    '0x030105000B': 'STATE_SUN_ROOF_MOTOR_COVER',
    '0x0301030006': 'PRIMARY_RANGE',
    '0x0301030007': 'PRIMARY_DRIVE',
    '0x0301030008': 'SECONDARY_RANGE',
    '0x0301030009': 'SECONDARY_DRIVE',
    '0x0301030002': 'STATE_OF_CHARGE',
    '0x0301020001': 'TEMPERATURE_OUTSIDE',
    '0x0202': 'ACTIVE_INSTRUMENT_CLUSTER_WARNING'
  };

  static async getVehicleState(user: User, vin: string): Promise<{[k: string]: IProperty}> {
    const stateVehicleProvider = new StateVehicleProvider(user.access_token);
    const res: IVehicleDataResponse = await stateVehicleProvider.getVehicleData(vin);
    const states: IStateField[] = res.StoredVehicleDataResponse.vehicleData.data.reduce((acc: IStateField[], obj) => [...acc, ...obj.field], []);
    const payload = states
      .map(({ id, textId, value = '', unit = '', tsCarSentUtc }) => ({
        name: this.IDS[id] || textId || '',
        tsCarSentUtc,
        value,
        unit
      }))
      .filter((el: { [k: string]: string }) => el.name && el.name !== 'tyre_invalid');
    return _.keyBy(payload, 'name');
  }
}
