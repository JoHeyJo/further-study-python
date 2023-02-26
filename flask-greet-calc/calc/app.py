from flask import Flask, request
from operations import add, sub, mult, div

app = Flask(__name__)

#  http://localhost:5000/add?a=10&b=20

@app.get("/")
def root():
  """Handles root route"""
  return 'root'

@app.get("/add")
def add_nums():
    """Route that returns sum of two nums passed in query params"""
    a = request.args.get("a")
    b = request.args.get("b")

    result = add(int(a),int(b))
    return str(result)

@app.get("/subtract")
def sub_nums():
    """Route that returns difference between nums passed in query params"""
    a = request.args.get("a")
    b = request.args.get("b")

    result = sub(int(a),int(b))
    return str(result)

@app.get("/multiply")
def mult_num():
    """Route that returns product of nums in query params"""
  
    a = request.args.get("a")
    b = request.args.get("b")

    result = mult(int(a),int(b))
    return str(result)

@app.get("/divide")
def div_num():
    """Route that returns divides nums in query params"""
  
    a = request.args.get("a")
    b = request.args.get("b")

    result = div(int(a),int(b))
    return str(result)
