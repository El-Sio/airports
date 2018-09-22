import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PaysSearchComponent} from './pays-search/pays-search.component';
import {AirportComponent} from './airport/airport.component';
import {PisteComponent} from './piste/piste.component';
import {TopAirportsComponent} from './top-airports/top-airports.component';
import { PaysSearchSurfaceComponent } from './pays-search-surface/pays-search-surface.component';
import { SurfacesComponent } from './surfaces/surfaces.component';

const routes: Routes = [
{ path: '', redirectTo: '/search', pathMatch: 'full' },
{ path: 'search', component: PaysSearchComponent },
{ path: 'airports/:code', component: AirportComponent },
{ path: 'piste/:id', component: PisteComponent },
{ path: 'topairports', component: TopAirportsComponent },
{ path: 'surfacesearch', component: PaysSearchSurfaceComponent },
{ path: 'surfaces/:code', component: SurfacesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
