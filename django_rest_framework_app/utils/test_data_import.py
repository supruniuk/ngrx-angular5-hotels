from django.test import TestCase
from web_service.utils.data_import import DataImport
from web_service.hotels.models import Dog, DogOwner, Sitter, Stay, Review


class DataImportTestCase(TestCase):

    @classmethod
    def setUpClass(cls):
        super(DataImportTestCase, cls).setUpClass()
        DataImport().populate_db_from_csv()

        cls.hotels = Sitter.objects.all()
        cls.owners = DogOwner.objects.all()
        cls.dogs = Dog.objects.all()
        cls.stays = Stay.objects.all()
        cls.reviews = Review.objects.all()

    # def setUp(self):
    #     # self.sitter.refresh_from_db()
    #     self.hotels = Sitter.objects.all()
    #     self.owners = DogOwner.objects.all()
    #     self.dogs = Dog.objects.all()
    #     self.stays = Stay.objects.all()
    #     self.reviews = Review.objects.all()

    def test_hotels_imported(self):
        """Test that all hotels were imported from csv to DB"""
        self.assertEqual(len(self.hotels), 100)

    def test_owners_imported(self):
        """Test that all owners were imported from csv to DB"""
        self.assertEqual(len(self.owners), 189)

    def test_dogs_imported(self):
        """Test that all hotels were imported from csv to DB"""
        self.assertEqual(len(self.dogs), 381)

    def test_stays_imported(self):
        """Test that all hotels were imported from csv to DB"""
        self.assertEqual(len(self.stays), 500)

    def test_reviews_imported(self):
        """Test that all hotels were imported from csv to DB"""
        self.assertEqual(len(self.reviews), 500)

    def test_sitter_has_stays(self):
        """Test that sitter has correspondend stays"""
        sitter = self.hotels.get(name="Leilani R.")
        sitter_stays = self.stays.filter(sitter=sitter)
        self.assertEqual(len(sitter_stays), 12)

    def test_owner_has_dogs(self):
        """Test that owner has correct number of dogs"""
        owner = self.owners.get(name="Kerry R.")
        owner_dogs = self.dogs.filter(owner=owner)
        self.assertEqual(len(owner_dogs), 3)

    def test_dogs_belong_to_owner(self):
        """Test that dogs belong to proper owner"""
        owner = self.owners.get(name="Kerry R.")
        dogs_names = self.dogs.values_list(
            'name', flat=True).filter(owner=owner)
        self.assertEqual(list(dogs_names), ['Brite Eyes', 'Otis', 'callie'])

    def test_stay_has_review(self):
        """Test that every stay has corresponed review"""
        reviews = self.stays.values_list('review', flat=True)
        self.assertEqual(len(reviews), 500)
        for stay in self.stays:
            self.assertEqual(stay.id, stay.review.id)
