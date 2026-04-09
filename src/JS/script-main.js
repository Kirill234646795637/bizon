// Инициализация главного слайдера
document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.querySelector('.slider-container');
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const arrowLeft = document.querySelector('.arrow-left');
    const arrowRight = document.querySelector('.arrow-right');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!sliderTrack || slides.length === 0) return;
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    let isTransitioning = false;
    
    // Клонируем первый и последний слайды для бесконечной прокрутки
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length - 1].cloneNode(true);
    
    firstClone.classList.add('clone');
    lastClone.classList.add('clone');
    
    sliderTrack.appendChild(firstClone);
    sliderTrack.insertBefore(lastClone, slides[0]);
    
    // Сдвигаем трек на один слайд вправо (чтобы показать первый настоящий слайд)
    sliderTrack.style.transform = `translateX(-100%)`;
    
    function updateSlide(index, disableTransition = false) {
        if (isTransitioning) return;
        
        if (disableTransition) {
            sliderTrack.style.transition = 'none';
        } else {
            sliderTrack.style.transition = 'transform 0.5s ease-in-out';
            isTransitioning = true;
        }
        
        sliderTrack.style.transform = `translateX(-${(index + 1) * 100}%)`;
        
        // Обновление индикаторов
        indicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
        
        if (!disableTransition) {
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }
    }
    
    // Обработчик для кнопки "Вправо"
    if (arrowRight) {
        arrowRight.addEventListener('click', () => {
            if (currentIndex >= totalSlides - 1) {
                // Переходим к клону первого слайда
                updateSlide(currentIndex + 1, false);
                
                // После анимации мгновенно переходим к настоящему первому слайду
                setTimeout(() => {
                    sliderTrack.style.transition = 'none';
                    currentIndex = 0;
                    sliderTrack.style.transform = `translateX(-100%)`;
                }, 500);
            } else {
                currentIndex++;
                updateSlide(currentIndex, false);
            }
        });
    }
    
    // Обработчик для кнопки "Влево"
    if (arrowLeft) {
        arrowLeft.addEventListener('click', () => {
            if (currentIndex <= 0) {
                // Переходим к клону последнего слайда
                updateSlide(-1, false);
                
                // После анимации мгновенно переходим к настоящему последнему слайду
                setTimeout(() => {
                    sliderTrack.style.transition = 'none';
                    currentIndex = totalSlides - 1;
                    sliderTrack.style.transform = `translateX(-${totalSlides * 100}%)`;
                }, 500);
            } else {
                currentIndex--;
                updateSlide(currentIndex, false);
            }
        });
    }
    
    // Обработчики индикаторов
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateSlide(currentIndex, false);
        });
    });
    
    // Автоплей
    let autoplay = setInterval(() => {
        if (arrowRight) arrowRight.click();
    }, 5000);
    
    // Остановка автоплея при наведении
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(autoplay);
        });

        sliderContainer.addEventListener('mouseleave', () => {
            autoplay = setInterval(() => {
                if (arrowRight) arrowRight.click();
            }, 5000);
        });
    }
    
    // Клавиатурная навигация
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && arrowLeft) {
            arrowLeft.click();
        } else if (e.key === 'ArrowRight' && arrowRight) {
            arrowRight.click();
        }
    });
    
    // Свайпы для мобильных
    let touchStartX = 0;
    let touchEndX = 0;

    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        sliderContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50 && arrowRight) {
                arrowRight.click();
            } else if (touchEndX - touchStartX > 50 && arrowLeft) {
                arrowLeft.click();
            }
        });
    }
});
