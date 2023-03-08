"""User model tests."""

# run tests using these commands:

# (venv) $ python -m unittest tests_cats

# (venv) $ python -m unittest tests_cats.CatViewTestCase

# (venv) $ python -m unittest tests_cats.CatViewTestCase.test_meow

from unittest import TestCase

from app import app, db
from models import User

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql:///blogly_test"
app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']
print('**********************')
print('app.config[SQLALCHEMY_DATABASE_URI]',app.config['SQLALCHEMY_DATABASE_URI'])
print('**********************')

class UsersTests(TestCase):
    """Integration tests for User model"""

    def setUP(self):
        """Add users to database before every test."""
        db.drop_all()
        db.create_all()

        u1 = User(first_name='Eli', last_name='Craig')
        uid1 = 1111
        u1.id = uid1

        u2 = User(first_name='Chew', last_name='Bean')
        uid2 = 2222
        u2.id  = uid2

        self.client = app.test_client()

    def tearDown(self): 
         """Stuff to do after every test."""
         res = super().tearDown()
         db.session.rollback()
         return res

    def test_user_model(self):
        """Does basic model work?"""

        u = User(first_name='Eli',last_name='Craig')

        db.session.add(u)
        db.session.commit()

        self.assertIsInstance(u, User)


