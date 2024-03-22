import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gif-response.interface';

@Component({
  selector: 'gifs-card-list',
  templateUrl: './card-list.component.html',
})
export class CardListComponent {
  // import properties from home component
  @Input('gifs')
  gifs: Gif[] = [];
}
