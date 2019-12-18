import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class LashToolsService {
  firestorePath: string = "refs/lash-tools";

  constructor(private db: AngularFirestore) {}

  getLashToolsRef(): firebase.firestore.DocumentReference {
    return this.db.firestore.doc(this.firestorePath);
  }
}
