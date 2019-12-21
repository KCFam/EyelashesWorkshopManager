import { Component, OnInit } from "@angular/core";
import { AppService } from "../_services/_app.service";
import { StaffsService } from "../_services/refs/staffs.service";
import { Observable } from "rxjs";
import { StaffModel } from "../_models/refs/staff";
import { FormControl } from "@angular/forms";
import { map, startWith } from "rxjs/operators";

@Component({
  selector: "app-view-staff",
  templateUrl: "./view-staff.component.html",
  styleUrls: ["./_staff.component.scss"]
})
export class ViewStaffComponent implements OnInit {
  formControlSearchedText = new FormControl();
  filteredStaffs: Observable<StaffModel[]>;
  staffs: StaffModel[] = [
    {
      id: "ads",
      name: "dfafa",
      phone: "dafa",
      address: "dafa",
      credit: 0,
      lashTool: [],
      note: "dafdaf adf a"
    },
    {
      id: "ads",
      name: "dfafa 2",
      phone: "dafa",
      address: "dafa",
      credit: 0,
      lashTool: [],
      note: ""
    },
    {
      id: "ads",
      name: "dfafa 2",
      phone: "dafa",
      address: "dafa",
      credit: 12345,
      lashTool: [],
      note: "note date information"
    },
    {
      id: "ads",
      name: "dfafa 2",
      phone: "dafa",
      address: "dafa",
      credit: 0,
      lashTool: [],
      note: ""
    },
    {
      id: "ads",
      name: "dfafa 2",
      phone: "dafa",
      address: "dafa dfa ddfa fd afa fda fdaf adf adf af da fafda ",
      credit: 0,
      lashTool: ["3D", "4D"],
      note: "note date information"
    },
    {
      id: "ads",
      name: "dfafa 2",
      phone: "dafa",
      address: "dafa",
      credit: 0,
      lashTool: [],
      note: ""
    },
    {
      id: "ads",
      name: "dfafa 2",
      phone: "dafa",
      address: "dafa",
      credit: 0,
      lashTool: [],
      note: ""
    }
  ];

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

  loadDatabaseData() {}

  _filterStaffs(value: string): StaffModel[] {
    const filterValue = value.toLowerCase();
    return this.staffs.filter(
      staff => staff.name.toLowerCase().indexOf(filterValue) !== -1
    );
  }
}
