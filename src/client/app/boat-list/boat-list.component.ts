import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Boat } from '../shared/boat.model';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-boat-list',
  templateUrl: './boat-list.component.html',
  styleUrls: ['./boat-list.component.scss']
})
export class BoatListComponent implements OnInit {

  boats: Boat[];

  constructor(public http: Http) { }

  ngOnInit() {
    this.http.get('/api/boats')
      .map((res: Response) => res.json())
      .subscribe(data => this.boats = data);
  }

}
