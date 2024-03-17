from flask import Flask, render_template, request, session, redirect, url_for
import sqlite3 as sql

app = Flask(__name__)

DATABASE_NAME = "database.db"

def create_connection():
    return sql.connect(DATABASE_NAME)

connection = sql.connect(DATABASE_NAME)
cursor = connection.cursor()

cursor.execute('''CREATE TABLE IF NOT EXISTS users (
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
def sign_up():
     if request.method == "POST":
        firstName = request.form["FirstName"]
        lastName = request.form["LastName"]
        email = request.form["Email"]
        password = request.form["Password"]
        confirmPassword = request.form["ConfirmPassword"]

        def error(errorMsg):
            render_template ('centdash.html')
            return render_template("signup.html",
                PageName = "SignUp",  
                errorMsg = errorMsg     
            )
        
        if len(email) < 5:
            error("Invalid email")
        elif len(email) > 100:
            error("Invalid email")
        elif not "@" in email or not "." in email:
            error("Invalid email")
        elif len(password) < 8:
            error("Password too short!" )
        elif len(password) > 20:
            error("Password too long!")
        elif password != confirmPassword:
            error("Passwords must match!")

        connection = sql.connect(DATABASE_NAME)
        cursor = connection.cursor()
        cursor.execute(f'''INSERT INTO users (firstName, lastName, email, password) 
                            VALUES("{firstName}", "{lastName}", "{email}", "{password}"''')
        connection.commit()
        connection.close()

        return redirect(url_for('signin.html'))
     else:
        render_template ('centdash.html')
        return render_template("signUp.html",
            PageName = "SignUp"        
        )

@app.route('/login')
def login():
    return render_template("signin.html")

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