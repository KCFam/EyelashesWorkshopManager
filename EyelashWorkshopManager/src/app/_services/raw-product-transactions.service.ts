import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class RawProductTransactionsService {
  firestorePath: string = "raw-product-transactions";

  constructor(private db: AngularFirestore) {}
}
