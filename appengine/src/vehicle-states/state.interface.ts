import Timestamp = FirebaseFirestore.Timestamp;

export interface State {
  vin: string;
  interpretedState: string;
  stateCharge: {
    settings: {[k:string]: any};
    status: {[k:string]: any};
  };
  stateClimate: {
    settings: {[k:string]: any};
    status: {[k:string]: any};
  };
  stateLocation?: {
    timestampCarSent: string;
    timestampTssReceived: string;
    carCoordinate: {
      latitude: number;
      longitude: number;
    },
    timestampCarSentUTC: string;
    timestampCarCaptured: string;
    parkingTimeUTC: string;
  };
  stateVehicle: {
    [k: string]: {
      name: string;
      unit: string;
      value: string;
      tsCarSentUtc: string;
    }
  };
  createdAt: Timestamp | Date;
}
