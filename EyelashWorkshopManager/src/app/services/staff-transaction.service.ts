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
    let staffTransactionRef = this.db.firestore.collection(
      "staff-transactions"
    );
    let staffDocRef = this.db.firestore
      .collection("staffs")
      .doc(staffTransaction.staffID)
      .collection("transactions")
      .doc(staffTransaction.time);
    let rawProductRef = this.db.firestore
      .collection("refs")
      .doc("raw-products");

    // Remove input ID
    delete staffTransaction.id;

    // Convert staff transaction data to Object for firestore
    let newStaffTransaction = Object.assign({}, staffTransaction);
    delete newStaffTransaction.time;

    // Convert staff transaction for staff extend to object for firestore
    let expendStaffTransaction = staffTransaction;
    delete expendStaffTransaction.staffID;
    delete expendStaffTransaction.name;
    delete expendStaffTransaction.signature;
    delete expendStaffTransaction.time;
    expendStaffTransaction = Object.assign({}, expendStaffTransaction);

    // Capture data for Refs raw product

    // Run Transaction (because require read data for Refs/raw-products)
    let transaction = this.db.firestore.runTransaction(t => {
      return t
        .get(rawProductRef)
        .then(doc => {
          // Update Staff data
          t.set(staffDocRef, expendStaffTransaction);

          // Add Staff Transaction
          t.set(
            staffTransactionRef.doc(newStaffTransaction.time),
            newStaffTransaction
          );

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
          });
        })
        .catch(err => {
          console.log("Failed to add staff transaction!", err);
        });
    });
  }
}
