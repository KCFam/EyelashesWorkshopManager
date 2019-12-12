import { Injectable } from "@angular/core";
import { AngularFirestore, DocumentReference } from "@angular/fire/firestore";
import { firestore } from "firebase/app";

@Injectable({
  providedIn: "root"
})
export class LashToolService {
  // store lash tool
  lashTools: string[] = new Array();

  constructor(private db: AngularFirestore) {
    // Read lash tools in contructor to save reading doc
    this.db.firestore
      .collection("refs")
      .doc("lash-tools")
      .get()
      .then(doc => {
        Object.keys(doc.data()).forEach(key => {
          this.lashTools.push(key);
        });
      })
      .catch(err => {
        console.log("No lash-tools doc in refs", err);
      });
  }

  getLashToolsOnce(): string[] {
    //output data
    return this.lashTools;
  }

  getLashToolsForListen(): DocumentReference {
    return this.db.firestore.collection("refs").doc("lash-tools");
  }

  addLashTool(lashTool: string) {
    // Get Ref
    let lashToolRef = this.db.firestore.collection("refs").doc("lash-tools");

    let newLashTool = new Object();
    newLashTool[lashTool] = null;

    // Add new lash Tool
    lashToolRef.set(newLashTool, { merge: true }).catch(err => {
      console.log("Failed to add new lash tool");
    });
  }

  removeLashTool(lashTool: string) {
    let newLashTool = new Object();
    newLashTool[lashTool] = firestore.FieldValue.delete();
    this.db.firestore
      .collection("refs")
      .doc("lash-tools")
      .update({ 0.05: firestore.FieldValue.delete() });
  }
}
