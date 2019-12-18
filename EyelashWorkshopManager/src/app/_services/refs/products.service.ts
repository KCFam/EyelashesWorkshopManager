import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class ProductsService {
  firestorePath: string = "refs/products";

  constructor(private db: AngularFirestore) {}
}
