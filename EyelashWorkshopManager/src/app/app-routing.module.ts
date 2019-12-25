import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LayoutMainComponent } from "./_layout/layout-main/layout-main.component";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { StaffCreateComponent } from "./staff/staff-create.component";
import { StaffViewComponent } from "./staff/staff-view.component";
import { StaffUpdateComponent } from "./staff/staff-update.component";
import { RawProductTransactionComponent } from "./raw-product-transaction/raw-product-transaction.component";

const routes: Routes = [
  // Main layout
  {
    path: "",
    component: LayoutMainComponent,
    children: [
      {
        path: "",
        component: RawProductTransactionComponent,
        pathMatch: "full"
      },
      { path: "staff-view", component: StaffViewComponent },
      { path: "staff-create", component: StaffCreateComponent },
      { path: "staff-update/:id", component: StaffUpdateComponent },
      {
        path: "raw-product-transaction",
        component: RawProductTransactionComponent
      }
    ]
  }

  // No layout
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
