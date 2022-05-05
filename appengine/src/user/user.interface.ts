/**
 * Created by Andrey Okhotnikov
 * Email: hunterov1984@gmail.com
 */
import Timestamp = FirebaseFirestore.Timestamp;

export interface User {
  id: string;
  username: string;
  password: string;
  UserInfo: {
    Salutation: string;
    Title: string;
    FirstName: string;
    LastName: string;
    Email: string;
  };
  access_token: string;
  expires_in: number;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
}
