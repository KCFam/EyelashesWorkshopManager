import { Injectable } from "@angular/core";
import { StaffModel, StaffRefModel } from "../models/staff";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class StaffService {
  constructor(private db: AngularFirestore) {}

  // add new staff
  addStaff(newStaff: StaffModel) {
    // Capture firestore refs
    let staffDocRef = this.db.firestore.collection("staffs").doc();
    let staffRefDocRef = this.db.firestore.collection("refs").doc("staffs");

    // Remove input ID
    delete newStaff.id;

    // Build StaffRef
    let staffRef: StaffRefModel = {
      name: newStaff.name,
      id: staffDocRef.id,
      phone: newStaff.phone
    };

    // Convert Data to firestore obj
    let newStaffObj = Object.assign({}, newStaff);
    let newStaffRefObj = new Object();
    newStaffRefObj[staffRef.id] = {
      name: staffRef.name,
      phone: staffRef.phone
    };

    // Run Batch
    let batch = this.db.firestore.batch();
    batch.set(staffDocRef, newStaffObj);
    batch.set(staffRefDocRef, newStaffRefObj, { merge: true });
    batch
      .commit()
      .then(ref => {
        console.log("Added new Staff with ID", staffRef.id, ref);
      })
      .catch(err => {
        console.log("Error to add new staff", err);
      });
  }

  // get staffs
  getStaffsOnce(): StaffModel[] {
    // capture firestore refs
    let staffsRef = this.db.firestore.collection("staffs");

    // Create output data
    let staffs: StaffModel[] = new Array();

    // Retrieve data from firestore
    staffsRef
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          // Read data from firestore
          let staff = new StaffModel();
          staff = doc.data() as StaffModel;
          staff.id = doc.id;
          staffs.push(staff);
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });

    // Output data
    return staffs;
  }

  // get staff with ID
  getStaffRef(id: string): Promise<firebase.firestore.DocumentSnapshot> {
    // Output data
    return this.db.firestore
      .collection("staffs")
      .doc(id)
      .get();
  }

  // update staff
  updateStaff(updateStaff: StaffModel) {
    // Capture firestore refs
    let staffDocRef = this.db.firestore
      .collection("staffs")
      .doc(updateStaff.id);
    let staffRefDocRef = this.db.firestore.collection("refs").doc("staffs");

    // Capture and Remove input ID
    let id = updateStaff.id;
    delete updateStaff.id;

    // Build StaffRef
    let staffRef: StaffRefModel = {
      name: updateStaff.name,
      id: id,
      phone: updateStaff.phone
    };

    // Convert Data to firestore obj
    let updateStaffObj = Object.assign({}, updateStaff);
    let updateStaffRefObj = new Object();
    updateStaffRefObj[id] = {
      name: staffRef.name,
      phone: staffRef.phone
    };

    // Run Batch
    let batch = this.db.firestore.batch();
    batch.update(staffDocRef, updateStaffObj);
    batch.update(staffRefDocRef, updateStaffRefObj);
    batch
      .commit()
      .then(ref => {
        console.log("Updated Staff with ID", staffRef.id, ref);
      })
      .catch(err => {
        console.log("Error to add new staff", err);
      });
  }
}
