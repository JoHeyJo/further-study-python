"""users routes tests."""

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

class UserRouteTests(TestCase):
    """Integration tests for User model"""

    def setUp(self):
        """Add users to database before every test."""
        db.drop_all()
        db.create_all()
        
        self.client = app.test_client()

        self.u1 = User(first_name='Eli', last_name='Craig')
        self.uid1 = 1111
        self.u1.id = self.uid1

        self.u2 = User(first_name='Chew', last_name='Bean')
        self.uid2 = 2222
        self.u2.id  = self.uid2

        db.session.add(self.u1)
        db.session.add(self.u2)
        db.session.commit()

    def tearDown(self): 
         """Stuff to do after every test."""
         res = super().tearDown()
         db.session.rollback()
         return res

    def test_get_all_users(self):
      with app.test_client() as client:
        resp = client.get('/')
        html = resp.get_data(as_text=True)
        
        self.assertEqual(resp.status_code, 200)
        print('>>>>>>>',html)
        self.assertEqual(html,  [
  {
    "firstName": "Chew",
    "id": 2222,
    "lastName": "Bean"
  },
  {
    "firstName": "Eli",
    "id": 1111,
    "lastName": "Craig"
  }
])x