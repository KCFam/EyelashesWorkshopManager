import { Component, OnInit } from "@angular/core";
import { LashToolService } from "src/app/services/lashtool.service";
import { MatChipInputEvent } from "@angular/material/chips";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { HairService } from "src/app/services/hair.service";
import { RawProductModel } from "src/app/models/raw-product";
import { FormControl, Validators } from "@angular/forms";
import { MatTableDataSource } from "@angular/material/table";
import { RawProductService } from "src/app/services/raw-product.service";

@Component({
  selector: "app-product-ref",
  templateUrl: "./product-ref.component.html",
  styleUrls: ["./product-ref.component.scss"]
})
export class ProductRefComponent implements OnInit {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  lashTools: string[];
  hairTypes: string[];

  lashToolsChipEdit: boolean = false;
  hairTypesChipEdit: boolean = false;
  rawProductAddEnable: boolean = false;

  /* #region  Form control for raw product actions */
  formControlLashTool = new FormControl("", [Validators.required]);
  formControlHairType = new FormControl("", [Validators.required]);
  formControlPrice = new FormControl("", [
    Validators.required,
    Validators.min(1)
  ]);
  /* #endregion */

  rawProducts: RawProductModel[] = new Array();
  rawProductDataSource: MatTableDataSource<RawProductModel>;
  rawProductSisplayedColumns: string[] = ["rawProduct", "price", "action"];

  editingRawProduct: RawProductModel;

  constructor(
    private lashToolService: LashToolService,
    private hairService: HairService,
    private rawProductService: RawProductService
  ) {
    this.lashTools = lashToolService.getLashToolsOnce();
    this.hairTypes = hairService.getHairTypesOnce();

    // Add data to raw product table display
    this.rawProductService.getRawProductOnce().then(data => {
      Object.keys(data.data()).forEach(key => {
        let rawProduct: RawProductModel = new RawProductModel();
        rawProduct.id = key;
        rawProduct.price = data.data()[key]["price"];
        this.rawProducts.push(rawProduct);
      });
      this.rawProductDataSource = new MatTableDataSource<RawProductModel>(
        this.rawProducts
      );
    });
  }

  ngOnInit() {}

  /* #region  Lash Tool chips */
  // Add lash tool
  addLashTool(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || "").trim()) {
      this.lashTools.push(value.trim().replace(/ /g, ""));

      // Add to database
      this.lashToolService.addLashTool(value.trim().replace(/ /g, ""));
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  // Remove lash tools
  removeLashTool(lashTool: string): void {
    const index = this.lashTools.indexOf(lashTool);

    if (index >= 0) {
      this.lashTools.splice(index, 1);

      // Remove from database
      this.lashToolService.removeLashTool(lashTool);
    }
  }
  /* #endregion */

  /* #region  Hair Type chips */
  // Add hair type
  addHairType(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || "").trim()) {
      this.hairTypes.push(value.trim().replace(/ /g, ""));

      // add hair type to database
      this.hairService.addHairType(value.trim().replace(/ /g, ""));
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  // Remove Hair Type
  removeHairType(hairType: string): void {
    const index = this.hairTypes.indexOf(hairType);

    if (index >= 0) {
      this.hairTypes.splice(index, 1);

      // remove hair type from database
      this.hairService.removeHairType(hairType);
    }
  }
  /* #endregion */

  addRawProduct() {
    // Check if lash tool and hair type are valid
    if (
      this.formControlHairType.hasError("required") ||
      this.formControlLashTool.hasError("required") ||
      this.formControlPrice.hasError("required") ||
      this.formControlPrice.hasError("min")
    ) {
      // Show error
      this.formControlLashTool.markAsTouched();
      this.formControlHairType.markAsTouched();
      this.formControlPrice.markAsTouched();
      return;
    }

    // Capture the new raw product name
    let productName: string =
      (this.formControlLashTool.value as string).trim().replace(/ /g, "") +
      "-" +
      this.formControlHairType.value;

    // Update Raw Product
    let updateRawProduct = new RawProductModel();
    updateRawProduct.id = productName;
    updateRawProduct.price = this.formControlPrice.value;
    this.rawProductService.updateRawProduct(updateRawProduct);

    // Retreives the list to display
    this.rawProductService.getRawProductOnce().then(data => {
      this.rawProducts = new Array();
      Object.keys(data.data()).forEach(key => {
        let rawProduct: RawProductModel = new RawProductModel();
        rawProduct.id = key;
        rawProduct.price = data.data()[key]["price"];
        this.rawProducts.push(rawProduct);
      });
      // Update display data table
      this.rawProductDataSource = new MatTableDataSource<RawProductModel>(
        this.rawProducts
      );
    });

    // clear selected data
    this.formControlLashTool.setValue("");
    this.formControlHairType.setValue("");
    this.formControlPrice.setValue(null);
  }
}
