import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Artwork } from 'src/app/model/artwork.model';
import { Exibition } from 'src/app/model/exibition.model';
import { ExibitionService } from 'src/app/services/exibition.service';

@Component({
  selector: 'app-exibition-detail',
  templateUrl: './exibition-detail.component.html',
  styleUrls: ['./exibition-detail.component.css']
})
export class ExibitionDetailComponent implements OnInit, OnDestroy {

  exibitionId!: number;
  exibitionDetail: Exibition = new Exibition();
  subscriptionExibitionDetail: Subscription = new Subscription();

  artworks: Artwork[] = [];
  subscriptionExibitionArtwork: Subscription = new Subscription();

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.exibitionId = params['id']
      this.getOneExibition();
      this.getAllExibitionArtworks();
    })
  }

  constructor(private service: ExibitionService, private route: ActivatedRoute) { }

  getOneExibition() {
    this.subscriptionExibitionDetail = this.service.getExibition(this.exibitionId).subscribe({
      next: (exibition: Exibition) => {
        console.log(exibition);
        this.exibitionDetail = exibition;
      },
      error: (response: any) => {
        console.log('error: ', response);
      }
    })
  }

  getAllExibitionArtworks() {
    this.service.getExibitionArtworks(this.exibitionId).subscribe({
      next: (artworks: Artwork[]) => {
        this.artworks = artworks;
      },
      error: (response: any) => {
        console.log('error: ', response);
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriptionExibitionDetail.unsubscribe();
  }

}
