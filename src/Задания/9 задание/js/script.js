window.addEventListener('DOMContentLoaded', function () {

    'use strict';

    // Tabs
    let tab = document.querySelectorAll('.info-header-tab'), //Получаем элементы в нашем документе
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) { // По умолчанию будет включен первый таб с индэксом 0
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show'); // удаляем класс show
            tabContent[i].classList.add('hide'); // добавляем класс hide
        }
    }
    hideTabContent(1); // наш цикл запускается с индэкса 1

    function showTabContent(a) {
        if (tabContent[a].classList.contains('hide')) { // если .info-tabcontent содержит еще один класс hide
            tabContent[a].classList.remove('hide'); // то удалем его
            tabContent[a].classList.add('show'); // и добавляем класс show
        }
    }

    info.addEventListener('click', function (event) { // Запускаем обрабочтик событий использую делегирование событий, клик
        let target = event.target; // на что именно мы нажали, на какой элемент
        if (target && target.classList.contains('info-header-tab')) { // если мы нажали на родителя и на кнопку с классом info-header-tab
            for (let i = 0; i < tab.length; i++) { // то запусается цикл
                if (target == tab[i]) { // если мы нажали менно на наш таб
                    hideTabContent(0); // то сначало скрываем все
                    showTabContent(i); // потом показываем тот таб на который нажали
                    break; // останавливаем цикл
                }
            }
        }
    });
});