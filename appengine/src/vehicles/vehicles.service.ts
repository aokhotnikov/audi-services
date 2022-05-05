import { Injectable } from '@nestjs/common';
import QuerySnapshot = FirebaseFirestore.QuerySnapshot;
import DocumentSnapshot = FirebaseFirestore.DocumentSnapshot;

import { Vehicle } from './vehicle.interface';
import { FirestoreService } from '../cloud/firestore.service';


@Injectable()
export class VehiclesService {

  constructor(private firestore: FirestoreService) { }

  async findAll(): Promise<Vehicle[]> {
    const q: QuerySnapshot = await this.firestore.collection('vehicles')
      .select('users', 'createdAt', 'csid', 'model', 'vin', 'optionCodes', 'registered', 'updatedAt')
      .get();
    const vehicles = q.docs.map(doc => <Vehicle>doc.data());
    return vehicles;
  }

  async findOne(vin: string): Promise<Vehicle> {
    const d: DocumentSnapshot = await this.firestore.collection('vehicles').doc(vin).get();
    return <Vehicle>d.data();
  }
}
