from flask import Flask, render_template, request, session, redirect, url_for, jsonify, json, g
import sqlite3 as sql
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

app = Flask(__name__)

DATABASE_NAME = "database.db"
app.secret_key = "ART56HBCXTY-I876T-098NU"

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

cursor.execute('''CREATE TABLE IF NOT EXISTS user (
                    firstName TEXT NOT NULL,
                    lastName TEXT NOT NULL,
                    email TEXT PRIMARY KEY NOT NULL,
                    password TEXT NOT NULL
                )''')

cursor.execute('''CREATE TABLE IF NOT EXISTS budget (
                    user_id TEXT PRIMARY KEY NOT NULL,
                    data TEXT
                )''')

cursor.execute('''CREATE TABLE IF NOT EXISTS net_worth (
                    user_id TEXT PRIMARY KEY NOT NULL,
                    data TEXT
                )''')

connection.commit()
connection.close()

@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == "POST":
        email = request.form["Email"]
        password = request.form["Password"]

        if not email or not password:
            return render_template("signin.html", errorMsg="Please enter both email and password.")

        connection = sql.connect(DATABASE_NAME)
        cursor = connection.cursor()
        cursor.execute('SELECT * FROM user WHERE email = ?', (email,))
        result = cursor.fetchall()

        if not result or not result[0]:
            connection.close()
            return render_template("signin.html", errorMsg="This username is incorrect")

        cursor.execute('SELECT * FROM user WHERE email = ? AND password = ?', (email, password))
        result = cursor.fetchall()

        if not result or not result[0]:
            connection.close()
            return render_template("signin.html", errorMsg="This password is incorrect")

        connection.commit()
        connection.close()

        session["user"] = email
        return redirect(url_for('welcome'))
    else:
        return render_template("signin.html", errorMsg="Please enter both email and password.")

@app.route('/signup', methods=["POST", "GET"])
def signup():
    if request.method == "POST":
        firstName = request.form["FirstName"]
        lastName = request.form["LastName"]
        email = request.form["Email"]
        password = request.form["Password"]
        confirmPassword = request.form["ConfirmPassword"]

        def error(errorMsg):
            return render_template("signup.html", errorMsg=errorMsg)

        if len(email) < 5:
            return error("You must use a valid email")
        elif len(email) > 100:
            return error("You must use a valid email")
        elif not "@" in email or not "." in email:
            return error("Invalid email")
        elif password != confirmPassword:
            return error("The passwords must be the same")

        connection = sql.connect(DATABASE_NAME)
        cursor = connection.cursor()
        cursor.execute('''INSERT INTO user (firstName, lastName, email, password) 
                          VALUES (?, ?, ?, ?)''', (firstName, lastName, email, password))
        cursor.execute('''INSERT INTO budget (user_id, data) VALUES (?, ?)''', (email, "{}"))
        cursor.execute('''INSERT INTO net_worth (user_id, data) VALUES (?, ?)''', (email, "{}"))
        connection.commit()
        connection.close()

        return redirect(url_for('login'))
    else:
        return render_template("signup.html")


@app.route('/welcome')
def welcome():
    return render_template("centdashpage.html")

@app.route('/dashboard')
def dashboard():
    return render_template("dashboard.html")

@app.route('/budgets', methods=['GET', 'POST'])
def budgets():
    if request.method == 'POST':
        user_id = session.get('user')
        data = request.json.get('data')

        if data is None:
            return jsonify({'error': 'Data not provided in request body'}), 400

        json_data = json.dumps(data)
        db = get_db()
        cursor = db.cursor()
        cursor.execute('''UPDATE budget SET data = ? WHERE user_id = ?''', (json_data, user_id))
        db.commit()
        return jsonify({'message': 'Data from Budgets saved successfully!'}), 200
    elif request.method == 'GET':
        user_id = session.get('user')
        db = get_db()
        cursor = db.cursor()
        cursor.execute('''SELECT data FROM budget WHERE user_id = ?''', (user_id,))
        budgets_data = cursor.fetchone()
        if budgets_data:
            budgets_data = budgets_data[0]
        else:
            budgets_data = "{}"
        return render_template("budgets.html", budgets_data=budgets_data)
    else:
        return jsonify({'error': 'Method not allowed'}), 405

@app.route('/networth', methods=['GET', 'POST'])
def networth():
    if request.method == 'POST':
        user_id = session.get('user')
        data = request.json.get('data')
        db = get_db()
        cursor = db.cursor()
        cursor.execute('''UPDATE net_worth SET data = ? WHERE user_id = ?''', (data, user_id))
        db.commit()
        return jsonify({'message': 'Net worth data saved successfully'}), 200
    else:
        user_id = session.get('user')
        db = get_db()
        cursor = db.cursor()
        cursor.execute('''SELECT data FROM net_worth WHERE user_id = ?''', (user_id,))
        networth_data = cursor.fetchone()
        if networth_data:
            networth_data = networth_data[0]
        else:
            networth_data = "{}" 
        return render_template("networth.html", networth_data=networth_data)


@app.route('/statements')
def statements():
    return render_template("statements.html")

@app.route('/settings')
def settings():
    return render_template("settings.html")

@app.route('/logout')
def logout():
    return render_template("signin.html")

if __name__ == '__main__':
    app.run(host="0.0.0.0",debug=True)