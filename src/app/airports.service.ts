import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { catchError, map, tap, switchMap } from 'rxjs/operators';

import { Pays } from './Pays';
import { Airport } from './airport';
import { MessagesService } from './messages.service';
import { Piste } from './pistes';
import { forEach } from '@angular/router/src/utils/collection';

const httpOptions = {
headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class AirportsService {

  private AirportTop: Pays[];
  private paysUrl = 'http://localhost:3000/pays';  // URL to web api
  private airportUrl = 'http://localhost:3000/aeroports';
  private pisteUrl = 'http://localhost:3000/pistes';

  constructor(
    private http: HttpClient,
    private messageService: MessagesService) {
      this.AirportTop = new Array<Pays>();
    }


  /** GET surfaces for a given airport and return an array with type and count */

  getPistesSurfaces(id: number): Observable<{id: number, surface: string}[]> {
    return this.http.get<Piste[]>(`${this.pisteUrl}/?airport_ref=${id}`).pipe(
      map((val) => {
        const reduced = [];
        val.forEach(item => reduced.push({id: item.id, surface: item.surface}));
        return reduced;
      }));
  }

  /** GET a givent country from the server via it's code */
  getPays (code: string): Observable<Pays> {
    return this.http.get<Pays>(`${this.paysUrl}/?code=${code}`)
      .pipe(
        tap(_ => this.log(`fetched country ${code}`)),
        catchError(this.handleError<Pays>('getPays')));
  }

  /** GET The full http response for all airports for one country by requesting with Limit=1 (sets X-total-count header) */
  getTopAirportsMAxFullResponse(pays: Pays): Observable<{code: string, count: number, name: string}> {
    return this.http.get<Airport[]>(`${this.airportUrl}/?iso_country=${pays.code}&type_like=air&_limit=1`, { observe: 'response' })
    .pipe(
      map(
        (val) => {
          return {code: pays.code, count: parseInt(val.headers.get('X-Total-Count'), 10), name: pays.name};
        }
      )
    );
  }

  getFullAirportCount(code: string): Observable<number> {
    return this.http.get<Airport[]>(`${this.airportUrl}/?iso_country=${code}&type_like=air&_limit=1`, { observe: 'response' })
    .pipe(
      map(
        (val) => {
          return parseInt(val.headers.get('X-Total-Count'), 10 );
        }
      )
    );
  }

  /** GET The full X-total-count of airports for one country
  getTotalAirportCount(pays: Pays): Observable<any> {
    this.getTopAirportsMAxFullResponse(pays.code).subscribe(resp => {
      pays.airportcount = parseInt(resp.headers.get('X-Total-Count'), 10);
      // this.AirportTop.push(pays);
      console.log('counted airports for ' + pays.name + ' : ' + pays.airportcount);
    });
    return Observable.create();
  }
*/

  getAirportByCode(code: string): Observable<Airport[]> {

    return this.http.get<Airport[]>(`${this.airportUrl}/?iso_country=${code}&type_like=air`).pipe(
      tap(_ => this.log(`fetched all Airports in country ${code}`)),
      catchError(this.handleError<Airport[]>('searchAirport', [])));

  }


  getInfAirports(page: number, code: string): Observable<Airport[]> {

    return this.http.get<Airport[]>(`${this.airportUrl}/?iso_country=${code}&type_like=air&_page=${page}`).pipe(
      tap(_ => this.log(`fetched page ${page} of Airports in country ${code}`)),
      catchError(this.handleError<Airport[]>('getInfAirports', [])));

  }

  /** GET all countries */
  getAllPays (): Observable<Pays[]> {
    return this.http.get<Pays[]>(this.paysUrl).pipe(
      tap(_ => this.log(`fetched countries`)),
      catchError(this.handleError<Pays[]>('getPays', [])));
  }

  /** GET a Top 10 countries with most airports from the server
  getTopAirportsMax (): Observable<Pays[]> {
    this.getObservablePays().subscribe(
      pays => this.getTotalAirportCount(pays),
      error => console.error(error),
      () => {
        this.AirportTop.sort(
          function(a, b) {return b.airportcount - a.airportcount; }
      ).slice(0, 9);
      console.log('tableau trié et splicé' + this.AirportTop);
    });
    return of(this.AirportTop as Pays[]);
  }
  */

    /** GET a Top 10 countries with least airports from the server */
    getTopAirportsMin (): Observable<Pays[]> {
      return this.http.get<Pays[]>(`${this.paysUrl}/?_limit=10&_order=desc`).pipe(
        tap(_ => this.log('fetched Top 10 Countries')),
        catchError(this.handleError<Pays[]>('getTopAirportMax', [])));
    }


/* GET pistes from a given airport ID */

getPistes (id: number): Observable<Piste[]> {

return this.http.get<Piste[]>(`${this.pisteUrl}/?airport_ref=${id}`).pipe(
      tap(_ => this.log(`found pistes for airport ${id}`)),
      catchError(this.handleError<Piste[]>('getPistes', []))
    );

}

/* GET Airport by ID*/

getAirport (id: number): Observable<Airport> {

return this.http.get<Airport>(`${this.airportUrl}/?id=${id}`).pipe(
      tap(_ => this.log(`found Airport for ID : ${id}`)),
      catchError(this.handleError<Airport>('getAirport'))
    );
}


  /* GET Countries whose name contains search term */
  searchPays(term: string): Observable<Pays[]> {
    if (!term.trim()) {
      // if not search term, return empty country array.
      return of([]);
    }
    return this.http.get<Pays[]>(`${this.paysUrl}/?name_like=${term}`).pipe(
      tap(_ => this.log(`found countries matching "${term}"`)),
      catchError(this.handleError<Pays[]>('searchPays', []))
    );
  }

  /* GET Airports for a given country whose name contains search term */
  searchAirport(term: string, code: string): Observable<Airport[]> {
    if (!term.trim()) {
      // if not search term, return empty airport array.
      return of([]);
    }
    return this.http.get<Airport[]>(`${this.airportUrl}/?iso_country=${code}&name_like=${term}&type_like=air`).pipe(
      tap(_ => this.log(`found Airports in country ${code} matching ${term}`)),
      catchError(this.handleError<Airport[]>('searchAirport', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a AirportsService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`AirportsService: ${message}`);
  }
}
