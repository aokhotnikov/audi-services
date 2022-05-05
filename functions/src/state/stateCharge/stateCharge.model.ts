/**
 * Created by Andrey Okhotnikov on 23.03.20.
 * Email: hunterov1984@gmail.com
 */
import { IStateData } from '../stateClimate/stateClimate.model';

export interface IStateChargeResponse {
  charger: IStateCharge;
}

export interface IStateCharge {
  settings: {
    automaticPlugUnlockSettings: {
      allowDCOnce: boolean;
      allowACOnce: boolean;
      allowDCPermanent: boolean;
      allowACPermanent: boolean;
      timestamp: string;
    };
    maxChargeCurrent: IStateData;
    chargeModeSelection: {
      modificationState: IStateData;
      modificationReason: IStateData;
      value: IStateData;
    };
  };
  status: {
    chargingStatusData: {
      actualChargeRate: IStateData;
      chargingMode: IStateData;
      chargeRateUnit: IStateData;
      chargingStateErrorCode: IStateData;
      chargingReason: IStateData;
      chargeTargetTime: {
        hour: number;
        month: number;
        offset: number;
        year: number;
        day: number;
        timestamp: string;
        minute: number;
      },
      chargingPower: IStateData;
      externalPowerSupplyState: IStateData;
      energyFlow: IStateData;
      chargingState: IStateData;
    };
    cruisingRangeStatusData: {
      engineTypeFirstEngine: IStateData;
      primaryEngineRange: IStateData;
      hybridRange: IStateData;
      engineTypeSecondEngine: IStateData;
    };
    ledStatusData: {
      ledColor: IStateData;
      ledState: IStateData;
    };
    flapStatusData: {
      flapState: IStateData;
      flapLockState: IStateData;
      flapErrorState: IStateData;
    };
    batteryStatusData: {
      stateOfCharge: IStateData;
      remainingChargingTime: IStateData;
      remainingChargingTimeTargetSOC: IStateData;
    };
    plugStatusData: {
      plugState: IStateData;
      plugConnectionState: IStateData;
      plugLockState: IStateData;
      lockState: IStateData;
    };
  };
}