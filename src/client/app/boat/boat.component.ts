import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Boat } from '../shared/boat.model';
import { ApiService } from '../shared/api.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-boat',
  templateUrl: './boat.component.html',
  styleUrls: ['./boat.component.scss']
})
export class BoatComponent implements OnInit {

  @Input() boat: Boat;
  boatId: string;
  loading: Boolean = false;

  @HostBinding('class') columnClass = 'four wide column';

  constructor(
    public auth: AuthService,
    private route: ActivatedRoute,
    public api: ApiService
  ) { }

  ngOnInit() {
  }

  deleteBoat(boatId) {
    // this.route.params.forEach((urlParameters) => {
    //   this.boatId = urlParameters['id'];
    // });
    console.log('madeittodelete');
    this.api.delete(`delete/${this.boatId}`)
    .subscribe(data => this.boat = data);
  }

}
