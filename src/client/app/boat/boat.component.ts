import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Boat } from '../shared/boat.model';

@Component({
  selector: 'app-boat',
  templateUrl: './boat.component.html',
  styleUrls: ['./boat.component.scss']
})
export class BoatComponent implements OnInit {

  @Input() boat: Boat;

  @HostBinding('class') columnClass = 'four wide column';

  constructor() { }

  ngOnInit() {
  }

}
