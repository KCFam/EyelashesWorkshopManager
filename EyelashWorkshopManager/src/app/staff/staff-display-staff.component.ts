import { Component, OnInit, Input } from "@angular/core";
import { StaffModel } from "../_models/refs/staff";

@Component({
  selector: "app-staff-display-staff",
  templateUrl: "./staff-display-staff.component.html",
  styleUrls: ["./_staff.component.scss"]
})
export class StaffDisplayStaffComponent implements OnInit {
  @Input() staff: StaffModel;

  constructor() {}

  ngOnInit() {}
}
