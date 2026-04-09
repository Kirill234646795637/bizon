// ===== БАЗА ДАННЫХ ТОВАРОВ =====
const spaData = {
    categories: {
        'wood-tile': { 
            name: 'Деревянная плитка', 
            desc: 'Экологичная плитка из натурального дерева', 
            products: ['wt-001', 'wt-002', 'wt-003', 'wt-004', 'wt-005'] 
        }
    },
    products: {
        'wt-001': { 
            name: 'Ареццо', 
            price: 14990, 
            article: 'WT-001',
            images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], 
            specs: [
                { l: 'Материал', v: 'Дуб' }, 
                { l: 'Толщина', v: '15 мм' }, 
                { l: 'Размер', v: '600×150 мм' }, 
                { l: 'Покрытие', v: 'Матовый лак' }
            ] 
        },
        'wt-002': { 
            name: 'Венгерская укладка', 
            price: 16790, 
            article: 'WT-002',
            images: ['src/images/katalog_cards-main/card_1/Ratlin_Vengerskaya_ukladka.jpg'], 
            specs: [
                { l: 'Материал', v: 'Ясень' }, 
                { l: 'Толщина', v: '15 мм' }, 
                { l: 'Размер', v: '600×150 мм' }
            ] 
        },
        'wt-003': { 
            name: 'Куб', 
            price: 17260, 
            article: 'WT-003',
            images: ['src/images/katalog_cards-main/card_1/Cube_Ratlin.jpg'], 
            specs: [
                { l: 'Материал', v: 'Орех' }, 
                { l: 'Толщина', v: '15 мм' }
            ] 
        },
        'wt-004': { 
            name: 'Эффетто', 
            price: 17600, 
            article: 'WT-004',
            images: ['src/images/katalog_cards-main/card_1/Effeto_Ratlin.jpg'], 
            specs: [
                { l: 'Материал', v: 'Бук' }, 
                { l: 'Толщина', v: '15 мм' }
            ] 
        },
        'wt-005': { 
            name: 'Тессерио', 
            price: 17650, 
            article: 'WT-005',
            images: ['src/images/katalog_cards-main/card_1/Ratlin_Tesserio.jpg'], 
            specs: [
                { l: 'Параметр 1', v: 'Значение 1' }, 
                { l: 'Параметр 2', v: 'Значение 2' }
            ] 
        }
    }
};

// ===== СОСТОЯНИЕ =====
let spaCurrentProd = null;
let spaProdSlider = { idx: 0, total: 3 };

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', function() {
    // Обработка клика по карточкам
    document.querySelectorAll('.product-card').forEach((card, index) => {
        const productIds = ['wt-001', 'wt-002', 'wt-003', 'wt-004', 'wt-005'];
        const productId = productIds[index];
        
        if (productId) {
            card.dataset.product = productId;
        }
        
        card.style.cursor = 'pointer';
        card.addEventListener('click', function() {
            const id = this.dataset.product;
            if (id && spaData.products[id]) {
                openSpaProduct(id);
            }
        });
    });

    // Кнопка "Назад"
    const btnBack = document.getElementById('btn-back-category');
    if (btnBack) {
        btnBack.addEventListener('click', function(e) {
            e.preventDefault();
            showCatalog();
        });
    }

    // Кнопки слайдера
    const prodPrev = document.getElementById('prod-prev');
    const prodNext = document.getElementById('prod-next');
    
    if (prodPrev) {
        prodPrev.addEventListener('click', function(e) { 
            e.stopPropagation(); 
            spaProdSlider.idx--; 
            updateProdSlider(); 
        });
    }
    
    if (prodNext) {
        prodNext.addEventListener('click', function(e) { 
            e.stopPropagation(); 
            spaProdSlider.idx++; 
            updateProdSlider(); 
        });
    }

    // Обработка кнопки "Назад" в браузере
    window.addEventListener('popstate', function(e) {
        if (e.state?.page === 'product' && e.state.data) {
            renderProductPage(e.state.data);
        } else {
            showCatalog();
        }
    });

    // Проверка hash при загрузке
    if (window.location.hash.includes('product/')) {
        const prodId = window.location.hash.split('product/')[1];
        if (prodId && spaData.products[prodId]) {
            renderProductPage(prodId);
        }
    }
    
    // Подсветка активного меню
    const currentPath = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
});

