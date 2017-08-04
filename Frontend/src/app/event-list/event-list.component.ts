import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  constructor(private api:ApiService) { }

  eventlist: object[];
  event_name: string = "";
  event_time: Date;
  event_price: number;
  event_ticket_amount: number;
  event_id: number;
  ticket_buyer_email: string;

  ngOnInit() {

    this.api.getEventList().subscribe(result => this.eventlist = result);

  }

  buyTicket() {
    this.api.buyTicket(this.event_id, this.ticket_buyer_email)
      .subscribe(result => this.eventlist = result);

    this.event_id;
    this.ticket_buyer_email = "";
  }
}
