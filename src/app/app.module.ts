import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BaseComponent } from './base/base.component';
import { DataGridComponent } from './data-grid/data-grid.component';
import { MapViewComponent } from './map-view/map-view.component';
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { ParkingLorryComponent } from './parking-lorry/parking-lorry.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { RoadWorksComponent } from './road-works/road-works.component';
import { WarningsComponent } from './warnings/warnings.component';
import { ClosureRoadsComponent } from './closure-roads/closure-roads.component';
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    DataGridComponent,
    MapViewComponent,
    NavigationBarComponent,
    ParkingLorryComponent,
    RoadWorksComponent,
    WarningsComponent,
    ClosureRoadsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
