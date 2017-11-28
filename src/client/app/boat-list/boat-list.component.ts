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

  onBoatDeleted(boat) {
    var index = this.boats.findIndex((bt) => (bt === boat));
    if (index != -1) {
      this.boats.splice(index, 1);
    }
  }

  ngOnInit() {
    this.api.get('boats')
      .subscribe(data => this.boats = data);
  }

}
