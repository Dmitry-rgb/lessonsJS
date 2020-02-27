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

    //timer
    let deadline = '2020-02-27'; //указываем конечную дату таймера

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()), // Вычисляем deadline - текущая дата, время в милисекундах
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / (1000 * 60 * 60)));

        return { //Взвращаем наши результаты в объект
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock(id, endtime) { // Получаем элементы с нашего документа
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000); // тут мы сказали чтобы функция updateClock выполнялась через каждую секунду

        function updateClock() {
            let t = getTimeRemaining(endtime); //записываем результаты которые вернули в объект фунции getTimeRemaining в переменную t

            function addZero(num) { //Добавляем 0, формата 01-02-03
                if (num <= 9) {
                    return '0' + num;
                } else return num;
            };

            hours.textContent = addZero(t.hours); // записываем результаты в наш документ
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) { // Условие, если таймер закончился, чтобы не шел в минус, мы говорим чтобы все было по нулям
                clearInterval(timeInterval); // останавливаем setInterval
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }

    }

    setClock('timer', deadline);

    // Modal

    let more = document.querySelector('.more'), // Получаем элементы
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', function () { // Запускаем обработчик событий
        overlay.style.display = 'block'; // Меняем стиль
        this.classList.add('more-splash'); // Добавляем класс
        document.body.style.overflow = 'hidden'; // Меняем стиль
    });

    close.addEventListener('click', function () {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    // modal in tabs

    let descriptionBtn = document.querySelectorAll('.description-btn');

    for (let i = 0; i < descriptionBtn.length; i++) {
        descriptionBtn[i].addEventListener('click', function () {
            overlay.style.display = 'block';
            descriptionBtn[i].classList.add('more-splash');
            document.body.style.overflow = 'hidden';
        });
    }
});