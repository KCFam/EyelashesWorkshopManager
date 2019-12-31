import { Component, OnInit } from "@angular/core";
import { AppService } from "../_services/_app.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { RawProductModel } from "../_models/refs/raw-product";
import { RawProductsService } from "../_services/refs/raw-products.service";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-raw-product-transaction",
  templateUrl: "./raw-product-transaction.component.html",
  styleUrls: ["./_raw-product-transaction.component.scss"]
})
export class RawProductTransactionComponent implements OnInit {
  rawProductTransactionFormGroup: FormGroup;
  rawProducts: RawProductModel[] = [];
  rawProductAdded: RawProductModel[] = [];
  dataSource = new MatTableDataSource<RawProductModel>();

  constructor(
    private serviceApp: AppService,
    private serviceRawProducts: RawProductsService
  ) {
    // Set page title
    this.serviceApp.setPageTitle("Thêm Hàng Giao");
  }

  ngOnInit() {
    // Load database data
    this.loadDatabaseData();

    // Initialize Form Group
    this.rawProductTransactionFormGroup = new FormGroup({
      rawProduct: new FormControl("", [Validators.required]),
      quantity: new FormControl(0, [Validators.required, Validators.min(1)])
    });
  }

  loadDatabaseData() {
    // Load Raw Product List
    this.serviceRawProducts.getRawProductRef().onSnapshot(snapshot => {
      this.rawProducts = [];
      Object.keys(snapshot.data()).forEach(key => {
        this.rawProducts.push({ id: key, ...snapshot.data()[key] });
      });
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.rawProductTransactionFormGroup.controls;
  }

  addTransaction() {
    this.rawProductAdded.push({
      id: this.f.rawProduct.value.id,
      pricePerItem: this.f.rawProduct.value.pricePerItem,
      quantity: this.f.quantity.value
    });
    this.dataSource = new MatTableDataSource<RawProductModel>(
      this.rawProductAdded
    );
  }
}
