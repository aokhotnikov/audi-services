/**
 * Created by Andrey Okhotnikov on 19.03.20.
 * Email: hunterov1984@gmail.com
 */
import Timestamp = FirebaseFirestore.Timestamp;
import { IToken } from './token/token.model';

export interface IUserInfo {
  Salutation: string;
  Title: string;
  FirstName: string;
  LastName: string;
  Email: string;
}

export interface IUser extends IToken {
  [index: string]: any;
  id?: string;
  username: string;
  password: string;
  UserInfo: IUserInfo;
  createdAt?: Timestamp | Date;
  updatedAt?: Timestamp | Date;
}