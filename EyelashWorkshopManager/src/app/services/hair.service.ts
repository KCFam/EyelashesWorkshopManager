import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

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
}
