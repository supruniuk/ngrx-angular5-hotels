# from __future__ import unicode_literals
# from django.conf import settings
from django.db import models
from django.contrib.auth.models import AbstractUser

# from django.contrib.auth.models import PermissionsMixin
from django.db.models import Avg
# from django.contrib.auth import get_user_model


def user_directory_path(instance, filename):
    if isinstance(instance, Customer):
        return 'images/customers/user_{0}/{1}'.format(instance.id, filename)
    elif isinstance(instance, Hotel):
        return 'images/hotels/user_{0}/{1}'.format(instance.id, filename)


class BaseUser(AbstractUser):
    img = models.ImageField(upload_to=user_directory_path,
                            max_length=254,
                            default="/images/default/profile_img.jpg")

    email = models.CharField(max_length=255, unique=True)
    REQUIRED_FIELDS = ['email']


class Customer(BaseUser):
    favorites = models.ManyToManyField('Hotel',
                                       related_name='customer_favorites')

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
    customer = models.ForeignKey(Customer, models.DO_NOTHING,
                                 related_name='reviewer_customer')
    hotel = models.ForeignKey('Hotel', models.DO_NOTHING,
                              related_name='reviewed_hotel')

    class Meta:
        db_table = 'review'


class Hotel(BaseUser):
    name = models.CharField(max_length=255, blank=False)
    address = models.CharField(max_length=255, blank=True)
    rate = models.CharField(max_length=255, blank=True)
    phone = models.CharField(max_length=16, blank=True)
    availability = models.DateField(auto_now_add=True)
    website = models.URLField()
    avg_rating = models.FloatField(default=0)

    class Meta:
        db_table = 'hotel'

    def update_avg_rating(self):
        self.avg_rating = self.reviewed_hotel.aggregate(
            Avg('rating'))['rating__avg']
        self.save()
