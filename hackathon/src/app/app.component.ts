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
  movie_image = "template"
  movie_release_date = "10/10/10"
  movie_language = "english"
  details_page:boolean = false;
  Swiper:S = null
  movies:MoviesModule[] = [];
  elementType : 'url' = null
  value = null
  ngxQrcode2 = null;
  constructor(private movieList:MovieService){}
  socket;
  num
  setServerSocket()
  {
    
    this.socket = new WebSocket('ws://127.0.0.1:1234');
    console.log("aa")
    this.socket.onopen = () => {
    console.log('WebSockets connection created.');
    this.socket.send("aa");
    this.socket.send("aa");
    this.socket.send("aa");
    this.socket.send("aa");

     };
  
     this.socket.onmessage = (event) => {
       console.log("data from socket:" + event.data);
       this.num = event.data;
       console.log(event.data)
       if(event.data == "127.0.0.1 - -1")
       {
         console.log("back")
        this.Swiper.slidePrev()
        
      }
      else if (event.data == "127.0.0.1 - 1")
      {
        console.log("hi")
        this.Swiper.slideNext()

       }
      else if (event.data == "127.0.0.1 - 0")
      {
        this.image_details(this.Swiper.activeIndex)
      }
      else if (event.data == "127.0.0.1 - -0")
      {
        $('#modal-container').addClass('out');
        $('body').removeClass('modal-active');
        
      }
     };
  
     if (this.socket.readyState == WebSocket.OPEN) {
       this.socket.onopen(null);
     }
    
    }
  ngOnInit(): void {
    this.movies = this.movieList.getProducts();
      this.movieList.movieChanged.subscribe((movies:MoviesModule[])=>{
      this.movies=movies;
      this.setServerSocket();
       
    
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
    this.movie_image = this.movies[index].image_path
    this.movie_language = this.movies[index].language
    console.log(this.movies[index].release_date)
    this.movie_release_date = this.movies[index].release_date
    this.ngxQrcode2 = this.movies[index].reserve_path
    $('#modal-container').removeAttr('class').addClass("one");
    $('body').addClass('modal-active');
    console.log("entered here")
  } 
  title = 'hackathon';
}
