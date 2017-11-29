import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Boat } from '../shared/boat.model';
import { ApiService } from '../shared/api.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-boat',
  templateUrl: './update-boat.component.html',
  styleUrls: ['./update-boat.component.scss'],
  providers: [ApiService]
})
export class UpdateBoatComponent implements OnInit {

  loading: Boolean = false;
  boats: Boat[];
  updateBoat: Boat;
  boatId: string;
  add: string;

  constructor(
    private route: ActivatedRoute,
    public api: ApiService,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params.forEach((urlParameters) => {
      this.boatId = urlParameters['id'];
    });
    this.api.getById(`update/${this.boatId}`)
      .subscribe(data => this.updateBoat = data);
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit(form: NgForm) {
    this.loading = true;

    const formValues = Object.assign({}, form.value);

    const boat: Boat = {
      id: this.boatId,
      name: formValues.name,
      address: formValues.address,
      address2: formValues.address2,
      city: formValues.city,
      state: formValues.state,
      zip: formValues.zip,
      country: formValues.country,
      phone: formValues.phone,
      photoUrlexterior: formValues.photoExterior,
      photoUrlinterior: formValues.photoInterior
    };

    this.api.put('update', boat)
      .subscribe(() => this.goBack());

  }

}
