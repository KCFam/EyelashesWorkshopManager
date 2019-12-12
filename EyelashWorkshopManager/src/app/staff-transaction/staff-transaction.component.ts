import { Component, OnInit } from "@angular/core";
import { AppService } from "../services/app.service";
import { StaffModel, StaffRefModel } from "../models/staff";
import { StaffService } from "../services/staff.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { LashToolService } from "../services/lashtool.service";
import { HairService } from "../services/hair.service";
import {
  StaffTransactionModel,
  StaffTransactionRowModel
} from "../models/staff-transaction";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";
import { DialogTransactionComponent } from "./dialog-transaction.component";
import { Location } from "@angular/common";
import { StaffTransactionService } from "../services/staff-transaction.service";
import { RawProductService } from "../services/raw-product.service";
import { RawProductModel } from "../models/raw-product";

@Component({
  selector: "app-staff-transaction",
  templateUrl: "./staff-transaction.component.html",
  styleUrls: ["./staff-transaction.component.scss"]
})
export class StaffTransactionComponent implements OnInit {
  // create form control
  staffTransactionFormGroup = new FormGroup({
    searchStaff: new FormControl("", [Validators.required]),
    rawProduct: new FormControl("", [Validators.required]),
    quantity: new FormControl("", [Validators.required, Validators.min(1)])
  });

  isTransactionActionsDisplay: boolean = false;

  staffRefList: StaffRefModel[] = new Array(); // List of staff refs
  staffRefOptions: Observable<StaffRefModel[]>; // Search Staff Result

  rawProductList: string[] = new Array();
  rawProductItemList: Object;

  staffTransaction: StaffTransactionModel = new StaffTransactionModel();
  transactions: StaffTransactionRowModel[] = new Array();
  dataSource = new MatTableDataSource<StaffTransactionRowModel>();
  displayedColumns: string[] = [
    "action",
    "itemName",
    "quantity",
    "pricePerItem",
    "total"
  ];

  constructor(
    private appService: AppService,
    private staffService: StaffService,
    public dialog: MatDialog,
    private rawProductService: RawProductService,
    private staffTransactionService: StaffTransactionService,
    private location: Location
  ) {
    // set page title
    this.appService.setPageTitle("Thêm Hàng Giao");

    /* #region  Get staffs ref from services */
    this.staffService.getStaffRefRef().then(doc => {
      if (!doc.exists) {
        console.log("No staff ref");
      } else {
        Object.keys(doc.data()).forEach(key => {
          let staffRef = new StaffRefModel();
          staffRef.id = key;
          staffRef.name = doc.data()[key]["name"];
          staffRef.phone = doc.data()[key]["phone"];
          staffRef.credit = doc.data()[key]["credit"];
          this.staffRefList.push(staffRef);
        });
      }
    });
    /* #endregion */
    // Object.keys(this.rawProductPriceList)[0]

    this.rawProductService.getRawProductOnce().then(data => {
      Object.keys(data.data()).forEach(key => {
        this.rawProductList.push(key);
      });
      this.rawProductItemList = data.data();
    });

    /* #region  listening search staff change */
    this.staffRefOptions = this.staffTransactionFormGroup
      .get("searchStaff")
      .valueChanges.pipe(
        startWith(""),
        map(value =>
          typeof value === "string" ? value : value == null ? "" : value.name
        ),
        map(name => (name ? this._filter(name) : this.staffRefList.slice()))
      );
    this.staffTransactionFormGroup
      .get("searchStaff")
      .valueChanges.subscribe(value => {
        this.isTransactionActionsDisplay = false;
      });
    /* #endregion */
  }

  ngOnInit() {}

  /* #region  Staff Search helper functions */
  staffSearchDisplayFn(staffRef?: StaffRefModel): string | undefined {
    return staffRef ? staffRef.name : undefined;
  }

  private _filter(name: string): StaffRefModel[] {
    const filterValue = name.toUpperCase();

    return this.staffRefList.filter(
      staffOption =>
        staffOption.name.toUpperCase().indexOf(filterValue) === 0 ||
        staffOption.phone.toUpperCase().indexOf(filterValue) === 0
    );
  }
  /* #endregion */

