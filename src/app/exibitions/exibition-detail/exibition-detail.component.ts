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

  exibitionArtworks: Artwork[] = [];
  subscriptionExibitionArtwork: Subscription = new Subscription();

  allArtworks: Artwork[] = [];
  freeArtworks: Artwork[] = [];
  subscriptionAllArtworks: Subscription = new Subscription();

  queryParams = {
    sort: 'author',
    sortDirection: 'asc',
    filter: {
    }
  }

  edit: boolean = false;


  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.exibitionId = params['id']
      this.getOneExibition();
      this.getAllExibitionArtworks();
      this.getAllArtworks();
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
    this.subscriptionExibitionArtwork = this.service.getExibitionArtworks(this.exibitionId).subscribe({
      next: (exibitionArtworks: Artwork[]) => {
        this.exibitionArtworks = exibitionArtworks;
      },
      error: (response: any) => {
        console.log('error: ', response);
      }
    })
  }

  getAllArtworks() {
    this.subscriptionAllArtworks = this.service.getAllArtworks(this.queryParams).subscribe({
      next: (artworks: Artwork[]) => {
        console.log(artworks);
        this.allArtworks = artworks;

        this.freeArtworks = [];
        for (let artwork of this.allArtworks) {
          if (artwork.exibition_id === -1) {
            this.freeArtworks.push(artwork);
          }
        }

        console.log(this.freeArtworks);
      },
      error: (response: any) => {
        console.log('error: ', response);
      }
    })
  }

  ngOnDestroy(): void {
    this.subscriptionExibitionDetail.unsubscribe();
    this.subscriptionExibitionArtwork.unsubscribe();
    this.subscriptionAllArtworks.unsubscribe();
  }

}
