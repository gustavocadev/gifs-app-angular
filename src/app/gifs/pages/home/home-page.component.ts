import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gif-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  constructor(private readonly gifsService: GifsService) {}

  get gifs() {
    return this.gifsService.gifList;
  }
}
