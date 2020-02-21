'use strict';

let startBtn = document.getElementById("start"),
    budgetValue = document.getElementsByClassName("budget-value")[0],
    dayBudget = document.getElementsByClassName("daybudget-value")[0],
    level = document.getElementsByClassName("level-value")[0],
    expense = document.getElementsByClassName("expenses-value")[0],
    optionalExpensesValue = document.getElementsByClassName("optionalexpenses-value")[0],
    incomeValue = document.getElementsByClassName("income-value")[0],
    monthSavings = document.getElementsByClassName("monthsavings-value")[0],
    yearSavings = document.getElementsByClassName("yearsavings-value")[0],

    expensesItem = document.getElementsByClassName("expenses-item"),
    expensesBtn = document.getElementsByTagName('button')[0],
    approve = document.getElementsByTagName("button")[1],
    raschitat = document.getElementsByTagName("button")[2],
    optionalExpensesInput = document.querySelectorAll(".optionalexpenses-item"),
    chooseIncomeValue = document.querySelector(".choose-income"),
    checkbox = document.querySelector("#savings"),
    summaValue = document.querySelector(".choose-sum"),
    precentValue = document.querySelector(".choose-percent"),
    year = document.querySelector(".year-value"),
    month = document.querySelector(".month-value"),
    day = document.querySelector(".day-value");

let money, time;

expensesBtn.disabled = true;
approve.disabled = true;
raschitat.disabled = true;

startBtn.addEventListener('click', function () {
    time = prompt('Введите дату в формате YYYY-MM-DD', '');
    money = +prompt("Ваш бюджет на месяц?", '');

    while (isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш бюджет на месяц?", '');
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    year.value = new Date(Date.parse(time)).getFullYear();
    month.value = new Date(Date.parse(time)).getMonth() + 1;
    day.value = new Date(Date.parse(time)).getDate();

    expensesBtn.disabled = false;
    approve.disabled = false;
    raschitat.disabled = false;
});

expensesBtn.addEventListener('click', function () {
    let sum = 0;
    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;

        if (typeof (a) === 'string' && typeof (a) != null && typeof (b) != null && a != '' && b != '' && a.length < 50) {
            console.log("done");
            appData.expenses[a] = b;
            sum = sum + +b;
        } else {
            i = i - 1;
        }
    }
    expense.textContent = sum;
});

approve.addEventListener('click', function () {
    for (let i = 0; i < optionalExpensesInput.length; i++) {
        let opt = optionalExpensesInput[i].value;
        appData.optionalExpenses[i] = opt;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + '  ';
    }
});

raschitat.addEventListener('click', function () {

    if (appData.budget != undefined) {
        appData.moneyPerDay = ((appData.budget - +expense.textContent) / 30).toFixed();
        dayBudget.textContent = appData.moneyPerDay;

        if (appData.moneyPerDay < 100) {
            level.textContent = 'Минимальный уровень достатка';
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            level.textContent = 'Средний уровень достатка';
        } else if (appData.moneyPerDay > 2000) {
            level.textContent = 'Высокий уровень достатка';
        } else {
            level.textContent = 'Произошла ошибка';
        }
    } else {
        dayBudget.textContent = 'Произошла ошибка';
    }
});

chooseIncomeValue.addEventListener('input', function () {
    let items = chooseIncomeValue.value;
    appData.income = items.split(', ');
    incomeValue.textContent = appData.income;

});

checkbox.addEventListener('click', function () {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

summaValue.addEventListener('input', function () {
    if (appData.savings == true) {
        let sum = +summaValue.value,
            precent = +precentValue.value;
        appData.monthIncome = (sum / 100 / 12 * precent).toFixed(1);
        appData.yearIncome = (sum / 100 * precent).toFixed(1);

        monthSavings.textContent = appData.monthIncome;
        yearSavings.textContent = appData.yearIncome;

    }
});

precentValue.addEventListener('input', function () {
    if (appData.savings == true) {
        let sum = +summaValue.value,
            precent = +precentValue.value;
        appData.monthIncome = (sum / 100 / 12 * precent).toFixed(1);
        appData.yearIncome = (sum / 100 * precent).toFixed(1);

        monthSavings.textContent = appData.monthIncome;
        yearSavings.textContent = appData.yearIncome;
    }
});

let appData = {
    budget: money,
    expenses: {},
    optionalExpenses: {},
    income: [],
    timeData: time,
    savings: false
};