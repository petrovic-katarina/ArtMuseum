import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExibitionLocation } from 'src/app/model/exibition-location.model';
import { ExibitionService } from 'src/app/services/exibition.service';

@Component({
  selector: 'app-new-exibition',
  templateUrl: './new-exibition.component.html',
  styleUrls: ['./new-exibition.component.css']
})
export class NewExibitionComponent implements OnInit {

  exibitionForm: FormGroup;
  locations: ExibitionLocation[] = [];

  constructor(private service: ExibitionService) {
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
    this.service.getAllLocations().subscribe({
      next: (locations: ExibitionLocation[]) => {
        this.locations = locations
        console.log(this.locations);
      },
      error: (err: any) => { console.log(err) }
    })
  }

  onSubmit() {

  }

}
