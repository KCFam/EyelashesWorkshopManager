import { Injectable, EventEmitter } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { firestore } from "firebase/app";
import { Observable, BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class HairService {
  // Store hair types
  hairTypes: string[] = new Array();

  constructor(private db: AngularFirestore) {}

  getHairTypeRef(): Promise<firestore.DocumentSnapshot> {
    return this.db.firestore
      .collection("refs")
      .doc("hair-types")
      .get();
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

  getHairTypes(): string[] {
    let arr: string[] = new Array();
    this.db.firestore
      .collection("refs")
      .doc("hair-types")
      .get()
      .then(doc => {
        arr = doc.data()["array-data"];
        console.log(arr);
        // Object.keys(doc.data()).forEach(key => {
        //   this.hairTypes.push(key);
        // });
      })
      .catch(err => {
        console.log("No hair-types doc in refs", err);
      });
    console.log(arr);
    return arr;
  }
}
