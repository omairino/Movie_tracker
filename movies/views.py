from django.http import HttpResponse
from django.shortcuts import render
import requests

# Create your views here.
from django.template import loader


def home(request):
    # return render(request, 'movies/movies.html')
    template = loader.get_template("/home/majd/PycharmProjects/abuhiss/movies/movies.html")
    return HttpResponse(template.render())
