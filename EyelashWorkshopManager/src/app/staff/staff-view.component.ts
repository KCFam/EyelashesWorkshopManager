import { Component, OnInit } from "@angular/core";
import { AppService } from "../_services/_app.service";
import { StaffsService } from "../_services/refs/staffs.service";
import { Observable } from "rxjs";
import { StaffModel } from "../_models/refs/staff";
import { FormControl } from "@angular/forms";
import { map, startWith } from "rxjs/operators";

@Component({
  selector: "app-staff-view",
  templateUrl: "./staff-view.component.html",
  styleUrls: ["./_staff.component.scss"]
})
export class StaffViewComponent implements OnInit {
  formControlSearchedText = new FormControl();
  filteredStaffs: Observable<StaffModel[]>;
  staffs: StaffModel[] = [];

  constructor(
    private serviceApp: AppService,
    private serviceStaff: StaffsService
  ) {
    // Set page title
    this.serviceApp.setPageTitle("Thông Tin Thợ");
  }

  ngOnInit() {
    // Load database data
    this.loadDatabaseData();

    // Listen for search text changes
    this.filteredStaffs = this.formControlSearchedText.valueChanges.pipe(
      startWith(""),
      map(staff => (staff ? this._filterStaffs(staff) : this.staffs.slice()))
    );
  }

  loadDatabaseData() {
    // Get Staff data
    this.serviceStaff.getStaffRef().onSnapshot(snapshot => {
      this.staffs = [];
      Object.keys(snapshot.data()).forEach(key => {
        let newStaff: StaffModel = { id: key, ...snapshot.data()[key] };
        this.staffs.push(newStaff);
      });
    });
  }

  _filterStaffs(value: string): StaffModel[] {
    const filterValue = value.toLowerCase();
    return this.staffs.filter(
      staff =>
        staff.name.toLowerCase().indexOf(filterValue) !== -1 ||
        staff.phone.toLowerCase().indexOf(filterValue) !== -1
    );
  }
}
