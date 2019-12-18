import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class StaffsService {
  firestorePath: string = "refs/staffs";

  constructor(private db: AngularFirestore) {}
}
