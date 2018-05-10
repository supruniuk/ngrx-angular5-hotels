from rest_framework import serializers
# from rest_framework.fields import CurrentUserDefault
from models import Review, Hotel, Stay, BaseUser, Group


class GroupSerializer(serializers.ModelSerializer):
    """ Serializer to represent the Customer model """
    class Meta:
        model = Group
        fields = ("id", "name")


class UserSerializer(serializers.ModelSerializer):
    """ Serializer to represent the Customer model """
    groups = GroupSerializer(many=True, read_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = BaseUser
        fields = ("id", "name", "email", "img", "password", "groups")


class ReviewDetailSerializer(serializers.ModelSerializer):
    """ Serializer to represent the Review model """
    customer = UserSerializer(read_only=True)
    likes_count = serializers.SerializerMethodField('_likes_count')
    is_liked = serializers.SerializerMethodField('_is_liked')

    def _is_liked(self, obj):
        user = self.context['request'].user
        return user in obj.likes.all()

    def _likes_count(self, obj):
        return obj.likes.count()

    class Meta:
        model = Review
        fields = ("id", "text", "likes_count", "is_liked",
                  "created_on", "rating", "customer")


class ReviewSerializer(serializers.ModelSerializer):
    """ Serializer to represent the Review model """
    likes_count = serializers.SerializerMethodField(
        '_likes_count', read_only=True)
    is_liked = serializers.SerializerMethodField(
        '_is_liked', read_only=True)

    def _is_liked(self, obj):
        user = self.context['request'].user
        return user in obj.likes.all()

    def _likes_count(self, obj):
        return obj.likes.count()

    class Meta:
        model = Review
        fields = ("id", "text", "likes_count", "is_liked",
                  "created_on", "rating", "stay", "customer", "hotel")


class StayDetailSerializer(serializers.ModelSerializer):
    """ Serializer to represent the Stay model """
    review = ReviewSerializer(required=False)

    class Meta:
        model = Stay
        fields = ("id", "start_date", "end_date",
                  "customer", "hotel")


class NewStaySerializer(serializers.ModelSerializer):
    """ Serializer to represent the Stay model """

    class Meta:
        model = Stay
        fields = ("id", "start_date", "end_date",
                  "customer", "hotel")


class StaySerializer(serializers.ModelSerializer):
    """ Serializer to represent the Stay model """
    review = ReviewSerializer(read_only=True)
    customer = UserSerializer(read_only=True)
    hotel = UserSerializer(read_only=True)

    class Meta:
        model = Stay
        fields = ("id", "start_date", "end_date",
                  "customer", "hotel", "review")


class HotelDetailsSerializer(serializers.ModelSerializer):
    """ Serializer to represent the Hotel model """
    reviews = ReviewDetailSerializer(
        source='review_set', many=True, read_only=True)
    is_favorite = serializers.BooleanField(read_only=True)

    class Meta:
        model = Hotel
        fields = ("id", "name", "img", "avg_rating", "location",
                  "rates", "phone", "availability", "website",
                  "email", "is_favorite", "reviews")


class HotelSerializer(serializers.ModelSerializer):
    """ Serializer to represent the Hotel model """

    class Meta:
        model = Hotel
        fields = ("id", "name", "img", "avg_rating", "location",
                  "rates", "phone", "availability", "website",
                  "email")
