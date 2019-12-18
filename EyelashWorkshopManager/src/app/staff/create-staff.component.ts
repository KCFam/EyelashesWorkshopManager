import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { StaffModel } from "../_models/refs/staff";
import { AppService } from "../_services/_app.service";
import { LashToolsService } from "../_services/refs/lash-tools.service";

@Component({
  selector: "app-create-staff",
  templateUrl: "./create-staff.component.html",
  styleUrls: ["./_staff.component.scss"]
})
export class CreateStaffComponent implements OnInit {
  staff: StaffModel = new StaffModel();
  formGroupStaff: FormGroup;

  lashTools: string[] = new Array<string>();

  constructor(
    private serviceApp: AppService,
    private serviceLashTool: LashToolsService
  ) {
    this.serviceApp.setPageTitle("Thêm Thợ");
  }

  ngOnInit() {
    // Load database data
    this.loadDatabaseData();

    // Initialize data
    this.formGroupStaff = new FormGroup({
      name: new FormControl("", [Validators.required]),
      credit: new FormControl(0),
      phone: new FormControl("", [Validators.required]),
      address: new FormControl(""),
      lashTool: new FormControl(""),
      note: new FormControl("")
    });
  }

  loadDatabaseData() {
    // Load LashTools data
    this.serviceLashTool.getLashToolsRef().onSnapshot(
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

    // display form values on success
    alert(
      "SUCCESS!! :-)\n\n" + JSON.stringify(this.formGroupStaff.value, null, 4)
    );
    this.staff = this.formGroupStaff.value;
    console.log(this.staff);
  }

  onReset() {
    this.formGroupStaff.reset();
  }
}
