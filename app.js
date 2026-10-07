// Initialize Lucide icons
lucide.createIcons();

// --- DATA SETS ---
const dataEmpleado = [
    { id: 1, title: "Desarrollador Frontend", subtitle: "TechPeru SAC", match: "95%", tag1: "S/ 3,500 - 4,500", icon1: "banknote", tag2: "Remoto", icon2: "laptop", tag3: "Lima, Perú", icon3: "map-pin", desc: "Buscamos un dev apasionado por interfaces hermosas. Experiencia con React, CSS moderno y animaciones.", color: "linear-gradient(135deg, #f43f5e, #8b5cf6)" },
    { id: 2, title: "Diseñador UX/UI", subtitle: "Agencia Creativa", match: "88%", tag1: "S/ 2,800", icon1: "banknote", tag2: "Híbrido", icon2: "laptop", tag3: "Miraflores", icon3: "map-pin", desc: "Diseña el futuro de aplicaciones móviles. Necesitamos alguien con buen ojo para el detalle.", color: "linear-gradient(135deg, #3b82f6, #2dd4bf)" }
];

const dataEmpresa = [
    { id: 101, title: "Carlos Mendoza", subtitle: "Dev Fullstack SSR", match: "98%", tag1: "Expectativa: S/ 4,000", icon1: "banknote", tag2: "Remoto", icon2: "laptop", tag3: "Ing. Sistemas", icon3: "graduation-cap", desc: "5 años de exp. en Node.js, React y AWS. Busco retos escalables y un buen clima laboral. Inglés avanzado.", color: "linear-gradient(135deg, #2dd4bf, #3b82f6)" },
    { id: 102, title: "Ana Silva", subtitle: "Data Scientist", match: "90%", tag1: "Expectativa: S/ 5,500", icon1: "banknote", tag2: "Híbrido", icon2: "laptop", tag3: "Maestría", icon3: "graduation-cap", desc: "Experta en Machine Learning y Python. He optimizado algoritmos que reducen costos en 30%.", color: "linear-gradient(135deg, #10b981, #f59e0b)" }
];

const dataPersona = [
    { id: 201, title: "Jorge 'El Profe'", subtitle: "Gasfitero Certificado", match: "Cerca de ti", tag1: "S/ 50 / visita", icon1: "banknote", tag2: "4.9 ★ (120)", icon2: "star", tag3: "Llega en 30m", icon3: "clock", desc: "Arreglo fugas, instalo termas y desatoro tuberías. Trabajo limpio y con garantía de 3 meses.", color: "linear-gradient(135deg, #f59e0b, #ef4444)", verified: true },
    { id: 202, title: "Mariana Paz", subtitle: "Niñera Pedagógica", match: "Favorita", tag1: "S/ 25 / hora", icon1: "banknote", tag2: "5.0 ★ (45)", icon2: "star", tag3: "Disponible Hoy", icon3: "calendar", desc: "Estudiante de educación inicial. Cuido niños de 2 a 8 años. Llevo materiales didácticos.", color: "linear-gradient(135deg, #ec4899, #8b5cf6)", verified: true }
];

// --- APP STATE ---
let currentMode = '';
let currentData = [];
const container = document.getElementById('card-container');

// --- NAVIGATION LOGIC ---
window.switchView = (mode) => {
    document.getElementById('home-view').classList.remove('show-view');
    document.getElementById('home-view').classList.add('hide-view');
    document.getElementById('swipe-view').classList.remove('hide-view');
    document.getElementById('swipe-view').classList.add('show-view');

    currentMode = mode;
    const titleEl = document.getElementById('view-title');
    const navEl = document.getElementById('dynamic-nav');

    if (mode === 'empleado') {
        titleEl.innerHTML = 'Ofertas<span>YA</span>';
        currentData = [...dataEmpleado];
        navEl.innerHTML = `
            <button class="nav-item active"><i data-lucide="briefcase"></i><span>Ofertas</span></button>
            <button class="nav-item"><i data-lucide="file-text"></i><span>Mi CV IA</span></button>
            <button class="nav-item"><i data-lucide="message-circle"></i><span>Chats</span></button>
        `;
    } else if (mode === 'empresa') {
        titleEl.innerHTML = 'Talento<span>YA</span>';
        currentData = [...dataEmpresa];
        navEl.innerHTML = `
            <button class="nav-item active"><i data-lucide="users"></i><span>Candidatos</span></button>
            <button class="nav-item"><i data-lucide="folder-heart"></i><span>Favoritos</span></button>
            <button class="nav-item"><i data-lucide="message-circle"></i><span>Chats</span></button>
        `;
    } else if (mode === 'persona') {
        titleEl.innerHTML = 'Servicios<span>YA</span>';
        currentData = [...dataPersona];
        navEl.innerHTML = `
            <button class="nav-item active"><i data-lucide="tool"></i><span>Explorar</span></button>
            <button class="nav-item"><i data-lucide="search"></i><span>Pedir IA</span></button>
            <button class="nav-item"><i data-lucide="credit-card"></i><span>Pagos</span></button>
        `;
    }

    renderCards();
}

window.goHome = () => {
    document.getElementById('swipe-view').classList.remove('show-view');
    document.getElementById('swipe-view').classList.add('hide-view');
    document.getElementById('home-view').classList.remove('hide-view');
    document.getElementById('home-view').classList.add('show-view');
}

