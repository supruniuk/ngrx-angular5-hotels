from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, Group
from model_utils.managers import InheritanceManager
from django.db.models import Avg


class BaseManager(BaseUserManager, InheritanceManager):

    def create_user(self, email, password=None, **kwargs):
        # Ensure that an email address is set
        if not email:
            raise ValueError('Users must have a valid e-mail address')

        # Ensure that a username is set
        if not kwargs.get('name'):
            raise ValueError('Users must have a valid name')

        user = self.model(
            email=self.normalize_email(email),
            name=kwargs.get('name'),
        )
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, **kwargs):
        user = self.create_user(email, password, **kwargs)
        user.is_admin = True
        user.save()
        return user


def user_directory_path(instance, filename):
    if isinstance(instance, Customer):
        return 'images/customers/user_{0}/{1}'.format(instance.id, filename)
    elif isinstance(instance, Hotel):
        return 'images/hotels/user_{0}/{1}'.format(instance.id, filename)


class BaseUser(AbstractBaseUser):
    name = models.CharField(max_length=255, unique=True)
    email = models.CharField(max_length=255, unique=True)
    img = models.ImageField(upload_to=user_directory_path,
                            max_length=254, blank=True)
    groups = models.ManyToManyField(Group)
    objects = BaseManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']


class Customer(BaseUser):
    favorites = models.ManyToManyField(
        BaseUser, related_name='customer_favorites')
    objects = BaseManager()

    class Meta:
        db_table = 'customer'


class Stay(models.Model):
    start_date = models.DateField()
    end_date = models.DateField()
    customer = models.ForeignKey(Customer, models.DO_NOTHING)
    hotel = models.ForeignKey('Hotel', models.DO_NOTHING)

    class Meta:
        db_table = 'stay'
        ordering = ['-start_date', ]


class Review(models.Model):
    text = models.TextField()
    likes = models.ManyToManyField(BaseUser, related_name='review_likes')
    rating = models.FloatField(blank=True, null=True)
    created_on = models.DateField(auto_now_add=True)
    stay = models.OneToOneField(Stay, models.DO_NOTHING)
    customer = models.ForeignKey(Customer, models.DO_NOTHING)
    hotel = models.ForeignKey('Hotel', models.DO_NOTHING)

    class Meta:
        db_table = 'review'


class Hotel(BaseUser):
    location = models.CharField(max_length=255, blank=True)
    rates = models.CharField(max_length=255, blank=True)
    phone = models.CharField(max_length=16, blank=True)
    availability = models.CharField(max_length=20, blank=True)
    website = models.CharField(max_length=100, blank=True)

    avg_rating = models.FloatField(default=0)
    objects = BaseManager()

    class Meta:
        db_table = 'hotel'

    def update_avg_rating(self):
        self.avg_rating = self.review_set.aggregate(
            Avg('rating'))['rating__avg']
        self.save()
