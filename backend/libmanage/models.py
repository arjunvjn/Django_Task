from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _

# Create your models here.

class Books(models.Model):
    name=models.CharField(max_length=50,unique=True)
    author=models.CharField(max_length=50)
    price=models.FloatField()

    def __str__(self):
        return self.name

class MyUser(AbstractUser):
    USERNAME_FIELD = 'email'
    email = models.EmailField(_('email address'), unique=True,blank=False) 
    REQUIRED_FIELDS = ['first_name','last_name','password','username']