  // helper function for transaction table summary
  /* #region  */
  getQuantityTotal(): number {
    let sum: number = 0;
    this.transactions.forEach(item => {
      sum += item.quantity;
    });
    return sum;
  }

  getTotal(): number {
    let sum: number = 0;
    this.transactions.forEach(item => {
      sum += item.quantity * item.pricePerItem;
    });
    return Math.round(sum / 1000);
  }
  /* #endregion */

  clearSearchedStaff() {
    this.transactions = new Array();
    this.staffTransactionFormGroup.controls["searchStaff"].setValue("");
  }

  onTransactionRemove(transaction) {
    // Remove transaction
    this.transactions.splice(this.transactions.indexOf(transaction), 1);

    // Set Total
    this.staffTransaction.total = this.getTotal();

    // refresh the datasouce
    this.dataSource = new MatTableDataSource<StaffTransactionRowModel>(
      this.transactions
    );
  }

  onStaffSearchSelected(selectedStaff: StaffRefModel) {
    // Sert flag to display transaction actions
    this.isTransactionActionsDisplay = true;

    // Clear form value in case it from the previous selected staff
    this.staffTransactionFormGroup.controls["rawProduct"].setValue("");
    this.staffTransactionFormGroup.controls["quantity"].setValue(null);

    // Clear transaction data
    this.transactions = [];
    this.dataSource = new MatTableDataSource<StaffTransactionRowModel>(
      this.transactions
    );
  }

  addTransaction() {
    // Capture new transaction data
    let newTransaction: StaffTransactionRowModel = new StaffTransactionRowModel();
    newTransaction.itemName = this.staffTransactionFormGroup.controls[
      "rawProduct"
    ].value as string;
    newTransaction.quantity = this.staffTransactionFormGroup.controls[
      "quantity"
    ].value;
    newTransaction.pricePerItem = this.rawProductItemList[
      newTransaction.itemName
    ]["price"];

    // If same item name exist, add the quantity otherwise add new data line
    let itemNameIndex = this.transactions.findIndex(
      value => value.itemName == newTransaction.itemName
    );
    if (itemNameIndex > -1) {
      this.transactions[itemNameIndex].quantity += newTransaction.quantity;
    } else {
      this.transactions.push(newTransaction);
    }

    // Set Quantity
    this.staffTransaction.quantity = this.getQuantityTotal();
    // Set Total
    this.staffTransaction.total = this.getTotal();

    // refresh the datasouce
    this.dataSource = new MatTableDataSource<StaffTransactionRowModel>(
      this.transactions
    );
  }

  // open dialog to confirm transaction data
  openDialog() {
    // capture staff transaction data
    let selectedStaff: StaffRefModel = this.staffTransactionFormGroup.controls[
      "searchStaff"
    ].value;

    //Revent invalid data
    if (selectedStaff.id == null || selectedStaff.id == "") return;

    // capture StaffTransaction Data for the Dialog display
    this.staffTransaction.staffID = selectedStaff.id;
    this.staffTransaction.name = selectedStaff.name;
    this.staffTransaction.credit = selectedStaff.credit;
    this.staffTransaction.transactions = this.transactions;
    this.staffTransaction.transactionCredit = -(
      this.staffTransaction.total + this.staffTransaction.credit
    );

    // Open dialog for confirmation
    const dialogRef = this.dialog.open(DialogTransactionComponent, {
      width: "80%",
      maxWidth: "300px",
      data: this.staffTransaction
    });

    // subscript for dialog close event
    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        // Capture result
        this.staffTransaction = result;

        // Submit transaction
        this.onSubmit();
      }
    });
  }

  onSubmit() {
    // Modified staff transaction
    this.staffTransaction.time = new Date().toISOString();

    // Call service to update staff transaction
    this.staffTransactionService.addStaffTransaction(this.staffTransaction);

    // Return to the previous page
    this.location.back();
  }

  onCancel() {
    // clear transactions
    this.transactions = new Array();

    // Clear Search Staff
    this.staffTransactionFormGroup.get("searchStaff").setValue("");
  }
}
