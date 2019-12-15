import { Component, OnInit } from "@angular/core";
import { StaffService } from "src/app/services/staff.service";
import { StaffModel } from "src/app/models/staff";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-view-staffs",
  templateUrl: "./view-staffs.component.html",
  styleUrls: ["./_staff.component.scss"]
})
export class ViewStaffsComponent implements OnInit {
  staffs: StaffModel[];
  searchText: string = "";
  searchedStaffs: StaffModel[];

  constructor(
    private appService: AppService,
    private staffService: StaffService
  ) {
    // Set page title
    this.appService.setPageTitle("Thông Tin Thợ");

    // // Get Staffs from services
    // this.staffs = this.staffService.getStaffsOnce();

    // this.searchedStaffs = this.staffs;
    this.loadFireStoreData();
  }

  ngOnInit() {}

  loadFireStoreData() {
    // Get Staffs Ref data
    this.staffService.getStaffsDoc().onSnapshot(snapshot => {});
  }

  onSearchChange() {
    // capture uppercase search text
    let searchText = this.searchText.toUpperCase();

    // find all staff with search text for Name, Phone, address, tool or note
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
