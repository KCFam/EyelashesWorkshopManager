import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class RawProductsService {
  firestorePath: string = "refs/raw-products";

  constructor(private db: AngularFirestore) {}
}
