import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Boat } from '../shared/boat.model';
import { ApiService } from '../shared/api.service';
import { ActivatedRoute, Params } from '@angular/router';

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
  boatId: number;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    public api: ApiService
  ) { }

  ngOnInit() {
    // this.route.params.forEach((urlParameters) => {
    //   this.boatId = urlParameters['id'];
    // });
    // this.updateBoat = this.api.getBoatById(this.boatId);
  }

  onSubmit(form: NgForm) {
    this.loading = true;

    const formValues = Object.assign({}, form.value);

    const boat: Boat = {
      name: `${formValues.firstName} ${formValues.lastName}`,
      address: formValues.address,
      address2: formValues.address2,
      city: formValues.city,
      state: formValues.state,
      zip: formValues.zip,
      country: formValues.country,
      phone: `${formValues.areaCode} ${formValues.prefix}-${formValues.lineNumber}`,
      photoUrlexterior: formValues.photoExterior,
      photoUrlinterior: formValues.photoInterior
    };

    this.api.put('boats', boat)
      .subscribe(data => {
        form.reset();
        this.loading = false;
        this.updateBoat = data;
      });
  }

}
