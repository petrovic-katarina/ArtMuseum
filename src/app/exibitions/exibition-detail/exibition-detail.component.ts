import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Artwork } from 'src/app/model/artwork.model';
import { Exibition } from 'src/app/model/exibition.model';
import { ExibitionService } from 'src/app/services/exibition.service';
import { ArtworkDetailsComponent } from './artwork-details/artwork-details.component';

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

  @Output() doneClicked: EventEmitter<void> = new EventEmitter();

  queryParams = {
    sort: 'author',
    sortDirection: 'asc',
    filter: {
      author: ''
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

  constructor(private service: ExibitionService, private route: ActivatedRoute, private offcanvasService: NgbOffcanvas) { }

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

  onEditClicked(): void {
    this.edit = true;
  }

  onDoneClicked(): void {
    this.edit = false;
    this.doneClicked.emit()
  }

  onSearch(author: any) {
    this.queryParams.filter.author = author;
    console.log(author);
    this.getAllArtworks();
  }

  onArtworksChanged() {
    this.getAllExibitionArtworks();
    this.getAllArtworks();
  }

  showDetails(artwork: Artwork): void {
    const offcanvasRef = this.offcanvasService.open(ArtworkDetailsComponent, {
      position: 'end',
    });
    offcanvasRef.componentInstance.artwork = artwork;
  }


  ngOnDestroy(): void {
    this.subscriptionExibitionDetail.unsubscribe();
    this.subscriptionExibitionArtwork.unsubscribe();
    this.subscriptionAllArtworks.unsubscribe();
  }

}
