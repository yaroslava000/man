const defaultConfig = {
    site_title: "Історія української розвідки в інтерактиві",
    nav_item1: "Розвідка у давні часи",
    nav_item2: "Середньовіччя",
    nav_item3: "Сучасні органи",
    hero_title: "Українська розвідка",
    section1_title: "Розвідка у давні часи",
    section1_desc: "Дослідіть причини та передумови створення спеціальних розвідувальних служб у давні часи. Дізнайтеся про перші форми організованої розвідувальної діяльності на українських землях.",
    section2_title: "Розвідувальна діяльність періоду середньовіччя",
    section2_desc: "Пориньте у середньовічні методи розвідки на українських землях. Дізнайтеся про козацьку розвідувальну систему та її вплив на історію України.",
    section3_title: "Сучасні органи розвідки України",
    section3_desc: "Ознайомтеся зі структурою та функціями сучасних розвідувальних служб незалежної України. Дізнайтеся про ГУР МО та інші ключові установи.",
    navbar_bg: "#1a1a1a",
    accent_color: "#ffd700",
    primary_color: "#4d9fff",
    card_bg: "#1a1a1a",
    text_color: "#e0e0e0",
    font_family: "Arial",
    font_size: 16
};

function applyConfig(config = defaultConfig) {
    document.getElementById('siteTitle').textContent = config.site_title;
    document.getElementById('navItem1').textContent = config.nav_item1;
    document.getElementById('navItem2').textContent = config.nav_item2;
    document.getElementById('navItem3').textContent = config.nav_item3;
    document.getElementById('heroTitle').textContent = config.hero_title;

    document.getElementById('section1Title').textContent = config.section1_title;
    document.getElementById('section1Desc').textContent = config.section1_desc;
    document.getElementById('section2Title').textContent = config.section2_title;
    document.getElementById('section2Desc').textContent = config.section2_desc;
    document.getElementById('section3Title').textContent = config.section3_title;
    document.getElementById('section3Desc').textContent = config.section3_desc;

    // Встановити CSS-перемінні із конфігу (щоб не тримати дублі)
    const root = document.documentElement;
    if (config.navbar_bg) root.style.setProperty('--navbar-bg', config.navbar_bg);
    if (config.accent_color) root.style.setProperty('--accent-color', config.accent_color);
    if (config.primary_color) root.style.setProperty('--primary-color', config.primary_color);
    if (config.card_bg) root.style.setProperty('--card-bg', config.card_bg);
    if (config.text_color) root.style.setProperty('--text-color', config.text_color);
    if (config.font_family) root.style.setProperty('--font-family', config.font_family);
    if (config.font_size) root.style.setProperty('--font-size', `${config.font_size}px`);
}

// ====== Плавна прокрутка ======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        //тут обробляємо звичайні якорі
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

// ====== Обробка "Читати далі" (відкриття статичних панелей) ======
function openDetailPanel(id) {
    const panel = document.getElementById(id);
    if (!panel) return;
    panel.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    // фокус на кнопку закриття для доступності
    const closeBtn = panel.querySelector('.detail-close');
    if (closeBtn) closeBtn.focus();
}

function closeDetailPanel(panel) {
    if (!panel) return;
    panel.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    // повернути фокус на відповідну кнопку "Читати далі"
    const opener = document.querySelector(`.read-more[data-target="${panel.id}"]`);
    if (opener) opener.focus();
}

// Натискання на кнопки "Читати далі"
document.addEventListener('click', (e) => {
    const btn = e.target.closest('.read-more');
    if (btn) {
        const target = btn.getAttribute('data-target');
        if (target) {
            openDetailPanel(target);
        }
    }

    // закриття при натисканні на хрестик
    const close = e.target.closest('.detail-close');
    if (close) {
        const panel = close.closest('.detail-panel');
        closeDetailPanel(panel);
    }

    // якщо натиснути по фонній області (клац поза .detail-card) — закрити
    if (e.target.classList && e.target.classList.contains('detail-panel')) {
        closeDetailPanel(e.target);
    }
});

// клавіша Esc закриває відкриту панель
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const openPanel = document.querySelector('.detail-panel[aria-hidden="false"]');
        if (openPanel) closeDetailPanel(openPanel);
    }
});

// ====== Ініціалізація ======
document.addEventListener('DOMContentLoaded', () => {
    applyConfig();
});
