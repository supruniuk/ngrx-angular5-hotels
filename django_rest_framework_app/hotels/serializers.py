from rest_framework import serializers
from models import Review, Hotel, Stay, BaseUser


class BaseUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = BaseUser
        fields = ('id', 'username', 'password',
                  'email', 'groups', 'first_name', 'last_name', 'img')
        write_only_fields = ('password',)
        read_only_fields = ('id',)
        depth = 1


class ReviewDetailSerializer(serializers.ModelSerializer):
    """ Serializer to represent the Review model """
    customer = BaseUserSerializer(read_only=True)
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


class HotelDetailsSerializer(serializers.ModelSerializer):
    """ Serializer to represent the Hotel model """
    user = BaseUserSerializer(read_only=True)
    reviews = ReviewDetailSerializer(
        source='reviewed_hotel', many=True, read_only=True)
    is_favorite = serializers.BooleanField(read_only=True)

    class Meta:
        model = Hotel
        fields = ("id", "name", "img", "avg_rating", "address",
                  "rate", "phone", "availability", "website",
                  "email", "is_favorite", "reviews", "user")


class HotelSerializer(serializers.ModelSerializer):
    """ Serializer to represent the Hotel model """
    user = BaseUserSerializer(read_only=True)

    class Meta:
        model = Hotel
        fields = ("id", "name", "img", "avg_rating", "address",
                  "rate", "phone", "availability", "website",
                  "email", "user")


class NewStaySerializer(serializers.ModelSerializer):
    """ Serializer to represent the Stay model """

    class Meta:
        model = Stay
        fields = ("id", "start_date", "end_date",
                  "customer", "hotel")


class StaySerializer(serializers.ModelSerializer):
    """ Serializer to represent the Stay model """
    review = ReviewSerializer(read_only=True)
    customer = BaseUserSerializer(read_only=True)
    hotel = HotelDetailsSerializer(read_only=True)

    class Meta:
        model = Stay
        fields = ("id", "start_date", "end_date",
                  "customer", "hotel", "review",)
