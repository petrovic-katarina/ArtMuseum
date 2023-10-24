import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExibitionLocation } from 'src/app/model/exibition-location.model';
import { Exibition } from 'src/app/model/exibition.model';
import { ExibitionService } from 'src/app/services/exibition.service';

@Component({
  selector: 'app-new-exibition',
  templateUrl: './new-exibition.component.html',
  styleUrls: ['./new-exibition.component.css']
})
export class NewExibitionComponent implements OnInit, OnDestroy {

  exibitionForm: FormGroup;
  locations: ExibitionLocation[] = [];

  subscriptionLocations: Subscription = new Subscription();
  subscriptionCreateExibition: Subscription = new Subscription();

  constructor(private service: ExibitionService, private router: Router) {
    this.exibitionForm = new FormGroup({
      title: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      location: new FormControl(0)
    })
  }

  ngOnInit(): void {
    this.getLocations();
  }

  get title() {
    return this.exibitionForm.get('title');
  }

  get description() {
    return this.exibitionForm.get('description');
  }

  get location() {
    return this.exibitionForm.get('location');
  }

  getLocations(): void {
    this.subscriptionLocations = this.service.getAllLocations().subscribe({
      next: (locations: ExibitionLocation[]) => {
        this.locations = locations
        console.log(this.locations);
      },
      error: (err: any) => { console.log(err) }
    })
  }

  onSubmit() {
    if (!this.exibitionForm.valid) {
      alert("Please fill in all fields")
      return;
    }

    let locationId = this.exibitionForm.value.location;
    let location: ExibitionLocation = new ExibitionLocation();
    let found = false;

    for (let loc of this.locations) {
      if (loc._id == locationId) {
        location = loc;
        found = true;
      }
    }

    if (!found) {
      alert("Please choose a location")
      return
    }

    let newExibition = new Exibition({
      title: this.exibitionForm.value.title,
      description: this.exibitionForm.value.description,
      location: location
    })

    this.subscriptionCreateExibition = this.service.addNewExibition(newExibition).subscribe({
      next: (newExibition: Exibition) => {
        newExibition = newExibition;
        console.log(newExibition);
        this.router.navigate(['/exibitions']);
      },
      error: (err: any) => { console.log(err) }
    })
  }

  ngOnDestroy(): void {
    this.subscriptionLocations.unsubscribe();
    this.subscriptionCreateExibition.unsubscribe();
  }

}
