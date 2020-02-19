"use strict";
// let oficialNamejava = prompt("Какое официальное название JavaScript?", "");
// if (oficialNamejava == "ECMAScript") {
//   alert("Верно");
// } else {
//   alert("Вы не знаете");
// }

// let pauk = prompt("input number");
// if (pauk >= 1) {
//   alert("Значение больше 0");
// } else if (pauk <= -1) {
//   alert("Значение меньшe 0");
// } else if (pauk == 0) {
//   alert("значение равно 0");
// }

// let age = prompt("vvedide");
// age >= 14 && age <= 90 ? alert("cool") : alert("bad");

// let login = prompt("Введите логин");
// if (login == "Админ") {
//   let pass = prompt("Введите пароль");
//   if (pass == "" || pass == null) {
//     alert("Отменено");
//   } else if (pass == "Я главный") {
//     alert("Здравствуйте");
//   } else {
//     alert("Неыерный пароль");
//   }
// } else if (login == "" || login == null) {
//   alert("Отменено");
// } else {
//   alert("Я вас не знаю");
// }

// let age;
// do {
//   age = prompt("введите больше 100", "");
// } while (age <= 100 && age);

// function age(a, n) {
//   let result = a;
//   for (let i = 1; i < n; i++) {
//     result *= a;
//   }
//   return result;
// }

// let a = prompt("введите a");
// let n = prompt("введите b");
// if (n < 1) {
//     alert("где стпень ?");
// } else {
//     alert(age(a, n));
// }

let money = prompt("Ваш бюджет на месяц?", ''),
    time = prompt('Введите дату в формате YYYY-MM-DD', '');

let appData = {
    budget: money,
    expenses: {},
    optionalExpenses: {},
    income: [],
    timeData: time,
    savings: false
};

// с Циклом for

for (let i = 0; i < 2; i++) {
    let a = prompt("Введите обязательную статью расходов в этом месяце", ''),
        b = prompt("Во сколько обойдется?", '');

    if (typeof (a) === 'string' && typeof (a) != null && typeof (b) != null && a != '' && b != '' && a.length < 50) {
        console.log("done");
        appData.expenses[a] = b;
    } else {
        console.log('Erorr')
    }
}

// C циклом while

// let i = 0;
// while (i < 2) {
//     
//     let a = prompt("Введите обязательную статью расходов в этом месяце", ''),
//         b = prompt("Во сколько обойдется?", '');

//     if (typeof (a) === 'string' && typeof (a) != null && typeof (b) != null && a != '' && b != '' && a.length < 50) {
//         console.log("done");
//         appData.expenses[a] = b;
//     } else {
//         console.log('Erorr')
//     }
//      i++;
// }

// С циклом do while

// let i = 0;
// do {

//     let a = prompt("Введите обязательную статью расходов в этом месяце", ''),
//         b = prompt("Во сколько обойдется?", '');

//     if (typeof (a) === 'string' && typeof (a) != null && typeof (b) != null && a != '' && b != '' && a.length < 50) {
//         console.log("done");
//         appData.expenses[a] = b;
//     } else {
//         console.log('Erorr')
//     }
//     i++;
// }
// while (i < 2);


appData.moneyPerDay = appData.budget / 30;

alert('Еженевный бюджет ' + appData.moneyPerDay);

if (appData.moneyPerDay < 100) {
    console.log('Минимальный уровень достатка');
} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
    console.log('Средний уровень достатка');
} else if (appData.moneyPerDay > 2000) {
    console.log('Высокий уровень достатка');
} else {
    console.log('Произошла ошибка');
}