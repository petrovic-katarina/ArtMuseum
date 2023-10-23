import { Component, EventEmitter, Input } from '@angular/core';
import { Artwork } from 'src/app/model/artwork.model';
import { Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ExibitionService } from 'src/app/services/exibition.service';

@Component({
  selector: 'app-exibition-edit',
  templateUrl: './exibition-edit.component.html',
  styleUrls: ['./exibition-edit.component.css']
})
export class ExibitionEditComponent {
  @Input()
  freeArtworks: Artwork[] = [];

  @Input()
  exibitionArtworks: Artwork[] = [];

  @Input()
  exibitionId: number = 0;

  @Output()
  doneClicked: EventEmitter<void> = new EventEmitter()

  @Output() artworksChanged: EventEmitter<void> = new EventEmitter();

  @Output()
  search: EventEmitter<string> = new EventEmitter();

  authorControl = new FormControl('');

  constructor(private service: ExibitionService) { }

  ngOnInit(): void {
  }

  onDoneClicked(): void {
    this.doneClicked.emit()
  }

  onAddCliked(artwork: Artwork) {
    this.service.addArtworkToExibition(this.exibitionId, artwork._id, artwork).subscribe({
      next: (artwork: Artwork) => {
        this.artworksChanged.emit();
      },
      error: (response: any) => {
        console.log('error: ', response);
      }
    })
  }

  onSearchClick(): void {
    this.search.emit(this.authorControl.value || '');
  }


}


