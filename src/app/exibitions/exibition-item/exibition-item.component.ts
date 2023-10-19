import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Exibition } from 'src/app/model/exibition.model';

@Component({
  selector: 'app-exibition-item',
  templateUrl: './exibition-item.component.html',
  styleUrls: ['./exibition-item.component.css']
})
export class ExibitionItemComponent {

  @Input() exibition: Exibition = new Exibition();
  @Input() showEditButton: boolean = false;

  @Output() editClicked: EventEmitter<void> = new EventEmitter();

  onEditClicked(): void {
    this.editClicked.emit()
  }
}
