import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class RawProductPriceService {
  // Data structure
  rawProductPricesList: Object = new Object();

  constructor(private db: AngularFirestore) {
    // Capture data in constrtor to save read time to this document
    this.db.firestore
      .collection("refs")
      .doc("raw-product-prices")
      .get()
      .then(doc => {
        this.rawProductPricesList = doc.data();
      })
      .catch(err => {
        console.log("No raw-product-prices doc in refs", err);
      });
  }

  getRawProductPricesOnce() {
    return this.rawProductPricesList;
  }
}
