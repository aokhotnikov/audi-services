/**
 * Created by Andrey Okhotnikov on 23.03.20.
 * Email: hunterov1984@gmail.com
 */

export interface IVehicleDataResponse {
  StoredVehicleDataResponse: {
    vin: string;
    vehicleData: {
      data: {
        id: string;
        field: IStateField[];
      }[];
    };
  };
}

export interface IStateField extends IProperty {
  name: string;
  textId: string;
  id: string;
  unit: string;
  value: string;
  tsTssReceivedUtc: string;
  tsCarCaptured: string;
  tsCarSentUtc: string;
  tsCarSent: string;
  milCarCaptured: number;
  milCarSent: number;
}

export interface IProperty {
  name: string;
  unit: string;
  value: string;
  tsCarSentUtc: string;
}