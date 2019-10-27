import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { AppService } from "src/app/services/app.service";
import { LashToolService } from "src/app/services/lashtool.service";
import { StaffService } from "src/app/services/staff.service";
import { StaffModel } from "src/app/models/staff";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-edit-staff",
  templateUrl: "./edit-staff.component.html",
  styleUrls: ["./edit-staff.component.scss"]
})
export class EditStaffComponent implements OnInit {
  // declare form control
  staffForm = new FormGroup({
    phone: new FormControl("", Validators.required),
    name: new FormControl("", Validators.required),
    address: new FormControl(),
    credit: new FormControl(),
    lashTool: new FormControl(),
    note: new FormControl()
  });

  editingStaff: StaffModel = new StaffModel();

  constructor(
    private appService: AppService,
    public lashToolService: LashToolService,
    private staffService: StaffService,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {
    this.appService.pageTitle = "Chỉnh Thông Tin Thợ";

    // Get Staff ID from url
    let id = this.activatedRoute.snapshot.paramMap.get("id");

    // get edit staff
    this.staffService
      .getStaffRef(id)
      .then(doc => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          console.log("Found document with ID", doc.id);

          // Capture firestore doc data
          this.editingStaff = doc.data() as StaffModel;
          this.editingStaff.id = doc.id;

          // Apply data to form control
          this.staffForm.get("phone").setValue(this.editingStaff.phone);
          this.staffForm.get("name").setValue(this.editingStaff.name);
          this.staffForm.get("address").setValue(this.editingStaff.address);
          this.staffForm.get("credit").setValue(this.editingStaff.credit);
          this.staffForm.get("lashTool").setValue(this.editingStaff.lashTool);
          this.staffForm.get("note").setValue(this.editingStaff.note);
        }
      })
      .catch(err => {
        console.log("Error getting document", err);
      });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.staffForm.invalid) return;

    // Convert form data to model
    this.editingStaff.phone = this.staffForm.get("phone").value;
    this.editingStaff.name = this.staffForm.get("name").value;
    this.editingStaff.address = this.staffForm.get("address").value;
    this.editingStaff.credit =
      this.staffForm.get("credit").value == null
        ? 0
        : this.staffForm.get("credit").value;
    this.editingStaff.lashTool = this.staffForm.get("lashTool").value;
    this.editingStaff.note = this.staffForm.get("note").value;

    // Submit data to database
    this.staffService.updateStaff(this.editingStaff);

    // Return redirect url
    this.location.back();
  }

  onCancel() {
    this.location.back();
  }
}
