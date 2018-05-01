from rest_framework import (viewsets, filters, status)
from rest_framework.views import APIView
from rest_framework.decorators import detail_route
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from models import Hotel, Customer, Review, Stay, BaseUser, Group
from serializers import (
    HotelDetailsSerializer,
    HotelSerializer,
    ReviewSerializer,
    StaySerializer,
    NewStaySerializer,
    UserSerializer,
)
from drf_roles.mixins import RoleViewSetMixin
from filters.mixins import FiltersMixin
from validations import hotels_query_schema
from django.db.models import Case, When, Value, BooleanField
from rest_framework_jwt.settings import api_settings as jwt_settings


class Auth(APIView):
    """
    Creating new user
    """
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            if request.data['authType'] == 'customer':
                group = Group.objects.get(name='customer')
                user = Customer.objects.create_user(**serializer.validated_data)
                user.img = 'images/customers/default/profile_img.jpg'
            elif request.data['authType'] == 'hotel':
                group = Group.objects.get(name='hotel')
                user = Hotel.objects.create_user(**serializer.validated_data)
                user.img = 'images/hotels/default/profile_img.jpg'

            if user and group:
                user.groups.add(group)
                user.save()

                # Getting jwt token to log user in during signing up
                jwt_payload_handler = jwt_settings.JWT_PAYLOAD_HANDLER
                jwt_encode_handler = jwt_settings.JWT_ENCODE_HANDLER
                payload = jwt_payload_handler(user)
                token = jwt_encode_handler(payload)

                return Response(
                    jwt_response_payload_handler(token, user, request),
                    status=status.HTTP_201_CREATED
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class HotelViewPagination(PageNumberPagination):
    page_size = 15


class HotelViewSet(RoleViewSetMixin, FiltersMixin, viewsets.ModelViewSet):
    """ ViewSet for viewing and editing Hotel objects """
    serializer_class = HotelSerializer
    queryset = Hotel.objects.all()

    pagination_class = HotelViewPagination
    ordering = ('-avg_rating',)
    filter_backends = (filters.OrderingFilter,)
    filter_mappings = {
        'name': 'name__icontains',
        'rating': 'avg_rating__gte',
    }
    filter_validation_schema = hotels_query_schema

    def get_queryset_for_customer(self):
        """
        Restricts the queryset by filtering against
        query parameters in the URL.
        """
        current_user = get_current_user(self.request.user)

        # Configuring queryset_filters from FilterMixin
        query_params = self.request.query_params
        url_params = self.kwargs
        queryset_filters = self.get_db_filters(url_params, query_params)
        db_filters = queryset_filters['db_filters']
        if ('favorites' in query_params and 'true' == query_params['favorites']):
            print(query_params['favorites'])
            db_filters['id__in'] = current_user.favorites.all()

        return (
            Hotel.objects
            .prefetch_related('review_set__likes',)
            .filter(**db_filters)
            .annotate(
                is_favorite=Case(
                    When(id__in=current_user.favorites.all(),
                         then=Value(True)),
                    default=Value(False),
                    output_field=BooleanField(),
                ),
            )
        )

    def get_serializer_class_for_customer(self):
        return HotelDetailsSerializer

    @detail_route(methods=['post', 'delete'])
    def favorite(self, request, pk=None):
        hotel = self.get_object()
        user = get_current_user(self.request.user)
        try:
            # to add hotel to favorites
            if request.method == "POST":
                user.favorites.add(hotel)
                return Response({'result': 'Hotel is added to favorites'})
            # to remove hotel from favorites
            if request.method == "DELETE":
                user.favorites.remove(hotel)
                return Response(status=status.HTTP_204_NO_CONTENT)
        except AttributeError:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class StayViewSet(RoleViewSetMixin, viewsets.ModelViewSet):
    """ ViewSet for viewing and editing Stay objects """
    serializer_class = StaySerializer
    queryset = Stay.objects.all()

    def get_serializer_class_for_customer(self):
        if self.action in ['create']:
            return NewStaySerializer
        else:
            return StaySerializer

    def get_serializer_class_for_hotel(self):
        return StaySerializer

    def get_queryset_for_customer(self):
        current_user = get_current_user(self.request.user)
        return Stay.objects.filter(customer=current_user)

    def get_queryset_for_hotel(self):
        current_user = get_current_user(self.request.user)
        return Stay.objects.filter(hotel=current_user)


class ReviewViewSet(viewsets.ModelViewSet):
    """ ViewSet for viewing and editing Review objects """
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    @detail_route(methods=['post', 'delete'])
    def like(self, request, pk=None):
        review = self.get_object()
        current_user = self.request.user

        if request.method == "POST":
            review.likes.add(current_user)
        if request.method == "DELETE":
            review.likes.remove(current_user)

        serializer = self.serializer_class(
            review, context={'request': request})
        return Response(serializer.data)


def jwt_response_payload_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }


def get_current_user(user):
    return BaseUser.objects.get_subclass(id=user.id)
