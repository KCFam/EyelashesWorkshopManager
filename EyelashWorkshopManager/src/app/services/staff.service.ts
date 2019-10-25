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
    let staffsRef = this.db
      .collection("staffs")
      .add({ ...newStaff })
      .then(ref => {
        console.log("Added staff with ID: ", ref.id);
      })
      .catch(err => {
        console.log("Error getting document", err);
      });
  }
}
