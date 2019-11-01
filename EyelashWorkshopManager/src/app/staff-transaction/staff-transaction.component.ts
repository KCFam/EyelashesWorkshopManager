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
import { RawProductPriceService } from "../services/raw-product-price.service";

@Component({
  selector: "app-staff-transaction",
  templateUrl: "./staff-transaction.component.html",
  styleUrls: ["./staff-transaction.component.scss"]
})
export class StaffTransactionComponent implements OnInit {
  // create form control
  staffTransactionFormGroup = new FormGroup({
    searchStaff: new FormControl("", [Validators.required]),
    lashTool: new FormControl("", [Validators.required]),
    hairType: new FormControl("", [Validators.required]),
    quantity: new FormControl("", [Validators.required, Validators.min(1)])
  });

  isTransactionActionsDisplay: boolean = false;

  staffRefList: StaffRefModel[] = new Array(); // List of staff refs
  staffRefOptions: Observable<StaffRefModel[]>; // Search Staff Result
  lashTools: string[] = new Array(); // lash tool select list
  hairTypes: string[] = new Array(); // hair types select list

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
    private lashToolService: LashToolService,
    private hairService: HairService,
    public dialog: MatDialog,
    private rawProductPricesService: RawProductPriceService
  ) {
    // set page title
    this.appService.setPageTitle("Thêm Hàng Giao");

    // Get lash tool list from services
    this.lashTools = this.lashToolService.getLashToolsOnce();

    // #region  Get hair types
    this.hairTypes = this.hairService.getHairTypesOnce();

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
          this.staffRefList.push(staffRef);
        });
      }
    });
    /* #endregion */

    /* #region  listening search staff change */
    this.staffRefOptions = this.staffTransactionFormGroup
      .get("searchStaff")
      .valueChanges.pipe(
        startWith(""),
        map(value => (typeof value === "string" ? value : value.name)),
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
    return sum;
  }
  /* #endregion */

  onTransactionRemove(transaction) {
    this.transactions.splice(this.transactions.indexOf(transaction), 1);
    this.dataSource = new MatTableDataSource<StaffTransactionRowModel>(
      this.transactions
    );
  }

  onStaffSearchSelected(selectedStaff: StaffRefModel) {
    // Sert flag to display transaction actions
    this.isTransactionActionsDisplay = true;

    // Clear form value in case it from the previous selected staff
    this.staffTransactionFormGroup.controls["lashTool"].setValue("");
    this.staffTransactionFormGroup.controls["hairType"].setValue("");
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
    newTransaction.itemName = (this.staffTransactionFormGroup.controls[
      "lashTool"
    ].value as string)
      .replace(/ /g, "")
      .concat("-", this.staffTransactionFormGroup.controls["hairType"].value);
    newTransaction.quantity = this.staffTransactionFormGroup.controls[
      "quantity"
    ].value;
    newTransaction.pricePerItem = this.rawProductPricesService.getRawProductPricesOnce()[
      newTransaction.itemName
    ];

    // If same item name exist, add the quantity otherwise add new data line
    let itemNameIndex = this.transactions.findIndex(
      value => value.itemName == newTransaction.itemName
    );
    if (itemNameIndex > -1) {
      this.transactions[itemNameIndex].quantity += newTransaction.quantity;
    } else {
      this.transactions.push(newTransaction);
    }

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

    // Revent invalid data
    if (selectedStaff.id == null || selectedStaff.id == "") return;

    // capture StaffTransaction Data for the Dialog display
    this.staffTransaction.staffID = selectedStaff.id;
    this.staffTransaction.name = selectedStaff.name;
    this.staffTransaction.transactions = this.transactions;

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
        this.onSubmit();
      }
    });
  }

  onSubmit() {
    console.log("Submitted");
  }

  onCancel() {
    console.log("Cancel");
  }
}
