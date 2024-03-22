from flask import Flask, render_template, request, session, redirect, url_for

app = Flask(__name__)

@app.route('/')
def welcome():
    return render_template("centdashpage.html")

@app.route('/dashboard')
def dashboard():
    return render_template("dashboard.html")

@app.route('/budgets', methods=['GET', 'POST'])
def budgets():
        return render_template("budgets.html")

@app.route('/networth', methods=['GET', 'POST'])
def networth():
        return render_template("networth.html")

@app.route('/statements')
def statements():
    return render_template("statements.html")

if __name__ == '__main__':
    app.run(host="0.0.0.0",debug=True)