import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef
} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SignaturePad } from "angular2-signaturepad/signature-pad";
import { StaffTransactionModel } from "../models/staff-transaction";

@Component({
  selector: "app-dialog-transaction",
  templateUrl: "./dialog-transaction.component.html",
  styleUrls: ["./dialog-transaction.component.scss"]
})
export class DialogTransactionComponent {
  @ViewChild(SignaturePad, { static: false }) signaturePad: SignaturePad;
  private signaturePadOptions: Object = {
    minWidth: 5,
    canvasWidth: 500,
    canvasHeight: 350
  };

  @ViewChild("signaturePadView", { static: false })
  signaturePadView: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<DialogTransactionComponent>,
    @Inject(MAT_DIALOG_DATA)
    public staffTransaction: StaffTransactionModel
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.signaturePad.set("minWidth", 1);
    this.signaturePad.set("canvasWidth", 250);
    this.signaturePad.set("canvasHeight", 150);
    this.signaturePad.set("backgroundColor", "rgb(192,192,192)");
    this.signaturePad.clear();
  }

  drawComplete() {}

  drawStart() {}

  clearSignature() {
    this.signaturePad.clear();
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onSubmit() {
    // Capture staff transaction data before close
    this.staffTransaction.signature = this.signaturePad.toDataURL();

    // Close dialog
    this.dialogRef.close(this.staffTransaction);
  }
}
