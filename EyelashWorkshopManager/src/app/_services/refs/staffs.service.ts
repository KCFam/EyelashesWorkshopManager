import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { StaffModel } from "src/app/_models/refs/staff";

@Injectable({
  providedIn: "root"
})
export class StaffsService {
  firestorePath: string = "refs/staffs";

  constructor(private db: AngularFirestore) {}

  // Convert Staff Model to Database Staff Data
  convertStaffModelToObject(staff: StaffModel): Object {
    let id = staff.id;
    delete staff.id;
    let newStaffObj = new Object();
    newStaffObj[id] = staff;
    return newStaffObj;
  }

  // Create new Staff
  createStaff(newStaff: StaffModel) {
    newStaff.id = newStaff.name + "-" + new Date().toISOString();
    this.db.firestore
      .doc(this.firestorePath)
      .set(this.convertStaffModelToObject(newStaff), { merge: true })
      .then(value => console.log("Staff Added!"))
      .catch(err => console.log("Staff Create", err));
  }

  // Update an existing Staff
  updateStaff(updateStaff: StaffModel) {
    this.db.firestore
      .doc(this.firestorePath)
      .set(this.convertStaffModelToObject(updateStaff), { merge: true })
      .then(value => console.log("Staff Updated!"))
      .catch(err => console.log("Error", err));
  }

  // Get Staff Ref
  getStaffRef(): firebase.firestore.DocumentReference {
    return this.db.firestore.doc("refs/staffs");
  }
}
