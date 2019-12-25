import { Component, OnInit } from "@angular/core";
import { AppService } from "../_services/_app.service";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-raw-product-transaction",
  templateUrl: "./raw-product-transaction.component.html",
  styleUrls: ["./_raw-product-transaction.component.scss"]
})
export class RawProductTransactionComponent implements OnInit {
  rawProductTransactionFormGroup: FormGroup;

  constructor(private serviceApp: AppService) {
    // Set page title
    this.serviceApp.setPageTitle("Thêm Hàng Giao");
  }

  ngOnInit() {
    // Initialize Form Group
    this.rawProductTransactionFormGroup = new FormGroup({
      searchStaff: new FormControl("")
    });
  }
}
