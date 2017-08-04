import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-event-master',
  templateUrl: './event-master.component.html',
  styleUrls: ['./event-master.component.css']
})
export class EventMasterComponent implements OnInit {

  constructor(private api: ApiService) { }

  eventlist: object[];
  event_name: string = "";
  event_time: string;
  event_price: number;
  event_ticket_amount: number;

  ngOnInit() {
  }

  addEvent() {
    this.api.addEvent(this.event_name, this.event_time, this.event_price, this.event_ticket_amount)
      .subscribe(result => this.eventlist = result);

    this.event_name;
    this.event_time;
    this.event_price;
    this.event_ticket_amount;
  }

}
