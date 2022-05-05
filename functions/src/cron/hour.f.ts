/**
 * Created by Andrey Okhotnikov
 * Email: hunterov1984@gmail.com
 */
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
try { admin.initializeApp() } catch (e) { }
import { QueryDocumentSnapshot } from '@google-cloud/firestore';

import { VehicleService } from '../vehicle/vehicle.service';
import { TimelineService } from '../timeline/timeline.service';


exports = module.exports = functions.pubsub
  .schedule('0 */1 * * *')
  .onRun(async context => {

    const allVehiclesDocs: QueryDocumentSnapshot[] = await VehicleService.getAllVehicleDocs();
    await Promise.all(allVehiclesDocs.map(TimelineService.addDocument));

    return null;
  });
