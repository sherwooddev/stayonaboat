import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { NgForm } from '@angular/forms';
import { Boat } from '../shared/boat.model';

@Component({
  selector: 'app-add-boat',
  templateUrl: './add-boat.component.html',
  styleUrls: ['./add-boat.component.scss']
})
export class AddBoatComponent implements OnInit {

  loading: Boolean = false;
  newBoat: Boat;

  constructor(public http: Http) { }

  ngOnInit() {
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

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const requestOptions = new RequestOptions({ headers: headers });

    this.http.post('/api/boats', boat, requestOptions)
      .map((res: Response) => res.json())
      .subscribe(data => {
        form.reset();
        this.loading = false;
        this.newBoat = data;
      });
  }

}
