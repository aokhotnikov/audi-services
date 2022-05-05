/**
 * Created by Andrey Okhotnikov on 20.03.20.
 * Email: hunterov1984@gmail.com
 */
import Timestamp = FirebaseFirestore.Timestamp;

import { IState } from '../state/state.model';
import { ICharge } from '../charge/charge.model';
import { IDrive } from '../drive/drive.model';

export interface IVehiclesResponse {
  getUserVINsResponse: {
    CSIDVins: {
      CSID: string;
      VIN: string;
      registered: string;
    }[];
    vinsOnBlacklist: number;
  };
}

export interface IVehicle {
  [index: string]: any;
  csid: string;
  vin: string;
  users: string[];
  registered: Timestamp | Date;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
  lastSeenCharging?: Timestamp | Date;
  lastSeenDriving?: Timestamp | Date;
  model?: string;
  time_zone?: string;
  optionCodes?: string;
  state?: IState;
  currentCharge?: ICharge;
  currentDrive?: IDrive;
}