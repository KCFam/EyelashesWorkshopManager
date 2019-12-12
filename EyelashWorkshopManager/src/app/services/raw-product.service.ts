import { Injectable } from "@angular/core";
import { AngularFirestore, DocumentReference } from "@angular/fire/firestore";
import { ObjectUnsubscribedError } from "rxjs";
import { RawProductModel } from "../models/raw-product";

@Injectable({
  providedIn: "root"
})
export class RawProductService {
  constructor(private db: AngularFirestore) {}

  getRawProductOnce(): Promise<firebase.firestore.DocumentSnapshot> {
    return this.db.firestore
      .collection("refs")
      .doc("raw-products")
      .get();
  }

  getRawProductSnapshot(): DocumentReference {
    return this.db.firestore.collection("refs").doc("raw-products");
  }

  updateRawProduct(updateRawProduct: RawProductModel) {
    let updateObject = new Object();
    updateObject[updateRawProduct.id] = new Object();
    updateObject[updateRawProduct.id]["price"] = updateRawProduct.price;
    this.db
      .collection("refs")
      .doc("raw-products")
      .set(updateObject, { merge: true })
      .catch(err => {
        console.log("Failed to update raw product!", err);
      });
  }
}
