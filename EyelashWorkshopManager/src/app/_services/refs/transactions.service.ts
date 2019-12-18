import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class TransactionsService {
  firestorePath: string = "refs/transactions";

  constructor(private db: AngularFirestore) {}
}
