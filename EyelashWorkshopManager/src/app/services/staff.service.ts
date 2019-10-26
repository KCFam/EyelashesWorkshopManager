import { Injectable } from "@angular/core";
import { StaffModel } from "../models/staff";
import { AngularFirestore } from "@angular/fire/firestore";
import { resolve } from "q";
import { database } from "firebase";

@Injectable({
  providedIn: "root"
})
export class StaffService {
  constructor(private db: AngularFirestore) {}

  // add new staff
  addStaff(newStaff: StaffModel) {
    delete newStaff.id;
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

  // get staffs
  getStaffs(): StaffModel[] {
    let staffs: StaffModel[] = new Array();
    let staffsRef = this.db
      .collection("staffs")
      .ref.get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let staff = new StaffModel();
          staff = doc.data() as StaffModel;
          staff.id = doc.id;
          staffs.push(staff);
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });

    return staffs;
  }

  // get staff with ID
  getStaff(id: string): Promise<firebase.firestore.DocumentSnapshot> {
    return this.db
      .collection("staffs")
      .doc(id)
      .ref.get();
  }

  // update staff
  updateStaff(staff: StaffModel) {
    let id = staff.id;
    delete staff.id;
    let staffsRef = this.db
      .collection("staffs")
      .doc(id)
      .update(staff)
      .catch(err => {
        console.log("Failed to update document", err);
      });
  }
}
