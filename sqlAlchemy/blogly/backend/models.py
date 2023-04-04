from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import DateTime
from datetime import datetime

db = SQLAlchemy()


# can contain a default img 
# DEFAULT_IMAGE_URL = "https://tinyurl.com/y3rfozh8"

class User(db.Model):
    """User model."""

    __tablename__= "users"

    id = db.Column(db.Integer,
                    primary_key=True,
                    autoincrement=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    image_url = db.Column(db.String, nullable=True)
    posts = db.relationship('Post')

    # gives "special" functionality to certain methods to make them act as getters, setters, or deleters when we define properties in a class
    @property
    def full_name(self):
        """Return full name of user"""

        return f"{self.first_name} {self.last_name}"

    def serialize(self):
        """Serialize to dict"""
        return {"id":self.id, "firstName":self.first_name, "lastName":self.last_name, "imageUrl":self.image_url}

class Post(db.Model):
    """Post model"""

    __tablename__="users"

    id = db.Column(db.Integer,
                    primary_key=True,
                    autoincrement=True)
    title = db.Column(db.String(50), nullable=False)
    content = db.Column(db.String(50), nullable=False)
    created_at = db.Column(DateTime, default=datetime.now)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User')

def connect_db(app):
    """Connect to database."""
    db.app = app
    db.init_app(app)


    