import { Component, OnInit } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


import {
debounceTime, distinctUntilChanged, switchMap
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
  private searchTerms = new Subject<string>();

  constructor(private router: Router,
    private airportsService: AirportsService,
    private route: ActivatedRoute,
    private location: Location) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('code');
    this.getpaysref();
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

  goBack(): void {
    this.location.back();
  }

  goTop(): void {
  this.router.navigateByUrl('/search');
  }

}

