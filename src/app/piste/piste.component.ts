import { Component, OnInit } from '@angular/core';
import {Airport} from '../airport';
import { Observable, Subject, BehaviorSubject} from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Pays } from '../Pays';
import { AirportsService } from '../airports.service';
import { Piste } from '../pistes';

import { Router } from '@angular/router';

@Component({
  selector: 'app-piste',
  templateUrl: './piste.component.html',
  styleUrls: ['./piste.component.css']
})
export class PisteComponent implements OnInit {

  id = +this.route.snapshot.paramMap.get('id');

  airportref$: BehaviorSubject<Airport> = new BehaviorSubject<Airport>(null);

  private pistes: Piste[];
  constructor(private router: Router,
    private airportsService: AirportsService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
this.getAirportref();
this.getPistes();
  }

getPistes(): void {

    const id = +this.route.snapshot.paramMap.get('id');
    this.airportsService.getPistes(id)
    .subscribe(pistes => {
      console.log(pistes);
      if (pistes.length !== 0) {this.pistes = pistes;
      } else {const pistebidon = new Piste(0, 'no runways found at this airport', 'sorry');
      console.log(pistebidon);
      this.pistes = new Array<Piste>();
    this.pistes.push(pistebidon);
    console.log(this.pistes);
  }}
  );
}

getAirportref() {

    const id = +this.route.snapshot.paramMap.get('id');
    this.airportsService.getAirport(id)
    .subscribe(airport => this.airportref$.next(airport[0]));
}

  goBack(): void {
    this.location.back();
  }
  goTop(): void {
  this.router.navigateByUrl('/search');
  }
}
