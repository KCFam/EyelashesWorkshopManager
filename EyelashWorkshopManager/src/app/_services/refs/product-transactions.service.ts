import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class ProductionTransactionsService {
  firestorePath: string = "refs/product-transactions";

  constructor(private db: AngularFirestore) {}
}
