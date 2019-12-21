import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LayoutMainComponent } from "./_layout/layout-main/layout-main.component";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { CreateStaffComponent } from "./staff/create-staff.component";
import { ViewStaffComponent } from "./staff/view-staff.component";

const routes: Routes = [
  // Main layout
  {
    path: "",
    component: LayoutMainComponent,
    children: [
      // { path: "", component: DashboardComponent, pathMatch: "full" },
      // { path: "", component: CreateStaffComponent, pathMatch: "full" }
      { path: "", component: ViewStaffComponent, pathMatch: "full" }
    ]
  }

  // No layout
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
