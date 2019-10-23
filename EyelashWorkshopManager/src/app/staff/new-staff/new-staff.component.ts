import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-new-staff",
  templateUrl: "./new-staff.component.html",
  styleUrls: ["./new-staff.component.scss"]
})
export class NewStaffComponent implements OnInit {
  constructor(private appService: AppService) {
    this.appService.pageTitle = "Thêm Thợ Mới";
  }

  ngOnInit() {}
}
