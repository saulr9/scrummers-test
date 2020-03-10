import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) { }

  booking(reservation: Reservation) {
    return this.http.post(`http://devtest.tee.com.co/api/room/reservation`, reservation);
}
public checkAvailability(params): Observable<any>{
  const headers = new HttpHeaders().set('Authorization', localStorage.getItem('currentUser'));
  return this.http.get(`http://devtest.tee.com.co/api/room/availability	`, {params, headers});
}
}


