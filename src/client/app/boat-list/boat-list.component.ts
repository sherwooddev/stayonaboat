import { Component, OnInit } from '@angular/core';
import { Boat } from '../shared/boat.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-boat-list',
  templateUrl: './boat-list.component.html',
  styleUrls: ['./boat-list.component.scss']
})
export class BoatListComponent implements OnInit {

  boats: Boat[];

  constructor(public api: ApiService) { }

  ngOnInit() {
    this.api.get('boats')
      .subscribe(data => this.boats = data);
  }

}
