import { Injectable } from "@angular/core";
import { StaffModel } from "../models/staff";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class ModelRefService {
  constructor(private db: AngularFirestore) {}

  updateStaffRef(staff: StaffModel) {
    // Create obj
    let obj = new Object();
    obj[staff.id] = new Object();
    obj[staff.id]["name"] = staff.name;
    obj[staff.id]["phone"] = staff.phone;

    // update to ref data
    this.db
      .collection("refs")
      .doc("staffs")
      .set(obj, { merge: true });
  }

  getStaffRef(): Promise<firebase.firestore.DocumentSnapshot> {
    return this.db
      .collection("refs")
      .doc("staffs")
      .ref.get();
  }
}
