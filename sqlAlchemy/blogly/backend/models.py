from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import DateTime
from datetime import datetime
from freezegun import freeze_time

db = SQLAlchemy()


# can contain a default img
# DEFAULT_IMAGE_URL = "https://tinyurl.com/y3rfozh8"

class User(db.Model):
    """User model."""

    __tablename__ = "users"

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    image_url = db.Column(db.String, nullable=True)
    posts = db.relationship("Post", backref="user")
    # posts = db.relationship('Post')

    # gives "special" functionality to certain methods to make them act as getters, setters, or deleters when we define properties in a class
    @property
    def full_name(self):
        """Return full name of user"""

        return f"{self.first_name} {self.last_name}"

    def serialize(self):
        """Serialize to dict"""
        return {"id": self.id, "first_name": self.first_name, "last_name": self.last_name, "image_url": self.image_url}
    
# @freeze_time("2022-01-01 00:00:00")
class Post(db.Model):
    """Post model"""

    __tablename__ = "posts"

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    title = db.Column(db.String(50), nullable=False)
    content = db.Column(db.Text, nullable=False)
    problem = db.Column(db.Text)
    solution = db.Column(db.Text)
    created_at = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.now)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    @property
    def now(self):
        """Return nicely-formatted date."""

        return self.created_at.strftime("%a %b %-d  %Y, %-I:%M %p")
    # user = db.relationship('User')

    def serialize(self):
        """Serialize to dict"""
        return {"id": self.id, "title": self.title, "content": self.content, "problem": self.problem, "solution": self.solution,  "created_at": self.created_at, "user_id": self.user_id}


def connect_db(app):
    """Connect to database."""
    db.app = app
    db.init_app(app)
