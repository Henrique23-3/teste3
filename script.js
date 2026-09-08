let mapInstance = null;

// Navegação entre telas
function navigateTo(screenId, navElement = null) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(s => s.classList.add('d-none'));

    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.remove('d-none');
    }

    const bottomNav = document.getElementById('main-nav');
    const hiddenNavScreens = ['screen-welcome', 'screen-login', 'screen-register', 'screen-location'];

    if (hiddenNavScreens.includes(screenId)) {
        bottomNav.classList.add('d-none');
    } else {
        bottomNav.classList.remove('d-none');
    }

    if (navElement) {
        document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
        navElement.classList.add('active');
    }

    if (screenId === 'screen-map') {
        setTimeout(initMap, 100);
    }
}

function getNavBtn(index) {
    return document.querySelectorAll('.nav-item')[index];
}

// Alternar abas ativas
function switchTab(btn) {
    const parent = btn.parentElement;
    parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

// Filtro da tela de Alertas
function filterAlerts(category, btn) {
    switchTab(btn);
    
    const alertCards = document.querySelectorAll('#screen-alerts .alert-card');
    alertCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'todos' || cardCategory === category) {
            card.classList.remove('d-none');
        } else {
            card.classList.add('d-none');
        }
    });
}

// Alternar botões de configuração
function toggleSwitch(item) {
    const icon = item.querySelector('.toggle-icon');
    if (icon) {
        if (icon.classList.contains('fa-toggle-on')) {
            icon.classList.remove('fa-toggle-on');
            icon.classList.add('fa-toggle-off', 'off');
        } else {
            icon.classList.remove('fa-toggle-off', 'off');
            icon.classList.add('fa-toggle-on');
        }
    }
}

// Selecionar botões pill
function selectPill(btn) {
    const parent = btn.parentElement;
    parent.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

// Ações do App
function triggerCamera() {
    alert('Abrindo a câmera do dispositivo...');
}

function sendReport() {
    alert('Relato enviado com sucesso! Obrigado por colaborar.');
    navigateTo('screen-home', getNavBtn(0));
}

function searchLocation() {
    const input = document.getElementById('map-search-input').value;
    if(input.trim() !== "") {
        alert('Buscando por: ' + input);
    }
}

// Inicialização do Mapa Leaflet
function initMap() {
    if (mapInstance) {
        mapInstance.invalidateSize();
        return;
    }

    const recifeCoords = [-8.0476, -34.8770];

    mapInstance = L.map('map').setView(recifeCoords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(mapInstance);

    const locations = [
        { coords: [-8.0631, -34.8711], title: 'Rua Imperial - Ponto Crítico de Alagamento', color: '#900C1C' },
        { coords: [-8.0550, -34.8880], title: 'Avenida Agamenon Magalhães - Trânsito Lento / Água Média', color: '#FF7000' },
        { coords: [-8.0420, -34.8900], title: 'Espinheiro - Atenção para Poças em Vias Secundárias', color: '#F3C300' }
    ];

    locations.forEach(loc => {
        L.circleMarker(loc.coords, {
            color: loc.color,
            fillColor: loc.color,
            fillOpacity: 0.7,
            radius: 12
        }).addTo(mapInstance).bindPopup(`<b>${loc.title}</b>`);
    });
}