import { Injectable } from '@nestjs/common';
import CollectionReference = FirebaseFirestore.CollectionReference;

import { FirestoreService } from '../cloud/firestore.service';
import { User } from './user.interface';

@Injectable()
export class UserService {

  readonly collection: CollectionReference;

  constructor(private firestore: FirestoreService) {
    this.collection = firestore.collection('users');
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const q = await this.collection.where('username', '==', username).get();
    return q.empty ? undefined : <User>q.docs[0].data();
  }

  async findByUserId(id: string): Promise<User | undefined> {
    const doc = await this.collection.doc(id).get();
    return doc.exists ? <User>doc.data() : undefined;
  }
}
