import { Component, OnInit } from "@angular/core";
import { AppService } from "../services/app.service";
import { HairService } from "../services/hair.service";
import { Observable } from "rxjs";
import { FormControl } from "@angular/forms";

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
