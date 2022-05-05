/**
 * Created by Andrey Okhotnikov on 03.04.20.
 * Email: hunterov1984@gmail.com
 */
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}