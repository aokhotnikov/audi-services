/**
 * Created by Andrey Okhotnikov
 * Email: hunterov1984@gmail.com
 */
export interface IStateClimateResponse {
  climater: IStateClimate;
}

export interface IStateData {
  timestamp: string;
  content: any;
}

export interface IZoneState {
  timestamp: string;
  value: {
    isActive: boolean;
    position: string;
  }
}

export interface IStateClimate {
  settings: {
    targetTemperature: IStateData;
    climatisationWithoutHVpower: IStateData;
    heaterSource: IStateData;
    climaterElementSettings: {
      isClimatisationAtUnlock: IStateData;
      isMirrorHeatingEnabled: IStateData;
      zoneSettings: {
        zoneSetting: IZoneState[];
      };
    }
  };
  status: {
    climatisationStatusData: {
      climatisationState: IStateData;
      climatisationStateErrorCode: IStateData;
      remainingClimatisationTime: IStateData;
      climatisationReason: IStateData;
      climatisationElementStates: {
        isMirrorHeatingActive: IStateData;
        extCondAvailableFL: IStateData;
        extCondAvailableFR: IStateData;
        extCondAvailableRL: IStateData;
        extCondAvailableRR: IStateData;
        zoneStates: {
          "zoneState": IZoneState[]
        }
      }
    };
    temperatureStatusData: {
      outdoorTemperature: IStateData;
    };
    vehicleParkingClockStatusData: {
      vehicleParkingClock: IStateData;
    };
  };
}
