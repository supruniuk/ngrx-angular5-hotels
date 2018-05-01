import os
from django.urls import reverse
from rest_framework.test import APIRequestFactory, APITestCase
from web_service.hotels.models import Sitter
from web_service.hotels.views import SitterViewSet
from django.core.files.uploadedfile import SimpleUploadedFile


class SitterViewsTestCase(APITestCase):
    fixtures = ['owners_test_data.json',
                'reviews_test_data.json',
                'hotels_test_data.json',
                'stays_test_data.json']

    def setUp(self):
        self.test_sitter = Sitter.objects.first()
        self.factory = APIRequestFactory()
        test_dir = os.path.dirname(os.path.abspath(__file__))
        image_path = os.path.join(test_dir, "test_image.png")
        self.image = SimpleUploadedFile(name='test_image.png', content=open(
            image_path, 'rb').read(), content_type='image/jpeg')

    def test_sitter_index(self):
        request = self.factory.get(reverse('sitter-list'))
        response = SitterViewSet.as_view({'get': 'list'})(request)
        self.assertEqual(response.status_code, 200)

    def test_sitter_details(self):
        id = self.test_sitter.id
        url = reverse('sitter-detail', kwargs={'pk': id})
        request = self.factory.get(url)
        response = SitterViewSet.as_view({'get': 'retrieve'})(request, id)
        self.assertEqual(response.status_code, 200)

    def test_sitter_details_404(self):
        id = 22500
        url = reverse('sitter-detail', kwargs={'pk': id})
        request = self.factory.get(url)
        response = SitterViewSet.as_view({'get': 'retrieve'})(request, id)
        self.assertEqual(response.status_code, 404)

    def test_new_sitter(self):
        data = {'name': u'Waldo', 'img': self.image}
        post_create = self.factory.post(reverse('sitter-list'), data)
        response = SitterViewSet.as_view({'post': 'create'})(post_create)
        self.assertEqual(response.status_code, 201)

    def test_duplicate_sitter(self):
        data = {'name': self.test_sitter.name,
                'img': self.test_sitter.img}
        post_create_dup = self.factory.post(reverse('sitter-list'), data)
        response = SitterViewSet.as_view({'post': 'create'})(post_create_dup)
        self.assertEqual(response.status_code, 400)

    def test_patch_sitter(self):
        data = {'name': 'Totally_new_name'}
        id = self.test_sitter.id
        url = reverse('sitter-detail', kwargs={'pk': id})
        post_patch = APIRequestFactory().patch(url, data)
        response = SitterViewSet.as_view(
            {'patch': 'partial_update'})(post_patch, pk=id)
        self.assertEqual(response.status_code, 200)

        # Request updated object from DB
        updated_sitter = Sitter.objects.get(id=id)
        self.assertEqual(updated_sitter.name, data['name'])

    def test_update_sitter(self):
        data = {'name': 'Totally_new_name',
                'img': self.image}
        id = self.test_sitter.id
        url = reverse('sitter-detail', kwargs={'pk': id})
        post_update = APIRequestFactory().put(url, data)
        response = SitterViewSet.as_view({'put': 'update'})(post_update, pk=id)
        self.assertEqual(response.status_code, 200)

        # Request updated object from DB
        updated_sitter = Sitter.objects.get(id=id)
        self.assertEqual(updated_sitter.name, data['name'])
