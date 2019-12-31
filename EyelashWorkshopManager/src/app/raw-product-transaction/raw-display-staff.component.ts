import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { StaffModel } from "../_models/refs/staff";

@Component({
  selector: "app-raw-display-staff",
  templateUrl: "./raw-display-staff.component.html",
  styleUrls: ["./_raw-product-transaction.component.scss"]
})
export class RawDisplayStaffComponent implements OnInit {
  @Input() staff: StaffModel;

  @Output() selectedStaff = new EventEmitter<StaffModel>();

  constructor() {}

  ngOnInit() {}

  selectStaff(staff: StaffModel) {
    this.selectedStaff.emit(staff);
  }
}
