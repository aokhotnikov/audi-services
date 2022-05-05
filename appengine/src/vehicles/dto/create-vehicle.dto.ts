/**
 * Created by Andrey Okhotnikov on 27.03.20.
 * Email: hunterov1984@gmail.com
 */
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVehicleDto {

  @IsNotEmpty()
  @IsString()
  readonly vin: string;

  @IsString()
  readonly csid: string;
}