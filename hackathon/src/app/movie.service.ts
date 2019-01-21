import { Injectable, EventEmitter } from '@angular/core';
import { Http } from "@angular/http"
import { MoviesModule } from './movies/movies.module';
import { jsonpFactory } from '@angular/http/src/http_module';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  movieChanged=new EventEmitter<MoviesModule[]>();
  private movieDetails:MoviesModule[]=[]

  constructor(private http:Http) {  
    }
    getProducts(){
      var temp = []
      this.http.get("http://192.168.43.215:8000/").subscribe((response)=>{
        var items = []
        items = response.json();
       
        for(let movie of response.json()){
          movie = movie.fields
         const movie_to_add = new MoviesModule(movie.title,movie.overview,movie.release_date,movie.trailer_url,movie.image_path,movie.language,movie.vote_count,movie.vote_average,movie.backdrop_path)
         temp.push(movie_to_add)
        }
        this.movieDetails = temp
        this.movieChanged.emit(this.movieDetails.slice())
    },(err)=>{
       })
       return this.movieDetails.slice();

    
  }
}
