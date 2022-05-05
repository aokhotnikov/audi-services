/**
 * Created by Andrey Okhotnikov on 21.04.20.
 * Email: hunterov1984@gmail.com
 */
import { IsNotEmpty, IsNumberString, Matches } from 'class-validator';

export class DrivingDataDto {

  @IsNotEmpty()
  @Matches(/^\d\d\d\d\d\d\d\d-\d\d\d\d$/, { message: `value 'from' must be in the correct format: YYYYMMDD-HHmm`})
  from: string;

  @IsNotEmpty()
  @IsNumberString()
  limit: string;
}