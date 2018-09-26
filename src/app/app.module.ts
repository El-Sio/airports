import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MessagesComponent } from './messages/messages.component';
import { PaysSearchComponent } from './pays-search/pays-search.component';
import { AirportComponent } from './airport/airport.component';
import { PisteComponent } from './piste/piste.component';
import { TopAirportsComponent } from './top-airports/top-airports.component';
import { SurfacesComponent } from './surfaces/surfaces.component';
import { PaysSearchSurfaceComponent } from './pays-search-surface/pays-search-surface.component';
import { InfiniteScrollerDirective } from './infinite-scroller.directive';

import { CacheService } from './cache.service';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    PaysSearchSurfaceComponent,
    PaysSearchComponent,
    AirportComponent,
    PisteComponent,
    TopAirportsComponent,
    InfiniteScrollerDirective,
    SurfacesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [CacheService],
  bootstrap: [AppComponent]
})
export class AppModule { }
