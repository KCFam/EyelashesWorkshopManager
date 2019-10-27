import { Component, OnInit } from "@angular/core";
import { AppService } from "../services/app.service";
import { StaffModel, StaffRefModel } from "../models/staff";
import { StaffService } from "../services/staff.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { LashToolService } from "../services/lashtool.service";
import { HairService } from "../services/hair.service";

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
    hairType: new FormControl("", [Validators.required])
  });

  staffRefList: StaffRefModel[] = new Array(); // List of staff refs
  staffRefOptions: Observable<StaffRefModel[]>; // Search Staff Result
  lashTools: string[] = new Array(); // lash tool select list
  hairTypes: string[] = new Array(); // hair types select list

  constructor(
    private appService: AppService,
    private staffService: StaffService,
    private lashToolService: LashToolService,
    private hairService: HairService
  ) {
    // set page title
    this.appService.setPageTitle("Thêm Hàng Giao");

    // Get lash tool list from services
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

    // Get hair types
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

    // Get staffs ref from services
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

    // Listening search staff change
    this.staffRefOptions = this.staffTransactionFormGroup
      .get("searchStaff")
      .valueChanges.pipe(
        startWith(""),
        map(value => (typeof value === "string" ? value : value.name)),
        map(name => (name ? this._filter(name) : this.staffRefList.slice()))
      );
  }

  ngOnInit() {}

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

  onSubmit() {}

  onCancel() {}
}
