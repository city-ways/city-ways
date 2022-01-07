import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-parking',
  templateUrl: './book-parking.page.html',
  styleUrls: ['./book-parking.page.scss'],
})
export class BookParkingPage implements OnInit {
  @Input() id: number;
  constructor() {}

  ngOnInit() {}
}
