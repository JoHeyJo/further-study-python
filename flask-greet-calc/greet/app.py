from flask import Flask

app = Flask(__name__)

@app.get('/')
def root():
  """Root route"""
  return "Root"

@app.get('/welcome')
def welcome():
  """Route that returns a greeting"""
  
  html = "<html><body><h1>Hello</h1></body></html>"
  return html

@app.get('/welcome/home')
def welcome_home():
  """Route that welcomes home"""

  html = "<html><body><h1>Welcome Home</h1></body></html>"
  return html

@app.get('/welcome/back')
def welcome_back():
  """Route that welcomes back"""

  html = "<html><body><h1>Welcome Back</h1></body></html>"
  return html