// --- RENDER LOGIC ---
function renderCards() {
    container.innerHTML = '';
    
    [...currentData].reverse().forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'tinder-card';
        card.style.zIndex = index;
        card.dataset.id = item.id;
        
        if(index < currentData.length - 1) {
            const offset = (currentData.length - 1 - index);
            card.style.transform = `scale(${1 - offset * 0.05}) translateY(-${offset * 10}px)`;
            card.style.opacity = 1 - (offset * 0.2);
        }

        let verifiedBadge = item.verified ? `<div class="verified-badge"><i data-lucide="shield-check" style="width: 14px; height: 14px;"></i>Verificado KYC</div>` : '';
        let matchBadge = `<div class="match-badge"><i data-lucide="zap" style="width: 14px; height: 14px;"></i>${item.match}</div>`;

        let iconColor = currentMode === 'empleado' ? 'var(--primary)' : currentMode === 'empresa' ? 'var(--secondary)' : 'var(--warning)';

        card.innerHTML = `
            <div class="card-image-wrapper" style="background: ${item.color}">
                ${verifiedBadge}
                ${matchBadge}
            </div>
            <div class="card-content">
                <h2 class="card-title">${item.title}</h2>
                <div class="card-subtitle" style="color: ${iconColor}">
                    <i data-lucide="${currentMode === 'empleado' ? 'building-2' : currentMode === 'empresa' ? 'user' : 'briefcase'}" style="width: 16px; height: 16px;"></i>
                    ${item.subtitle}
                </div>
                <div class="tags">
                    <span class="tag tag-highlight">
                        <i data-lucide="${item.icon1}" style="width: 14px; height: 14px;"></i>
                        ${item.tag1}
                    </span>
                    <span class="tag">
                        <i data-lucide="${item.icon2}" style="width: 14px; height: 14px;"></i>
                        ${item.tag2}
                    </span>
                    <span class="tag">
                        <i data-lucide="${item.icon3}" style="width: 14px; height: 14px;"></i>
                        ${item.tag3}
                    </span>
                </div>
                <p class="desc">${item.desc}</p>
            </div>
        `;
        container.appendChild(card);
    });
    
    lucide.createIcons();
    initDragEvents();
}

// --- SWIPE LOGIC ---
function initDragEvents() {
    const cards = document.querySelectorAll('.tinder-card');
    
    cards.forEach(card => {
        let isDragging = false;
        let startX = 0;
        let currentX = 0;

        const startDrag = (clientX) => {
            isDragging = true;
            startX = clientX;
            card.style.transition = 'none';
        };

        const onDrag = (clientX) => {
            if (!isDragging) return;
            currentX = clientX - startX;
            const rotation = currentX * 0.1;
            card.style.transform = `translateX(${currentX}px) rotate(${rotation}deg)`;
        };

        const endDrag = () => {
            if (!isDragging) return;
            isDragging = false;
            handleSwipe(card, currentX);
        };

        card.addEventListener('touchstart', (e) => startDrag(e.touches[0].clientX), {passive: true});
        card.addEventListener('touchmove', (e) => onDrag(e.touches[0].clientX), {passive: true});
        card.addEventListener('touchend', endDrag);

        card.addEventListener('mousedown', (e) => { startDrag(e.clientX); card.style.cursor = 'grabbing'; });
        document.addEventListener('mousemove', (e) => onDrag(e.clientX));
        document.addEventListener('mouseup', () => { card.style.cursor = 'grab'; endDrag(); });
    });
}

function handleSwipe(card, currentX) {
    card.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    const threshold = window.innerWidth * 0.25;

    if (currentX > threshold) {
        swipeCard(card, 'right');
        setTimeout(() => triggerMatch(), 400);
    } else if (currentX < -threshold) {
        swipeCard(card, 'left');
    } else {
        card.style.transform = '';
    }
}

function swipeCard(card, direction) {
    if(direction === 'right') card.classList.add('swipe-right');
    else if (direction === 'left') card.classList.add('swipe-left');
    else if (direction === 'up') card.classList.add('swipe-up');

    setTimeout(() => {
        card.remove();
        updateBackgroundCards();
    }, 300);
}

function updateBackgroundCards() {
    const remainingCards = Array.from(document.querySelectorAll('.tinder-card')).reverse();
    remainingCards.forEach((card, index) => {
        card.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
        card.style.transform = `scale(${1 - index * 0.05}) translateY(-${index * 10}px)`;
        card.style.opacity = 1 - (index * 0.2);
    });
    
    if(remainingCards.length === 0) {
        container.innerHTML = `
            <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; color: var(--text-muted);">
                <i data-lucide="loader" style="animation: spin 2s linear infinite; margin-bottom:10px;"></i>
                <p>La IA está buscando más opciones...</p>
            </div>
        `;
        lucide.createIcons();
    }
}

// --- MATCH LOGIC ---
function triggerMatch() {
    // 50% chance to show match screen
    if(Math.random() > 0.5) {
        document.getElementById('match-overlay').classList.remove('hide-view');
        document.getElementById('match-overlay').classList.add('show-view');
    }
}

window.closeMatch = () => {
    document.getElementById('match-overlay').classList.remove('show-view');
    document.getElementById('match-overlay').classList.add('hide-view');
}

// --- BUTTONS ---
document.getElementById('btn-nope').addEventListener('click', () => {
    const topCard = getTopCard();
    if(topCard) swipeCard(topCard, 'left');
});
document.getElementById('btn-like').addEventListener('click', () => {
    const topCard = getTopCard();
    if(topCard) {
        swipeCard(topCard, 'right');
        setTimeout(() => triggerMatch(), 400);
    }
});
document.getElementById('btn-super').addEventListener('click', () => {
    const topCard = getTopCard();
    if(topCard) swipeCard(topCard, 'up');
});

function getTopCard() {
    const cards = document.querySelectorAll('.tinder-card');
    return cards[cards.length - 1];
}

// CSS for spin
const style = document.createElement('style');
style.innerHTML = `@keyframes spin { 100% { transform: rotate(360deg); } }`;
document.head.appendChild(style);
