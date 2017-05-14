from django.contrib.auth.models import User
from django.db import models

# Create your models here.

class Article(models.Model):
    title = models.CharField(max_length=30)
    body = models.TextField(null=True)
    author = models.ForeignKey(User)
    picture = models.URLField()

