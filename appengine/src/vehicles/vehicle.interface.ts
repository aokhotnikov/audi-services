import Timestamp = FirebaseFirestore.Timestamp;

export interface Vehicle {
  csid: string;
  vin: string;
  registered: Timestamp | Date;
  users: string[];
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
  model: string;
  optionCodes: string;
}
