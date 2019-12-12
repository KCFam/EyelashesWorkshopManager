import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { firestore } from "firebase/app";

@Injectable({
  providedIn: "root"
})
export class HairService {
  // Store hair types
  hairTypes: string[] = new Array();

  constructor(private db: AngularFirestore) {
    // Capture hair types in constructor to save reading doc
    this.db.firestore
      .collection("refs")
      .doc("hair-types")
      .get()
      .then(doc => {
        Object.keys(doc.data()).forEach(key => {
          this.hairTypes.push(key);
        });
      })
      .catch(err => {
        console.log("No hair-types doc in refs", err);
      });
  }

  // Get hair types from ref
  getHairTypesOnce(): string[] {
    return this.hairTypes;
  }

  addHairType(hairType: string) {
    let newHairType = new Object();
    newHairType[hairType] = null;

    // Add new lash Tool
    this.db.firestore
      .collection("refs")
      .doc("hair-types")
      .set(newHairType, { merge: true })
      .catch(err => {
        console.log("Failed to add hair type tool");
      });
  }

  removeHairType(hairType: string) {
    console.log(hairType);

    let newHairType = new Object();
    newHairType[hairType] = firestore.FieldValue.delete();
    this.db.firestore
      .collection("refs")
      .doc("hair-types")
      .update(newHairType)
      .catch(err => {
        console.log("Failed to update hair type", err);
      });

    console.log(newHairType);
  }
}
