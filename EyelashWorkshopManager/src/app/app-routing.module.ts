import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LayoutMainComponent } from "./_layout/layout-main/layout-main.component";

import { DashboardComponent } from "./dashboard/dashboard.component";

import { LoginComponent } from "./login/login.component";
import { NewStaffComponent } from "./staff/new-staff/new-staff.component";

const routes: Routes = [
  // Main layout
  {
    path: "",
    component: LayoutMainComponent,
    children: [
      { path: "", component: DashboardComponent, pathMatch: "full" },
      { path: "new-staff", component: NewStaffComponent }
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
