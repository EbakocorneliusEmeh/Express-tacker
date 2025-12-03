### Personal Expense Tracker

A simple and interactive Personal Expense Tracker built with HTML, CSS, and JavaScript
This application allows users to manage their finances by adding income and expenses viewing transaction history deleting items and tracking their total balance
All data is saved in the browser using Local Storage, so user transactions remain even after refreshing the page.

### Features
 Add Transactions

Add both income (positive values) and expenses (negative values).

Input fields include:

Description

Amount (positive or negative)

(Optional) Date

### Transaction History

Displays a list of all transactions.

Each transaction shows:

Description

Amount

Date 

A delete button 

Color-coded:

Green for income

Red for expenses

### Financial Summary

The app automatically calculates and displays:

Total Balance

Total Income

Total Expenses

### Persistent Data (Local Storage)

All transactions are stored using localStorage.

Reloading the page does NOT remove data.

Example:

localStorage.setItem("transactions", JSON.stringify(transactions));
const saved = JSON.parse(localStorage.getItem("transactions"));

### Responsive Design

Works smoothly on mobile, tablet, and desktop.

Clean and modern UI.

### Bonus Enhancements (Optional)

Date added to each transaction

Pie or bar chart (using Chart.js) to visualize spending

Filters for:

Income only

Expenses only

### File Structure
expense-tracker
├── index.html  
├── style.css 
└── script.js

### Technologies Used

HTML5

CSS3

JavaScript 

Local Storage API

 Chart.js

### How to Run This Project

Download or clone the project folder:

git clone https://github.com/EbakocorneliusEmeh/Express-tacker.git

then you cd Express-tracker

you install dependecies "npm install"

you run the app by clicking on live

Open the folder.

Run the app by opening index.html in any browser.

### Future Improvements

Add user authentication

Export transactions to CSV

Monthly summaries

Dark mode UI
