import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/services/app.service";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { StaffModel } from "src/app/models/staff";
import { LashToolService } from "src/app/services/lashtool.service";

@Component({
  selector: "app-new-staff",
  templateUrl: "./new-staff.component.html",
  styleUrls: ["./new-staff.component.scss"]
})
export class NewStaffComponent implements OnInit {
  // declare form control
  staffForm = new FormGroup({
    phone: new FormControl("", Validators.required),
    name: new FormControl("", Validators.required),
    address: new FormControl(),
    credit: new FormControl(),
    lashTool: new FormControl(),
    note: new FormControl()
  });

  constructor(
    private appService: AppService,
    private lashToolService: LashToolService
  ) {
    this.appService.pageTitle = "Thêm Thợ Mới";

    // Set form default value
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
    console.log(newStaff);

    // Return redirect url
  }
}
