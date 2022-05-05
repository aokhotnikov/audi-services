import { Firestore } from '@google-cloud/firestore';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Settings = FirebaseFirestore.Settings;

@Injectable()
export class FirestoreService extends Firestore implements OnModuleInit {

  constructor(private configSrv: ConfigService) {
    super();

    console.log('Init FirestoreService');

    const projectId = configSrv.get('GOOGLE_CLOUD_PROJECT');
    const keyFilename = configSrv.get('KEY_FILENAME');

    const params: Settings = { projectId };

    if (keyFilename) {
      params.keyFilename = process.cwd() + '/service_accounts/' + keyFilename;
    }

    this.settings(params);
  }

  onModuleInit() {
    console.log(`FirestoreService has been initialized`);
  }
}
