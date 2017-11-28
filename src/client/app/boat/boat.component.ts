import { Component, EventEmitter, OnInit, Output, Input, HostBinding } from '@angular/core';
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
  @Output() boatDeleted: EventEmitter<any> = new EventEmitter();
  boatId: string;
  loading: Boolean = false;
  // boats: Boat[];

  @HostBinding('class') columnClass = 'four wide column';

  constructor(
    public auth: AuthService,
    private route: ActivatedRoute,
    public api: ApiService,
  ) { }

  ngOnInit() {
  }

  deleteBoat(boat) {
    if (confirm("Are you sure you want to delete this boat")) {
      this.api.delete(`delete/${boat._id}`)
      .subscribe(success =>
      {
        this.boatDeleted.emit();
      }
    );
    }
  }

}
