# Generated by Django 2.1.5 on 2019-01-21 15:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0002_movie_reserve_path'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movie',
            name='reserve_path',
            field=models.TextField(blank=True),
        ),
    ]
