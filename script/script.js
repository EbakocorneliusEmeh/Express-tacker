
document.addEventListener("DOMContentLoaded", () => {
  const descriptionInput = document.getElementById("description");
  const amountInput = document.getElementById("amount");
  const dateInput = document.getElementById("transactionDate");
  dateInput.max = new Date().toISOString().split("T")[0];
  const incomeBtn = document.getElementById("incomeBtn");
  const expenseBtn = document.getElementById("expenseBtn");
  const transactionsList = document.getElementById("transactions");
  const balanceDisplay = document.getElementById("balance");
  const incomeDisplay = document.getElementById("income");
  const expensesDisplay = document.getElementById("expenses");
  const pieChartCanvas = document.getElementById("pieChart");


  let transactions = loadTransactions();
  let pieChart;
  

  updateUI();

  incomeBtn.addEventListener("click", () => addTransaction("income"));
  expenseBtn.addEventListener("click", () => addTransaction("expense"));

  function addTransaction(type) {
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const transactionDate = dateInput.value;

    if (description === "" || isNaN(amount) || transactionDate === "") {
      alert("Please enter a valid description, amount, and date.");
      return;
    }

    const signedAmount = type === "expense" ? -Math.abs(amount) : Math.abs(amount);

    const transaction = {
      id: generateId(),
      description,
      amount: signedAmount,
      date: transactionDate,
    };

    transactions.push(transaction);
    saveTransactions(transactions);
    updateUI();

    descriptionInput.value = "";
    amountInput.value = "";
    dateInput.value = "";
  }

  function updateUI() {
    transactionsList.innerHTML = "";
    let totalBalance = 0;
    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach((transaction) => {
      const listItem = document.createElement("li");

      const descriptionSpan = document.createElement("span");
      descriptionSpan.textContent = transaction.description;

      const dateSpan = document.createElement("span");
      dateSpan.textContent = transaction.date;

      const amountSpan = document.createElement("span");
      amountSpan.textContent = `${transaction.amount > 0 ? "+" : "-"}${Math.abs(transaction.amount)}`;
      amountSpan.className = transaction.amount > 0 ? "income" : "expense";

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "delete-btn";
      deleteBtn.addEventListener("click", () => deleteTransaction(transaction.id));

      listItem.append(descriptionSpan, dateSpan, amountSpan, deleteBtn);
      transactionsList.appendChild(listItem);

      totalBalance += transaction.amount;
      if (transaction.amount > 0) totalIncome += transaction.amount;
      else totalExpenses += transaction.amount;
    });

    balanceDisplay.textContent = totalBalance.toFixed(2);
    incomeDisplay.textContent = totalIncome.toFixed(2);
    expensesDisplay.textContent = Math.abs(totalExpenses).toFixed(2);

    updatePieChart(totalIncome, Math.abs(totalExpenses));
  }

  function updatePieChart(income, expenses) {
    const data = {
      labels: ["Income", "Expenses"],
      datasets: [
        {
          data: [income, expenses],
          backgroundColor: ["#4CAF50", "#F44336"],
          hoverOffset: 4,
        },
      ],
    };

    const config = {
      type: "pie",
      data: data,
      options: { responsive: true, maintainAspectRatio: false },
    };

    if (pieChart) pieChart.destroy();
    pieChart = new Chart(pieChartCanvas, config);
  }

  function deleteTransaction(id) {
    transactions = transactions.filter((t) => t.id !== id);
    saveTransactions(transactions);
    updateUI();
  }

  function saveTransactions(transactions) {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }

  function loadTransactions() {
    const data = localStorage.getItem("transactions");
    return data ? JSON.parse(data) : [];
  }

  function generateId() {
    return Math.random().toString(36).substring(2, 15);
  }
});
