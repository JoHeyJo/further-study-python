from flask_sqlalchemy import SQLAlchemy

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

    # gives "special" functionality to certain methods to make them act as getters, setters, or deleters when we define properties in a class
    @property
    def full_name(self):
        """Return full name of user"""

        return f"{self.first_name} {self.last_name}"

    def serialize(self):
        """Serialize to dict"""
        return {"id":self.id, "firstName":self.first_name, "lastName":self.last_name, "imageUrl":self.image_url}

def connect_db(app):
    """Connect to database."""
    db.app = app
    db.init_app(app)


    