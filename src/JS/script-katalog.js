// ===== ИНИЦИАЛИЗАЦИЯ СЛАЙДЕРА =====
function initSlider(slider) {
    const slides = slider.querySelectorAll('.slide');
    const hexIndicators = slider.querySelectorAll('.hex');
    const prevBtn = slider.querySelector('.prev-btn');
    const nextBtn = slider.querySelector('.next-btn');
    let currentIndex = 0;
    const totalSlides = slides.length;

    function goToSlide(index) {
        if (index < 0) currentIndex = totalSlides - 1;
        else if (index >= totalSlides) currentIndex = 0;
        else currentIndex = index;

        slides.forEach((slide, i) => slide.classList.toggle('active', i === currentIndex));
        hexIndicators.forEach((hex, i) => hex.classList.toggle('active', i === currentIndex));
    }

    if (prevBtn) prevBtn.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); goToSlide(currentIndex - 1); });
    if (nextBtn) nextBtn.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); goToSlide(currentIndex + 1); });
    
    hexIndicators.forEach((hex, index) => {
        hex.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); goToSlide(index); });
    });
}

const exceptions = {};
function getProductImages(productId, maxCount = 5) {
    if (exceptions[productId]) return exceptions[productId];
    const images = [];
    for (let i = 1; i <= maxCount; i++) {
        images.push(`src/images/katalog_cards-main/card_1/${productId}_${i}.jpg`);
    }
    return images;
}

