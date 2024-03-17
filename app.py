from flask import Flask, render_template, request, session, redirect, url_for
import sqlite3 as sql

app = Flask(__name__)

@app.route('/')
def main():
    return render_template("centdash.html")

@app.route('/login')
def login():
    return render_template("signin.html")

@app.route('/signup')
def sign_up():
    return render_template("signup.html")

@app.route('/page')
def page():
    return render_template("centdashpage.html")

@app.route('/dashboard')
def dashboard():
    return render_template("centdashpage.html")

@app.route('/budgets')
def budgets():
    return render_template("budgets.html")

@app.route('/networth')
def networth():
    return render_template("networth.html")

@app.route('/savings')
def savings():
    return render_template("savings.html")

@app.route('/statements')
def statements():
    return render_template("statements.html")

@app.route('/hub')
def centdashhub():
    return render_template("centdashhub.html")


@app.route('/logout')
def logout():
    return render_template("centdash.html")

if __name__ == '__main__':
    app.run(host="0.0.0.0",debug=True)