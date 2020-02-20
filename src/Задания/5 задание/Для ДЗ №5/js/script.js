'use strict';

let menu = document.querySelector(".menu"),
    menuItem = document.querySelectorAll(".menu-item"),
    menuItemLi = document.createElement("li"),
    title = document.getElementById("title"),
    adv = document.querySelector(".adv");


menu.insertBefore(menuItem[2], menuItem[1]);
menuItemLi.classList.add("menu-item");
menuItemLi.textContent = "Пятый элемент";
menu.appendChild(menuItemLi);

document.body.style.backgroundImage = "url('img/apple_true.jpg')";

title.textContent = "Мы продаем только подлинную технику Apple";

adv.remove();

let qestion = prompt("Какое отношение к технике apple ?"),
    qaz = document.querySelector("#prompt");

qaz.textContent = qestion;