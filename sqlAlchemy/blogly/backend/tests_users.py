"""User model tests."""

# run tests using these commands:

# (venv) $ python -m unittest tests_cats

# (venv) $ python -m unittest tests_cats.CatViewTestCase

# (venv) $ python -m unittest tests_cats.CatViewTestCase.test_meow

import os
from unittest import TestCase
from sqlalchemy import except_

from models import db, User

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

os.environ['DATABASE_URL'] = "postgresql:///blogly_test"

# Now we can import app

from app import app

# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data

db.create_all()


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

        self.assertEqual

    def test_get(self):
      with app.test_client() as client:
        resp = client.get('/')
        html = resp
        print('>>>>>>>>',resp)  
