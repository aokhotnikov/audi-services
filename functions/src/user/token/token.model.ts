/**
 * Created by Andrey Okhotnikov on 19.03.20.
 * Email: hunterov1984@gmail.com
 */
export interface IToken {
  access_token: string;
  token_type: string;
  expires_in: number;
}