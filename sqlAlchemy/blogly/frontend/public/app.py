from flask import Flask, request, redirect, jsonify 
from models import db, connect_db, User
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_fs'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True #prints how alchemy is talking to your database

app.app_context().push()

connect_db(app)
db.create_all()

######### User routes ###########
@app.get("/")
def get_all_users():
    """Retrieves all users in database"""
    users = User.query.order_by(User.last_name, User.first_name)
    serialized = [User.serialize(user) for user in users]
    user_name = [{'id': user['id'], 'firstName':user['firstName'], 'lastName':user['lastName']} for user in serialized]
    return jsonify(user_name)

# @app.get("/user")
# def get_users():
#     """Fetches all user data"""
#     users = User.query.all()
#     serialized = [User.serialize(User) for user in users]
#     return jsonify(serialized)

@app.get("/user/<int:id>")
def get_user(id):
    """Retrieves user with matching ID"""
    user = User.query.get_or_404(id)
    serialized = User.serialize(user)
    return jsonify(serialized)


@app.post("/user")
def add_user():
    """Adds new user to database"""
    first_name = request.json['firstName']
    last_name = request.json['lastName']

    user = User(first_name=first_name, last_name=last_name)
    db.session.add(user)
    db.session.commit()
    return User.serialize(user)

@app.post("/user/<int:id>")
def edit_user(id):
    """Update user's information"""
    user = User.query.get_or_404(id) 
    first_name = request.json('firstName')
    last_name = request.json('lastName')
    image_url = request.json('imageUrl')

    user['first_name'] = first_name
    user['last_name'] = last_name
    user['image_url'] = image_url

    db.session.add(user)
    db.session.commit()

    serialized = User.serialize(user)

    return jsonify(serialized)

