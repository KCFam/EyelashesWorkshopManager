import { Component, OnInit } from "@angular/core";
import { StaffService } from "src/app/services/staff.service";
import { StaffModel } from "src/app/models/staff";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-view-staff",
  templateUrl: "./view-staff.component.html",
  styleUrls: ["./view-staff.component.scss"]
})
export class ViewStaffComponent implements OnInit {
  staffs: StaffModel[];
  searchText: string = "";
  searchedStaffs: StaffModel[];

  constructor(
    private appService: AppService,
    private staffService: StaffService
  ) {
    this.appService.pageTitle = "Thông Tin Thợ";

    this.staffs = this.staffService.getStaffs();
    this.searchedStaffs = this.staffs;
  }

  ngOnInit() {}

  onSearchChange() {
    let searchText = this.searchText.toUpperCase();
    if (searchText == "") this.searchedStaffs = this.staffs;
    else
      this.searchedStaffs = this.staffs.filter(staff => {
        return (
          (staff.name != null &&
            staff.name.toUpperCase().includes(searchText)) ||
          (staff.phone != null &&
            staff.phone.toUpperCase().includes(searchText)) ||
          (staff.address != null &&
            staff.address.toUpperCase().includes(searchText)) ||
          (staff.lashTool != null &&
            staff.lashTool.filter(lashTool =>
              lashTool.toUpperCase().includes(searchText)
            ).length > 0) ||
          (staff.note != null && staff.note.toUpperCase().includes(searchText))
        );
      });
  }
}
