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
    };

    // Form and form modal

    let message = { // Создали объект со статусами
        loading: "Загрузка...",
        success: "Спасибо. Наш менеджер скоро с вами свяжиться",
        erorr: 'Ошибка'
    };

    let form = document.querySelector('.main-form'), // Получаем эементы
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

    statusMessage.classList.add('status'); // Добовляем класс

    form.addEventListener('submit', function (event) { // Если мы отправляем форму, работаем с формой а не с кнопкой
        event.preventDefault(); // Отменяем стандартное поведение браузера, не перезагружаем стр.
        form.appendChild(statusMessage); // Помещаем созданный элемент в конец нашей формы

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php'); // метод передачи данных; url
        // request.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // Настраиваем заголовок
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        let formData = new FormData(form); //  Создали объект, куда записались наши данные , который ввел пользователь, ключ со значением, ключ это атрибут name  в нашей верстке

        let obj = {};
        formData.forEach(function (value, key) {
            obj[key] = value;
        });

        let json = JSON.stringify(obj);

        request.send(json); // Тело нашей формы



        request.addEventListener('readystatechange', function () { // проверяем статус, в каком он состоянии
            if (request.readyState < 4) {
                statusMessage.textContent = message.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.textContent = message.success;
            } else {
                statusMessage.textContent = message.erorr;
            }
        });
        for (let i = 0; i < input.length; i++) { // Отчищаем инпут, после отправки
            input[i].value = '';
        }
    });

    // form Contacts

    let formContact = document.getElementById('form'),
        inputContact = formContact.querySelectorAll('input');


    formContact.addEventListener('submit', function (event) { // Если мы отправляем форму, работаем с формой а не с кнопкой
        event.preventDefault(); // Отменяем стандартное поведение браузера, не перезагружаем стр.
        formContact.appendChild(statusMessage); // Помещаем созданный элемент в конец нашей формы

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php'); // метод передачи данных; url
        // request.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); // Настраиваем заголовок
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        let formData = new FormData(form); //  Создали объект, куда записались наши данные , который ввел пользователь, ключ со значением, ключ это атрибут name  в нашей верстке

        let obj = {};
        formData.forEach(function (value, key) {
            obj[key] = value;
        });

        let json = JSON.stringify(obj);

        request.send(json); // Тело нашей формы



        request.addEventListener('readystatechange', function () { // проверяем статус, в каком он состоянии
            if (request.readyState < 4) {
                statusMessage.textContent = message.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.textContent = message.success;
            } else {
                statusMessage.textContent = message.erorr;
            }
        });
        for (let i = 0; i < inputContact.length; i++) { // Отчищаем инпут, после отправки
            inputContact[i].value = '';
        }
    });
});