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

  staffRefList: StaffRefModel[] = new Array(); // List of staff refs
  staffRefOptions: Observable<StaffRefModel[]>; // Search Staff Result
  lashTools: string[] = new Array(); // lash tool select list
  hairTypes: string[] = new Array(); // hair types select list

  staffTransaction: StaffTransactionModel = new StaffTransactionModel();
  transactions: StaffTransactionRowModel[] = new Array();
  displayedColumns: string[] = [
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
    //TEST DATA
    this.transactions.push({
      itemName: "3D-9mm-0.07",
      quantity: 200,
      pricePerItem: 100
    });
    this.transactions.push({
      itemName: "3D-9mm-0.07",
      quantity: 200,
      pricePerItem: 100
    });
    this.transactions.push({
      itemName: "3D-9mm-0.07",
      quantity: 200,
      pricePerItem: 100
    });
    this.transactions.push({
      itemName: "3D-9mm-0.07",
      quantity: 200,
      pricePerItem: 100
    });
    this.transactions.push({
      itemName: "3D-9mm-0.07",
      quantity: 200,
      pricePerItem: 100
    });
    this.transactions.push({
      itemName: "3D-9mm-0.07",
      quantity: 200,
      pricePerItem: 100
    });
    this.transactions.push({
      itemName: "3D-9mm-0.07",
      quantity: 200,
      pricePerItem: 100
    });
    this.transactions.push({
      itemName: "3D-9mm-0.07",
      quantity: 200,
      pricePerItem: 100
    });
    this.transactions.push({
      itemName: "3D-9mm-0.07",
      quantity: 200,
      pricePerItem: 100
    });

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

  onSubmit() {
    console.log("Submitted");
  }

  onCancel() {
    console.log("Cancel");
  }
}
