"""posts routes tests."""

import os
from unittest import TestCase
from models import User, Post, connect_db, db

os.environ['DATABASE_URL'] = "postgresql:///blogly_testing"

from app import app

app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']
app.config['FLASK_DEBUG'] = True

db.create_all()

class PostRouteTests(TestCase):
    """Tests for posts routes."""

    def setUp(self):
        """Add post to database before every test."""

        db.drop_all()
        db.create_all()

        self.client = app.test_client()
 
        u1 = User(first_name='test_first_one', last_name='test_last_one')
        uid1 = 1111
        u1.id = uid1

        p1 = Post(title='hello', content='hello world', user_id=1111)
        p1id = 111
        p1.id = p1id

        db.session.add_all([u1,p1])
        db.session.commit()

        self.p1 = db.session.get(Post, p1id)

    def tearDown(self):
        """Do after every test."""

    def test_get_new_form_for_post(self):
        """Test: form is shown for user to post"""
        with self.client as c:
            resp = c.get(f"/users/{self.u1.id}/posts/new")
            self.assertEqual(resp.status_code, 200)
            # self.assertEqual(resp.html)


# GET / users/[user-id]/posts/new
# Show form to add a post for that user.

# POST / users/[user-id]/posts/new
# Handle add form
# add post and redirect to the user detail page.
# GET / posts/[post-id]
# Show a post.

# Show buttons to edit and delete the post.

# GET / posts/[post-id]/edit
# Show form to edit a post, and to cancel(back to user page).
# POST / posts/[post-id]/edit
# Handle editing of a post. Redirect back to the post view.
# POST / posts/[post-id]/delete
# Delete the post.
