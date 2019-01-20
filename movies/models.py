from django.db import models
from django.utils import timezone
import requests
from tmdbv3api import TMDb
from tmdbv3api import Movie as MV

tmdb = TMDb()
tmdb.api_key = 'b1db1208c22cb6a8008089409518b4bd'


class Movie(models.Model):
    title = models.CharField(max_length=200)
    overview = models.TextField()
    release_date = models.DateTimeField()
    trailer_url = models.TextField()
    image_path = models.TextField()
    language = models.CharField(max_length=20)
    vote_count = models.IntegerField()
    vote_average = models.FloatField()

    def fetch_movies(self):
        movie = MV()
        popular = movie.upcoming()

        for p in popular:
            movies = requests.get(
                f'https://api.themoviedb.org/3/movie/{p.id}/videos?api_key=b1db1208c22cb6a8008089409518b4bd')
            url = f"https://www.youtube.com/watch?v={movies.json()['results'][0]['key']}"
            m = Movie(title=p.title, overview=p.overview, release_date=p.release_date, trailer_url=url,
                      image_path=f"http://image.tmdb.org/t/p/w185{p.poster_path}", language=p.original_language,
                      vote_average=p.vote_average, vote_count=p.vote_count)
            m.save()

# Create your models here.
