from django.test import TestCase
# from web_service.utils.data_import import DataImport
from web_service.hotels.models import DogOwner, Sitter, Stay
from random import randint
import tempfile


class SitterTestCase(TestCase):

    @classmethod
    def setUpTestData(cls):
        image_file = tempfile.NamedTemporaryFile(suffix=".jpg").name

        cls.test_sitter = Sitter.objects.create(
            name="John Doe",
            img=image_file
        )

        cls.test_owner = DogOwner.objects.create(
            name="James Oliver",
            img=image_file
        )

    def create_stay(self, rating=None):
        if not rating:
            rating = randint(1, 5)
        return Stay.objects.create(
            start_date='2013-04-08',
            end_date='2013-04-08',
            owner=self.test_owner,
            sitter=self.test_sitter,
            rating=rating
        )

    def setUp(self):
        """
        Refreshing test models state before every test
        """
        self.test_sitter.refresh_from_db()
        self.test_sitter._Sitter__original_name = self.test_sitter.name

    def test_sitter_created(self):
        """Test that all hotels were imported from csv to DB"""
        self.assertTrue(isinstance(self.test_sitter, Sitter))

    def test_sitter_has_original_name(self):
        """Test that sitter has original name"""
        self.assertEqual(self.test_sitter._Sitter__original_name,
                         self.test_sitter.name)

    def test_sitter_original_name_changed(self):
        """Test that sitter's original name is changed after renaming and saving
        """  # noqa
        self.test_sitter.name = "John Doe Renamed"
        self.assertNotEqual(self.test_sitter._Sitter__original_name,
                            self.test_sitter.name)
        self.test_sitter.save()
        self.assertEqual(self.test_sitter._Sitter__original_name,
                         self.test_sitter.name)

    def test_sitter_score(self):
        """Test that sitter_score is calculated for newly created sitter
        """  # noqa
        self.assertEqual(self.test_sitter.sitter_score, 1.15384615384615)

    def test_overall_sitter_rank(self):
        """Test that overall_sitter_rank is calculated for newly created sitter
        """  # noqa
        self.assertEqual(self.test_sitter.overall_sitter_rank,
                         1.15384615384615)

    def test_sitter_score_after_rename(self):
        """Test that sitter_score is recalculated after sitter's name is changed
        """  # noqa
        self.test_sitter.name = "John Doe Renamed"
        self.test_sitter.save()
        self.assertEqual(self.test_sitter.sitter_score, 1.7307692307692308)

    def test_overall_rank_after_rename(self):
        """Test that overall_sitter_rank is recalculated after sitter's name is changed
        """  # noqa
        self.test_sitter.name = "John Doe Renamed"
        self.test_sitter.save()
        self.assertEqual(self.test_sitter.overall_sitter_rank,
                         1.7307692307692308)

    def test_average_stay_rating_zero(self):
        """Test that average_stay_rating is 0 for new user
        """
        average_rating = Stay.objects.get_average_rating(self.test_sitter)
        self.assertEqual(average_rating, 0)

    def test_average_rating_new_stay(self):
        """Test that average_stay_rating gets updated every time new stay with this sitter is added
        """  # noqa
        self.create_stay(rating=2)
        self.assertEqual(self.test_sitter.rating_score, 2)

        self.create_stay(rating=4)
        self.assertEqual(self.test_sitter.rating_score, 3)

    def test_average_rating_stay_changed(self):
        """Test that average_stay_rating gets updated when rating of corresponded stay is changed
        """  # noqa
        stay_1 = self.create_stay(rating=2)
        stay_2 = self.create_stay(rating=4)
        self.assertEqual(self.test_sitter.rating_score, 3)

        stay_1.rating = 1
        stay_1.save(update_fields=["rating"])
        stay_2.rating = 3
        stay_2.save(update_fields=["rating"])
        self.assertEqual(self.test_sitter.rating_score, 2)

    def test_stay_count_new_stay(self):
        """Test that sitter's stays_count gets updated every time new stay with this sitter is added
        """  # noqa
        for _ in range(5):
            self.create_stay()
        self.assertEqual(self.test_sitter.stays_count, 5)

    def test_overall_rank_new_stay(self):
        """Test that overall_sitter_rank gets updated every time new stay with this sitter is added
        """  # noqa
        self.create_stay(rating=5)
        self.assertNotEqual(
            self.test_sitter.overall_sitter_rank,
            self.test_sitter.sitter_score)
        self.assertEqual(self.test_sitter.overall_sitter_rank,
                         1.538461538461535)

    def test_overall_rank_stay_changed(self):
        """Test that overall_sitter_rank gets updated when rating of corresponded stay is changed
        """  # noqa
        stay = self.create_stay(rating=5)
        self.assertEqual(
            self.test_sitter.overall_sitter_rank,
            1.538461538461535)

        # Changing rating of existing stay should trigger
        # updating corresponded sitter overall_rank
        stay.rating = 2
        stay.save(update_fields=["rating"])
        self.assertEqual(
            self.test_sitter.overall_sitter_rank,
            1.238461538461535)

    def test_overall_rank_stay_10(self):
        """Test that overall_sitter_rank equals average_stay_rating if stays_count >= 10
        """  # noqa
        for _ in range(10):
            self.create_stay()
        self.assertEqual(
            self.test_sitter.overall_sitter_rank,
            self.test_sitter.rating_score)
