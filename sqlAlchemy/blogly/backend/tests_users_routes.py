"""users routes tests."""
# run tests using these commands:

# (venv) $ python -m unittest tests_cats

# (venv) $ python -m unittest tests_cats.CatViewTestCase

# (venv) $ python -m unittest tests_cats.CatViewTestCase.test_meow

from unittest import TestCase

from app import app
from db import db, create_all
from models import User

app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql:///blogly_testing"
app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

class UsersRouteTests(TestCase):
    """Tests for users routes"""

    def setUp(self):
        """Add users to database before every test."""
        User.query.delete
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
        #  res = super().tearDown()
         db.session.rollback()
        #  return res

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
])