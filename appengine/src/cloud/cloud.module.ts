import { Module } from '@nestjs/common';

import { FirestoreService } from './firestore.service';

@Module({
  providers: [FirestoreService],
  exports: [FirestoreService] // add export so that other modules can see services upon import
})
export class CloudModule {}
