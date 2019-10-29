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
    private hairService: HairService
  ) {
    // set page title
    this.appService.setPageTitle("Thêm Hàng Giao");

    /* #region  Get lash tool list from services */
    this.lashToolService
      .getLashToolsOnce()
      .then(doc => {
        if (!doc.exists) {
          console.log("Error no lash tool ref document");
        } else {
          Object.keys(doc.data()).forEach(key => {
            this.lashTools.push(key);
          });
        }
      })
      .catch(err => {
        console.log("Error getting document", err);
      });
    /* #endregion */

    /* #region  Get hair types */
    this.hairService
      .getHairTypesOnce()
      .then(doc => {
        if (!doc.exists) {
          console.log("No hair types ref document");
        } else {
          Object.keys(doc.data()).forEach(key => {
            this.hairTypes.push(key);
          });
        }
      })
      .catch(err => {
        console.log("Error getting document", err);
      });
    /* #endregion */

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

  /* #region  helper function for transaction table summary */
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
    let newTransaction: StaffTransactionRowModel = {
      itemName: (this.staffTransactionFormGroup.controls["lashTool"]
        .value as string)
        .replace(" ", "")
        .concat("-", this.staffTransactionFormGroup.controls["hairType"].value),
      quantity: this.staffTransactionFormGroup.controls["quantity"].value,
      pricePerItem: 100
    };

    // If same item name exist, add the quantity otherwise add new data line
    let itemNameIndex = this.transactions.findIndex(
      value => value.itemName == newTransaction.itemName
    );
    if (itemNameIndex > -1) {
      this.transactions[itemNameIndex].quantity += newTransaction.quantity;
    } else {
      this.transactions.push(newTransaction);
    }

    // refresh the datasouce
    this.dataSource = new MatTableDataSource<StaffTransactionRowModel>(
      this.transactions
    );
  }

  onSubmit() {
    console.log("Submitted");
  }

  onCancel() {
    console.log("Cancel");
  }
}
