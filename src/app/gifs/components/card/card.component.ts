import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gif-response.interface';

@Component({
  selector: 'gifs-card',
  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit {
  @Input()
  gif!: Gif;

  ngOnInit(): void {
    if (!this.gif) throw new Error('Gif is required');
  }
}
