/**
 * Created by Andrey Okhotnikov
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
