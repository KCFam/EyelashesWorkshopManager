import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/services/app.service";
import { FormControl, Validators } from "@angular/forms";
import { StaffModel } from "src/app/models/staff";

@Component({
  selector: "app-new-staff",
  templateUrl: "./new-staff.component.html",
  styleUrls: ["./new-staff.component.scss"]
})
export class NewStaffComponent implements OnInit {
  formControlPhone = new FormControl("", [Validators.required]);
  formControlName = new FormControl("", [Validators.required]);

  formControlLashTool = new FormControl();
  lashToolList: string[] = ["a", "b", "c"];

  staff: StaffModel = new StaffModel();

  constructor(private appService: AppService) {
    this.appService.pageTitle = "Thêm Thợ Mới";
  }

  ngOnInit() {}
}
