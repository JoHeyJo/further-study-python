from flask import Flask, request, jsonify 
from models import db, connect_db, User

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_fs'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True #prints how alchemy is talking to your database

app.app_context().push()

connect_db(app)
db.create_all()
######### User routes ###########
@app.get("/user")
def get_users():
    """Fetches all user data"""
    users = User.query.all()
    serialized = [User.serialize() for user in users]
    return jsonify(serialized)


@app.post("/user")
def add_user():
    """Adds new user to database"""
    first_name = request.args['first_name']
    last_name = request.args['last_name']

    user = User(first_name=first_name, last_name=last_name)
    db.session.add(user)
    db.session.commit()
     
    return User.serialize(user)