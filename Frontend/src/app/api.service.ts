import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

  constructor(private http: Http, private router: Router ) { }

  getEventList() {
    return this.http.get('http://localhost:8000/api/event')
    .map(result => result.json());
  }

  addEvent(event_name:string, event_time:string, event_price:number, event_ticket_amount:number) {
    let data = {
      "event_name" : event_name,
      "event_time" : event_time,
      "event_price" : event_price,
      "event_ticket_amount" : event_ticket_amount
    };

    // Validasi token dan memasukan data kedalam DB.
    let body = JSON.stringify(data);
    let headers = new Headers
    ({ "Content-Type" : "application/json" });
    let options = new RequestOptions ({ headers : headers });

    // Menjalankan Method di API Backend.
    return this.http.post('http://localhost:8000/api/event/new', body, options)
    .map(result => result.json());
  }

  buyTicket(event_id:number, ticket_buyer_email:string) {
    let data = {
      "event_id" : event_id,
      "ticket_buyer_email" : ticket_buyer_email
    };

    // Validasi token dan memasukan data kedalam DB.
    let body = JSON.stringify(data);
    let headers = new Headers
    ({ "Content-Type" : "application/json" });
    let options = new RequestOptions ({ headers : headers });

    // Menjalankan Method di API Backend.
    return this.http.post('http://localhost:8000/api/event/buy', body, options)
    .map(result => result.json());
  }

}
