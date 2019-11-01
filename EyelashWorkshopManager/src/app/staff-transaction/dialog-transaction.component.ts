import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { StaffTransactionModel } from "../models/staff-transaction";

@Component({
  selector: "app-dialog-transaction",
  templateUrl: "./dialog-transaction.component.html",
  styleUrls: ["./dialog-transaction.component.scss"]
})
export class DialogTransactionComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogTransactionComponent>,
    @Inject(MAT_DIALOG_DATA)
    public staffTransaction: StaffTransactionModel
  ) {}

  ngOnInit() {}

  onNoClick() {
    this.dialogRef.close();
  }
}
