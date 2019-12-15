import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LayoutMainComponent } from "./_layout/layout-main/layout-main.component";

import { DashboardComponent } from "./dashboard/dashboard.component";

import { LoginComponent } from "./login/login.component";
import { CreateStaffComponent } from "./staff/create-staff.component";
import { ViewStaffsComponent } from "./staff/view-staffs.component";
import { UpdateStaffComponent } from "./staff/update-staff.component";
import { StaffTransactionComponent } from "./staff-transaction/staff-transaction.component";
import { ProductRefComponent } from "./products/product-ref/product-ref.component";

const routes: Routes = [
  // Main layout
  {
    path: "",
    component: LayoutMainComponent,
    children: [
      { path: "", component: DashboardComponent, pathMatch: "full" },
      { path: "create-staff", component: CreateStaffComponent },
      { path: "view-staffs", component: ViewStaffsComponent },
      { path: "update-staff/:id", component: UpdateStaffComponent },
      { path: "staff-transaction", component: StaffTransactionComponent },
      { path: "product-info", component: ProductRefComponent }
    ]
  },

  // No layout
  { path: "login", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
