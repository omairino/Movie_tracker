import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MovieitemComponent } from './movieitem/movieitem.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { HttpModule } from '@angular/http';
import { NgxQRCodeModule } from 'ngx-qrcode2';


@NgModule({
  declarations: [
    AppComponent,
    MovieitemComponent,
    MovieDetailsComponent
  ],
  imports: [
    BrowserModule
    ,HttpModule
    ,NgxQRCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
