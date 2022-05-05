/**
 * Created by Andrey Okhotnikov
 * Email: hunterov1984@gmail.com
 */
import Timestamp = FirebaseFirestore.Timestamp;

export interface ICharge {
  vin: string;
  chargeId: string;
  startBatteryLevel: number;
  finishBatteryLevel?: number;
  startKwh: number;
  finishKwh?: number;
  addedKwh?: number;
  duration?: number;
  startDate: Date | Timestamp;
  finishDate?: Date | Timestamp;
  createdAt?: Date | Timestamp;
}
