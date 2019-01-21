import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MovieitemComponent } from './movieitem/movieitem.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    MovieitemComponent,
    MovieDetailsComponent
  ],
  imports: [
    BrowserModule
    ,HttpModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
