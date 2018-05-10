"""web_service URL Configuration
"""
from django.conf import settings
from django.contrib import admin
from rest_framework_jwt.views import (
    obtain_jwt_token, refresh_jwt_token, verify_jwt_token)
from rest_framework.routers import DefaultRouter
from rest_framework.documentation import include_docs_urls
from django.conf.urls import url, include
from hotels.views import (HotelViewSet, ReviewViewSet, StayViewSet, Auth)

router = DefaultRouter()
router.register(prefix='hotel', viewset=HotelViewSet, base_name='hotel-list')
router.register(prefix='review', viewset=ReviewViewSet)
router.register(prefix='stay', viewset=StayViewSet, base_name='stay-list')

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api-token-auth/', obtain_jwt_token),
    url(r'^token-refresh/', refresh_jwt_token),
    url(r'^token-verify/', verify_jwt_token),
    url(r'^auth/$', Auth.as_view()),
    url(r'^api-auth/', include('rest_framework.urls')),
    url(r'^docs/', include_docs_urls(title='Hotels API'))
]

urlpatterns += router.urls

if not settings.PRODUCTION:
    from django.conf.urls.static import static
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
