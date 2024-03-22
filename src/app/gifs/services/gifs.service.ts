import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, GifResponse } from '../interfaces/gif-response.interface';

@Injectable({
  // root makes this service available to the entire application
  providedIn: 'root',
})
export class GifsService {
  gifList: Gif[] = [];
  #tagsHistory: string[] = [];

  #apiKey = '';
  #serviceUrl = 'https://api.giphy.com/v1/gifs/search';

  constructor(private readonly http: HttpClient) {
    this.#loadLocalStorage();
  }

  get tagsHistory() {
    return [...this.#tagsHistory];
  }

  #organizeTagsHistory(newTag: string): void {
    newTag = newTag.toLowerCase();

    if (this.#tagsHistory.includes(newTag)) {
      this.#tagsHistory = this.#tagsHistory.filter((tag) => tag !== newTag);
    }

    this.#tagsHistory.unshift(newTag);
    this.#tagsHistory = this.#tagsHistory.slice(0, 10);

    // Save in local storage
    this.#saveLocalStorage();
  }

  #saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this.#tagsHistory));
  }

  #loadLocalStorage(): void {
    const history = localStorage.getItem('history');
    if (history) {
      this.#tagsHistory = JSON.parse(history);
    }

    this.searchTag(this.#tagsHistory.at(0) ?? '');
  }

  async searchTag(tag: string): Promise<void> {
    if (tag.length === 0) return;
    this.#organizeTagsHistory(tag);

    const url = new URL(this.#serviceUrl);
    url.searchParams.set('q', tag);
    url.searchParams.set('api_key', this.#apiKey!);
    url.searchParams.set('limit', '10');
    url.searchParams.set('lang', 'es');
    url.searchParams.set('rating', 'g');

    // const data = await fetch(url.href).then((resp) => resp.json());
    this.http.get<GifResponse>(url.href).subscribe(({ data }) => {
      this.gifList = data;
    });

    // console.log(data);
  }
}
