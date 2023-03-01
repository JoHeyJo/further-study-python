from flask import Flask, request, jsonify 
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

@app.get("/")
def root():
  return "root"

######### User routes ###########
@app.get("/user")
def get_users():
    """Fetches all user data"""
    users = User.query.all()
    serialized = [User.serialize(user) for user in users]
    return jsonify(serialized)


@app.post("/user")
def add_user():
    """Adds new user to database"""
    print('###############################',request.json['firstName'],request.json['lastName'])
    first_name = request.json['firstName']
    last_name = request.json['lastName']

    user = User(first_name=first_name, last_name=last_name)
    db.session.add(user)
    db.session.commit()
     
    return User.serialize(user)