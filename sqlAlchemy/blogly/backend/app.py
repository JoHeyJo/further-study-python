import os
from flask import Flask, request, redirect, jsonify 
from models import db, connect_db, User
from flask_cors import CORS
from flask_debugtoolbar import DebugToolbarExtension

######## Double check exception key works ##########
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
app.config['SECRET_KEY'] = 'i-have-a-secret'
app.app_context().push()

# Having the Debug Toolbar show redirects explicitly is often useful;
# however, if you want to turn it off, you can uncomment this line:
#
# app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

toolbar = DebugToolbarExtension(app)

connect_db(app)
#### do this when you want to have your root route be a certain page/component
@app.get('/')
def root():
    """Homepage redirects to list of users."""

    return redirect("/users")

######### User routes ###########
@app.get("/users")
def users_all():
    """Retrieves all users in database"""
    try:
        # gets all users
        # users = User.query.order_by(User.last_name, User.first_name).all()
        users = User.query.order_by(User.last_name, User.first_name)
        serialized = [User.serialize(user) for user in users]   
        user_name = [{'id': user['id'], 'firstName':user['firstName'], 'lastName':user['lastName']} for user in serialized] 
        return jsonify(user_name)   
    except LookupError as error:
        print('Lookup error >>>>>>>>>', error )
        return jsonify({"error": error})

@app.get("/users/<int:id>")
def users_get(id):
    """Retrieves user with matching ID"""
    user = User.query.get_or_404(id)
    serialized = User.serialize(user)
    return jsonify(serialized)

@app.post("/users/new")
def users_add():
    """Adds new user to database"""
    first_name = request.json['firstName']
    last_name = request.json['lastName']
    try:
        user = User(first_name=first_name, last_name=last_name)
        db.session.add(user)
        db.session.commit()
        return redirect("/")
    except KeyError as e:
        print("keyerror>>>>>>", e)
        return jsonify({"error": f"Missing {str(e)}"})


@app.get('/users/<int:user_id>/edit')
def users_edit(user_id):
    """Retrieves user with matching ID to populate edit form"""
    user = User.query.get_or_404(user_id)
    serialized = User.serialize(user)
    return jsonify(serialized)

@app.patch("/users/<int:user_id>/edit")
def users_update(user_id):
    """Update user's information"""
    try:
        user = User.query.get_or_404(user_id) 
        user.first_name = request.json['firstName']
        user.last_name= request.json['lastName']

        db.session.add(user)
        db.session.commit()


        return redirect(f"/users/{user_id}")

    except LookupError as error:
        print("Lookup error", error)
        return jsonify({"error":error})

# add delete to end of route
@app.delete("/users/<int:user_id>/delete")
def user_delete(user_id):
    # User.query.filter_by(id=user_id).delete()
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return redirect("/")