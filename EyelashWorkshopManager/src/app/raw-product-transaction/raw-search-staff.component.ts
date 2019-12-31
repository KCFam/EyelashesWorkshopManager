import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { StaffModel } from "../_models/refs/staff";
import { StaffsService } from "../_services/refs/staffs.service";
import { map, startWith } from "rxjs/operators";

@Component({
  selector: "app-raw-search-staff",
  templateUrl: "./raw-search-staff.component.html",
  styleUrls: ["./_raw-product-transaction.component.scss"]
})
export class RawSearchStaffComponent implements OnInit {
  formControlSearchedText = new FormControl();
  filteredStaffs: Observable<StaffModel[]>;
  staffs: StaffModel[] = [];
  selectedStaff: StaffModel;

  constructor(private serviceStaff: StaffsService) {}

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

  onSelectStaff(staff: StaffModel) {
    this.selectedStaff = staff;
  }

  clearSelectedStaff() {
    this.selectedStaff = null;
  }
}
