import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class ProductTransactionsService {
  firestorePath: string = "product-transactions";

  constructor(private db: AngularFirestore) {}
}
