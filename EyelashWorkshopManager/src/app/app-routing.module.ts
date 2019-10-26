import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LayoutMainComponent } from "./_layout/layout-main/layout-main.component";

import { DashboardComponent } from "./dashboard/dashboard.component";

import { LoginComponent } from "./login/login.component";
import { NewStaffComponent } from "./staff/new-staff/new-staff.component";
import { ViewStaffComponent } from "./staff/view-staff/view-staff.component";
import { EditStaffComponent } from "./staff/edit-staff/edit-staff.component";

const routes: Routes = [
  // Main layout
  {
    path: "",
    component: LayoutMainComponent,
    children: [
      { path: "", component: DashboardComponent, pathMatch: "full" },
      { path: "new-staff", component: NewStaffComponent },
      { path: "view-staff", component: ViewStaffComponent },
      { path: "edit-staff/:id", component: EditStaffComponent }
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
