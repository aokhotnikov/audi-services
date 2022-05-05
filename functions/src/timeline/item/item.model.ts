/**
 * Created by Andrey Okhotnikov
 * Email: hunterov1984@gmail.com
 */
import Timestamp = FirebaseFirestore.Timestamp;

export enum TIMELINE_TYPE {
  DRIVE = 'drive',
  CHARGE = 'charge',
  PARK = 'park'
}

export interface ITimelineItem {
  chargeIds?: string[];
  driveIds?: string[];
  startBatteryLevel?: number;
  finishBatteryLevel?: number;
  duration?: number;
  startDate?: Date | Timestamp;
  finishDate?: Date | Timestamp;
  type: TIMELINE_TYPE;
}

