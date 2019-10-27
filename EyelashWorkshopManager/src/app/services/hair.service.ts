import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class HairService {
  constructor(private db: AngularFirestore) {}

  // Get hair types from ref
  getHairTypesOnce(): Promise<firebase.firestore.DocumentSnapshot> {
    return this.db.firestore
      .collection("refs")
      .doc("hair-types")
      .get();
  }
}
