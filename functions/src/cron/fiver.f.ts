/**
 * Created by Andrey Okhotnikov
 * Email: hunterov1984@gmail.com
 */
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
try { admin.initializeApp() } catch (e) { }
import { QueryDocumentSnapshot } from '@google-cloud/firestore';

import { Vehicle } from '../vehicle/vehicle';
import { VehicleService } from '../vehicle/vehicle.service';


exports = module.exports = functions.pubsub
  .schedule('every 5 minutes')
  .onRun(async context => {

    const vehicleDocs: QueryDocumentSnapshot[] = await VehicleService.getAllVehicleDocs();
    await Promise.all(vehicleDocs.map(vehicleDoc => {
      const vehicle = Vehicle.createFromDoc(vehicleDoc);
      return vehicle.updateState();
    }));

    return null;
  });
