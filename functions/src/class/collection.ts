/**
 * Created by Andrey Okhotnikov on 20.03.20.
 * Email: hunterov1984@gmail.com
 */
import * as admin from 'firebase-admin';
try { admin.initializeApp() } catch (e) { }
const firestore = admin.firestore();

export class Collection {
  static readonly USERS = firestore.collection('users');
  static readonly VEHICLES = firestore.collection('vehicles');
  static readonly VEHICLE_STATES = firestore.collection('vehicleStates');
  static readonly CHARGES = (vin: string) => Collection.VEHICLES.doc(vin).collection('charges');
  static readonly DRIVES = (vin: string) => Collection.VEHICLES.doc(vin).collection('drives');
  static readonly TIMELINES = (vin: string) => Collection.VEHICLES.doc(vin).collection('timelines');
}
