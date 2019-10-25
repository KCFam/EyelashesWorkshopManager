import { Injectable } from "@angular/core";
import { StaffModel } from "../models/staff";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class StaffService {
  constructor(private db: AngularFirestore) {}

  // add new staff
  addStaff(newStaff: StaffModel) {
    let staffsRef = this.db.collection("staffs");
    let transaction = this.db.firestore.runTransaction(t => {
      return t.get(staffsRef).then(doc => {});
    });
  }
}
