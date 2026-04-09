// ========================
// АНИМАЦИЯ ПРИ СКРОЛЛЕ
// ========================
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
      
    const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
    };
      
    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
        }
    });
    }, observerOptions);
      
    fadeElements.forEach(el => observer.observe(el));
      
    // Плавный скролл для якорных ссылок (дополнительная поддержка)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
          
        const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 20,
              behavior: 'smooth'
            });
          }
        });
    });
});

// Ждём загрузки DOM перед выполнением кода
document.addEventListener('DOMContentLoaded', function() {
    
    const submitBtn = document.getElementById('submitBtn');
    const messageDiv = document.getElementById('formMessage');
    const form = document.getElementById('contactForm');
    
    // Если форма не найдена — выходим
    if (!form) {
        console.error('❌ Форма #contactForm не найдена!');
        return;
    }
    
    // Функция логирования (только в консоль браузера F12)
    function log(text, type = 'info') {
        const timestamp = new Date().toLocaleTimeString();
        const line = `[${timestamp}] ${text}`;
        console.log(line);
    }
    
    // Показать модальное окно
    function showModal(title, message, isSuccess = true) {
        const modal = document.getElementById('modalWindow');
        const modalTitle = document.getElementById('modalTitle');
        const modalMessage = document.getElementById('modalMessage');
        const modalOverlay = document.getElementById('modalOverlay');
        
        if (modal && modalTitle && modalMessage) {
            modalTitle.textContent = title;
            modalMessage.textContent = message;
            modal.className = 'modal ' + (isSuccess ? 'success' : 'error');
            modal.style.display = 'block';
            if (modalOverlay) modalOverlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Закрыть модальное окно
    function closeModal() {
        const modal = document.getElementById('modalWindow');
        const modalOverlay = document.getElementById('modalOverlay');
        
        if (modal) {
            modal.style.display = 'none';
            if (modalOverlay) modalOverlay.style.display = 'none';
            document.body.style.overflow = '';
        }
    }
    
    // Блокировка кнопки
    function setButtonState(loading, text) {
        if (submitBtn) {
            submitBtn.disabled = loading;
            submitBtn.textContent = text;
        }
    }
    
    // Обработчик отправки формы
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        log('🚀 Форма отправлена!');
        
        // Валидация HTML5
        if (!form.checkValidity()) {
            log('❌ Форма не прошла валидацию', 'error');
            form.reportValidity();
            return;
        }
        
        // Собираем данные
        const formData = new FormData(form);
        const data = {
            fio: formData.get('fio'),
            city: formData.get('city'),
            data: formData.get('data'),
            phone: formData.get('phone'),
            comment: formData.get('comment')
        };
        
        log('📋 Данные: ФИО=' + data.fio + ', Город=' + data.city);
        
        setButtonState(true, 'Отправка...');
        
        try {
            // Отправка на Formspree
            const response = await fetch('https://formspree.io/f/xwvwjkvd', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            log(`Статус: ${response.status}`);
            
            if (response.ok) {
                log('✅ Успех!', 'success');
                showModal('✅ Спасибо!', 'Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
                form.reset();
            } else {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.errors ? JSON.stringify(errorData.errors) : `Ошибка ${response.status}`);
            }
            
        } catch (error) {
            log('❌ Ошибка: ' + error.message, 'error');
            showModal('❌ Ошибка', 'Не удалось отправить заявку. Попробуйте позже или позвоните нам.');
        } finally {
            setButtonState(false, 'Отправить');
        }
    });
    
    // Закрытие модалки
    const closeBtn = document.querySelector('.modal-close');
    const modalOverlay = document.getElementById('modalOverlay');
    
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });
    
    // Делаем closeModal глобальной для onclick в HTML
    window.closeModal = closeModal;
    
    log('📄 Скрипт загружен');
});