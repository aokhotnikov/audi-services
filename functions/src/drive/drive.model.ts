/**
 * Created by Andrey Okhotnikov on 01.04.20.
 * Email: hunterov1984@gmail.com
 */
import Timestamp = FirebaseFirestore.Timestamp;

export interface IDrive {
  vin: string;
  driveId: string;
  startBatteryLevel: number;
  finishBatteryLevel?: number;
  startKwh: number;
  finishKwh?: number;
  kwhSpent?: number;
  duration?: number;
  startDate: Date | Timestamp;
  finishDate?: Date | Timestamp;
  createdAt?: Date | Timestamp;
}