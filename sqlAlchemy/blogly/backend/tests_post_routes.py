"""posts routes tests."""

import os
from unittest import TestCase
from models import User, Post, connect_db, db
from freezegun import freeze_time

from sqlalchemy import DateTime
from datetime import datetime

os.environ['DATABASE_URL'] = "postgresql:///blogly_testing"

from app import app

app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']
app.config['FLASK_DEBUG'] = True

db.create_all()


class PostRouteTests(TestCase):
    """Tests for posts routes."""
    # @freeze_time("2022-01-01 12:00:00")
    def setUp(self):
        """Add post to database before every test."""
        
        db.drop_all()
        db.create_all()

        self.client = app.test_client()
 
        u1 = User(first_name='test_first_one', last_name='test_last_one')
        uid1 = 1111
        u1.id = uid1
        print("********",datetime.now())
       
        p1 = Post(title='hello', content='hello world', user_id=1111)
        p1id = 111
        p1.id = p1id
        # p1.created_at = 'now'

        print(Post.serialize(p1))
        print("********",datetime.now())
        db.session.add_all([u1,p1])
        db.session.commit()

        self.p1 = db.session.get(Post, p1id)
        self.u1 = db.session.get(User, uid1)

    def tearDown(self):
        """Do after every test."""
        db.session.rollback()

    def test_add_post(self):
        """Test: post is added to db and redirects"""
        with self.client as c:
            resp = c.post(f"/users/{self.u1.id}/posts/new",
            json={
              'title':'hello again',
              'content': 'hello world again',
              'user_id': self.u1.id
            })
            self.assertEqual(resp.status_code, 302)
            self.assertEqual(resp.location, f"/users/{self.u1.id}")

    def test_get_post(self):
        """Test: retrieve post of specific user"""
        with self.client as c:
            resp = c.get(f"/posts/{self.p1.id}")
            self.assertEqual(resp.status_code, 200)
            print('in test get post',resp.json)
            self.assertIn("title", resp.json)
            self.assertIn("content", resp.json)

# POST / users/[user-id]/posts/new
# Handle add form

# add post and redirect to the user detail page.
# GET / posts/[post-id]
# Show a post.


# GET / users/[user-id]/posts/new
# Show form to add a post for that user.


# Show buttons to edit and delete the post.

# GET / posts/[post-id]/edit
# Show form to edit a post, and to cancel(back to user page).

# POST / posts/[post-id]/edit
# Handle editing of a post. Redirect back to the post view.

# POST / posts/[post-id]/delete
# Delete the post.
