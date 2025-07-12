document.addEventListener('DOMContentLoaded', function() {
    //-------------------Бургер меню-------------------------//
    const iconMenu = document.querySelector('.menu__icon');
    const menuBody = document.querySelector('.menu__body');
    const menuLinks = document.querySelectorAll('.menu__link[data-goto]'); // Ссылки меню
    const sections = document.querySelectorAll('.page__section'); // Все секции контента

    if (iconMenu) {
        iconMenu.addEventListener("click", function(e) {
            document.body.classList.toggle('_lock');
            iconMenu.classList.toggle('_active');
            menuBody.classList.toggle('_active');
        });
    }

    // -----------------------Прокрутка и скрытие/показ секций---------------------//
    if (menuLinks.length > 0) {
        // Изначально скрываем все секции, кроме первой (или той, которую вы хотите показать по умолчанию)
        hideAllSections();
        // Показываем первую секцию при загрузке страницы (или другую по вашему выбору)
        if (sections.length > 0) {
             // Определите, какую секцию показать по умолчанию.
             // Например, чтобы показать первую секцию:
             sections[0].style.display = 'block';
        }

        menuLinks.forEach(menuLink => {
            menuLink.addEventListener("click", onMenuLinkClick);
        });

        function onMenuLinkClick(e) {
            const menuLink = e.target;

            if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
                const gotoBlock = document.querySelector(menuLink.dataset.goto);
                const headerHeight = document.querySelector('header').offsetHeight;
                const gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                // Скрываем все секции
                hideAllSections();
                // Показываем только выбранную секцию
                gotoBlock.style.display = 'block'; // Используйте 'block' или 'flex' в зависимости от вашей разметки

                // Закрываем меню при клике на ссылку
                if (iconMenu.classList.contains('_active')) {
                    document.body.classList.remove('_lock');
                    iconMenu.classList.remove('_active');
                    menuBody.classList.remove('_active');
                }

                // Прокручиваем к началу секции, если она не полностью видна
                window.scrollTo({
                    top: gotoBlockValue,
                    behavior: "smooth"
                });
                e.preventDefault();
            } else if (menuLink.getAttribute('href') && menuLink.getAttribute('href').startsWith('tel:')) {
                // Если это ссылка на телефон, просто закрываем меню
                 if (iconMenu.classList.contains('_active')) {
                    document.body.classList.remove('_lock');
                    iconMenu.classList.remove('_active');
                    menuBody.classList.remove('_active');
                }
                // Не предотвращаем действие по умолчанию для телефонной ссылки
            }
        }
    }

    // Функция для скрытия всех секций
    function hideAllSections() {
        sections.forEach(section => {
            section.style.display = 'none';
        });
    }

    // Добавляем обработчик клика для ссылок внутри мобильного меню для его закрытия
    const mobileMenuLinks = document.querySelectorAll('.menu__body .menu__link');
    if (mobileMenuLinks.length > 0 && iconMenu) {
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                 if (iconMenu.classList.contains('_active')) {
                    document.body.classList.remove('_lock');
                    iconMenu.classList.remove('_active');
                    menuBody.classList.remove('_active');
                }
            });
        });
    }

    // -----------------------Логика слайдера---------------------//
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const dots = document.querySelectorAll('.dot');

    let currentIndex = 0; // Текущий индекс слайда

    // Функция для показа определенного слайда
    function showSlide(index) {
        // Убедимся, что индекс находится в пределах допустимых значений
        if (index >= slides.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = slides.length - 1;
        } else {
            currentIndex = index;
        }

        // Вычисляем смещение для трансформации
        const offset = -currentIndex * 100;
        slider.style.transform = `translateX(${offset}%)`;

        // Обновляем активную точку
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    }

    // Обработчики кликов для кнопок
    prevButton.addEventListener('click', () => {
        showSlide(currentIndex - 1);
    });

    nextButton.addEventListener('click', () => {
        showSlide(currentIndex + 1);
    });

    // Обработчики кликов для точек
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Показываем первый слайд при загрузке
    showSlide(currentIndex);

    // Опционально: автоматическое переключение слайдов
    // setInterval(() => {
    //     showSlide(currentIndex + 1);
    // }, 5000); // Переключать каждые 5 секунд
});



// =--------------------опция подкомитетов
const selectElement = document.getElementById('committeeSelect');
const committeeInfos = document.querySelectorAll('.committee-info');
const allCommitteesDiv = document.getElementById('allCommittees');

// Функция для отображения выбранного подкомитета или всех
function showSelectedCommittee() {
    const selectedValue = selectElement.value;

    // Скрываем все блоки
    committeeInfos.forEach(info => {
        info.classList.remove('active');
    });

    if (selectedValue === "") {
        // Если выбрано "Все подкомитеты", показываем все блоки
        committeeInfos.forEach(info => {
            info.classList.add('active');
        });
    } else {
        // Если выбран конкретный подкомитет, показываем только его
        const selectedCommittee = document.querySelector('.' + selectedValue);
        if (selectedCommittee) {
            selectedCommittee.classList.add('active');
        }
    }
}

// Добавляем слушатель события изменения выбора
selectElement.addEventListener('change', showSelectedCommittee);

// Инициализация: показываем все подкомитеты при загрузке страницы
showSelectedCommittee();

// -------------------------------группы собрания........................

let currentDate = new Date(); // Initialize current date
            
// Function to format date and day of the week in Russian
function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    return date.toLocaleDateString('ru-RU', options); // Use 'ru-RU' for Russian
}

// Function to update date display
function updateDisplay() {
    const dateDisplay = document.getElementById('dateDisplay');
    dateDisplay.textContent = formatDate(currentDate);
    filterRaions(); // Call filtering when date changes
}

// Function to change date (direction: 1 for next, -1 for previous)
function changeDate(direction) {
    currentDate.setDate(currentDate.getDate() + direction);
    updateDisplay();
}

// Function to filter raions
function filterRaions() {
    const selectedRaion = document.getElementById('raionSelect').value;
    const raionListDiv = document.getElementById('raionList');
    const raionParagraphs = raionListDiv.querySelectorAll('p');
    const dayOfWeek = currentDate.getDay(); // 0 - Sunday, 1 - Monday, ..., 6 - Saturday

    // Check if the current day is a weekday (Monday - Friday)
    const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;

    let anyRaionVisible = false; // Flag to check if any raion is visible

    raionParagraphs.forEach(p => {
        const raionClass = p.classList[0]; // Get the first class of the p element (which corresponds to the value in the select)

        // Initially hide this paragraph before checking if it should be shown
        p.classList.add('hidden');

        let showRaion = false; // Flag to determine if this specific raion should be shown

        if (isWeekday) { // If it's a weekday
            if (selectedRaion === "") {
                // If "All Raions" is selected, show all
                showRaion = true;
            } else {
                // If a specific raion is selected, show only that one
                if (raionClass === selectedRaion) {
                    showRaion = true;
                }
            }
        } else { // If it's a weekend
             if (selectedRaion === '') {
                 // If "All Raions" is selected, show all
                 showRaion = true;
             } else {
                  // If a specific raion is selected, show only that one
                  if (raionClass === selectedRaion) {
                      showRaion = true;
                  }
             }
        }

        if (showRaion) {
            p.classList.remove('hidden');
            anyRaionVisible = true; // Mark that at least one raion is visible
        }
    });

    // Show or hide the raionList container based on whether any raion is visible
    if (anyRaionVisible) {
        raionListDiv.classList.remove('hidden');
    } else {
        raionListDiv.classList.add('hidden');
    }
}

// Initialize display on page load
updateDisplay();