import { fromPromise } from 'rxjs/observable/fromPromise';
import { Injectable } from "@angular/core";
import { MapsAPILoader } from "@agm/core";
import { map, switchMap, tap } from "rxjs/operators";

import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";

@Injectable()
export class GeocodingService {
  
  geocoder: google.maps.Geocoder;

  constructor(private mapLoader: MapsAPILoader) { }

  waitForMapsToLoad(): Observable<boolean> {
    if(!this.geocoder) {
      return fromPromise(this.mapLoader.load())
      .pipe(
        tap(() => {
          console.log('Init geocoder!');
          this.geocoder = new google.maps.Geocoder();
        }),
        map(() => true)
      );
    }
    return of(true);
  }

  geocodeAddress(location: string): Observable<any> {
    return this.waitForMapsToLoad().pipe(
      switchMap(() => {
        console.log('Start geocoding!');
        return Observable.create(observer => {
          this.geocoder.geocode( { 'address': location}, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
              console.log('Geocoding complete!');
              observer.next({
                lat: results[0].geometry.location.lat(), 
                lng: results[0].geometry.location.lng()
              });
            } else {
                console.log('Error - ', results, ' & Status - ', status);
                observer.next({});
            }
            observer.complete();
          });
        })        
      })
    )
  }
}