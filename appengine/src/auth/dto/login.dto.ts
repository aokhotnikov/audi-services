/**
 * Created by Andrey Okhotnikov
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
