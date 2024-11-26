![CentDash](https://github.com/Warrenn205/CentDash/assets/122620756/305d649d-3f4f-4c37-a987-9a01fe57a312)
CentDash is a personal finance application that allows users to create budgets, track their expenses, and engage them with financial reporting. With CentDash, users can monitor their spending and expenses, and also visualize their data in an interactive platform that allows them to manage their overall personal finances.

**Tools used:**
- **Python Flask** for creating the backend for the application.
- **SQLite** for database handling and the storage and security of users' information.
- **HTML/CSS** for creating and styling webpages.
- **JavaScript** to integrate calculation functionality and interactive elements.
- **jQuery** to simplify HTML document transversing and handling.
- **AJAX** to update interactive web page components seamlessly.

# Welcome Page
Upon running the application, users will enter the welcome page that will give them the option to sign up or sign into the application.
![CentDash 6](https://github.com/Warrenn205/CentDash/assets/122620756/3312ebd9-ee08-4b86-9559-1a8d8c6fc7be)

# Sign Up and Sign In
To use CentDash, users must sign up for the application. After signing up the user will be able to sign into CentDash.
![CentDash 8](https://github.com/Warrenn205/CentDash/assets/122620756/04795710-f07d-483f-918a-1781212304bb)
![CentDash 7](https://github.com/Warrenn205/CentDash/assets/122620756/61acd744-d73d-4899-8729-a902ab9267cb)

**Database handling with SQLite**
I created the database for CentDash with SQLite. For the database handling, I used JWTManager to generate a JWT authorization access token for email and password. 
![JWT](https://github.com/user-attachments/assets/22dd59f7-5fd6-41d2-9364-cc66d0beeac8)

I wrote the SQL Queries for the registration and login credentials. Also, I wrote queries for users' budgets and net worth data that would be recorded in the application.
![SQL Query](https://github.com/user-attachments/assets/ac296ce6-4f05-4cc8-8965-06115f36f614)

Here are routes and functions for signing up and signing into CentDash.
![Sign up](https://github.com/user-attachments/assets/e558266f-527d-429f-a079-03016a7f283d)
![Sign in](https://github.com/user-attachments/assets/ae66f312-0d87-4338-a1f6-23a47c804e9c)


# Dashboard
With CentDash's interactive dashboard, users can visualize their income and expense data with bar charts and cards to stay updated with their spending and expenses. 
![CentDash 1](https://github.com/Warrenn205/CentDash/assets/122620756/afb3020d-481c-4073-91e6-d12e453b2176)

# Budgets
Budgets allow users to create budgets and track their expenses as well. Users can enter the category of their income and expenses and enter the amounts as well. With this feature, users can seamlessly keep track of their income, expenses, and net income.
![CentDash 2](https://github.com/Warrenn205/CentDash/assets/122620756/d455cb47-1c96-412c-ae31-25f85efcdc68)

# Net Worth
With Net Worth, users can calculate their net worth by adding their assets and liabilities.
![CentDash 3](https://github.com/Warrenn205/CentDash/assets/122620756/4d6771dd-8d4a-4e69-9952-59eb12f748c0)

# Calculator
Users can calculate their total salary with the Calculator feature.
![CentDash 4](https://github.com/Warrenn205/CentDash/assets/122620756/54835a8a-0721-44c8-8ceb-67019b5bb48f)

# Statements
CentDash allows users to engage with financial reporting with the interactive Statements feature. With Statements, users can stay up to date with their total and net income and track the type of expenses they have.
![CentDash 5](https://github.com/Warrenn205/CentDash/assets/122620756/f31635a7-02e2-4850-8805-0ae98a844fa6)
