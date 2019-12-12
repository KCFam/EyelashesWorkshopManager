import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { StaffTransactionModel } from "../models/staff-transaction";

@Injectable({
  providedIn: "root"
})
export class StaffTransactionService {
  constructor(private db: AngularFirestore) {}

  //add new staff transaction
  addStaffTransaction(staffTransaction: StaffTransactionModel) {
    // Capture firestore refs
    let staffDocRef = this.db.firestore
      .collection("staffs")
      .doc(staffTransaction.staffID); // staffs table
    let staffRefDocRef = this.db.firestore.collection("refs").doc("staffs"); // Staff Ref table
    let staffTransactionRef = this.db.firestore.collection(
      "staff-transactions"
    ); // Staff transaction table
    let rawProductRef = this.db.firestore
      .collection("refs")
      .doc("raw-products"); // REF product quanlity table

    // Remove input ID
    delete staffTransaction.id;

    // Convert staff transaction data to Object for firestore - For Staffs table
    let newStaffTransactionObj: Object = Object.assign({}, staffTransaction);
    delete newStaffTransactionObj["staffID"];
    delete newStaffTransactionObj["name"];
    delete newStaffTransactionObj["time"];
    delete newStaffTransactionObj["signature"];
    delete newStaffTransactionObj["transactions"];
    newStaffTransactionObj["transactions"] = new Object();
    staffTransaction.transactions.forEach(transaction => {
      newStaffTransactionObj["transactions"][
        transaction.itemName
      ] = Object.assign({}, transaction);
    });

    // Capture remaining credit
    let remainingCredit: number =
      staffTransaction.credit +
      staffTransaction.total +
      staffTransaction.transactionCredit;

    // Staff REF table to firestore
    let newStaffRefObject: Object = new Object();
    newStaffRefObject[staffTransaction.staffID] = { credit: remainingCredit };

    // Capture data for Refs raw product

    // Run Transaction (because require read data for Refs/raw-products)
    let transaction = this.db.firestore.runTransaction(t => {
      return t
        .get(rawProductRef)
        .then(doc => {
          // Update Staff transaction data
          t.set(
            staffDocRef.collection("transactions").doc(staffTransaction.time),
            Object.assign({}, newStaffTransactionObj)
          );
          console.log("Updated Staff transactions");

          // Update staff credit
          t.set(staffDocRef, { credit: remainingCredit }, { merge: true });
          console.log("Updated Staff Credit");

          // Update Staff ref credit
          t.set(staffRefDocRef, newStaffRefObject, { merge: true });
          console.log("Updated Staff REF Credit");

          // // Add Staff Transaction
          // t.set(
          //   staffTransactionRef.doc(newStaffTransaction.time),
          //   newStaffTransaction
          // );
          // console.log("Updated Staff transactions");

          // Add transactions data to raw products data
          staffTransaction.transactions.forEach(transaction => {
            // Build new update data for item and quantity
            let newData: Object = new Object();
            if (doc.data()[transaction.itemName] == null) {
              newData[transaction.itemName] = new Object();
              newData[transaction.itemName]["quantity"] = transaction.quantity;
            } else {
              newData[transaction.itemName] = doc.data()[transaction.itemName];
              newData[transaction.itemName]["quantity"] =
                newData[transaction.itemName]["quantity"] +
                transaction.quantity;
            }

            // Update data to firestore
            t.set(rawProductRef, newData, { merge: true });
            console.log("Added data to Raw Product REF");
          });
        })
        .catch(err => {
          console.log("Failed to add staff transaction!", err);
        });
    });
  }
}
