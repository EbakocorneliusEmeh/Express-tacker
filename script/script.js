document.addEventListener("DOMContentLoaded", () => {
  const descriptionInput = document.getElementById("description");
  const amountInput = document.getElementById("amount");
  const dateInput = document.getElementById("transactionDate");
  const addBtn = document.getElementById("addBtn");
  const transactionsList = document.getElementById("transactions");
  const balanceDisplay = document.getElementById("balance");
  const incomeDisplay = document.getElementById("income");
  const expensesDisplay = document.getElementById("expenses");
  const pieChartCanvas = document.getElementById("pieChart");

  // TEMPORARY: Clear localStorage on page load for clean start during testing
  // Remove or comment out this line after you confirm everything works
  localStorage.clear();

  let transactions = loadTransactions();
  let pieChart;

  updateUI();

  addBtn.addEventListener("click", () => {
    addTransaction();
  });

  function addTransaction() {
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const transactionDate = dateInput.value;

    if (description === "" || isNaN(amount) || transactionDate === "") {
      alert("Please enter a valid description, amount, and date.");
      return;
    }

    const transaction = {
      id: generateId(),
      description,
      amount,
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
      amountSpan.textContent = `${transaction.amount > 0 ? "+" : "-"}${Math.abs(
        transaction.amount
      )}`;
      amountSpan.className = transaction.amount > 0 ? "income" : "expense";

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.className = "delete-btn";
      deleteBtn.setAttribute("data-id", transaction.id);
      deleteBtn.addEventListener("click", () =>
        deleteTransaction(transaction.id)
      );

      listItem.appendChild(descriptionSpan);
      listItem.appendChild(dateSpan);
      listItem.appendChild(amountSpan);
      listItem.appendChild(deleteBtn);

      transactionsList.appendChild(listItem);

      totalBalance += transaction.amount;
      if (transaction.amount > 0) {
        totalIncome += transaction.amount;
      } else {
        totalExpenses += transaction.amount;
      }
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
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };

    if (pieChart) {
      pieChart.destroy();
    }

    pieChart = new Chart(pieChartCanvas, config);
  }

  function deleteTransaction(id) {
    transactions = transactions.filter((transaction) => transaction.id !== id);
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
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }
});
