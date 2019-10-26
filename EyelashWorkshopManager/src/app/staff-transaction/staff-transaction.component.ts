import { Component, OnInit } from "@angular/core";
import { AppService } from "../services/app.service";
import { ModelRefService } from "../services/model-ref.service";
import { StaffModel } from "../models/staff";
import { StaffService } from "../services/staff.service";
import { FormGroup, FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import undefined = require("firebase/empty-import");

@Component({
  selector: "app-staff-transaction",
  templateUrl: "./staff-transaction.component.html",
  styleUrls: ["./staff-transaction.component.scss"]
})
export class StaffTransactionComponent implements OnInit {
  staffTransactionFormGroup = new FormGroup({
    searchStaff: new FormControl()
  });

  staffFilteredOptions: Object;
  staffRefList: Object;

  constructor(
    private appService: AppService,
    private modelRefSevice: ModelRefService
  ) {
    this.appService.pageTitle = "Thêm Hàng Giao";

    // Get staff ref list - Convert Document data to list of obj
    this.modelRefSevice
      .getStaffRef()
      .then(snapshot => {
        this.staffRefList = snapshot.data();
        // Copy default data to list
        this.staffFilteredOptions = new Object();
        Object.keys(this.staffRefList).forEach(key => {
          if (key != null) {
            this.staffFilteredOptions[key] = this.staffRefList[key];
          }
        });
      })
      .catch(err => {
        console.log("Error getting document ", err);
      });
  }

  ngOnInit() {
    this.onChange();
  }

  onChange() {
    // find staff change
    this.staffTransactionFormGroup
      .get("searchStaff")
      .valueChanges.subscribe(val => {
        console.log(val);
        if (!val.hasOwnProperty("value")) return;
        this.staffFilteredOptions = new Object();
        Object.keys(this.staffRefList).forEach(key => {
          if (
            key != null &&
            this.staffRefList[key]["name"] != null &&
            this.staffRefList[key]["name"]
              .toLowerCase()
              .indexOf(val["value"]["name"].toLowerCase()) > -1
          ) {
            this.staffFilteredOptions[key] = this.staffRefList[key];
          }
        });
      });
  }

  displayFn(obj?: Object): string | undefined {
    console.log("ENN", obj);
    console.log(this.staffRefList);
    if (obj == null) return "";
    return obj["value"]["name"] ? obj["value"]["name"] : undefined;
  }

  // private _filter(name: string): User[] {
  //   const filterValue = name.toLowerCase();

  //   return this.options.filter(
  //     option => option.name.toLowerCase().indexOf(filterValue) === 0
  //   );
  // }

  onSubmit() {}
}
