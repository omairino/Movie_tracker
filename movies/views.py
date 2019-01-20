from django.http import HttpResponse
from django.shortcuts import render
import requests
from tmdbv3api import TMDb
from tmdbv3api import Movie as MV
from movies.models import Movie
import json
from django.http import JsonResponse
from django.forms.models import model_to_dict
from django.core import serializers
from django.core.serializers import serialize

tmdb = TMDb()
tmdb.api_key = 'b1db1208c22cb6a8008089409518b4bd'

# Create your views here.
from django.template import loader


def fetch_movies():
    movie = MV()
    popular = movie.upcoming()

    for p in popular:
        movies = requests.get(
            f'https://api.themoviedb.org/3/movie/{p.id}/videos?api_key=b1db1208c22cb6a8008089409518b4bd')
        url = f"https://www.youtube.com/watch?v={movies.json()['results'][0]['key']}"
        try:
            artist = Movie.objects.get(title=p.title)
        except Movie.DoesNotExist:
            m = Movie(title=p.title, overview=p.overview, release_date=p.release_date, trailer_url=url,
                      image_path=f"http://image.tmdb.org/t/p/w500{p.poster_path}",
                      backdrop_path=f"http://image.tmdb.org/t/p/w500{p.backdrop_path}", language=p.original_language,
                      vote_average=p.vote_average, vote_count=p.vote_count)
            m.save()


def home(request):
    if Movie.objects.count() == 0:
        fetch_movies()
    qs = Movie.objects.all()
    qs_json = serializers.serialize('json', qs)
    return HttpResponse(qs_json, content_type='application/json')

    # return render(request, 'movies.html', {'search_result': Movie.objects.last()})
