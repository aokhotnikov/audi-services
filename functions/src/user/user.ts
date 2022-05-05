/**
 * Created by Andrey Okhotnikov on 19.03.20.
 * Email: hunterov1984@gmail.com
 */
import Timestamp = FirebaseFirestore.Timestamp;
import DocumentSnapshot = FirebaseFirestore.DocumentSnapshot;

import { IUser, IUserInfo } from './user.model';
import { UserService } from './user.service';
import { Token } from './token/token';

export class User extends Token implements IUser {

  [index: string]: any;
  id: string;
  UserInfo: IUserInfo;
  username: string;
  password: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;

  doc: DocumentSnapshot;

  private constructor(data: IUser) {
    super(data);

    for (const key in data) {
      this[key] = data[key];
    }
  }

  static async create(data: IUser): Promise<User> {
    const user = new User(data);
    if (!user.isTokenValid()) {
      console.log(`Need to update Token for user '${user.id}'`);
      await user.refreshToken();
      console.log(`Token for user '${user.id}' was updated`);
    }
    return user;
  }

  static async createFromDoc(userDoc: DocumentSnapshot): Promise<User> {
    const data: IUser = <IUser>userDoc.data();
    const user = await User.create(data);
    user.doc = userDoc;
    return user;
  }

  static async createFromDocId(userId: string): Promise<User> {
    const userDoc = await UserService.getUserDocById(userId);
    return this.createFromDoc(userDoc);
  }

  async refreshToken() {
    const token = await UserService.getTokenData(this.username, this.password);
    this.access_token = token.access_token;
    this.expires_in = token.expires_in;
    return UserService.updateUserDoc(this.id, { ...token.toPlainObj() });
  }

  toString() {
    return this.id + ' | ' + this.UserInfo.FirstName + ' ' + this.UserInfo.LastName + ' | ' + super.toString();
  }

  toPlainObj(): IUser {
    return { ...this };
  }

}