// ===== ФУНКЦИИ SPA =====

function openSpaProduct(prodId) {
    history.pushState({ page: 'product', data: prodId }, '', '#product/' + prodId);
    renderProductPage(prodId);
    showProductView();
}

function showProductView() {
    const productsGrid = document.querySelector('.products-grid');
    const categoryHeader = document.querySelector('.category-header');
    const spaProduct = document.getElementById('spa-product');
    
    if (productsGrid) productsGrid.style.display = 'none';
    if (categoryHeader) categoryHeader.style.display = 'none';
    if (spaProduct) {
        spaProduct.classList.add('active');
        spaProduct.style.display = 'block';
    }
    
    window.scrollTo(0, 0);
}

function showCatalog() {
    const productsGrid = document.querySelector('.products-grid');
    const categoryHeader = document.querySelector('.category-header');
    const spaProduct = document.getElementById('spa-product');
    
    if (productsGrid) productsGrid.style.display = 'grid';
    if (categoryHeader) categoryHeader.style.display = 'block';
    if (spaProduct) {
        spaProduct.classList.remove('active');
        spaProduct.style.display = 'none';
    }
    
    history.pushState({ page: 'catalog' }, '', '#catalog');
    window.scrollTo(0, 0);
}

function renderProductPage(prodId) {
    const prod = spaData.products[prodId];
    if (!prod) {
        console.error('Товар не найден:', prodId);
        return;
    }
    
    spaCurrentProd = prodId;
    
    // Заполняем данные
    const titleEl = document.getElementById('prod-title');
    const priceEl = document.getElementById('prod-price');
    const articleEl = document.getElementById('prod-article');
    const descEl = document.getElementById('prod-description');
    const specsEl = document.getElementById('prod-specs');
    
    if (titleEl) titleEl.textContent = prod.name;
    if (priceEl) priceEl.textContent = `от ${prod.price.toLocaleString('ru')} ₽/м²`;
    if (articleEl) articleEl.textContent = `Артикул: ${prod.article || '—'}`;
    if (descEl) descEl.innerHTML = `<p>${prod.desc || ''}</p>`;
    
    // Характеристики
    if (specsEl) {
        specsEl.innerHTML = '';
        if (prod.specs && prod.specs.length) {
            prod.specs.forEach(s => {
                const li = document.createElement('li');
                li.innerHTML = `<span>${s.l}:</span><span>${s.v}</span>`;
                specsEl.appendChild(li);
            });
        } else {
            specsEl.innerHTML = '<li><span>Характеристики уточняются</span></li>';
        }
    }
    
    // Инициализация слайдера
    const images = prod.images || ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'];
    initProdSlider(images);
}

function initProdSlider(images) {
    const slidesCont = document.getElementById('prod-slides');
    const dotsCont = document.getElementById('prod-dots');
    
    if (!slidesCont || !dotsCont) return;
    
    slidesCont.innerHTML = '';
    dotsCont.innerHTML = '';
    
    spaProdSlider.total = images.length;
    spaProdSlider.idx = 0;
    
    for (let i = 0; i < images.length; i++) {
        // Слайд
        const slide = document.createElement('div');
        slide.className = 'slide' + (i === 0 ? ' active' : '');
        const img = document.createElement('img');
        img.src = images[i];
        img.alt = `Фото ${i+1}`;
        slide.appendChild(img);
        slidesCont.appendChild(slide);
        
        // Индикатор
        const dot = document.createElement('div');
        dot.className = 'hex' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', function(e) { 
            e.stopPropagation(); 
            spaProdSlider.idx = i; 
            updateProdSlider(); 
        });
        dotsCont.appendChild(dot);
    }
    
    updateProdSlider();
}

function updateProdSlider() {
    const slides = document.querySelectorAll('#prod-slides .slide');
    const dots = document.querySelectorAll('#prod-dots .hex');
    
    // Циклическая прокрутка
    spaProdSlider.idx = ((spaProdSlider.idx % spaProdSlider.total) + spaProdSlider.total) % spaProdSlider.total;
    
    slides.forEach((s, i) => s.classList.toggle('active', i === spaProdSlider.idx));
    dots.forEach((d, i) => d.classList.toggle('active', i === spaProdSlider.idx));
}