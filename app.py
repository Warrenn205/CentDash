from flask import Flask, render_template, request, session, redirect, url_for, jsonify, json, g
import sqlite3 as sql
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)

# Database handling with SQLite.
DATABASE_NAME = "database.db"
app.secret_key = "ART56HBCXTY-I876T-098NU" # Secret Key for CentDash's database.

# Configuring the app using JWTManager.
app.config['JWT_SECRET_KEY'] = 'ART56HBCXTY-I876T-098NU' 
jwt = JWTManager(app)

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sql.connect(DATABASE_NAME)
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

# Authentication token for email and password login.
@app.route('/get_auth_token', methods=['POST'])
def get_auth_token():
    email = request.form.get('email')
    password = request.form.get('password')

    if login(email, password):
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"msg": "Invalid credentials"}), 401


def create_connection():
    return sql.connect(DATABASE_NAME)

connection = sql.connect(DATABASE_NAME)
cursor = connection.cursor()

# SQL Queries for the registration and login information for CentDash users.
# SQL Query for signing up.
cursor.execute('''CREATE TABLE IF NOT EXISTS user (
                    firstName TEXT NOT NULL,
                    lastName TEXT NOT NULL,
                    email TEXT NOT NULL,
                    password TEXT NOT NULL
                )''')

# SQL Query for budgets page.
cursor.execute('''CREATE TABLE IF NOT EXISTS budget (
                    user_id TEXT PRIMARY KEY NOT NULL,
                    data TEXT
                )''')

# SQL Query for net worth page.
cursor.execute('''CREATE TABLE IF NOT EXISTS net_worth (
                    user_id TEXT PRIMARY KEY NOT NULL,
                    data TEXT
                )''')

connection.commit()
connection.close()

# Landing page
@app.route('/')
def centdash():
    return render_template("centdash.html")

# Route and function for logging into CentDash.
@app.route('/signin', methods=['GET', 'POST'])
def login():
    if request.method == "POST":
        email = request.form["Email"]
        password = request.form["Password"]
        with get_db() as db:
            cursor = db.cursor()
            cursor.execute('SELECT * FROM user WHERE email = ? AND password = ?', (email, password))
            user = cursor.fetchone()

            if user:
                session["user"] = email
                return redirect(url_for('welcome'))
            else:
                return render_template("signin.html", errorMsg="Invalid email or password.")
    else:
        return render_template("signin.html", errorMsg="")

# Route and function for signing up for CentDash The function uses SQL queries to store data in database.
@app.route('/signup', methods=["POST", "GET"])
def signup():
    if request.method == "POST":
        firstName = request.form["FirstName"]
        lastName = request.form["LastName"]
        email = request.form["Email"]
        password = request.form["Password"]
        confirmPassword = request.form["ConfirmPassword"]

        with get_db() as db:
            cursor = db.cursor()
            cursor.execute('SELECT * FROM user WHERE email = ?', (email,))
            existing_user = cursor.fetchone()

            if existing_user:
                cursor.execute('''UPDATE user SET firstName = ?, lastName = ?, password = ? WHERE email = ?''',
                               (firstName, lastName, password, email))
                db.commit()
                return redirect(url_for('login'))
            else:
                cursor.execute('''INSERT INTO user (firstName, lastName, email, password) 
                                  VALUES (?, ?, ?, ?)''', (firstName, lastName, email, password))
                db.commit()
                return redirect(url_for('login'))
    else:
        return render_template("signup.html")

@app.route('/welcome')
def welcome():
    if "user" in session:
        user_email = session["user"]
        return render_template("centdashpage.html", user_email=user_email)
    else:
        return redirect(url_for('login'))

@app.route('/dashboard')
def dashboard():
    return render_template("dashboard.html")

# Budgets function that allows users to budget their personal finances. The function allows inputted information to be saved into the database.
@app.route('/budgets', methods=['GET', 'POST'])
def budgets():
    if request.method == 'POST': # POST method for user data on the Budgets page.
        user_email = session.get('user')
        data = request.json.get('data')

        if data is None:
            return jsonify({'error': 'Data not provided in request body'}), 400

        json_data = json.dumps(data)
        with get_db() as db:
            cursor = db.cursor()
            cursor.execute('''UPDATE budget SET data = ? WHERE user_id = ?''', (json_data, user_email))
            db.commit()
        return jsonify({'message': 'Data from Budgets saved successfully!'}), 200
    elif request.method == 'GET': # GET method for user data on the Budgets page.
        user_email = session.get('user')
        with get_db() as db:
            cursor = db.cursor()
            cursor.execute('''SELECT data FROM budget WHERE user_id = ?''', (user_email,))
            budgets_data = cursor.fetchone()
            if budgets_data:
                budgets_data = budgets_data[0]
            else:
                budgets_data = "{}"
        return render_template("budgets.html", budgets_data=budgets_data)
    else:
        return jsonify({'error': 'Method not allowed'}), 405
    

# Net Worth function that allows users to budget their personal finances. The function allows inputted information to be saved into the database.
@app.route('/networth', methods=['GET', 'POST'])
def networth():
    if request.method == 'POST':
        user_email = session.get('user')
        data = request.json.get('data')
        with get_db() as db:
            cursor = db.cursor()
            cursor.execute('''UPDATE net_worth SET data = ? WHERE user_id = ?''', (data, user_email))
            db.commit()
        return jsonify({'message': 'Net worth data saved successfully'}), 200
    else:
        user_email = session.get('user')
        with get_db() as db:
            cursor = db.cursor()
            cursor.execute('''SELECT data FROM net_worth WHERE user_id = ?''', (user_email,))
            networth_data = cursor.fetchone()
            if networth_data:
                networth_data = networth_data[0]
            else:
                networth_data = "{}" 
        return render_template("networth.html", networth_data=networth_data)
    
@app.route('/calculator')
def calculator():
    return render_template("calculator.html")


@app.route('/statements')
def statements():
    return render_template("statements.html")

@app.route('/settings')
def settings():
    return render_template("settings.html")

@app.route('/help')
def help():
    return render_template("help.html")

# Function that allows users to delete their account and information from CentDash.
@app.route('/delete_account', methods=['GET', 'POST'])
def delete_account():
    if request.method == 'POST':
        user_email = session.get('user')
        if user_email:
            with get_db() as db:
                cursor = db.cursor()
                cursor.execute('UPDATE user SET email = NULL WHERE email = ?', (user_email,))
                db.commit()
            session.clear()
            return redirect(url_for('centdash'))
        else:
            return redirect(url_for('centdash'))
    else:
        return render_template("settings.html")
    
@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('centdash'))

if __name__ == '__main__':
    app.run(host="0.0.0.0",debug=True)