import { Component, OnInit, Input } from "@angular/core";
import { RawProductModel } from "../_models/refs/raw-product";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-raw-display-added-product",
  templateUrl: "./raw-display-added-product.component.html",
  styleUrls: ["./_raw-product-transaction.component.scss"]
})
export class RawDisplayAddedProductComponent implements OnInit {
  @Input() dataSource = new MatTableDataSource<RawProductModel>();
  displayedColumns: string[] = [
    "action",
    "itemName",
    "quantity",
    "pricePerItem",
    "total"
  ];

  constructor() {}

  ngOnInit() {}

  getQuantity(): number {
    return this.dataSource.data.reduce((a, b) => a + b.quantity, 0);
  }

  getTotal(): number {
    return Math.round(
      this.dataSource.data.reduce(
        (a, b) => a + b.pricePerItem * b.quantity,
        0
      ) / 1000
    );
  }
}
