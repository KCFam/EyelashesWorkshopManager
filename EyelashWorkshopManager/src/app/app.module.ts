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
/* #region   */
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatChipsModule } from "@angular/material/chips";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatTableModule } from "@angular/material/table";
import { MatDialogModule } from "@angular/material/dialog";
import { MatBadgeModule } from "@angular/material/badge";
/* #endregion */

// Signature pad
import { SignaturePadModule } from "angular2-signaturepad";

// Pages
/* #region   */
import { LayoutMainComponent } from "./_layout/layout-main/layout-main.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularFireModule } from "@angular/fire";

import { StaffCreateComponent } from "./staff/staff-create.component";
import { StaffUpdateComponent } from "./staff/staff-update.component";
import { StaffViewComponent } from "./staff/staff-view.component";
import { StaffDisplayStaffComponent } from "./staff/staff-display-staff.component";

import { RawProductTransactionComponent } from "./raw-product-transaction/raw-product-transaction.component";
import { RawDisplayStaffComponent } from "./raw-product-transaction/raw-display-staff.component";
import { RawSearchStaffComponent } from "./raw-product-transaction/raw-search-staff.component";

/* #endregion */

@NgModule({
  declarations: [
    AppComponent,
    LayoutMainComponent,
    DashboardComponent,

    StaffCreateComponent,
    StaffUpdateComponent,
    StaffViewComponent,
    StaffDisplayStaffComponent,

    RawProductTransactionComponent,
    RawDisplayStaffComponent,
    RawSearchStaffComponent
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
    MatChipsModule,
    MatAutocompleteModule,
    MatTableModule,
    MatDialogModule,
    MatBadgeModule,
    // Signature pad
    SignaturePadModule
  ],
  entryComponents: [],
  providers: [
    AngularFirestore,
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
