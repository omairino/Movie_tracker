import { Component, AfterViewInit,OnInit } from '@angular/core';
import * as M from "../assets/materialize/js/materialize.js"
import * as S from "../assets/swiper-4.4.6/dist/js/swiper.min.js"
import { MoviesModule } from './movies/movies.module.js';
import * as $ from 'jquery';

// import {Location} from "@angular/common"
import { callbackify } from 'util';
import { MovieService } from './movie.service.js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements AfterViewInit,OnInit {
  
  options = {};
  movie_name = "template"
  movie_description = "template"
  details_page:boolean = false;
  Swiper:S = null
  movies:MoviesModule[] = []
  constructor(private movieList:MovieService){}
  
  ngOnInit(): void {
    this.movies = this.movieList.getProducts();
      this.movieList.movieChanged.subscribe((movies:MoviesModule[])=>{
      this.movies=movies;
     
       
    
    })
  }
  ngAfterViewInit(): void {
    this.Swiper = new S('.swiper-container', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows : true
      },
      pagination: {
        el: '.swiper-pagination',
      },
    });
    this.Swiper.on('slideChange', ()=> {
      $('body').css('background-image', 'url('+this.movies[this.Swiper.activeIndex].backdrop_path+')');
    });
    $('#modal-container').click(function(){
      $(this).addClass('out');
      $('body').removeClass('modal-active');
    });
  }
  image_details(index)
  {
    this.movie_name = this.movies[index].title
    this.movie_description = this.movies[index].overview
    $('#modal-container').removeAttr('class').addClass("one");
    $('body').addClass('modal-active');
    console.log("entered here")
  }
  title = 'hackathon';
}
