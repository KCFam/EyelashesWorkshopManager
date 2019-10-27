import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class LashToolService {
  constructor(private db: AngularFirestore) {}

  getLashToolsOnce(): Promise<firebase.firestore.DocumentSnapshot> {
    //output data
    return this.db.firestore
      .collection("refs")
      .doc("lash-tools")
      .get();
  }
}
