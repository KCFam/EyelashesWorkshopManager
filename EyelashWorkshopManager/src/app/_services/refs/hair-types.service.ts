import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class HairTypesService {
  firestorePath: string = "refs/hair-types";

  constructor(private db: AngularFirestore) {}
}
