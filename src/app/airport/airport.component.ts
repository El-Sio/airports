import { Component, OnInit, NgModule, ElementRef } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


import {
debounceTime, distinctUntilChanged, switchMap, tap
} from 'rxjs/operators';

import { Pays } from '../Pays';
import { AirportsService } from '../airports.service';

import { Router } from '@angular/router';
import { Airport } from '../airport';

@Component({
  selector: 'app-airport',
  templateUrl: './airport.component.html',
  styleUrls: ['./airport.component.css']
})
export class AirportComponent implements OnInit {

  paysref$: BehaviorSubject<Pays> = new BehaviorSubject<Pays>(null);
  code = this.route.snapshot.paramMap.get('code');
  airports$: Observable<Airport[]>;
  infinite_airports: Airport[];
  totalAirportCount: number;
  private searchTerms = new Subject<string>();
  scrollCallback;

  currentPage = 1;
  isAllLoaded = false;

  constructor(private router: Router,
    private airportsService: AirportsService,
    private route: ActivatedRoute,
    private location: Location,
    ) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('code');
    this.getpaysref();
    this.airportsService.getFullAirportCount(code).subscribe((x) => this.totalAirportCount = x);
    this.infinite_airports = new Array<Airport>();
    this.scrollCallback = this.getInfAirports.bind(this);
    this.airports$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.airportsService.searchAirport(term, code)),
    );
  }

 getpaysref(): void {
 const code = this.route.snapshot.paramMap.get('code');
 this.airportsService.getPays(code).subscribe(paysref => {console.log(paysref); this.paysref$.next(paysref[0]);
}
 );
 }

getInfAirports() {
  const code = this.route.snapshot.paramMap.get('code');
  if (! this.isAllLoaded) {
  return this.airportsService.getInfAirports(this.currentPage, code).pipe(tap(this.processData));
  }
}

private processData = (airports) => {
  if (this.currentPage < Math.round(this.totalAirportCount / 10)) {
    this.currentPage++;
    this.infinite_airports = this.infinite_airports.concat(airports);
  } else {this.isAllLoaded = true;
  }
}

  goBack(): void {
    this.location.back();
  }

  goTop(): void {
  this.router.navigateByUrl('/search');
  }

}

