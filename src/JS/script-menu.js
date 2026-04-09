document.addEventListener('DOMContentLoaded', function() {
    const burgerBtn = document.getElementById('burgerBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const menuItems = document.querySelectorAll('.menu-item');

    // Защита от ошибок, если id изменены в HTML
    if (!burgerBtn || !dropdownMenu) {
        console.warn('⚠️ Меню: не найдены элементы #burgerBtn или #dropdownMenu');
        return;
    }

    // Открытие/закрытие меню при клике на бургер
    burgerBtn.addEventListener('click', function(event) {
        event.stopPropagation();
        dropdownMenu.classList.toggle('active');
    });

    // Закрытие меню при клике вне его области
    document.addEventListener('click', function(event) {
        if (!burgerBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove('active');
        }
    });

    // Закрытие меню при выборе пункта
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            dropdownMenu.classList.remove('active');
        });
    });

    // ⛔ УДАЛЕНО: Повторная инициализация слайдеров.
    // Она уже корректно обрабатывается в script-katalog.js.
    // Дублирование создавало конфликты событий.
});