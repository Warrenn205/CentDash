from flask import Flask, render_template, request, session, redirect, url_for
import sqlite3 as sql

app = Flask(__name__)

@app.route('/')
def main():
    return render_template("centdash.html")

@app.route('/login')
def login():
    return render_template("signin.html")

@app.route('/page')
def page():
    return render_template("centdashpage.html")

if __name__ == '__main__':
    app.run(host="0.0.0.0",debug=True)