import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class ProductTypesService {
  firestorePath: string = "refs/product-types";

  constructor(private db: AngularFirestore) {}
}
