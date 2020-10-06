import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatSliderModule } from '@angular/material/slider';

import { ChartsModule } from 'ng2-charts';
import { GraphManagerComponent } from './components/graph-manager/graph-manager.component';
import { LatestLandingComponent } from './components/latest-landing/latest-landing.component';
import { DisplayChartComponent } from './components/display-chart/display-chart.component';
import { LatestDetailsComponent } from './components/latest-details/latest-details.component';

@NgModule({
  declarations: [
    AppComponent,
    GraphManagerComponent,
    LatestLandingComponent,
    DisplayChartComponent,
    LatestDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTabsModule,
    MatGridListModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatListModule,
    MatTooltipModule,
    MatToolbarModule,
    MatChipsModule,
    MatSliderModule,

    ChartsModule
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'hu'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
