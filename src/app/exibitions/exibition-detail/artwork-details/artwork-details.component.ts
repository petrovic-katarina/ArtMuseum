import { Component, Input } from '@angular/core';
import { Artwork } from 'src/app/model/artwork.model';

@Component({
  selector: 'app-artwork-details',
  templateUrl: './artwork-details.component.html',
  styleUrls: ['./artwork-details.component.css']
})
export class ArtworkDetailsComponent {

  @Input() artwork: Artwork = new Artwork();

  constructor() { }

  ngOnInit(): void { }

  truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
      return text;
    } else {
      const lastSpaceIndex = text.lastIndexOf(' ', maxLength);
      if (lastSpaceIndex === -1) {
        return text.substring(0, maxLength) + '...';
      } else {
        return text.substring(0, lastSpaceIndex) + '...';
      }
    }
  }


}
