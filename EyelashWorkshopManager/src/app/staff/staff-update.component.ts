import { Component, OnInit } from "@angular/core";
import { StaffModel } from "../_models/refs/staff";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AppService } from "../_services/_app.service";
import { LashToolsService } from "../_services/refs/lash-tools.service";
import { StaffsService } from "../_services/refs/staffs.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-staff-update",
  templateUrl: "./staff-update.component.html",
  styleUrls: ["./_staff.component.scss"]
})
export class StaffUpdateComponent implements OnInit {
  staff: StaffModel = new StaffModel();
  formGroupStaff: FormGroup;

  lashTools: string[] = new Array<string>();

  constructor(
    private serviceApp: AppService,
    private serviceLashTools: LashToolsService,
    private serviceStaffs: StaffsService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.serviceApp.setPageTitle("Thêm Thợ");
  }

  ngOnInit() {
    // Initialize data
    this.formGroupStaff = new FormGroup({
      id: new FormControl(""),
      name: new FormControl("", [Validators.required]),
      credit: new FormControl(0),
      phone: new FormControl("", [Validators.required]),
      address: new FormControl(""),
      lashTool: new FormControl(""),
      note: new FormControl("")
    });

    // Load database data
    this.loadDatabaseData();
  }

  loadDatabaseData() {
    // Load Updating Staff ID
    let id = this.route.snapshot.paramMap.get("id");
    this.serviceStaffs.getStaffRef().onSnapshot(snapshot => {
      Object.keys(snapshot.data()).forEach(key => {
        if (id == key) {
          this.formGroupStaff.setValue({ id: key, ...snapshot.data()[key] });
        }
      });
    });

    // Load LashTools data
    this.serviceLashTools.getLashToolsRef().onSnapshot(
      snapshot => {
        this.lashTools = snapshot.data()["array-data"];
      },
      err => {
        console.log(err);
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroupStaff.controls;
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.formGroupStaff.invalid) {
      return;
    }

    // Capture data from form control
    this.staff = this.formGroupStaff.value;
    this.staff.credit = this.staff.credit == null ? 0 : this.staff.credit;

    // Submit data to database
    this.serviceStaffs.updateStaff(this.staff);

    // return to view staff page
    this.location.back();
  }

  onReset() {
    this.formGroupStaff.reset();
  }
}
