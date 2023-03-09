"""users routes tests."""
# run tests using these commands:

# (venv) $ python -m unittest tests_users_routes

# (venv) $ python -m unittest tests_users_routes.UsersRouteTests

# (venv) $ python -m unittest tests_users_routes.UsersRouteTests.test_get_all_users

import os
from unittest import TestCase

from models import User,connect_db, db

os.environ['DATABASE_URL'] =  "postgresql:///blogly_testing"

from app import app, jsonify

app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']
db.create_all() 
class UsersRouteTests(TestCase):
    """Tests for users routes"""
    
    def setUp(self):
        """Add users to database before every test."""
        db.drop_all()
        db.create_all()

        self.client = app.test_client()

        u1 = User(first_name='test_first_one', last_name='test_last_one')
        uid1 = 1111
        u1.id = uid1

        u2 = User(first_name='test_first_second', last_name='test_last_second')
        uid2 = 2222
        u2.id  = uid2

        db.session.add_all([u1,u2])
        db.session.commit()

        self.u1 = db.session.get(User,uid1)
        self.u2 = db.session.get(User,uid2)

    def tearDown(self): 
         """Stuff to do after every test."""
         db.session.rollback()

    def test_get_all_users(self):
        """Tests that all users are returned """
        with self.client as c:
            resp = c.get('/')
            # html = resp.get_data(as_text=True)
        print(resp)
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.json,[
            {
              "firstName": "test_first_one",
              "id": 1111,
              "lastName": "test_last_one"
            },
            {
                "firstName": "test_first_second",
                "id": 2222,
                "lastName": "test_last_second"
            }
          ]
        )

    def test_get_user(self):
        """Tests that a user corresponding an ID is returned"""
        with self.client as c:
            resp = c.get(f"/user/{self.u1.id}")
            html = resp.get_data(as_text=True)
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.json, 
            {
                "firstName": "test_first_one",
                "id": 1111,
                "imageUrl": None,
                "lastName": "test_last_one"
            }
        )
    def test_add_user(self):
        """Test: user can be added to database"""
        with self.client as c:
            resp = c.post("/user",
                          json={
                              "firstName": "test_first_post",
                              "lastName": "test_last_post"
                          })
            print('***************',resp)
            self.assertEqual(resp.status_code, 200)