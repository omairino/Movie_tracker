import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class MoviesModule {
  title: string;
  overview: string;
  release_date: string;
  trailer_url: string;
  image_path: string;
  language: string;
  vote_count: string;
  vote_average: string;
  backdrop_path: string;
  constructor(title, overview, release_date, trailer_url, image_path, language, vote_count, vote_average,backdrop_path) {
    this.title = title;
    this.overview = overview ;
    this.trailer_url = trailer_url; 
    this.image_path = image_path; 
    this.release_date = release_date;
    this.language = language; 
    this.vote_count = vote_count; 
    this.vote_average = vote_average;  
    this.backdrop_path = backdrop_path;
  }
}
