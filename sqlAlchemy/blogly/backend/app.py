from flask import Flask, request, redirect, jsonify 
from models import db, connect_db, User
from flask_cors import CORS
from flask_debugtoolbar import DebugToolbarExtension

######## Double check exception key works ########
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql:///blogly_fs"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'i-have-a-secret'
app.app_context().push()

# Having the Debug Toolbar show redirects explicitly is often useful;
# however, if you want to turn it off, you can uncomment this line:
#
# app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

toolbar = DebugToolbarExtension(app)
print('**********************')
print('app.config[SQLALCHEMY_DATABASE_URI====]',app.config['SQLALCHEMY_DATABASE_URI'])
print('**********************')
connect_db(app)
    
######### User routes ###########
@app.get("/")
def get_all_users():
    """Retrieves all users in database"""
    try:
        users = User.query.order_by(User.last_name, User.first_name)
        serialized = [User.serialize(user) for user in users]   
        user_name = [{'id': user['id'], 'firstName':user['firstName'], 'lastName':user['lastName']} for user in serialized] 
        return jsonify(user_name)   
    except LookupError as error:
        print('Lookup error >>>>>>>>>', error )
        return jsonify({"error": error})

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
    try:
        user = User(first_name=first_name, last_name=last_name)
        db.session.add(user)
        db.session.commit()
        return User.serialize(user)
    except KeyError:
        print("keyerror>>>>>>", e)
        return jsonify({"error": f"Missing {str(e)}"})


@app.post("/user/<int:user_id>")
def edit_user(user_id):
    """Update user's information"""
    try:
        user = User.query.get_or_404(user_id) 
        user.first_name = request.json['firstName']
        user.last_name= request.json['lastName']
        # image_url = request.json['imageUrl']

        db.session.add(user)
        db.session.commit()

        serialized = User.serialize(user)

        return jsonify(serialized)
    except LookupError as error:
        print("Lookup error", error)
        return jsonify({"error":error})

