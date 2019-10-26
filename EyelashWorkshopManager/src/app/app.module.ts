import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy
} from "@angular/common";

// firebase
import {
  AngularFirestoreModule,
  AngularFirestore
} from "@angular/fire/firestore";
import { environment } from "../environments/environment";

// ng-bootstrap
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

// material angular
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatChipsModule } from "@angular/material/chips";

// Pages
import { LayoutHeaderComponent } from "./_layout/layout-header/layout-header.component";
import { LayoutMainComponent } from "./_layout/layout-main/layout-main.component";
import { LayoutFooterComponent } from "./_layout/layout-footer/layout-footer.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NewStaffComponent } from "./staff/new-staff/new-staff.component";
import { AngularFireModule } from "@angular/fire";
import { ViewStaffComponent } from "./staff/view-staff/view-staff.component";
import { EditStaffComponent } from "./staff/edit-staff/edit-staff.component";

@NgModule({
  declarations: [
    AppComponent,
    LayoutHeaderComponent,
    LayoutMainComponent,
    LayoutFooterComponent,
    DashboardComponent,
    LoginComponent,
    NewStaffComponent,
    ViewStaffComponent,
    EditStaffComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    // Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    // ng-bootstrap
    NgbModule,
    // material angular
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule
  ],
  providers: [
    AngularFirestore,
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
