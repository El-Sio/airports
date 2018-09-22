import { Component, OnInit } from '@angular/core';
import { Observable, Subject, BehaviorSubject, combineLatest, pipe } from 'rxjs';
import { catchError, map, tap, count, switchMap, shareReplay } from 'rxjs/operators';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Pays } from '../Pays';
import { AirportsService } from '../airports.service';
import { Piste } from '../pistes';

import { Router } from '@angular/router';

import { CacheService } from './../cache.service';

@Component({
  selector: 'app-top-airports',
  templateUrl: './top-airports.component.html',
  styleUrls: ['./top-airports.component.css']
})
export class TopAirportsComponent implements OnInit {

  topPaysAirportsMax: any;
  topPaysAirportsMin: any;
  private progress: any;
  progressBar = document.getElementById('progress');
  ratio: number;

  constructor(private router: Router,
    private airportsService: AirportsService,
    private route: ActivatedRoute,
    private location: Location,
    private cacheservice: CacheService) { }

  ngOnInit() {
    this.progress = 0;
    this.ratio = 0;
    this.  progressBar = document.getElementById('progress');
    this.getTopAirports();
  }

  updateProgress(progressRatio: number): void {
    this.progressBar.style.width = 100 * progressRatio + '%';
    if (progressRatio === 1) {
      this.progressBar.className += ' finished';
    } else {
      this.progressBar.className = this.progressBar.className.replace(' finished', '');
    }
  }

  getTopAirports(): void {

    /**
     * GET all country
     */
    const allPays$ = this.airportsService.getAllPays();

    allPays$.pipe(
      switchMap((countries: Pays[]) => {
        const obs = [];
        for (const country of countries) {
          obs.push(this.cacheservice.get(country.id.toString(), this.airportsService.getTopAirportsMAxFullResponse(country))
          .pipe(tap((x) => {
            this.progress += 1;
            this.ratio = this.progress / countries.length;
            this.updateProgress(this.ratio);
          })));
        }
        return combineLatest(obs);
      })
    ).subscribe((val) => {
      const ranking = val.sort(function(a, b) {return b.count - a.count; });
      this.topPaysAirportsMax = ranking.slice(0, 10);
      this.topPaysAirportsMin = ranking.slice(ranking.length - 10, ranking.length);
      // console.log(this);
    });
    }

  goBack(): void {
    this.location.back();
  }
  goTop(): void {
  this.router.navigateByUrl('/search');
  }
}