// ===== БАЗА ДАННЫХ SPA =====
const spaData = {
    categories: {
        'wood-tile': { name: 'Деревянная плитка', desc: 'Экологичная плитка из натурального дерева', products: ['wt-001', 'wt-002', 'wt-003', 'wt-004', 'wt-005', 'wt-006', 'wt-007', 'wt-008', 'wt-009'] },
        'engineered': { name: 'Инженерная доска', desc: 'Многослойная доска с высокой стабильностью', products: ['eng-001','eng-002','eng-003','eng-004','eng-005','eng-006','eng-007','eng-008','eng-009','eng-010','eng-011','eng-012','eng-013','eng-014','eng-015','eng-016','eng-017','eng-018','eng-019','eng-020','eng-021','eng-022','eng-023','eng-024','eng-025','eng-026','eng-027','eng-028','eng-029','eng-030','eng-031','eng-032','eng-033','eng-034','eng-035','eng-036','eng-037','eng-038','eng-039','eng-040','eng-041','eng-042','eng-043','eng-044','eng-045','eng-046','eng-047','eng-048','eng-049','eng-050','eng-051','eng-052','eng-053','eng-054','eng-055','eng-056','eng-057','eng-058','eng-059','eng-060','eng-061','eng-062','eng-063','eng-064','eng-065','eng-066','eng-067','eng-068','eng-069','eng-070','eng-071','eng-072','eng-073','eng-074','eng-075','eng-076','eng-077','eng-078','eng-079','eng-080','eng-081','eng-082','eng-083','eng-084','eng-085','eng-086','eng-087','eng-088','eng-089','eng-090','eng-091','eng-092'] },
        'solid-wood': { name: 'Массивная доска', desc: 'Премиальное покрытие из цельного массива', products: ['sw-001', 'sw-002', 'sw-003'] },
        'parquet': { name: 'Паркетная доска', desc: 'Классический паркет по доступной цене', products: ['pq-001', 'pq-002', 'pq-003', 'pq-004'] },
        'laminate': { name: 'Ламинат', desc: 'Износостойкое покрытие для любых помещений', products: ['lm-001', 'lm-002', 'lm-003', 'lm-004', 'lm-005'] },
        'cork': { name: 'Пробковое покрытие', desc: 'Гипоаллергенное покрытие с шумоизоляцией', products: ['ck-001', 'ck-002', 'ck-003'] },
        'decking': { name: 'Террасная доска', desc: 'Устойчивое к погоде покрытие для террас', products: ['dk-001', 'dk-002', 'dk-003'] },
        'services': { name: 'Укладка и уход', desc: 'Профессиональные услуги по монтажу', products: ['srv-001', 'srv-002', 'srv-003'] },
        'carpentry': { name: 'Столярные изделия', desc: 'Изделия из дерева на заказ по индивидуальным размерам', products: ['cp-001', 'cp-002'] },
        'decorative-grilles': { name: 'Декоративные решетки', desc: 'Деревянные решетки для интерьера и экстерьера', products: ['dg-001', 'dg-002'] }
    },
    products: {
        'wt-001': { name: 'Ареццо', price: 14990, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Толщина', v: '15 мм' }, { l: 'Размер', v: '600×150 мм' }, { l: 'Покрытие', v: 'Матовый лак' }] },
        'wt-002': { name: 'Венгерская укладка', price: 16790, images: ['src/images/katalog_cards-main/card_1/Ratlin_Vengerskaya_ukladka.jpg'], specs: [{ l: 'Материал', v: 'Ясень' }, { l: 'Толщина', v: '15 мм' }, { l: 'Размер', v: '600×150 мм' }] },
        'wt-003': { name: 'Куб', price: 17260, images: ['src/images/katalog_cards-main/card_1/Cube_Ratlin.jpg'], specs: [{ l: 'Материал', v: 'Орех' }, { l: 'Толщина', v: '15 мм' }] },
        'wt-004': { name: 'Эффетто', price: 17600, images: ['src/images/katalog_cards-main/card_1/Effeto_Ratlin.jpg'], specs: [{ l: 'Материал', v: 'Бук' }, { l: 'Толщина', v: '15 мм' }] },
        'wt-005': { name: 'Тессерио', price: 17650, images: ['src/images/katalog_cards-main/card_1/Ratlin_Tesserio.jpg'], specs: [{ l: 'Параметр 1', v: 'Значение 1' }, { l: 'Параметр 2', v: 'Значение 2' }] },
        'wt-006': { name: 'Виньетто', price: 18130, images: ['src/images/katalog_cards-main/card_1/rathlin_vinyetto.jpg'], specs: [{ l: 'Параметр 1', v: 'Значение 1' }, { l: 'Параметр 2', v: 'Значение 2' }] },
        'wt-007': { name: 'Эсагоно', price: 21760, images: ['src/images/katalog_cards-main/card_1/rathlin_esagono.jpg'], specs: [{ l: 'Параметр 1', v: 'Значение 1' }, { l: 'Параметр 2', v: 'Значение 2' }] },
        'wt-008': { name: 'Маглионе', price: 22580, images: ['src/images/katalog_cards-main/card_1/rathlin_maglione.jpg'], specs: [{ l: 'Параметр 1', v: 'Значение 1' }, { l: 'Параметр 2', v: 'Значение 2' }] },
        'wt-009': { name: 'Либрон', price: 26430, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Параметр 1', v: 'Значение 1' }, { l: 'Параметр 2', v: 'Значение 2' }] },
        'eng-001': { name: 'натуральный (sanded)', price: 6850, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Шлифованная' }] },
        'eng-002': { name: 'натуральный (brushed)', price: 6850, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-003': { name: 'сент (brushed)', price: 6930, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-004': { name: '18 век (brushed)', price: 6930, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-005': { name: 'ридс oil (brushed)', price: 6930, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-006': { name: 'эшли oil (brushed)', price: 6930, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-007': { name: 'милта oil (brushed)', price: 7000, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-008': { name: 'берт (sanded)', price: 7000, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Лак' }, { l: 'Поверхность', v: 'Шлифованная' }] },
        'eng-009': { name: 'берт (brushed)', price: 7000, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Лак' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-010': { name: 'зимняя сказка (sanded)', price: 7000, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Лак' }, { l: 'Поверхность', v: 'Шлифованная' }] },
        'eng-011': { name: 'эстейт new (brushed)', price: 7000, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-012': { name: 'бьёрн (brushed)', price: 7000, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-013': { name: 'ратлин (brushed)', price: 7000, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-014': { name: 'бьёрн (sanded)', price: 7000, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Лак' }, { l: 'Поверхность', v: 'Шлифованная' }] },
        'eng-015': { name: 'ратлин (sanded)', price: 7000, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Лак' }, { l: 'Поверхность', v: 'Шлифованная' }] },
        'eng-016': { name: 'родшер new (brushed)', price: 7000, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-017': { name: 'верджн (brushed)', price: 7000, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-018': { name: 'меласса (brushed)', price: 7000, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-019': { name: 'colonial style (sanded)', price: 7000, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Лак' }, { l: 'Поверхность', v: 'Шлифованная' }] },
        'eng-020': { name: 'colonial style (brushed)', price: 7000, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Лак' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-021': { name: 'эстейт new (sanded)', price: 7000, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Лак' }, { l: 'Поверхность', v: 'Шлифованная' }] },
        'eng-022': { name: 'канна (sanded)', price: 7000, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Шлифованная' }] },
        'eng-023': { name: 'канна (brushed)', price: 7000, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-024': { name: 'стэйн (brushed)', price: 7000, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-025': { name: 'стэйн (sanded)', price: 7000, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Лак' }, { l: 'Поверхность', v: 'Шлифованная' }] },
        'eng-026': { name: 'принстон (sanded)', price: 7000, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Лак' }, { l: 'Поверхность', v: 'Шлифованная' }] },
        'eng-027': { name: 'принстон (brushed)', price: 7000, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Лак' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-028': { name: 'гранд (brushed)', price: 7070, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-029': { name: 'карлайл new (brushed)', price: 7070, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-030': { name: 'грэм (brushed)', price: 7070, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-031': { name: 'эльм (brushed)', price: 7070, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-032': { name: 'ильберс грей (brushed)', price: 7070, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-033': { name: 'ирбис (brushed)', price: 7070, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-034': { name: 'black (brushed)', price: 7070, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-035': { name: 'денвер (brushed)', price: 7070, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-036': { name: 'керрера (brushed)', price: 7070, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-037': { name: 'флэт уайт (brushed)', price: 7070, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-038': { name: 'стрейвуд (brushed)', price: 7070, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-039': { name: 'гентл new (brushed)', price: 7070, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-040': { name: 'речинто new (brushed)', price: 7070, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-041': { name: 'даск (brushed)', price: 7070, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-042': { name: 'бран (brushed)', price: 7070, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-043': { name: 'сил браун (brushed)', price: 7070, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-044': { name: 'фиато (brushed)', price: 7070, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-045': { name: 'мидл (brushed)', price: 7070, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-046': { name: 'саут (brushed)', price: 7080, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-047': { name: 'милстед (sanded)', price: 7140, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Лак' }, { l: 'Поверхность', v: 'Шлифованная' }] },
        'eng-048': { name: 'десечео (brushed)', price: 7140, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-049': { name: 'чёрный орех (sanded)', price: 7140, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Лак' }, { l: 'Поверхность', v: 'Шлифованная' }] },
        'eng-050': { name: 'чёрный орех (brushed)', price: 7140, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Лак' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-051': { name: 'mississippi (brushed)', price: 7190, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-052': { name: 'натуральный uni (brushed)', price: 7260, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-053': { name: 'эшли (brushed)', price: 7260, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-054': { name: 'террено new (brushed)', price: 7260, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-055': { name: 'солис (brushed)', price: 7260, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-056': { name: 'ридс (brushed)', price: 7260, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-057': { name: 'вилетта натура (brushed)', price: 7280, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-058': { name: 'турин (brushed)', price: 7280, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-059': { name: 'грасс (brushed)', price: 7310, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-060': { name: 'дав грей (brushed)', price: 7310, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-061': { name: 'виксбург (brushed)', price: 7310, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-062': { name: 'нордик new (brushed)', price: 7310, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-063': { name: 'unfinished look (brushed)', price: 7310, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-064': { name: 'рэббит (brushed)', price: 7370, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-065': { name: 'colonial style uni (brushed)', price: 7420, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-066': { name: 'милта (brushed)', price: 7500, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-067': { name: 'unfinished look uni (brushed)', price: 7630, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-068': { name: 'чест (brushed)', price: 8060, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-069': { name: 'смок (brushed)', price: 8680, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-070': { name: 'смок (sanded)', price: 8680, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Лак' }, { l: 'Поверхность', v: 'Шлифованная' }] },
        'eng-071': { name: 'ribble (brushed)', price: 8810, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-072': { name: 'preston (brushed)', price: 8830, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-073': { name: 'saint bees (brushed)', price: 8830, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-074': { name: 'alderton (brushed)', price: 8860, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-075': { name: 'xvii век (brushed)', price: 8930, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-076': { name: 'leicester (brushed)', price: 9000, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-077': { name: 'бельмонте (brushed)', price: 9050, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-078': { name: 'винчиньятта (brushed)', price: 9060, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-079': { name: 'bridge (brushed)', price: 9330, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-080': { name: 'смок с серебром (brushed)', price: 9460, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-081': { name: 'дуб натуральный лак (sanded)', price: 9580, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Лак' }, { l: 'Поверхность', v: 'Шлифованная' }] },
        'eng-082': { name: 'greywood (brushed)', price: 10470, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-083': { name: 'regent (brushed)', price: 10690, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-084': { name: 'red pike (brushed)', price: 10690, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-085': { name: 'ludlow (brushed)', price: 10690, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-086': { name: 'bradfield (brushed)', price: 11030, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-087': { name: 'dartmoor (brushed)', price: 11430, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Конструкция', v: '15.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-088': { name: 'diamond uv oil (sanded)', price: 16390, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Американский орех' }, { l: 'Конструкция', v: '15/3.5 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-089': { name: 'гурон (brushed)', price: 16530, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Американский орех' }, { l: 'Конструкция', v: '15/3.5 мм' }, { l: 'Покрытие', v: 'UV-лак' }, { l: 'Поверхность', v: 'Шлифованная' }] },
        'eng-090': { name: 'diamond uv classic (sanded)', price: 16830, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Американский орех' }, { l: 'Конструкция', v: '15/3.5 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-091': { name: 'солтон-си (brushed)', price: 17750, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Ясень' }, { l: 'Конструкция', v: '13.5/4 мм' }, { l: 'Покрытие', v: 'Масло' }, { l: 'Поверхность', v: 'Брашированная' }] },
        'eng-092': { name: 'солтон-си под лаком (sanded)', price: 18190, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Ясень' }, { l: 'Конструкция', v: '13.5/4 мм' }, { l: 'Покрытие', v: 'Лак' }, { l: 'Поверхность', v: 'Шлифованная' }] },
        'sw-001': { name: 'Массивная доска "Дуб Натур"', price: 5500, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Цельный дуб' }, { l: 'Толщина', v: '22 мм' }, { l: 'Размер', v: '2000×200 мм' }] },
        'sw-002': { name: 'Массивная доска "Ясень Селект"', price: 5200, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Ясень' }, { l: 'Толщина', v: '22 мм' }] },
        'sw-003': { name: 'Массивная доска "Лиственница"', price: 4800, images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Лиственница' }, { l: 'Толщина', v: '22 мм' }] },
        'pq-001': { name: 'Паркетная доска "Дуб Кантри"', price: 3200, article: 'PQ-DUB-C01', images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Толщина', v: '14 мм' }, { l: 'Размер', v: '2200×200 мм' }] },
        'pq-002': { name: 'Паркетная доска "Ясень Лайн"', price: 3000, article: 'PQ-YAS-L02', images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Ясень' }, { l: 'Толщина', v: '14 мм' }] },
        'pq-003': { name: 'Паркетная доска "Орех Браун"', price: 3400, article: 'PQ-ORE-B03', images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Орех' }, { l: 'Толщина', v: '14 мм' }] },
        'pq-004': { name: 'Паркетная доска "Бук Классик"', price: 2900, article: 'PQ-BUK-C04', images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Бук' }, { l: 'Толщина', v: '14 мм' }] },
        'lm-001': { name: 'Ламинат 33 класс "Дуб"', price: 1600, article: 'LM-DUB-33-01', images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Класс', v: '33' }, { l: 'Толщина', v: '12 мм' }, { l: 'Влагостойкость', v: 'Да' }] },
        'lm-002': { name: 'Ламинат 32 класс "Ясень"', price: 1400, article: 'LM-YAS-32-02', images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Класс', v: '32' }, { l: 'Толщина', v: '10 мм' }] },
        'lm-003': { name: 'Ламинат 33 класс "Орех"', price: 1700, article: 'LM-ORE-33-03', images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Класс', v: '33' }, { l: 'Толщина', v: '12 мм' }] },
        'lm-004': { name: 'Ламинат 34 класс "Водостойкий"', price: 2200, article: 'LM-WP-34-04', images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Класс', v: '34' }, { l: 'Влагостойкость', v: '100%' }] },
        'lm-005': { name: 'Ламинат "Под камень"', price: 1900, article: 'LM-STN-005', images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Класс', v: '33' }, { l: 'Дизайн', v: 'Камень' }] },
        'ck-001': { name: 'Пробка "Натурал"', price: 2900, article: 'CK-NAT-001', images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Пробка' }, { l: 'Толщина', v: '6 мм' }, { l: 'Звукоизоляция', v: 'Высокая' }] },
        'ck-002': { name: 'Пробка "Винил"', price: 3200, article: 'CK-VIN-002', images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Пробка+винил' }, { l: 'Толщина', v: '6 мм' }] },
        'ck-003': { name: 'Пробка "Премиум"', price: 3800, article: 'CK-PRM-003', images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Пробка' }, { l: 'Покрытие', v: 'Лак' }] },
        'dk-001': { name: 'Террасная доска ДПК', price: 3400, article: 'DK-DPC-001', images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'ДПК' }, { l: 'Толщина', v: '28 мм' }, { l: 'УФ-защита', v: 'Да' }] },
        'dk-002': { name: 'Террасная доска "Лиственница"', price: 3800, article: 'DK-LIS-002', images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Лиственница' }, { l: 'Толщина', v: '28 мм' }] },
        'dk-003': { name: 'Террасная доска "Экзотика"', price: 5200, article: 'DK-EXOT-003', images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Материал', v: 'Мербау/Ипе' }, { l: 'Толщина', v: '28 мм' }] },
        'srv-001': { name: 'Укладка под ключ', price: 600, article: 'SRV-INSTALL-01', images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Тип', v: 'Укладка' }, { l: 'Гарантия', v: '2 года' }, { l: 'Замер', v: 'Бесплатно' }] },
        'srv-002': { name: 'Демонтаж старого покрытия', price: 200, article: 'SRV-DEMO-002', images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Тип', v: 'Демонтаж' }, { l: 'Вывоз', v: 'Включён' }] },
        'srv-003': { name: 'Уход и реставрация', price: 300, article: 'SRV-CARE-003', images: ['src/images/katalog_cards-main/card_1/Ratlin_Arezzo.jpg'], specs: [{ l: 'Тип', v: 'Уход' }, { l: 'Выезд', v: 'Бесплатно' }] },
        'cp-001': { name: 'Подоконник дубовый', price: 4500, article: 'CP-SILL-01', images: ['src/images/katalog_cards-main/card_1/carpentry_1.jpg'], specs: [{ l: 'Материал', v: 'Дуб' }, { l: 'Ширина', v: '250 мм' }] },
        'cp-002': { name: 'Лестничный марш', price: 120000, article: 'CP-STAIR-02', images: ['src/images/katalog_cards-main/card_1/carpentry_2.jpg'], specs: [{ l: 'Материал', v: 'Ясень' }, { l: 'Высота', v: '3000 мм' }] },
        'dg-001': { name: 'Решетка радиаторная', price: 8500, article: 'DG-RAD-01', images: ['src/images/katalog_cards-main/card_1/decorative-grilles_1.jpg'], specs: [{ l: 'Материал', v: 'Бук' }, { l: 'Размер', v: '800×1000 мм' }] },
        'dg-002': { name: 'Решетка фасадная', price: 11200, article: 'DG-FAC-02', images: ['src/images/katalog_cards-main/card_1/decorative-grilles_2.jpg'], specs: [{ l: 'Материал', v: 'Лиственница' }, { l: 'Размер', v: '1200×1500 мм' }] }
    }
};

// ===== СОСТОЯНИЕ ПРИЛОЖЕНИЯ =====
let spaCurrentCat = null;
let spaCurrentProd = null;
let spaProdSlider = { idx: 0, total: 3 };

// ===== ИНИЦИАЛИЗАЦИЯ ПОСЛЕ ЗАГРУЗКИ DOM =====
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.slider-block').forEach(slider => {
        initSlider(slider);
        makeSliderSpaClickable(slider);
    });

    document.querySelectorAll('[data-spa-page]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); e.stopPropagation();
            spaNavigate(this.dataset.spaPage);
        });
    });

    document.getElementById('btn-back-catalog')?.addEventListener('click', () => spaNavigate('catalog'));
    document.getElementById('btn-back-category')?.addEventListener('click', () => {
        if (spaCurrentCat) spaNavigate('category', spaCurrentCat);
        else spaNavigate('catalog');
    });

    document.getElementById('prod-prev')?.addEventListener('click', e => { e.stopPropagation(); spaProdSlider.idx--; updateProdSlider(); });
    document.getElementById('prod-next')?.addEventListener('click', e => { e.stopPropagation(); spaProdSlider.idx++; updateProdSlider(); });

    window.addEventListener('popstate', function(e) {
        if (e.state?.page) showSpaPage(e.state.page, e.state.data);
        else showSpaPage('catalog');
    });

    if (!history.state) {
        history.replaceState({ page: 'catalog' }, '', '#catalog');
    }
});

// ===== ФУНКЦИИ SPA =====
function makeSliderSpaClickable(slider) {
    slider.classList.add('spa-clickable');
    slider.addEventListener('click', function(e) {
        if (e.target.closest('.nav-btn') || e.target.closest('.hex')) return;
        
        // Если у слайдера есть data-link, переходим на обычную страницу
        const pageUrl = this.dataset.link;
        if (pageUrl) {
            window.location.href = pageUrl;
            return;
        }
        
        // Иначе работаем как SPA
        const catId = this.dataset.spaCat;
        if (catId) openSpaCategory(catId);
    });
}

function spaNavigate(page, data) {
    history.pushState({ page, data }, '', '#' + page + (data ? '/' + data : ''));
    showSpaPage(page, data);
}

function showSpaPage(page, data) {
    document.querySelectorAll('.spa-page').forEach(p => p.classList.remove('active'));
    switch(page) {
        case 'catalog': document.getElementById('spa-catalog').classList.add('active'); break;
        case 'category':
            if (data && spaData.categories[data]) { renderCategoryPage(data); document.getElementById('spa-category').classList.add('active'); }
            else spaNavigate('catalog');
            break;
        case 'product':
            if (data && spaData.products[data]) { renderProductPage(data); document.getElementById('spa-product').classList.add('active'); }
            else spaNavigate('catalog');
            break;
        case 'home': case 'accessories': case 'promo': case 'projects': case 'partner':
            document.getElementById('spa-' + page).classList.add('active'); break;
        default: document.getElementById('spa-catalog').classList.add('active');
    }
    window.scrollTo(0, 0);
}

function openSpaCategory(catId) { spaNavigate('category', catId); }

function renderCategoryPage(catId) {
    const cat = spaData.categories[catId];
    if (!cat) return;
    spaCurrentCat = catId;
    
    document.getElementById('cat-title').textContent = cat.name;
    document.getElementById('cat-desc').textContent = cat.desc;
    
    const grid = document.getElementById('products-grid');
    grid.innerHTML = '';
    
    if (!cat.products || cat.products.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #666;">Товары в этой категории скоро появятся.</p>';
        return;
    }

    cat.products.forEach(prodId => {
        const prod = spaData.products[prodId];
        if (!prod) return;
        
        const card = document.createElement('div');
        card.className = 'product-card';
        const mainImage = (prod.images && prod.images.length) ? prod.images[0] : 'img/placeholder.jpg';
        
        card.innerHTML = `
            <div class="product-card-img"><img src="${mainImage}" alt="${prod.name}" loading="lazy"></div>
            <div class="product-card-info">
                <div class="product-card-name">${prod.name}</div>
                <div class="product-card-price">от ${prod.price.toLocaleString('ru')} ₽/м²</div>
                <div class="product-card-article">Арт. ${prod.article || '—'}</div>
            </div>
        `;
        card.addEventListener('click', () => openSpaProduct(prodId));
        grid.appendChild(card);
    });
}

function openSpaProduct(prodId) { spaNavigate('product', prodId); }

function renderProductPage(prodId) {
    const prod = spaData.products[prodId];
    if (!prod) return;
    spaCurrentProd = prodId;
    
    document.getElementById('prod-title').textContent = prod.name;
    document.getElementById('prod-price').textContent = `от ${prod.price.toLocaleString('ru')} ₽/м²`;
    document.getElementById('prod-article').textContent = prod.article || '—';
    document.getElementById('prod-description').innerHTML = `<p>${prod.desc || ''}</p>`;
    
    const specs = document.getElementById('prod-specs');
    specs.innerHTML = '';
    prod.specs.forEach(s => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${s.l}:</span><span>${s.v}</span>`;
        specs.appendChild(li);
    });

    initProdSlider(prod.images || ['img/placeholder.jpg']);
}

function initProdSlider(images) {
    const slidesCont = document.getElementById('prod-slides');
    const dotsCont = document.getElementById('prod-dots');
    slidesCont.innerHTML = '';
    dotsCont.innerHTML = '';
    
    spaProdSlider.total = images.length;
    spaProdSlider.idx = 0;
    
    for (let i = 0; i < images.length; i++) {
        const slide = document.createElement('div');
        slide.className = 'slide' + (i === 0 ? ' active' : '');
        slide.innerHTML = `<img src="${images[i]}" alt="Фото ${i+1}">`;
        slidesCont.appendChild(slide);

        const dot = document.createElement('div');
        dot.className = 'hex' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', e => { e.stopPropagation(); spaProdSlider.idx = i; updateProdSlider(); });
        dotsCont.appendChild(dot);
    }
    updateProdSlider();
}

function updateProdSlider() {
    const slides = document.querySelectorAll('#prod-slides .slide');
    const dots = document.querySelectorAll('#prod-dots .hex');
    spaProdSlider.idx = ((spaProdSlider.idx % spaProdSlider.total) + spaProdSlider.total) % spaProdSlider.total;
    slides.forEach((s, i) => s.classList.toggle('active', i === spaProdSlider.idx));
    dots.forEach((d, i) => d.classList.toggle('active', i === spaProdSlider.idx));
}