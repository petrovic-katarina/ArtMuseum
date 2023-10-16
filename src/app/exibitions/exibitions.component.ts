import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExibitionService } from '../services/exibition.service';
import { Exibition } from '../model/exibition.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-exibitions',
  templateUrl: './exibitions.component.html',
  styleUrls: ['./exibitions.component.css']
})
export class ExibitionsComponent implements OnInit, OnDestroy {

  exibitions: Exibition[] = [];
  subscriptionExibition: Subscription = new Subscription();

  constructor(private service: ExibitionService) { }

  ngOnInit(): void {
    this.getExibitions();
  }

  getExibitions(): void {
    this.subscriptionExibition = this.service.getAllExibitions().subscribe({
      next: (exibitions: Exibition[]) => {
        console.log(exibitions);
        this.exibitions = exibitions;
      },
      error: (response: any) => {
        console.log('error: ', response);
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriptionExibition.unsubscribe();
  }

}
