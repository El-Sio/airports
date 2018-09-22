import { Component, OnInit } from '@angular/core';
import {Airport} from '../airport';
import { Observable, Subject, BehaviorSubject, combineLatest, merge, concat, fromEvent, range, timer, interval} from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Pays } from '../Pays';
import { AirportsService } from '../airports.service';
import { Piste } from '../pistes';

import { Router } from '@angular/router';
import { switchMap, map, tap, count, switchMapTo, share, scan, withLatestFrom, concatAll, delay } from 'rxjs/operators';
import { MessagesService } from '../messages.service';
import { CacheService } from './../cache.service';


@Component({
  selector: 'app-surfaces',
  templateUrl: './surfaces.component.html',
  styleUrls: ['./surfaces.component.css']
})

export class SurfacesComponent implements OnInit {

  paysref$: BehaviorSubject<Pays> = new BehaviorSubject<Pays>(null);
  code = this.route.snapshot.paramMap.get('code');
  private surfaces: any;
  private airportcount: any;
  private isDone = false;
  private progress: any;
  progressBar = document.getElementById('progress');
  loadButton = document.getElementById('load');

  constructor(private router: Router,
    private airportsService: AirportsService,
    private route: ActivatedRoute,
    private location: Location,
    private messageService: MessagesService,
    private cacheservice: CacheService) { }

  ngOnInit() {
    const code = this.route.snapshot.paramMap.get('code');
    this.progress = 0;
    this.  progressBar = document.getElementById('progress');
    this.loadButton = document.getElementById('load');
    this.getpaysref();
    this.getSurfaces(code);
  }

  updateProgress(progressRatio: number): void {
    this.progressBar.style.width = 100 * progressRatio + '%';
    if (progressRatio === 1) {
      this.progressBar.className += ' finished';
    } else {
      this.progressBar.className = this.progressBar.className.replace(' finished', '');
    }
  }

  getSurfaces(code: string): void {

/*     const fake = interval(100);
    const toto = fake.subscribe((x) => {
      this.progress += 1;
      console.log(this.progress);
      this.updateProgress(x / 100);
      if (this.progress > 100) {
        toto.unsubscribe();
      }
    }); */

    /*GET All Airports for Country Code*/
    const allAiports$ = this.airportsService.getAirportByCode(code);

    const requests$ = allAiports$.pipe(
    switchMap(
      (airports: Airport[]) => {
        const obs = [];
        for (const item of airports) {
        const anairport = this.cacheservice.get(item.id.toString(), this.airportsService.getPistesSurfaces(item.id));
        obs.push(anairport.pipe(tap((x) => {
          this.progress += 1;
          this.updateProgress(this.progress / airports.length);
        })));
      }
        return combineLatest(obs);
      })
    );

    requests$.pipe(share());

    requests$.subscribe((val) => {
      // console.log(val);
      let result = [];
      val.forEach(item => {
        // console.log(item);
        if (item.length !== 0) {
        item = item.reduce(function(prev, cur) {
        prev[cur.surface] = (prev[cur.surface] || 0) + 1;
        return prev;
      }, {});
      result = result.concat(Object.keys(item));
    }
    });
      console.log(result);
      this.isDone = true;
      const counts = {};
      result = result.map(x => x.toUpperCase());
      result.forEach(x => { counts[x] = (counts[x] || 0) + 1; });
      console.log(Object.entries(counts).map(([surface, count]) => ({surface, count})));
      this.surfaces = Object.entries(counts).map(([surface, count]) => ({surface, count}));
      this.surfaces.sort(function(a, b) {return b.count - a.count; });
    });
}

  getpaysref(): void {
    const code = this.route.snapshot.paramMap.get('code');
    this.airportsService.getPays(code).subscribe(paysref => {this.paysref$.next(paysref[0]);
   });
  }

  goBack(): void {
    this.location.back();
  }
  goTop(): void {
  this.router.navigateByUrl('/search');
  }

  private log(message: string) {
    this.messageService.add(`AirportsService: ${message}`);
  }
}
