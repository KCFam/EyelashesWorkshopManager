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
    let staffID = staff.name + "-" + new Date().toISOString();
    let newStaffObj = new Object();
    newStaffObj[staffID] = staff;
    return newStaffObj;
  }

  // Create new Staff
  createStaff(newStaff: StaffModel) {
    this.db.firestore
      .doc(this.firestorePath)
      .set(this.convertStaffModelToObject(newStaff), { merge: true })
      .then(value => console.log("Staff Added!"))
      .catch(err => console.log("Staff Create", err));
  }
}
