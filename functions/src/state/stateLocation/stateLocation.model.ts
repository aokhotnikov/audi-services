/**
 * Created by Andrey Okhotnikov on 24.03.20.
 * Email: hunterov1984@gmail.com
 */
export interface IStateLocationResponse {
  findCarResponse: {
    Position: IPosition;
    parkingTimeUTC: string;
  }
}

export interface IPosition {
  timestampCarSent: string;
  timestampTssReceived: string;
  carCoordinate: {
    latitude: number;
    longitude: number;
  },
  timestampCarSentUTC: string;
  timestampCarCaptured: string;
}

export interface IStateLocation extends IPosition {
  parkingTimeUTC: string;
}