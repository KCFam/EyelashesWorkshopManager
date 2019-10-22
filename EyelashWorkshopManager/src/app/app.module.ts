import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// ng-bootstrap
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

// material angular
import { MatButtonModule } from "@angular/material/button";
import { LayoutHeaderComponent } from './_layout/layout-header/layout-header.component';
import { LayoutMainComponent } from './_layout/layout-main/layout-main.component';
import { LayoutFooterComponent } from './_layout/layout-footer/layout-footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [AppComponent, LayoutHeaderComponent, LayoutMainComponent, LayoutFooterComponent, DashboardComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // ng-bootstrap
    NgbModule,
    // material angular
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
