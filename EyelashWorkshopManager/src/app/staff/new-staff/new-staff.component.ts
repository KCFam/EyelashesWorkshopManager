import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/services/app.service";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { StaffModel } from "src/app/models/staff";
import { LashToolService } from "src/app/services/lashtool.service";
import { StaffService } from "src/app/services/staff.service";
import { Location } from "@angular/common";

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

  lashTools: string[] = new Array(); // lash tool select list

  constructor(
    private appService: AppService,
    public lashToolService: LashToolService,
    private staffService: StaffService,
    private location: Location
  ) {
    this.appService.pageTitle = "Thông Tin Thợ";

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
          console.log(this.lashTools);
        }
      })
      .catch(err => {
        console.log("Error getting document", err);
      });

    console.log(this.lashTools);
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
