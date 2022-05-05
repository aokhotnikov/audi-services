/**
 * Created by Andrey Okhotnikov
 * Email: hunterov1984@gmail.com
 */
import { ITimelineItem } from './item/item.model';

export interface ITimeline {
  date: string;         // YYYY-MM-DD
  items: ITimelineItem[];
  users: string[];
  vin: string;
}

