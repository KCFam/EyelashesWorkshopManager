import { Injectable } from "@angular/core";
import { StaffModel, StaffRefModel } from "../models/staff";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class StaffService {
  firestorePath: string = "refs/staffs";

  constructor(private db: AngularFirestore) {}

  getStaffsDoc(): firebase.firestore.DocumentReference {
    return this.db.firestore.doc(this.firestorePath);
  }

  getStaffsOnce(): Promise<firebase.firestore.DocumentSnapshot> {
    return this.db.firestore.doc(this.firestorePath).get();
  }

  //OLD
  // add new staff
  addStaff(newStaff: StaffModel) {
    // Capture firestore refs

    let staffDocRef = this.db.firestore
      .collection("staffs")
      .doc(
        newStaff.name + "-" + this.db.firestore.collection("staffs").doc().id
      );
    let staffRefDocRef = this.db.firestore.collection("refs").doc("staffs");

    // Remove input ID
    delete newStaff.id;

    // Build StaffRef
    let staffRef: StaffRefModel = {
      name: newStaff.name,
      id: staffDocRef.id,
      phone: newStaff.phone,
      credit: newStaff.credit
    };

    // Convert Data to firestore obj
    let newStaffObj = Object.assign({}, newStaff);
    let newStaffRefObj = new Object();
    newStaffRefObj[staffRef.id] = {
      name: staffRef.name,
      phone: staffRef.phone,
      credit: staffRef.credit
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
      phone: updateStaff.phone,
      credit: updateStaff.credit
    };

    // Convert Data to firestore obj
    let updateStaffObj = Object.assign({}, updateStaff);
    let updateStaffRefObj = new Object();
    updateStaffRefObj[id] = {
      name: staffRef.name,
      phone: staffRef.phone,
      credit: staffRef.credit
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

  // get staff ref as array of StaffRef
  getStaffRefRef(): Promise<firebase.firestore.DocumentSnapshot> {
    // return outout
    return this.db.firestore
      .collection("refs")
      .doc("staffs")
      .get();
  }

  // get staff credit
  getStaffCredit(id: string): number {
    let returnValue: number = 0;
    this.db.firestore
      .collection("staffs")
      .doc(id)
      .get()
      .then(data => (returnValue = data.data()["price"] as number))
      .catch(err => console.log("Failed to read staff " + id, err));
    return returnValue;
  }
}
