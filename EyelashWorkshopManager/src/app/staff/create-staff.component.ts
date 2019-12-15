import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/services/app.service";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { StaffModel } from "src/app/models/staff";
import { LashToolService } from "src/app/services/lashtool.service";
import { StaffService } from "src/app/services/staff.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-create-staff",
  templateUrl: "./create-staff.component.html",
  styleUrls: ["./_staff.component.scss"]
})
export class CreateStaffComponent implements OnInit {
  // declare form control
  staffForm = new FormGroup({
    phone: new FormControl("", Validators.required),
    name: new FormControl("", Validators.required),
    address: new FormControl(),
    credit: new FormControl(),
    lashTool: new FormControl(),
    note: new FormControl()
  });

  lashTools: string[] = new Array(); // lash tool select list

  constructor(
    private appService: AppService,
    private lashToolService: LashToolService,
    private staffService: StaffService,
    private location: Location
  ) {
    // Set page title
    this.appService.setPageTitle("Thêm Thợ Mới");

    // Get lash tool list from services
    this.lashTools = this.lashToolService.getLashToolsOnce();
  }

  ngOnInit() {}

  onSubmit() {
    if (this.staffForm.invalid) return;

    // Convert form data to model
    var newStaff = new StaffModel();
    newStaff.phone = this.staffForm.get("phone").value;
    newStaff.name = this.staffForm.get("name").value;
    newStaff.address = this.staffForm.get("address").value;
    newStaff.credit =
      this.staffForm.get("credit").value == null
        ? 0
        : this.staffForm.get("credit").value;
    newStaff.lashTool = this.staffForm.get("lashTool").value;
    newStaff.note = this.staffForm.get("note").value;

    // Submit data to database
    this.staffService.addStaff(newStaff);

    // Return redirect url
    this.location.back();
  }

  onCancel() {
    this.location.back();
  }
}
