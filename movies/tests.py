from django.test import TestCase
from .models import Movie


# Create your tests here.
class MovieTestCase(TestCase):
    def test_movie_count(self):
        self.assertEqual(Movie.objects.count(), 0)

    def test_movies_add(self):
        m = Movie(title="abuhatom",
                  overview="King of the North",
                  release_date="2020-10-25",
                  trailer_url="https://www.youtube.com/watch?v=P8UaKbynumk",
                  image_path="https://www.youtube.com/watch?v=P8UaKbynumk",
                  language='ar',
                  vote_count=800000,
                  vote_average=10.0)
        m.save()
        self.assertEqual(Movie.objects.count(), 1)
