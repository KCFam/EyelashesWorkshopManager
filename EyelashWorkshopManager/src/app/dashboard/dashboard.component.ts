import { Component, OnInit } from "@angular/core";
import { AppService } from "../_services/_app.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  constructor(private appService: AppService) {
    this.appService.setPageTitle("Quản Lý");
  }

  ngOnInit() {}
}
