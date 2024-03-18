from flask import Flask, render_template, request, session, redirect, url_for
import sqlite3 as sql

app = Flask(__name__)

DATABASE_NAME = "database.db"
app.secret_key = "ART56HBCXTY-I876T-098NU"

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

connection.commit()
connection.close()

@app.route('/')
def main():
    return render_template("centdash.html")

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
        connection.commit()
        connection.close()

        return redirect(url_for('login'))
    else:
        return render_template("signup.html")


@app.route('/login', methods=['GET', 'POST'])
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
        return redirect(url_for('dashboard'))
    else:
        return render_template("signin.html", errorMsg="Please enter both email and password.")

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