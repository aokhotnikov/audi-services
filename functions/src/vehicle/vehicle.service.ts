/**
 * Created by Andrey Okhotnikov on 20.03.20.
 * Email: hunterov1984@gmail.com
 */
import QueryDocumentSnapshot = FirebaseFirestore.QueryDocumentSnapshot;
import DocumentSnapshot = FirebaseFirestore.DocumentSnapshot;
import WriteResult = FirebaseFirestore.WriteResult;

import { IVehicle, IVehiclesResponse } from './vehicle.model';
import { VehicleProvider } from './vehicle.provider';
import { Collection } from '../class/collection';
import { Vehicle } from './vehicle';
import { User } from '../user/user';

export class VehicleService {

  static readonly BATTERY_CAPACITY = {
    55: 83.6, // 55 quattro: 95 kWh lithium ion (83.6 kWh usable)
    50: 64.7, // 50 quattro: 71 kWh lithium ion (64.7 kWh usable)
  };

  static getBatteryCapacity(model: string): number {
    const res = /e-tron.*([0-9]{2}).*quattro/.exec(model);
    if (res) {
      // @ts-ignore
      return this.BATTERY_CAPACITY[res[1]];
    }
    return this.BATTERY_CAPACITY[55];
  }

  static async checkNewVehicles(user: User): Promise<any> {

    const vehicleProvider = new VehicleProvider(user.access_token);
    const vehiclesResponse: IVehiclesResponse = await vehicleProvider.getAllVehiclesByUser();
    const { CSIDVins } = vehiclesResponse.getUserVINsResponse;

    for (const obj of CSIDVins) {

      const vehicleDoc = await this.getVehicleDocByVin(obj.VIN);
      if (!vehicleDoc.exists) {
        const vehicleData: IVehicle = {
          vin: obj.VIN,
          csid: obj.CSID,
          registered: new Date(obj.registered),
          users: [user.id],
          createdAt: new Date(),
          updatedAt: new Date()
        };
        const vehicleSpecification: any = await vehicleProvider.getVehicleSpecification(obj.CSID);
        vehicleData.model = vehicleSpecification.ModelCoding['@name'];
        vehicleData.optionCodes = vehicleSpecification.EquipmentSalesFamilies.EquipmentFamilies.reduce(
          (res: string, el: any) => res + el.EquipmentChoice.BASYS.Code + ',', ''
        );
        await this.createNewVehicleDoc(vehicleData);
        continue;
      }

      // add user id to vehicle document if it is missed
      const vehicle = Vehicle.createFromDoc(vehicleDoc);
      if (!vehicle.hasUserId(user.id)) {
        vehicle.users.push(user.id);
        await this.updateVehicleDoc(vehicle.vin, { users: vehicle.users });
      }
    }

  }

  static async createNewVehicleDoc(vehicle: IVehicle): Promise<WriteResult> {
    vehicle.createdAt = new Date();
    vehicle.updatedAt = new Date();
    return Collection.VEHICLES.doc(vehicle.vin).set(vehicle);
  }

  static async getVehicleDocByVin(vin: string): Promise<DocumentSnapshot> {
    return Collection.VEHICLES.doc(vin).get();
  }

  static async getAllVehicleDocs(): Promise<QueryDocumentSnapshot[]> {
    const querySnapshot = await Collection.VEHICLES.get();
    return querySnapshot.docs;
  }

  static async updateVehicleDoc(vin: string, newData: Partial<IVehicle>): Promise<WriteResult> {
    newData.updatedAt = new Date();
    return Collection.VEHICLES.doc(vin).update(newData);
  }
}