/**
 * Created by Andrey Okhotnikov
 * Email: hunterov1984@gmail.com
 */
import WriteResult = FirebaseFirestore.WriteResult;
import DocumentSnapshot = FirebaseFirestore.DocumentSnapshot;
import QueryDocumentSnapshot = FirebaseFirestore.QueryDocumentSnapshot;

import { IUser, IUserInfo } from './user.model';
import { IToken } from './token/token.model';
import { Token } from './token/token';
import { UserProvider } from './user.provider';
import { Collection } from '../class/collection';
import { VehicleService } from '../vehicle/vehicle.service';
import { User } from './user';

export class UserService {

  static async getTokenData(username: string, password: string): Promise<Token> {
    const userProvider = new UserProvider();
    const tokenData: IToken = await userProvider.login(username, password);
    return Token.createToken(tokenData);
  }

  static async addNewUser(username: string, password: string): Promise<IUser> {
    const token = await this.getTokenData(username, password);
    const userProvider = new UserProvider(token.access_token);

    const UserInfo: IUserInfo = await userProvider.getUserInfo();
    const userData: IUser =  await this.createNewUserDoc({ ...token.toPlainObj(), UserInfo, username, password });
    const user = await User.create(userData);

    await VehicleService.checkNewVehicles(user);
    return userData;
  }

  static async createNewUserDoc(user: IUser): Promise<IUser> {
    user.id = new Array(20).join().replace(/(.|$)/g, () => ((Math.random() * 36) | 0).toString(36));
    user.createdAt = new Date();
    user.updatedAt = new Date();
    await Collection.USERS.doc(user.id).set(user);
    return user;
  }

  static async getUserDocById(id: string): Promise<DocumentSnapshot> {
    return Collection.USERS.doc(id).get();
  }

  static async getUserDocsByUsername(name: string): Promise<QueryDocumentSnapshot[]> {
    const querySnapshot = await Collection.USERS.where('username', '==', name).get();
    return querySnapshot.docs;
  }

  static async getAllUserDocs(): Promise<QueryDocumentSnapshot[]> {
    const querySnapshot = await Collection.USERS.get();
    return querySnapshot.docs;
  }

  static async updateUserDoc(id: string, newData: Partial<IUser>): Promise<WriteResult> {
    newData.updatedAt = new Date();
    return Collection.USERS.doc(id).update(newData);
  }

}
