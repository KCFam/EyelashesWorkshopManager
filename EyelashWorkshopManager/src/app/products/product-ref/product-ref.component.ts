import { Component, OnInit } from "@angular/core";
import { LashToolService } from "src/app/services/lashtool.service";
import { MatChipInputEvent } from "@angular/material/chips";
import { COMMA, ENTER } from "@angular/cdk/keycodes";

@Component({
  selector: "app-product-ref",
  templateUrl: "./product-ref.component.html",
  styleUrls: ["./product-ref.component.scss"]
})
export class ProductRefComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  lashTools: string[];

  constructor(private lashToolService: LashToolService) {
    this.lashTools = lashToolService.getLashToolsOnce();
  }

  ngOnInit() {}

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add lash tool
    if ((value || "").trim()) {
      this.lashTools.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = "";
    }
  }

  remove(lashTool: string): void {
    const index = this.lashTools.indexOf(lashTool);

    if (index >= 0) {
      this.lashTools.splice(index, 1);
    }
  }
}
