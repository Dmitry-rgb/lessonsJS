'use strict';

let startbtn = document.getElementById("start"),
    bugjet = document.getElementsByClassName("budget-value")[0],
    dayBudget = document.getElementsByClassName("daybudget-value")[0],
    level = document.getElementsByClassName("level-value")[0],
    expense = document.getElementsByClassName("expenses-value")[0],
    optionalExpenses = document.getElementsByClassName("optionalexpenses-value")[0],
    income = document.getElementsByClassName("income-value")[0],
    monthSavings = document.getElementsByClassName("monthsavings-value")[0],
    yearSavings = document.getElementsByClassName("yearsavings-value")[0],


    expensesItem = document.getElementsByClassName("expenses-item"),
    expensesBtn = document.getElementsByTagName('button')[0],
    approve = document.getElementsByTagName("button")[1],
    raschitat = document.getElementsByTagName("button")[2],
    optionalExpensesInput = document.querySelectorAll(".optionalexpenses-item"),
    chooseIncome = document.querySelector(".choose-income"),
    checkbox = document.querySelector("#savings"),
    summa = document.querySelector(".choose-sum"),
    precent = document.querySelector(".percent"),
    year = document.querySelector(".year-value"),
    month = document.querySelector(".month-value"),
    day = document.querySelector(".day-value");

let money, time;

function start() {
    money = +prompt("Ваш бюджет на месяц?", '');
    time = prompt('Введите дату в формате YYYY-MM-DD', '');

    while (isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш бюджет на месяц?", '');
    }
}
start();

let appData = {
    budget: money,
    expenses: {},
    optionalExpenses: {},
    income: [],
    timeData: time,
    savings: true,
    chooseOptExpenses: function () {
        for (let i = 1; i < 4; i++) {
            let opt = prompt("Статья необязательных расходов?");
            appData.optionalExpenses[i] = opt;
            console.log(appData.optionalExpenses);
        }
    },
    checkSavings: function () {
        if (appData.savings == true) {
            let save = +prompt("Какова сумма накоплений"),
                precent = prompt("Под какой процент ?");

            appData.monthIncome = (save / 100 / 12 * precent).toFixed();
            alert("Доход в месяц с вашего депозита " + appData.monthIncome);
        }
    },
    detectLevel: function () {
        if (appData.moneyPerDay < 100) {
            console.log('Минимальный уровень достатка');
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            console.log('Средний уровень достатка');
        } else if (appData.moneyPerDay > 2000) {
            console.log('Высокий уровень достатка');
        } else {
            console.log('Произошла ошибка');
        }
    },
    chooseExpenses: function () {
        appData.moneyPerDay = (appData.budget / 30).toFixed();
        alert('Еженевный бюджет ' + appData.moneyPerDay);
    },
    chooseExpenses: function () {
        for (let i = 0; i < 2; i++) {
            let a = prompt("Введите обязательную статью расходов в этом месяце", ''),
                b = prompt("Во сколько обойдется?", '');

            if (typeof (a) === 'string' && typeof (a) != null && typeof (b) != null && a != '' && b != '' && a.length < 50) {
                console.log("done");
                appData.expenses[a] = b;
            } else {
                i = i - 1;
            }
        }
    },
    chooseIncome: function () {
        let items = prompt("Что принесет дополнительный доход? (Перечислите через запятую)", "");

        if (typeof (items) != "string" || items == "" || typeof (items) == null) {
            console.log("Вы ввели некорректные данные или не ввели их вовсе");
        } else {
            appData.income = items.split(", ");
            appData.income.push(prompt("Может что-то еще?"));
            appData.income.sort();
        }

        appData.income.forEach(function (itemmassive, i) {
            alert("Способы доп. заработка: " + (i + 1) + " - " + itemmassive);
        });
    }
};
for (let key in appData) {
    console.log("Наша программа включает в себя данные: " + key + appData[key]);
}