/**
 * BSPA Elektro Planungs-Tool Logic v2.2.0
 */

// --- Configuration & State ---
const state = {
    currentView: 'dashboard',
    activeWidgets: ['gemeinsam', 'privat', 'abteilung', 'info', 'jahresaufgaben', 'blockplan'],
    checklists: {
        gemeinsam: [
            { id: 'g1', text: 'Sitzplan gemacht?', done: false },
            { id: 'g2', text: 'Papiergeld eingesammelt?', done: false }
        ],
        privat: [
            { id: 'p1', text: 'Noten gemacht?', done: false },
            { id: 'p2', text: 'Stunden vorbereitet?', done: false }
        ],
        abteilung: [
            { id: 'a1', text: 'Stammdaten erfasst?', done: false },
            { id: 'a2', text: 'Schüler-Email angelegt?', done: false },
            { id: 'a3', text: 'Belehrung durchgeführt?', done: false }
        ],
        jahresbeginn: [
            { id: 'jb1', text: 'Pinnwand aktualisiert', done: false },
            { id: 'jb2', text: 'Schrankinventur', done: false }
        ],
        jahresende: [
            { id: 'je1', text: 'Notenbögen abgegeben', done: false },
            { id: 'je2', text: 'Lehrmittel weggeräumt', done: false }
        ]
    },
    blockPlan: [
        { kw: 38, von: '15.09.25', bis: '19.09.25', tage: 4, klassen: 'EL 10 A/B/C (E), EI 10 D (E)', notes: '15.09.: Einschreibung 10.' },
        { kw: 39, von: '22.09.25', bis: '26.09.25', tage: 5, klassen: 'EL 10 A, EBT 11 A, EBT 12 A, Mech 10', notes: '' },
        { kw: 40, von: '29.09.25', bis: '03.10.25', tage: 4, klassen: 'EL 10 B, EBT 11 B, EBT 12 B, Mech 11', notes: '03.10. Tag d. Dt. Einheit' },
        { kw: 41, von: '06.10.25', bis: '10.10.25', tage: 5, klassen: 'EL 10 C, EI 10 D, EBT 13, Mech 13', notes: '' },
        { kw: 42, von: '13.10.25', bis: '17.10.25', tage: 5, klassen: 'EL 10 A, EBT 11 A, EBT 12 A, Mech 12', notes: '' },
        { kw: 43, von: '20.10.25', bis: '24.10.25', tage: 5, klassen: 'EL 10 B, EBT 11 B, EBT 12 B, Mech 11', notes: '' },
        { kw: 44, von: '27.10.25', bis: '31.10.25', tage: 5, klassen: 'EL 10 C, EI 10 D, EBT 13, Mech 10, EEG 11A', notes: '(EEG 11a Blockwoche!)' },
        { kw: 45, von: '03.11.25', bis: '07.11.25', tage: 0, klassen: '--- FERIEN ---', notes: 'Allerheiligenferien' },
        { kw: 46, von: '10.11.25', bis: '14.11.25', tage: 5, klassen: 'EL 10 A, EBT 11 A, EBT 12 A, Mech 12', notes: '' },
        { kw: 47, von: '17.11.25', bis: '21.11.25', tage: 4, klassen: 'EL 10 B, EBT 11 B, EBT 12 B', notes: '19.11. Buß- u. Bettag' },
        { kw: 51, von: '15.12.25', bis: '19.12.25', tage: 5, klassen: 'EL 10 C, EI 10 D, EEG 11B', notes: '(EEG 11b Blockwoche!)' },
        { kw: 2, von: '05.01.26', bis: '09.01.26', tage: 3, klassen: '--- FEIERTAG ---, Mech 10', notes: '06.01. Hl. Drei Könige' },
        { kw: 3, von: '12.01.26', bis: '16.01.26', tage: 5, klassen: 'EL 10A, EBT 11A, EBT 12B, Mech 12', notes: '' },
        { kw: 4, von: '19.01.26', bis: '23.01.26', tage: 5, klassen: 'EL 10B, EBT 11B, EBT 12A, Mech 10', notes: '' },
        { kw: 5, von: '26.01.26', bis: '30.01.26', tage: 5, klassen: 'EL 10C, EI 10D, EEG 11A, Mech 11', notes: '(EEG 11a Blockwoche!)' },
        { kw: 6, von: '02.02.26', bis: '06.02.26', tage: 5, klassen: 'EL 10A, EBT 11A, EBT 12B, Mech 12', notes: '' },
        { kw: 7, von: '09.02.26', bis: '13.02.26', tage: 5, klassen: 'EL 10B, EBT 11B, EBT 12A, Mech 10', notes: '' },
        { kw: 8, von: '16.02.26', bis: '20.02.26', tage: 0, klassen: '--- FERIEN ---', notes: 'Frühjahrsferien' },
        { kw: 9, von: '23.02.26', bis: '27.02.26', tage: 5, klassen: 'EL 10C, EI 10D, EEG 11B, Mech 11', notes: '(EEG 11b Blockwoche!)' },
        { kw: 10, von: '02.03.26', bis: '06.03.26', tage: 5, klassen: 'EL 10A, EBT 11A, EBT 12B, Mech 12', notes: '' },
        { kw: 11, von: '09.03.26', bis: '13.03.26', tage: 5, klassen: 'EL 10B, EBT 11B, EBT 12A, Mech 11', notes: '' },
        { kw: 12, von: '16.03.26', bis: '20.03.26', tage: 5, klassen: 'EL 10C, EI 10D, EEG 11A, Mech 10', notes: 'IHK-Prüfung Teil 1, (EEG 11a Blockwoche!)' },
        { kw: 13, von: '23.03.26', bis: '27.03.26', tage: 5, klassen: 'EL 10A, EBT 11A, EBT 12B, Mech 12', notes: '' },
        { kw: 14, von: '30.03.26', bis: '03.04.26', tage: 0, klassen: '--- FERIEN ---', notes: 'Osterferien' },
        { kw: 15, von: '06.04.26', bis: '10.04.26', tage: 0, klassen: '--- FERIEN ---', notes: 'Osterferien' },
        { kw: 16, von: '13.04.26', bis: '17.04.26', tage: 5, klassen: 'EL 10B, EBT 11B, EBT 12A, Mech 12', notes: '' },
        { kw: 17, von: '20.04.26', bis: '24.04.26', tage: 5, klassen: 'EL 10C, EI 10D, EEG 11B, Mech 10', notes: '(EEG 11b Blockwoche!)' },
        { kw: 18, von: '27.04.26', bis: '01.05.26', tage: 4, klassen: 'EL 10A, EBT 11A, EBT 12A, Mech 12', notes: '01.05. Tag der Arbeit' },
        { kw: 19, von: '04.05.26', bis: '08.05.26', tage: 5, klassen: 'EL 10B, EBT 11B, Mech 11', notes: 'IHK-Prüfung Teil 2' },
        { kw: 20, von: '11.05.26', bis: '15.05.26', tage: 3, klassen: 'EL 10C, EI 10D, EEG 11A, Mech 10', notes: '14.05./15.05. Feier/Brückentag, (EEG 11a Blockwoche!)' },
        { kw: 21, von: '18.05.26', bis: '22.05.26', tage: 5, klassen: 'EL 10A, EBT 11A, EBT 12B, Mech 11', notes: '' },
        { kw: 22, von: '25.05.26', bis: '29.05.26', tage: 0, klassen: '--- FERIEN ---', notes: 'Pfingstferien' },
        { kw: 23, von: '01.06.26', bis: '05.06.26', tage: 0, klassen: '--- FERIEN ---', notes: 'Pfingstferien' },
        { kw: 24, von: '08.06.26', bis: '12.06.26', tage: 5, klassen: 'EL 10B, EBT 11B, EBT 12A, Mech 11', notes: '' },
        { kw: 25, von: '15.06.26', bis: '19.06.26', tage: 5, klassen: 'EL 10C, EI 10D, EEG 11B, Mech 10', notes: '(EEG 11b Blockwoche!)' },
        { kw: 26, von: '22.06.26', bis: '26.06.26', tage: 5, klassen: 'EL 10A, EBT 11A, EBT 12B, Mech 12', notes: '' },
        { kw: 27, von: '29.06.26', bis: '03.07.26', tage: 5, klassen: 'EL 10B, EBT 11B, EBT 12A, Mech 11', notes: '' },
        { kw: 28, von: '06.07.26', bis: '10.07.26', tage: 5, klassen: 'EL 10C, EI 10D, EEG 11A, Mech 10', notes: '(EEG 11a Blockwoche!)' },
        { kw: 29, von: '13.07.26', bis: '17.07.26', tage: 5, klassen: 'EL 10A, EBT 11B, EBT 12B, Mech 12', notes: '' },
        { kw: 30, von: '20.07.26', bis: '24.07.26', tage: 5, klassen: 'EL 10B, EBT 11A, EBT 12A, Mech 11', notes: '' },
        { kw: 31, von: '27.07.26', bis: '31.07.26', tage: 5, klassen: 'EL 10C, EI 10D, EEG 11B, Mech 10', notes: 'Letzter Schultag, (EEG 11b Blockwoche!)' }
    ],
    pdfFiles: [
        { name: 'Elektro Block I', path: 'plaene/2025_26_Ele_Block_I.pdf' },
        { name: 'Elektro Block II', path: 'plaene/2025_26_Ele_Block_II.pdf' },
        { name: 'Elektro Block III', path: 'plaene/2025_26_Ele_Block_III.pdf' },
        { name: 'Mechatroniker', path: 'plaene/2025_26_Ele_Block_Mech.pdf' },
        { name: 'Teilzeit (HWK)', path: 'plaene/2025_26_Ele_Block_TZ_HWK.pdf' }
    ],
    filterQuery: '',
    infoBoard: [
        { id: 1, user: 'Müller', text: 'Beamer im Raum 204 ist defekt.', time: 'Vor 2 Stunden' },
        { id: 2, user: 'Schmidt', text: 'Abteilungssitzung am Mittwoch um 13:00.', time: 'Vor 5 Stunden' }
    ],
    customWidgets: [],
    theme: 'light',
    activeTheme: 'blue',
    highContrast: false,
    gridBaseWidth: 300,
    widgetSizes: {},
    tickerSettings: {
        enabled: true,
        info: true,
        calendar: true,
        blockPlan: true,
        speed: 30,
        color: 'auto',
        fontSize: '0.85rem'
    },
    version: '2.2.0',
    personalData: JSON.parse(localStorage.getItem('bspa_personal_data')) || {
        name: 'Ricardo Leber', schuljahr: '2024/25', woche: '24. September 2024', schule: 'Staatliche Berufsschule I',
        dienstbezeichnung: 'StR', geburtsdatum: '01.01.1985', fachrichtung: 'Informationstechnik', zweitfach: 'Mathematik',
        privatanschrift: 'Musterstraße 1, 12345 Musterstadt', telefon: '0123/4567890', klassleitung: 'FI 11A (24 Schüler)', besonderheiten: 'Keine',
        max_std_tag: '8', max_tage_jahr: '38', stunden_summe: '24', max_wochen_jahr: '38',
        upz: '24', teilzeit_reduziert: '--', stundenreduzierung_grund: '--', azk_uebertrag: '0',
        azk_abbau: '--', unterricht_haltend: '24'
    },
    timetable: {}, 
    timetableEntries: [],
    timetablePause: [2, 2, 2, 2, 2], // 2 = Break after 2nd Hour, 3 = Break after 3rd Hour
    timetableColors: ['#1e88e5', '#43a047', '#fb8c00', '#e53935', '#8e24aa', '#3949ab', '#00acc1', '#c0ca33', '#795548', '#757575']
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initTheme();
    initGlobalSearch();
    loadFromLocalStorage();
    initVersionDisplay();
    renderView('dashboard');
    initWidgetModal();
    updateTicker();
    updateNotificationCount();
});

function initVersionDisplay() {
    const versionEl = document.getElementById('sidebar-version-text');
    if (versionEl) {
        versionEl.textContent = 'v' + state.version;
    }
}


// --- Search ---
function initGlobalSearch() {
    const searchInput = document.getElementById('global-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const value = e.target.value;
        state.filterQuery = value;
        
        if (state.currentView === 'blockplan') {
            renderBlockPlan(document.getElementById('view-container'));
        }
    });
}

// --- Navigation ---
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const menuToggle = document.getElementById('mobile-menu-toggle');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const view = item.getAttribute('data-view');
            renderView(view);
            
            // Close sidebar on mobile after clicking
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
            }
        });
    });

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.replace('#', '') || 'dashboard';
        switchView(hash);
    });
}

function switchView(view) {
    state.currentView = view;
    renderView(view);
}

// --- Rendering Views ---
function renderView(view) {
    state.currentView = view;
    const container = document.getElementById('view-container');
    if (!container) return;
    container.innerHTML = '';

    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(nav => {
        nav.classList.toggle('active', nav.getAttribute('data-view') === view);
    });

    switch (view) {
        case 'dashboard': renderDashboard(container); break;
        case 'gemeinsam': renderCommonArea(container); break;
        case 'privat': renderPrivateArea(container); break;
        case 'abteilung': renderDeptArea(container); break;
        case 'info': renderInfoArea(container); break;
        case 'jahresaufgaben': renderAnnualTasks(container); break;
        case 'blockplan': renderBlockPlan(container); break;
        case 'stundenplan': renderStundenplan(container); break;
        case 'settings': renderSettings(container); break;
        case 'ticker': renderTickerSetup(container); break;
        default:
            container.innerHTML = `<div class="p-4"><h2>${view}</h2><p>In Arbeit...</p></div>`;
    }
}

// --- Dashboard Logic ---
function renderDashboard(container) {
    const grid = document.createElement('div');
    grid.className = 'dashboard-grid';
    grid.id = 'dashboard-grid';

    state.activeWidgets.forEach(widgetId => {
        const widget = createWidget(widgetId);
        if (widget) grid.appendChild(widget);
    });

    container.appendChild(grid);
    initDragAndDrop();
}

function createWidget(id) {
    const size = state.widgetSizes[id] || { w: 1, h: 1 };
    const widget = document.createElement('div');
    widget.className = `widget w-span-${size.w} h-span-${size.h}`;
    widget.draggable = true;
    widget.dataset.id = id;

    let content = '';
    let title = '';
    let icon = '';

    switch (id) {
        case 'gemeinsam':
            title = 'Gemeinsame Checklist';
            icon = 'fa-users';
            content = renderChecklistUI(state.checklists.gemeinsam, 'gemeinsam');
            break;
        case 'privat':
            title = 'Meine Aufgaben';
            icon = 'fa-user-lock';
            content = renderChecklistUI(state.checklists.privat, 'privat');
            break;
        case 'abteilung':
            title = 'Neuaufnahme Schüler';
            icon = 'fa-microchip';
            content = renderChecklistUI(state.checklists.abteilung, 'abteilung');
            break;
        case 'info':
            title = 'Mitteilungen';
            icon = 'fa-bullhorn';
            content = state.infoBoard.slice(0, 3).map(msg => `
                <div style="font-size: 0.85rem; padding: 0.5rem 0; border-bottom: 1px solid var(--border-color); position: relative;">
                    <strong>${msg.user}:</strong> ${msg.text}
                    <div style="font-size: 0.7rem; opacity: 0.6;">${msg.time}</div>
                </div>
            `).join('');
            content += `<button class="btn btn-primary" style="margin-top: 10px; width: 100%; font-size: 0.8rem; justify-content: center;" onclick="switchView('info')">Alle anzeigen / Posten</button>`;
            break;
        case 'jahresaufgaben':
            title = 'Jahresbeginn';
            icon = 'fa-calendar-check';
            content = renderChecklistUI(state.checklists.jahresbeginn, 'jahresbeginn');
            break;
        case 'blockplan':
            title = 'Aktueller Block';
            icon = 'fa-table';
            content = `<p>KW ${state.blockPlan[0].kw}: ${state.blockPlan[0].klassen}</p>
                       <button class="btn btn-primary" style="margin-top: 10px; width: 100%" onclick="switchView('blockplan')">Details</button>`;
            break;
    }
    
    if (!title && id.startsWith('custom_')) {
        const custom = state.customWidgets.find(w => w.id === id);
        if (custom) {
            title = custom.title;
            icon = getIconForType(custom.type);
            content = renderCustomWidgetContent(custom);
        }
    }

    if (!title) return null;

    widget.innerHTML = `
        <div class="widget-header">
            <span class="widget-title"><i class="fas ${icon}"></i> ${title}</span>
            <div class="widget-controls">
                ${id.startsWith('custom_') ? `<i class="fas fa-trash-alt delete-widget" onclick="deleteCustomWidget('${id}')" title="Löschen"></i>` : ''}
                <div class="dropdown">
                    <i class="fas fa-ellipsis-v menu-trigger" onclick="toggleWidgetMenu(event, '${id}')"></i>
                    <div id="menu-${id}" class="dropdown-content">
                        <a href="javascript:void(0)" onclick="updateWidgetSpan('${id}', 'w', 1)">
                            <i class="fas fa-columns"></i> 1 Spalte breit
                            ${size.w === 1 ? '<i class="fas fa-check" style="margin-left:auto"></i>' : ''}
                        </a>
                        <a href="javascript:void(0)" onclick="updateWidgetSpan('${id}', 'w', 2)">
                            <i class="fas fa-columns"></i> 2 Spalten breit
                            ${size.w === 2 ? '<i class="fas fa-check" style="margin-left:auto"></i>' : ''}
                        </a>
                        <a href="javascript:void(0)" onclick="updateWidgetSpan('${id}', 'w', 3)">
                            <i class="fas fa-columns"></i> 3 Spalten breit
                            ${size.w === 3 ? '<i class="fas fa-check" style="margin-left:auto"></i>' : ''}
                        </a>
                        <div style="height:1px; background:var(--border-color); margin:5px 0;"></div>
                        <a href="javascript:void(0)" onclick="updateWidgetSpan('${id}', 'h', 1)">
                            <i class="fas fa-arrows-alt-v"></i> Normal hoch
                            ${size.h === 1 ? '<i class="fas fa-check" style="margin-left:auto"></i>' : ''}
                        </a>
                        <a href="javascript:void(0)" onclick="updateWidgetSpan('${id}', 'h', 2)">
                            <i class="fas fa-arrows-alt-v"></i> Doppelt hoch
                            ${size.h === 2 ? '<i class="fas fa-check" style="margin-left:auto"></i>' : ''}
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="widget-content">
            ${content}
        </div>
        <div class="resize-handle" onclick="cycleWidgetSize('${id}')"></div>
    `;

    return widget;
}

function getIconForType(type) {
    switch (type) {
        case 'text': return 'fa-align-left';
        case 'checklist': return 'fa-check-square';
        case 'calendar': return 'fa-calendar-alt';
        case 'import': return 'fa-file-import';
        default: return 'fa-cube';
    }
}

function renderCustomWidgetContent(widget) {
    switch (widget.type) {
        case 'text':
            return `<div class="editable-content" contenteditable="true" onblur="updateCustomWidgetContent('${widget.id}', this.innerText)">${widget.content || 'Text hier eingeben...'}</div>`;
        case 'checklist':
            const items = widget.content || [];
            return `
                ${renderChecklistUI(items, widget.id)}
                <div style="display: flex; gap: 5px; margin-top: 10px;">
                    <input type="text" id="input-${widget.id}" placeholder="Neu..." style="width: 100%; padding: 5px; border-radius: 4px; border: 1px solid var(--border-color); background: var(--bg-color); color: var(--text-color);">
                    <button class="btn btn-primary" style="padding: 5px 10px;" onclick="addChecklistItem('${widget.id}')"><i class="fas fa-plus"></i></button>
                </div>
            `;
        case 'calendar':
            const events = widget.content || [];
            // Sort events by date before rendering
            events.sort((a, b) => {
                const dateA = new Date(a.date.split('.').reverse().join('-'));
                const dateB = new Date(b.date.split('.').reverse().join('-'));
                return dateA - dateB;
            });

            const eventHtml = events.map((ev, i) => `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 5px 0; border-bottom: 1px solid var(--border-color); font-size: 0.85rem;">
                    <span><strong>${ev.date}:</strong> ${ev.text}</span>
                    <i class="fas fa-times" style="cursor: pointer; opacity: 0.5;" onclick="deleteCalendarEvent('${widget.id}', ${i})"></i>
                </div>
            `).join('');
            return `
                <div class="calendar-events" style="max-height: 150px; overflow-y: auto; margin-bottom: 10px;">
                    ${eventHtml || '<p style="text-align: center; opacity: 0.5; font-size: 0.8rem;">Keine Termine</p>'}
                </div>
                <div style="display: flex; flex-direction: column; gap: 5px;">
                    <input type="date" id="date-${widget.id}" style="width: 100%; padding: 5px; border-radius: 4px; border: 1px solid var(--border-color); background: var(--bg-color); color: var(--text-color); font-size: 0.8rem;">
                    <div style="display: flex; gap: 5px;">
                        <input type="text" id="text-${widget.id}" placeholder="Terminbeschreibung..." style="width: 100%; padding: 5px; border-radius: 4px; border: 1px solid var(--border-color); background: var(--bg-color); color: var(--text-color); font-size: 0.8rem;">
                        <button class="btn btn-primary" style="padding: 5px 10px;" onclick="addCalendarEvent('${widget.id}')"><i class="fas fa-plus"></i></button>
                    </div>
                </div>
            `;
        case 'import':
            return `
                <div class="import-section">
                    <p style="font-size: 0.8rem; margin-bottom: 5px;">Liste aus CSV/Text importieren:</p>
                    <textarea id="import-area-${widget.id}" placeholder="Item 1\nItem 2\n..." style="width: 100%; height: 60px; font-size: 0.8rem; background: var(--bg-color); color: var(--text-color); border: 1px solid var(--border-color); border-radius: 4px; padding: 5px;"></textarea>
                    <button class="btn btn-primary" style="width: 100%; margin-top: 5px; font-size: 0.8rem; justify-content: center;" onclick="importToList('${widget.id}')">Importieren</button>
                </div>
            `;
        default: return '<p>Widget-Typ unbekannt</p>';
    }
}

window.updateCustomWidgetContent = (id, text) => {
    const widget = state.customWidgets.find(w => w.id === id);
    if (widget) { widget.content = text; saveToLocalStorage(); }
};

window.addChecklistItem = (widgetId) => {
    const input = document.getElementById(`input-${widgetId}`);
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;
    const widget = state.customWidgets.find(w => w.id === widgetId);
    if (widget) {
        if (!widget.content) widget.content = [];
        widget.content.push({ id: Date.now().toString(), text, done: false });
        input.value = '';
        saveToLocalStorage();
        renderView('dashboard');
    }
};

window.importToList = (widgetId) => {
    const area = document.getElementById(`import-area-${widgetId}`);
    if (!area) return;
    const lines = area.value.split('\n').map(l => l.trim()).filter(l => l);
    if (lines.length === 0) return;
    const widget = state.customWidgets.find(w => w.id === widgetId);
    if (widget) {
        widget.type = 'checklist';
        widget.content = lines.map((line, i) => ({ id: `i-${Date.now()}-${i}`, text: line, done: false }));
        saveToLocalStorage();
        renderView('dashboard');
    }
};

window.deleteCustomWidget = (id) => {
    if (confirm('Dieses Widget wirklich löschen?')) {
        state.customWidgets = state.customWidgets.filter(w => w.id !== id);
        state.activeWidgets = state.activeWidgets.filter(w => w !== id);
        saveToLocalStorage();
        renderView('dashboard');
    }
};

window.addCalendarEvent = (widgetId) => {
    const dateInput = document.getElementById(`date-${widgetId}`);
    const textInput = document.getElementById(`text-${widgetId}`);
    const date = dateInput.value;
    const text = textInput.value.trim();
    
    if (!date || !text) return;
    
    const widget = state.customWidgets.find(w => w.id === widgetId);
    if (widget) {
        if (!widget.content) widget.content = [];
        
        // Convert to Dutch/German format string for UI
        const d = new Date(date);
        const formattedDate = d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
        
        widget.content.push({ date: formattedDate, text: text });
        
        dateInput.value = '';
        textInput.value = '';
        saveToLocalStorage();
        renderView('dashboard');
    }
};

window.deleteCalendarEvent = (widgetId, index) => {
    const widget = state.customWidgets.find(w => w.id === widgetId);
    if (widget && widget.content) {
        widget.content.splice(index, 1);
        saveToLocalStorage();
        renderView('dashboard');
    }
};

window.addInfoMessage = () => {
    const user = document.getElementById('info-user').value.trim() || 'Anonym';
    const text = document.getElementById('info-text').value.trim();
    if (!text) return;

    state.infoBoard.unshift({
        id: Date.now(),
        user: user,
        text: text,
        time: 'Gerade eben'
    });
    
    saveToLocalStorage();
    renderView('info');
    updateTicker();
    updateNotificationCount();
};

window.deleteInfoMessage = (id) => {
    if (confirm('Diese Mitteilung löschen?')) {
        state.infoBoard = state.infoBoard.filter(m => m.id !== id);
        saveToLocalStorage();
        renderView('info');
        updateTicker();
        updateNotificationCount();
    }
};

// --- Specific Area Renderers ---
function renderCommonArea(container) {
    container.innerHTML = `<h1>Gemeinsamer Bereich</h1><div class="widget" style="cursor: default">${renderChecklistUI(state.checklists.gemeinsam, 'gemeinsam', true)}</div>`;
}

function renderPrivateArea(container) {
    container.innerHTML = `<h1>Privater Bereich</h1><div class="dashboard-grid"><div class="widget" style="cursor: default"><div class="widget-title">Checkliste</div>${renderChecklistUI(state.checklists.privat, 'privat', true)}</div><div class="widget" style="cursor: default"><div class="widget-title">Klassen anlegen</div><div style="display: flex; gap: 10px; margin-top: 10px;"><input type="text" placeholder="Klassenname" class="search-box input" style="width: 100%; border: 1px solid var(--border-color); border-radius: 8px; padding: 5px;"><button class="btn btn-primary">Hinzufügen</button></div></div></div>`;
}

function renderDeptArea(container) {
    container.innerHTML = `<h1>Elektroabteilung Vorgaben</h1><div class="widget" style="cursor: default; max-width: 600px;"><h3>Protokoll: Neuer Schüler</h3>${renderChecklistUI(state.checklists.abteilung, 'abteilung', true)}</div>`;
}

function renderInfoArea(container) {
    const list = state.infoBoard.map(msg => `
        <div class="widget" style="cursor: default; margin-bottom: 1rem; position: relative;">
            <div style="display: flex; justify-content: space-between">
                <strong>${msg.user}</strong>
                <span style="opacity: 0.6; font-size: 0.8rem">${msg.time}</span>
            </div>
            <p style="margin-top: 10px; padding-right: 30px;">${msg.text}</p>
            <i class="fas fa-trash-alt" style="position: absolute; top: 1.5rem; right: 1.5rem; cursor: pointer; opacity: 0.3;" onclick="deleteInfoMessage(${msg.id})"></i>
        </div>
    `).join('');

    container.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
            <h1>Mitteilungsboard</h1>
        </div>
        
        <div class="widget" style="margin-bottom: 2rem;">
            <h3>Neue Mitteilung verfassen</h3>
            <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 15px;">
                <input type="text" id="info-user" placeholder="Ihr Name (optional)" style="padding: 10px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-color); color: var(--text-color);">
                <textarea id="info-text" placeholder="Was gibt es Neues?..." style="padding: 10px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-color); color: var(--text-color); min-height: 80px;"></textarea>
                <button class="btn btn-primary" style="justify-content: center;" onclick="addInfoMessage()">Mitteilung posten</button>
            </div>
        </div>
        
        <div id="info-messages-list">
            ${list || '<p style="text-align: center; opacity: 0.5;">Noch keine Mitteilungen vorhanden.</p>'}
        </div>
    `;
}

function renderAnnualTasks(container) {
    container.innerHTML = `<h1>Jahresaufgaben</h1><div class="dashboard-grid"><div class="widget" style="cursor: default"><h3>Vorbereitung Jahresbeginn</h3>${renderChecklistUI(state.checklists.jahresbeginn, 'jahresbeginn', true)}</div><div class="widget" style="cursor: default"><h3>Abschluss Jahresende</h3>${renderChecklistUI(state.checklists.jahresende, 'jahresende', true)}</div></div>`;
}

function renderBlockPlan(container) {
    const query = state.filterQuery.toLowerCase();
    const rows = state.blockPlan.map((row, index) => {
        const matches = row.klassen.toLowerCase().includes(query) || 
                       row.notes.toLowerCase().includes(query) || 
                       row.kw.toString().includes(query);
        
        if (!matches) return '';

        const classBadges = row.klassen.split(',').map(cls => {
            const cleanCls = cls.trim();
            const isMech = cleanCls.toLowerCase().includes('mech');
            return `<span class="${isMech ? 'badge-mech' : 'badge-class'}">${cleanCls}</span>`;
        }).join(' ');

        return `
            <tr>
                <td style="font-weight: 600;">KW ${row.kw}</td>
                <td>${row.von} - ${row.bis}</td>
                <td style="text-align: center;">${row.tage}</td>
                <td>${classBadges}</td>
                <td>
                    <div class="editable-field" contenteditable="true" onblur="updateNote(${index}, this.innerText)">
                        ${row.notes}
                    </div>
                </td>
            </tr>
        `;
    }).join('');

    container.innerHTML = `
        <div class="view-header">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h1>Blockpläne Elektrotechnik 2025/26</h1>
                <button class="btn btn-primary" onclick="alert('Google Calendar Sync')">
                    <i class="fab fa-google"></i> Kalender-Sync
                </button>
            </div>
            
            <div class="filter-section" style="background: var(--card-bg); padding: 1.5rem; border-radius: 16px; border: 1px solid var(--border-color); margin-bottom: 20px;">
                <div class="search-box" style="width: 300px;">
                    <i class="fas fa-filter"></i>
                    <input type="text" placeholder="Klasse oder KW filtern..." value="${state.filterQuery}" oninput="filterBlockPlan(this.value)">
                </div>
            </div>
        </div>
        
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>KW</th>
                        <th>Datum</th>
                        <th>Tage</th>
                        <th>Belegung</th>
                        <th>Bemerkungen</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
        </div>
    `;
}

window.filterBlockPlan = (value) => { state.filterQuery = value; renderBlockPlan(document.getElementById('view-container')); };

// --- Ticker & Notifications ---
function updateTicker() {
    const tickerContainer = document.getElementById('ticker-container');
    const tickerContent = document.getElementById('ticker-content');
    if (!tickerContainer || !tickerContent) return;

    // Toggle Visibility
    tickerContainer.classList.toggle('hidden', !state.tickerSettings.enabled);
    if (!state.tickerSettings.enabled) return;

    let segments = [];
    if (state.tickerSettings.info) state.infoBoard.forEach(msg => segments.push(`📢 ${msg.user}: ${msg.text}`));
    if (state.tickerSettings.calendar) {
        state.customWidgets.filter(w => w.type === 'calendar').forEach(w => {
            (w.content || []).forEach(ev => segments.push(`📅 ${ev.date}: ${ev.text}`));
        });
    }
    if (state.tickerSettings.blockPlan && state.blockPlan && state.blockPlan.length > 0) {
        const current = state.blockPlan[0];
        segments.push(`🏫 Aktueller Block: ${current.klassen} (KW ${current.kw})`);
    }

    const fullText = segments.join(' +++ ') || 'Willkommen beim BSPA Elektro Planungstool';
    tickerContent.innerText = fullText + ' +++ ' + fullText;
    
    // Apply Settings via CSS Variables
    document.documentElement.style.setProperty('--ticker-speed', `${state.tickerSettings.speed}s`);
    document.documentElement.style.setProperty('--ticker-font-size', state.tickerSettings.fontSize);
    
    let color = state.tickerSettings.color === 'auto' ? 'var(--primary-color)' : state.tickerSettings.color;
    document.documentElement.style.setProperty('--ticker-color', color);
}

function updateNotificationCount() {
    const badge = document.getElementById('notif-count');
    if (!badge) return;
    
    const count = (state.infoBoard || []).length; 
    badge.innerText = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
}

function renderTickerSetup(container) {
    container.innerHTML = `
        <h1>Ticker-Einstellungen</h1>
        
        <div class="settings-grid">
            <!-- Basic Toggle -->
            <div class="widget" style="cursor: default">
                <h3>Allgemein</h3>
                <div class="contrast-toggle">
                    <label class="switch">
                        <input type="checkbox" ${state.tickerSettings.enabled ? 'checked' : ''} onchange="updateTickerValue('enabled', this.checked)">
                        <span class="slider round"></span>
                    </label>
                    <span style="font-weight: 600;">Ticker anzeigen</span>
                </div>
            </div>

            <!-- Content Sources -->
            <div class="widget" style="cursor: default">
                <h3>Inhalt / Quellen</h3>
                <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px;">
                    <label style="display: flex; gap: 10px; align-items: center; cursor: pointer;">
                        <input type="checkbox" ${state.tickerSettings.info ? 'checked' : ''} onchange="updateTickerValue('info', this.checked)"> Mitteilungen
                    </label>
                    <label style="display: flex; gap: 10px; align-items: center; cursor: pointer;">
                        <input type="checkbox" ${state.tickerSettings.calendar ? 'checked' : ''} onchange="updateTickerValue('calendar', this.checked)"> Kalender-Termine
                    </label>
                    <label style="display: flex; gap: 10px; align-items: center; cursor: pointer;">
                        <input type="checkbox" ${state.tickerSettings.blockPlan ? 'checked' : ''} onchange="updateTickerValue('blockPlan', this.checked)"> Blockplan-Infos
                    </label>
                </div>
            </div>

            <!-- Appearance -->
            <div class="widget" style="cursor: default">
                <h3>Geschwindigkeit & Größe</h3>
                <div style="margin-top: 10px;">
                    <label style="font-size: 0.8rem; opacity: 0.7;">Geschwindigkeit (niedriger = schneller)</label>
                    <input type="range" min="5" max="100" value="${state.tickerSettings.speed}" 
                           oninput="updateTickerValue('speed', this.value)" style="width: 100%; margin: 10px 0;">
                    
                    <label style="font-size: 0.8rem; opacity: 0.7; display: block; margin-top: 15px;">Schriftgröße</label>
                    <select onchange="updateTickerValue('fontSize', this.value)" class="btn-theme-select" style="width: 100%; margin-top: 5px;">
                        <option value="0.7rem" ${state.tickerSettings.fontSize === '0.7rem' ? 'selected' : ''}>Sehr Klein</option>
                        <option value="0.85rem" ${state.tickerSettings.fontSize === '0.85rem' ? 'selected' : ''}>Normal</option>
                        <option value="1.1rem" ${state.tickerSettings.fontSize === '1.1rem' ? 'selected' : ''}>Groß</option>
                    </select>
                </div>
            </div>

            <!-- Colors -->
            <div class="widget" style="cursor: default">
                <h3>Farbe</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;">
                    <div class="theme-dot ${state.tickerSettings.color === 'auto' ? 'active' : ''}" style="background: var(--primary-color)" onclick="updateTickerValue('color', 'auto')" title="Systemfarbe"></div>
                    <div class="theme-dot ${state.tickerSettings.color === '#ef4444' ? 'active' : ''}" style="background: #ef4444" onclick="updateTickerValue('color', '#ef4444')" title="Rot"></div>
                    <div class="theme-dot ${state.tickerSettings.color === '#f59e0b' ? 'active' : ''}" style="background: #f59e0b" onclick="updateTickerValue('color', '#f59e0b')" title="Warn-Gelb"></div>
                    <div class="theme-dot ${state.tickerSettings.color === '#10b981' ? 'active' : ''}" style="background: #10b981" onclick="updateTickerValue('color', '#10b981')" title="Grün"></div>
                    <div class="theme-dot ${state.tickerSettings.color === '#ffffff' ? 'active' : ''}" style="background: #ffffff; border: 1px solid #ddd" onclick="updateTickerValue('color', '#ffffff')" title="Weiß"></div>
                </div>
                <p style="font-size: 0.75rem; opacity: 0.6; margin-top: 15px;">Wählen Sie eine Signalfarbe für den Ticker.</p>
            </div>
        </div>
        
        <button class="btn btn-primary" style="margin-top: 20px; width: 100%; justify-content: center;" onclick="switchView('dashboard')">
            <i class="fas fa-check"></i> Fertig & Zurück zum Dashboard
        </button>
    `;
}

window.updateTickerValue = (prop, val) => {
    state.tickerSettings[prop] = (prop === 'speed') ? parseInt(val) : val;
    saveToLocalStorage();
    updateTicker();
    if (state.currentView === 'ticker') renderTickerSetup(document.getElementById('view-container'));
};

function renderSettings(container) {
    const themes = [
        { id: 'blue', color: '#007aff', name: 'Blau' },
        { id: 'green', color: '#10b981', name: 'Grün' },
        { id: 'orange', color: '#f59e0b', name: 'Orange' },
        { id: 'purple', color: '#8b5cf6', name: 'Lila' },
        { id: 'red', color: '#ef4444', name: 'Rot' }
    ];

    const themeDots = themes.map(t => `
        <div class="theme-dot ${state.activeTheme === t.id ? 'active' : ''}" 
             style="background-color: ${t.color}" 
             title="${t.name}"
             onclick="setAccentTheme('${t.id}')">
        </div>
    `).join('');

    container.innerHTML = `
        <h1>Einstellungen & UI</h1>
        
        <div class="settings-grid">
            <div class="widget" style="cursor: default">
                <h3>Farbschema (Akzentfarbe)</h3>
                <p style="font-size: 0.85rem; opacity: 0.7; margin: 8px 0;">Wählen Sie Ihre bevorzugte Primärfarbe für das Interface.</p>
                <div class="theme-selector-group">
                    ${themeDots}
                </div>
            </div>

            <div class="widget" style="cursor: default">
                <h3>Raster-Skalierung</h3>
                <p style="font-size: 0.85rem; opacity: 0.7; margin: 8px 0;">Bestimmen Sie, wie schmal oder breit das Grundraster sein soll.</p>
                <div style="display: flex; align-items: center; gap: 15px; margin-top: 10px;">
                    <i class="fas fa-th-large" style="font-size: 0.8rem"></i>
                    <input type="range" min="200" max="500" step="10" value="${state.gridBaseWidth}" 
                           oninput="updateGridScale(this.value)" style="flex: 1;">
                    <i class="fas fa-th" style="font-size: 1.2rem"></i>
                </div>
                <div id="grid-width-label" style="text-align: center; margin-top: 5px; font-size: 0.8rem; font-weight: 600;">
                    ${state.gridBaseWidth}px Basisbreite
                </div>
            </div>

            <div class="widget" style="cursor: default">
                <h3>Darstellungs-Modus</h3>
                <div style="display: flex; gap: 10px; margin-top: 15px;">
                    <button class="btn-theme-select ${state.theme === 'light' ? 'active' : ''}" onclick="toggleMainTheme('light')">
                        <i class="fas fa-sun"></i> Hell
                    </button>
                    <button class="btn-theme-select ${state.theme === 'dark' ? 'active' : ''}" onclick="toggleMainTheme('dark')">
                        <i class="fas fa-moon"></i> Dunkel
                    </button>
                </div>
            </div>

            <div class="widget" style="cursor: default">
                <h3>Barrierefreiheit</h3>
                <div class="contrast-toggle">
                    <label class="switch">
                        <input type="checkbox" ${state.highContrast ? 'checked' : ''} onchange="toggleContrast(this.checked)">
                        <span class="slider round"></span>
                    </label>
                    <span style="font-weight: 600;">Hoher Kontrast</span>
                </div>
                <p style="font-size: 0.8rem; opacity: 0.6; margin-top: 10px;">Stellt Texte und Ränder deutlicher dar (Schwarz/Weiß/Gelb).</p>
            </div>

            <div class="widget" style="cursor: default">
                <h3>Daten-Sicherung</h3>
                <p style="font-size: 0.85rem; margin-bottom: 15px;">Laden Sie Ihre aktuellen Daten als Sicherungsdatei herunter oder stellen Sie diese wieder her.</p>
                <div style="display: flex; gap: 10px;">
                    <button class="btn btn-primary" onclick="exportData()" style="font-size: 0.8rem;">
                        <i class="fas fa-download"></i> Export
                    </button>
                    <button class="btn btn-primary" onclick="document.getElementById('import-file').click()" style="font-size: 0.8rem;">
                        <i class="fas fa-upload"></i> Import
                    </button>
                    <input type="file" id="import-file" style="display: none" onchange="importData(this)">
                </div>
            </div>
        </div>
    `;
}

window.setAccentTheme = (themeId) => {
    state.activeTheme = themeId;
    applyUITheme();
    saveToLocalStorage();
    renderView('settings');
};

window.toggleMainTheme = (mode) => {
    state.theme = mode;
    applyUITheme();
    saveToLocalStorage();
    renderView('settings');
};

window.toggleContrast = (bool) => {
    state.highContrast = bool;
    applyUITheme();
    saveToLocalStorage();
};

window.updateGridScale = (val) => {
    state.gridBaseWidth = parseInt(val);
    applyUITheme();
    saveToLocalStorage();
    const label = document.getElementById('grid-width-label');
    if (label) label.innerText = `${val}px Basisbreite`;
};

/**
 * UI & Theme Updates
 * Handles light/dark mode, accent colors, and grid scaling
 */
function applyUITheme() {
    const body = document.body;
    
    // Keep internal classes but clean up theme-specific ones
    const classesToRemove = Array.from(body.classList).filter(cls => 
        cls.endsWith('-theme') || 
        cls.startsWith('theme-') || 
        cls === 'high-contrast'
    );
    classesToRemove.forEach(cls => body.classList.remove(cls));
    
    // Apply selected theme modes
    body.classList.add(`${state.theme}-theme`);
    body.classList.add(`theme-${state.activeTheme}`);
    if (state.highContrast) body.classList.add('high-contrast');

    // Sync theme icon in sidebar
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.innerHTML = state.theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }

    // Apply CSS variables for grid and ticker
    document.documentElement.style.setProperty('--grid-base-width', `${state.gridBaseWidth}px`);
    
    // Update visuals that depend on theme
    updateTicker();
    updateNotificationCount();
}

window.exportData = () => {
    const data = JSON.stringify(state, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bspa_planung_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
};

window.importData = (input) => {
    const file = input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            Object.assign(state, data);
            saveToLocalStorage();
            window.location.reload();
        } catch (err) {
            alert('Fehler beim Importieren der Datei.');
        }
    };
    reader.readAsText(file);
};

// --- Helpers & UI Logic ---
function renderChecklistUI(items, category, full = false) {
    const listHtml = (items || []).map(item => `
        <li class="checklist-item ${item.done ? 'done' : ''}" onclick="toggleCheck('${category}', '${item.id}')">
            <input type="checkbox" ${item.done ? 'checked' : ''}>
            <span>${item.text}</span>
        </li>
    `).join('');
    return `<ul class="checklist">${listHtml}</ul>`;
}

window.toggleCheck = (category, id) => {
    const item = (state.checklists[category] || []).find(i => i.id === id);
    if (item) {
        item.done = !item.done;
    } else {
        for (const widget of state.customWidgets) {
            if (widget.id === category && Array.isArray(widget.content)) {
                const cItem = widget.content.find(i => i.id === id);
                if (cItem) { cItem.done = !cItem.done; break; }
            }
        }
    }
    saveToLocalStorage();
    renderView(state.currentView);
};

window.updateNote = (index, value) => { state.blockPlan[index].notes = value; saveToLocalStorage(); };

// --- Theme Logic ---
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.onclick = () => {
            state.theme = state.theme === 'dark' ? 'light' : 'dark';
            applyUITheme();
            saveToLocalStorage();
            if (state.currentView === 'settings') renderView('settings');
        };
    }
    applyUITheme();
}

// --- Drag & Drop & Resize ---
function initDragAndDrop() {
    const grid = document.getElementById('dashboard-grid');
    if (!grid) return;

    let dragItem = null;

    grid.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('resize-handle')) {
            e.preventDefault();
            return;
        }
        if (e.target.classList.contains('widget')) {
            dragItem = e.target;
            e.target.classList.add('dragging');
        }
    });

    grid.addEventListener('dragend', (e) => {
        if (e.target.classList.contains('widget')) {
            e.target.classList.remove('dragging');
            state.activeWidgets = Array.from(grid.querySelectorAll('.widget')).map(w => w.dataset.id);
            saveToLocalStorage();
        }
    });

    grid.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(grid, e.clientX, e.clientY);
        if (afterElement == null) grid.appendChild(dragItem);
        else grid.insertBefore(dragItem, afterElement);
    });

    // --- Drag Resize Logic ---
    let isResizing = false;
    let currentResizer = null;

    grid.onmousedown = (e) => {
        if (e.target.classList.contains('resize-handle')) {
            e.stopPropagation();
            isResizing = true;
            currentResizer = e.target.parentElement;
            currentResizer.classList.add('resizing');
            
            const startX = e.clientX;
            const startY = e.clientY;
            const startW = currentResizer.offsetWidth;
            const startH = currentResizer.offsetHeight;
            
            const onMouseMove = (moveEvent) => {
                if (!isResizing) return;
                
                const gridW = state.gridBaseWidth + 24; // width + gap (approx)
                const gridH = 220; // rough row height
                
                const newW = Math.max(1, Math.round((startW + (moveEvent.clientX - startX)) / gridW));
                const newH = Math.max(1, Math.round((startH + (moveEvent.clientY - startY)) / gridH));
                
                const clampedW = Math.min(3, newW);
                const clampedH = Math.min(4, newH);
                
                currentResizer.style.gridColumn = `span ${clampedW}`;
                currentResizer.style.gridRow = `span ${clampedH}`;
            };

            const onMouseUp = () => {
                if (isResizing) {
                    const id = currentResizer.dataset.id;
                    const finalW = parseInt(currentResizer.style.gridColumn.split(' ')[1]);
                    const finalH = parseInt(currentResizer.style.gridRow.split(' ')[1]);
                    
                    if (!state.widgetSizes[id]) state.widgetSizes[id] = { w: 1, h: 1 };
                    state.widgetSizes[id].w = finalW;
                    state.widgetSizes[id].h = finalH;
                    
                    saveToLocalStorage();
                    isResizing = false;
                    currentResizer.classList.remove('resizing');
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                    renderView('dashboard');
                }
            };
            
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        }
    };
}

function getDragAfterElement(container, x, y) {
    const draggableElements = [...container.querySelectorAll('.widget:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const centerX = box.left + box.width / 2;
        const centerY = box.top + box.height / 2;
        
        // Calculate distance in 2D
        const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
        
        // If we are to the left or top of the element center
        if (distance < closest.distance) {
            return { distance: distance, element: child };
        }
        return closest;
    }, { distance: Number.POSITIVE_INFINITY }).element;
}

// --- Widget Modal ---
function initWidgetModal() {
    const modal = document.getElementById('widget-modal');
    const btn = document.getElementById('add-widget-btn');
    const span = document.querySelector('.close-modal');
    if (!modal || !btn || !span) return;

    btn.onclick = () => { renderWidgetOptions(); modal.style.display = 'block'; resetModal(); };
    span.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; };

    document.querySelectorAll('.tab-btn').forEach(tab => {
        tab.onclick = () => {
            document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const target = tab.dataset.tab;
            document.querySelectorAll('.tab-content').forEach(content => { content.classList.toggle('active', content.id === `${target}-widget-view`); });
        };
    });

    const form = document.getElementById('widget-form');
    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            const name = document.getElementById('widget-name').value;
            const typeInput = form.querySelector('input[name="widget-type"]:checked');
            const type = typeInput ? typeInput.value : 'text';
            const newWidget = { 
            id: 'custom_' + Date.now(), 
            title: name, 
            type: type, 
            content: (type === 'checklist' || type === 'calendar') ? [] : (type === 'text' ? '' : null) 
        };
            state.customWidgets.push(newWidget);
            state.activeWidgets.push(newWidget.id);
            saveToLocalStorage();
            renderView('dashboard');
            modal.style.display = 'none';
        };
    }
}

function resetModal() {
    const tabs = document.querySelectorAll('.tab-btn');
    if (tabs.length) tabs[0].click();
    const form = document.getElementById('widget-form');
    if (form) form.reset();
}

function renderWidgetOptions() {
    const list = document.getElementById('widget-options-list');
    const builtInWidgets = [
        { id: 'gemeinsam', name: 'Gemeinsame Checklist' }, { id: 'privat', name: 'Meine Aufgaben' },
        { id: 'abteilung', name: 'Neuaufnahme Schüler' }, { id: 'info', name: 'Mitteilungen' },
        { id: 'jahresaufgaben', name: 'Jahresbeginn' }, { id: 'blockplaene', name: 'Aktueller Block' }
    ];
    const allOptions = [...builtInWidgets, ...state.customWidgets.map(w => ({ id: w.id, name: w.title }))];
    if (list) {
        list.innerHTML = allOptions.map(opt => `<div class="widget-option-item"><span>${opt.name}</span><input type="checkbox" ${state.activeWidgets.includes(opt.id) ? 'checked' : ''} onchange="toggleWidget('${opt.id}')"></div>`).join('');
    }
}

window.toggleWidget = (id) => {
    if (state.activeWidgets.includes(id)) state.activeWidgets = state.activeWidgets.filter(w => w !== id);
    else state.activeWidgets.push(id);
    saveToLocalStorage(); renderView('dashboard');
};

// --- Storage ---
function saveToLocalStorage() { localStorage.setItem('bspa_state', JSON.stringify(state)); }
function loadFromLocalStorage() {
    const saved = localStorage.getItem('bspa_state');
    if (saved) {
        const parsed = JSON.parse(saved);
        // Important: Merge but prioritize the hardcoded blockPlan structure if the saved one seems truncated
        if (parsed.blockPlan && parsed.blockPlan.length >= state.blockPlan.length) {
            state.blockPlan = parsed.blockPlan;
        } else if (parsed.blockPlan) {
            // Restore notes from saved data to our hardcoded list
            parsed.blockPlan.forEach((savedRow, i) => {
                if (state.blockPlan[i]) state.blockPlan[i].notes = savedRow.notes;
            });
        }
        
        if (parsed.customWidgets) state.customWidgets = parsed.customWidgets;
        if (parsed.activeWidgets) state.activeWidgets = parsed.activeWidgets;
        if (parsed.theme) state.theme = parsed.theme;
        if (parsed.activeTheme) state.activeTheme = parsed.activeTheme;
        if (parsed.highContrast !== undefined) state.highContrast = parsed.highContrast;
        if (parsed.widgetSizes) state.widgetSizes = parsed.widgetSizes;
        
        if (parsed.tickerSettings) {
            state.tickerSettings = { ...state.tickerSettings, ...parsed.tickerSettings };
        }
        
        if (parsed.timetable) state.timetable = parsed.timetable;
        if (parsed.timetableEntries) state.timetableEntries = parsed.timetableEntries;
        if (parsed.timetablePause) state.timetablePause = parsed.timetablePause;
        if (parsed.personalData) state.personalData = { ...state.personalData, ...parsed.personalData };
        
        applyUITheme();
    }
}

// --- Widget Context Menu Logic ---
window.toggleWidgetMenu = (event, id) => {
    event.stopPropagation();
    // Close all other menus first
    document.querySelectorAll('.dropdown-content').forEach(menu => {
        if (menu.id !== `menu-${id}`) menu.classList.remove('show');
    });
    document.getElementById(`menu-${id}`).classList.toggle('show');
};

// Close menus when clicking outside
window.addEventListener('click', () => {
    document.querySelectorAll('.dropdown-content').forEach(menu => menu.classList.remove('show'));
});

window.updateWidgetSpan = (id, prop, val) => {
    if (!state.widgetSizes[id]) state.widgetSizes[id] = { w: 1, h: 1 };
    state.widgetSizes[id][prop] = val;
    saveToLocalStorage();
    renderView('dashboard');
};

window.cycleWidgetSize = (id) => {
    if (!state.widgetSizes[id]) state.widgetSizes[id] = { w: 1, h: 1 };
    const size = state.widgetSizes[id];
    
    // Cycle logic: 1x1 -> 2x1 -> 3x1 -> 1x2 -> 2x2 -> 1x1
    if (size.w === 1 && size.h === 1) size.w = 2;
    else if (size.w === 2 && size.h === 1) size.w = 3;
    else if (size.w === 3 && size.h === 1) { size.w = 1; size.h = 2; }
    else if (size.w === 1 && size.h === 2) size.w = 2;
    else { size.w = 1; size.h = 1; }
    
    saveToLocalStorage();
    renderView('dashboard');
};
window.renderStundenplan = renderStundenplan;
window.exportToWord = exportToWord;
window.showAddTimetableEntryModal = showAddTimetableEntryModal;
window.selectColor = selectColor;
window.handleSidebarDragStart = handleSidebarDragStart;
window.handleGridDragStart = handleGridDragStart;


function renderStundenplan(container) {
    if (!container) return;

    container.innerHTML = `
        <div class="stundenplan-container">
            <div class="stundenplan-sidebar">
                <div class="sidebar-header-sm">
                    <h3>Einträge</h3>
                    <button class="btn btn-primary btn-sm" onclick="showAddTimetableEntryModal()">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <div class="entry-list" id="sidebar-entry-list">
                    <!-- Entries will be here -->
                </div>
                <div class="stundenplan-actions">
                    <button class="btn btn-secondary" onclick="exportToWord()">
                        <i class="fas fa-file-word"></i> Word Export
                    </button>
                    <button class="btn btn-outline" onclick="showPersonalFilesModal()">
                        <i class="fas fa-user-edit"></i> Persönliche Dateien
                    </button>
                </div>
            </div>
            <div class="stundenplan-main">
                <div class="stundenplan-grid-header">
                    <div class="grid-header-cell">Zeit</div>
                    ${['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'].map((day, i) => `
                        <div class="grid-header-cell">
                            ${day}
                            <div class="pause-selector">
                                <span>Pause:</span>
                                <label title="Pause nach 2. Stunde"><input type="radio" name="pause_${i}" value="2" ${state.timetablePause[i] === 2 ? 'checked' : ''} onchange="updatePause(${i}, 2)"> 2.</label>
                                <label title="Pause nach 3. Stunde"><input type="radio" name="pause_${i}" value="3" ${state.timetablePause[i] === 3 ? 'checked' : ''} onchange="updatePause(${i}, 3)"> 3.</label>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="stundenplan-grid-body" id="timetable-grid-body">
                    <!-- Grid rows will be here -->
                </div>
            </div>
        </div>
    `;

    renderSidebarEntries();
    renderTimetableGrid();
    initGlobalTimetableDragAndDrop();
}

function renderSidebarEntries() {
    const list = document.getElementById('sidebar-entry-list');
    if (!list) return;

    list.innerHTML = state.timetableEntries.map(entry => `
        <div class="entry-item-sidebar" 
             draggable="true" 
             data-id="${entry.id}" 
             ondragstart="handleSidebarDragStart(event, '${entry.id}')">
            <div style="display: flex; align-items: center;">
                <div class="entry-color-indicator" style="background-color: ${entry.color}"></div>
                <span>${entry.klasse} - ${entry.fach}</span>
            </div>
            <div class="entry-controls-sidebar">
                <i class="fas fa-edit" onclick="showAddTimetableEntryModal('${entry.id}')" title="Bearbeiten"></i>
                <i class="fas fa-trash-alt" onclick="deleteSidebarEntry('${entry.id}')" title="Löschen"></i>
                <i class="fas fa-grip-vertical"></i>
            </div>
        </div>
    `).join('');
}

window.deleteSidebarEntry = (id) => {
    if (confirm('Diesen Eintrag wirklich aus der Liste löschen?')) {
        state.timetableEntries = state.timetableEntries.filter(e => e.id !== id);
        // Also remove from grid
        Object.keys(state.timetable).forEach(key => {
            if (state.timetable[key] === id) delete state.timetable[key];
        });
        saveToLocalStorage();
        renderStundenplan(document.getElementById('view-container'));
    }
};

const timeSlots = [
    { start: '07:55', end: '08:40', num: 1 },
    { start: '08:40', end: '09:25', num: 2 },
    { start: '09:45', end: '10:30', num: 3 },
    { start: '10:30', end: '11:15', num: 4 },
    { start: '11:15', end: '12:00', num: 5 },
    { start: '12:00', end: '12:45', num: 6 },
    { start: '12:45', end: '13:30', num: 7 },
    { start: '13:30', end: '14:15', num: 8 },
    { start: '14:15', end: '15:00', num: 9 },
    { start: '15:00', end: '15:45', num: 10 }
];

function renderTimetableGrid() {
    const gridBody = document.getElementById('timetable-grid-body');
    if (!gridBody) return;

    gridBody.innerHTML = Array.from({ length: 10 }, (_, hourIndex) => {
        return `
            <div class="grid-row">
                <div class="grid-time-cell multi-time">
                    <span class="hour-num">${hourIndex + 1}</span>
                </div>
                ${[0, 1, 2, 3, 4].map(dayIndex => {
                    const time = getTimeForCell(dayIndex, hourIndex);
                    return `
                        <div class="grid-cell" 
                             data-day="${dayIndex}" 
                             data-hour="${hourIndex}"
                             id="cell_${dayIndex}_${hourIndex}">
                             <div class="cell-time-small">${time.start}-${time.end}</div>
                             ${renderGridEntry(dayIndex, hourIndex)}
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }).join('');
    
    initGridDragAndDrop();
}

window.updatePause = (dayIndex, pauseAfter) => {
    state.timetablePause[dayIndex] = pauseAfter;
    saveToLocalStorage();
    renderTimetableGrid();
};

function getTimeForCell(dayIndex, hourIndex) {
    const pauseAfter = state.timetablePause[dayIndex] || 2;
    const h = hourIndex + 1;
    
    if (h === 1) return { start: '07:55', end: '08:40' };
    if (h === 2) return { start: '08:40', end: '09:25' };
    
    if (pauseAfter === 2) {
        // Break after 2nd (09:25 - 09:45)
        if (h === 3) return { start: '09:45', end: '10:30' };
        if (h === 4) return { start: '10:30', end: '11:15' };
    } else {
        // Break after 3rd (10:10 - 10:30)
        if (h === 3) return { start: '09:25', end: '10:10' };
        if (h === 4) return { start: '10:30', end: '11:15' };
    }
    
    // Default times for 5-10
    const defaults = [
        null, null, null, null,
        { start: '11:15', end: '12:00' },
        { start: '12:00', end: '12:45' },
        { start: '12:45', end: '13:30' },
        { start: '13:30', end: '14:15' },
        { start: '14:15', end: '15:00' },
        { start: '15:00', end: '15:45' }
    ];
    return defaults[hourIndex];
}


// --- Drag and Drop Logic ---

function handleSidebarDragStart(e, entryId) {
    e.dataTransfer.setData('type', 'sidebar');
    e.dataTransfer.setData('entryId', entryId);
}

function handleGridDragStart(e, key, entryId) {
    e.dataTransfer.setData('type', 'grid');
    e.dataTransfer.setData('sourceKey', key);
    e.dataTransfer.setData('entryId', entryId);
}

function renderGridEntry(day, hour) {
    const key = `${day}_${hour}`;
    const entryId = state.timetable[key];
    if (!entryId) return '';

    const entry = state.timetableEntries.find(e => e.id === entryId);
    if (!entry) return '';

    return `
        <div class="timetable-entry" 
             draggable="true"
             style="background-color: ${entry.color}"
             ondragstart="handleGridDragStart(event, '${key}', '${entry.id}')"
             ondblclick="handleGridEntryDblClick(event, '${key}')"
             title="Doppelklick zum Löschen">
            <div class="entry-klasse">${entry.klasse}</div>
            <div class="entry-fach">${entry.isSplit ? '1/2 ' : ''}${entry.fach}${entry.isSplit ? `<br><span style="font-size:0.65rem; font-weight:700;">${entry.partnerName}</span>` : ''}</div>
            <div class="entry-zimmer">${entry.zimmer}${entry.isSplit ? `<br><span style="font-size:0.65rem;">${entry.partnerRoom}</span>` : ''}</div>
        </div>
    `;
}

window.handleGridEntryDblClick = (e, key) => {
    delete state.timetable[key];
    saveToLocalStorage();
    renderTimetableGrid();
};



function initGridDragAndDrop() {
    const cells = document.querySelectorAll('.grid-cell');
    cells.forEach(cell => {
        cell.addEventListener('dragover', (e) => {
            e.preventDefault();
            cell.classList.add('drag-over');
        });

        cell.addEventListener('dragleave', () => {
            cell.classList.remove('drag-over');
        });

        cell.addEventListener('drop', (e) => {
            e.preventDefault();
            cell.classList.remove('drag-over');
            
            const targetCell = e.target.closest('.grid-cell');
            if (!targetCell) return;

            const type = e.dataTransfer.getData('type');
            const entryId = e.dataTransfer.getData('entryId');
            const day = targetCell.getAttribute('data-day');
            const hour = targetCell.getAttribute('data-hour');
            const targetKey = `${day}_${hour}`;

            if (type === 'grid') {
                const sourceKey = e.dataTransfer.getData('sourceKey');
                if (sourceKey === targetKey) return;
                delete state.timetable[sourceKey];
            }

            state.timetable[targetKey] = entryId;
            saveToLocalStorage();
            renderTimetableGrid();
        });
    });
}

function initGlobalTimetableDragAndDrop() {
    const deleteZone = document.getElementById('delete-zone');
    if (deleteZone) {
        deleteZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            deleteZone.style.transform = 'scale(1.2)';
            deleteZone.classList.add('drag-active');
        });

        deleteZone.addEventListener('dragleave', () => {
            deleteZone.style.transform = 'scale(1)';
            deleteZone.classList.remove('drag-active');
        });

        deleteZone.addEventListener('drop', (e) => {
            e.preventDefault();
            deleteZone.style.transform = 'scale(1)';
            deleteZone.classList.remove('drag-active');
            
            const type = e.dataTransfer.getData('type');
            if (type === 'grid') {
                const sourceKey = e.dataTransfer.getData('sourceKey');
                delete state.timetable[sourceKey];
                saveToLocalStorage();
                renderTimetableGrid();
            }
        });
    }
}

// --- Modal for Adding Entries ---

function showAddTimetableEntryModal(editId = null) {
    // We'll reuse the existing modal structure but with different content
    const modal = document.getElementById('widget-modal');
    const title = document.getElementById('modal-title');
    const body = document.querySelector('.modal-body');
    const tabs = document.getElementById('modal-view-toggle');

    const entryToEdit = editId ? state.timetableEntries.find(e => e.id === editId) : null;

    title.innerText = entryToEdit ? 'Eintrag bearbeiten' : 'Stundenplan-Eintrag erstellen';
    tabs.style.display = 'none'; // Hide tabs
    
    body.innerHTML = `
        <form id="timetable-entry-form" class="timetable-modal">
            <div class="form-group">
                <label>Klasse</label>
                <input type="text" id="entry-klasse" placeholder="z.B. EEG 11A" value="${entryToEdit ? entryToEdit.klasse : ''}" required>
            </div>
            <div class="form-group">
                <label>Fach</label>
                <input type="text" id="entry-fach" placeholder="z.B. Anlagentechnik" value="${entryToEdit ? entryToEdit.fach : ''}" required>
            </div>
            <div class="form-group">
                <label>Zimmer</label>
                <input type="text" id="entry-zimmer" placeholder="z.B. O205" value="${entryToEdit ? entryToEdit.zimmer || '' : ''}">
            </div>
            
            <div class="form-group" style="flex-direction: row; align-items: center; gap: 10px; margin-top: 5px;">
                <input type="checkbox" id="entry-is-split" ${entryToEdit && entryToEdit.isSplit ? 'checked' : ''} style="width: auto;">
                <label for="entry-is-split" style="margin: 0; cursor: pointer;">Geteilte Stunde?</label>
            </div>

            <div id="split-fields" style="display: ${entryToEdit && entryToEdit.isSplit ? 'block' : 'none'}; background: rgba(0,0,0,0.1); padding: 10px; border-radius: 8px; margin-bottom: 15px;">
                <div class="form-group">
                    <label>Partner (4 Buchstaben)</label>
                    <input type="text" id="entry-partner-name" maxlength="4" placeholder="z.B. StJo" value="${entryToEdit ? entryToEdit.partnerName || '' : ''}">
                </div>
                <div class="form-group">
                    <label>Partner-Raum</label>
                    <input type="text" id="entry-partner-room" placeholder="z.B. E302" value="${entryToEdit ? entryToEdit.partnerRoom || '' : ''}">
                </div>
            </div>

            <div class="form-group">
                <label>Farbe</label>
                <div class="color-picker-grid" id="color-picker">
                    ${state.timetableColors.map((color, i) => `
                        <div class="color-option ${(entryToEdit ? entryToEdit.color === color : i === 0) ? 'active' : ''}" 
                             style="background-color: ${color}" 
                             data-color="${color}"
                             onclick="selectColor(this)">
                        </div>
                    `).join('')}
                </div>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; margin-top: 1rem;">
                ${entryToEdit ? 'Aktualisieren' : 'Speichern'}
            </button>
        </form>
    `;

    modal.style.display = 'block';

    const splitCheckbox = document.getElementById('entry-is-split');
    const splitFields = document.getElementById('split-fields');
    splitCheckbox.addEventListener('change', () => {
        splitFields.style.display = splitCheckbox.checked ? 'block' : 'none';
    });

    document.getElementById('timetable-entry-form').onsubmit = (e) => {
        e.preventDefault();
        const activeColor = document.querySelector('.color-option.active').getAttribute('data-color');
        const isSplit = document.getElementById('entry-is-split').checked;
        
        const entryData = {
            klasse: document.getElementById('entry-klasse').value,
            fach: document.getElementById('entry-fach').value,
            zimmer: document.getElementById('entry-zimmer').value,
            color: activeColor,
            isSplit: isSplit,
            partnerName: isSplit ? document.getElementById('entry-partner-name').value : '',
            partnerRoom: isSplit ? document.getElementById('entry-partner-room').value : ''
        };

        if (entryToEdit) {
            Object.assign(entryToEdit, entryData);
        } else {
            const newEntry = {
                id: 'te_' + Date.now(),
                ...entryData
            };
            state.timetableEntries.push(newEntry);
        }
        
        saveToLocalStorage();
        renderStundenplan(document.getElementById('view-container'));
        modal.style.display = 'none';
        // Reset modal state for future use
        tabs.style.display = 'flex';
    };
}

window.showPersonalFilesModal = showPersonalFilesModal;

function showPersonalFilesModal() {
    const modal = document.getElementById('widget-modal');
    const title = document.getElementById('modal-title');
    const body = document.querySelector('.modal-body');
    const tabs = document.getElementById('modal-view-toggle');

    title.innerText = 'Persönliche Dateien / Vorlage Kopf';
    tabs.style.display = 'none';
    
    body.innerHTML = `
        <form id="personal-data-form" class="timetable-modal" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; max-height: 70vh; overflow-y: auto; padding: 1rem;">
            <div style="grid-column: span 2; font-weight: bold; border-bottom: 1px solid var(--border-color); margin-bottom: 0.5rem;">Allgemeine Informationen</div>
            <div class="form-group">
                <label>Lehrkraft Name</label>
                <input type="text" id="pd-name" value="${state.personalData.name || ''}" placeholder="z.B. Ricardo Leber">
            </div>
            <div class="form-group">
                <label>Dienstbezeichnung</label>
                <input type="text" id="pd-dienst" value="${state.personalData.dienstbezeichnung || ''}" placeholder="z.B. StR">
            </div>
            <div class="form-group">
                <label>Geburtsdatum</label>
                <input type="text" id="pd-geburt" value="${state.personalData.geburtsdatum || ''}" placeholder="z.B. 24.10.84">
            </div>
            <div class="form-group">
                <label>Schuljahr</label>
                <input type="text" id="pd-schuljahr" value="${state.personalData.schuljahr || ''}" placeholder="z.B. 2024/25">
            </div>
            <div class="form-group">
                <label>Gültig ab (Datum)</label>
                <input type="text" id="pd-woche" value="${state.personalData.woche || ''}" placeholder="z.B. 24. September 2024">
            </div>
            <div class="form-group">
                <label>Schule</label>
                <input type="text" id="pd-schule" value="${state.personalData.schule || ''}" placeholder="z.B. Karl-Peter-Obermaier-Schule">
            </div>

            <div style="grid-column: span 2; font-weight: bold; border-bottom: 1px solid var(--border-color); margin-top: 1rem; margin-bottom: 0.5rem;">Anschrift & Fachrichtung</div>
            <div class="form-group" style="grid-column: span 2;">
                <label>Berufliche Fachrichtung</label>
                <input type="text" id="pd-fachrichtung" value="${state.personalData.fachrichtung || ''}">
            </div>
            <div class="form-group" style="grid-column: span 2;">
                <label>Zweitfach / Zusatzprüfung</label>
                <input type="text" id="pd-zweitfach" value="${state.personalData.zweitfach || ''}">
            </div>
            <div class="form-group" style="grid-column: span 2;">
                <label>Privatanschrift</label>
                <input type="text" id="pd-anschrift" value="${state.personalData.privatanschrift || ''}">
            </div>
            <div class="form-group">
                <label>Telefon</label>
                <input type="text" id="pd-telefon" value="${state.personalData.telefon || ''}">
            </div>

            <div style="grid-column: span 2; font-weight: bold; border-bottom: 1px solid var(--border-color); margin-top: 1rem; margin-bottom: 0.5rem;">Unterricht & Klassleitung</div>
            <div class="form-group" style="grid-column: span 2;">
                <label>Klassleitungen & Schülerzahl</label>
                <textarea id="pd-klassleitung" style="width:100%; min-height:60px; padding:0.75rem; background:var(--bg-secondary); border:1px solid var(--border-color); border-radius:var(--radius-md); color:var(--text-primary); font-family:inherit;">${state.personalData.klassleitung || ''}</textarea>
            </div>
            <div class="form-group" style="grid-column: span 2;">
                <label>Besonderheiten</label>
                <textarea id="pd-besonderheiten" style="width:100%; min-height:60px; padding:0.75rem; background:var(--bg-secondary); border:1px solid var(--border-color); border-radius:var(--radius-md); color:var(--text-primary); font-family:inherit;">${state.personalData.besonderheiten || ''}</textarea>
            </div>

            <div class="form-group">
                <label>Max. Std / Tag</label>
                <input type="text" id="pd-max-std-tag" value="${state.personalData.max_std_tag || ''}">
            </div>
            <div class="form-group">
                <label>an ... Unterrichtstagen (Jahr)</label>
                <input type="text" id="pd-max-tage-jahr" value="${state.personalData.max_tage_jahr || ''}">
            </div>
            <div class="form-group">
                <label>Max. Std / Woche</label>
                <input type="text" id="pd-stunden" value="${state.personalData.stunden_summe || ''}">
            </div>
            <div class="form-group">
                <label>in ... Wochen (Jahr)</label>
                <input type="text" id="pd-max-wochen-jahr" value="${state.personalData.max_wochen_jahr || ''}">
            </div>

            <div style="grid-column: span 2; font-weight: bold; border-bottom: 1px solid var(--border-color); margin-top: 1rem; margin-bottom: 0.5rem;">Pflichtstundenmaß & AZK</div>
            <div class="form-group">
                <label>UPZ (Pflichtstunden)</label>
                <input type="text" id="pd-upz" value="${state.personalData.upz || ''}">
            </div>
            <div class="form-group">
                <label>Reduziert auf</label>
                <input type="text" id="pd-teilzeit-reduziert" value="${state.personalData.teilzeit_reduziert || ''}">
            </div>
            <div class="form-group" style="grid-column: span 2;">
                <label>Grund für Reduzierung</label>
                <input type="text" id="pd-stundenreduzierung-grund" value="${state.personalData.stundenreduzierung_grund || ''}">
            </div>
            <div class="form-group">
                <label>AZK Übertrag</label>
                <input type="text" id="pd-azk-uebertrag" value="${state.personalData.azk_uebertrag || ''}">
            </div>
            <div class="form-group">
                <label>Geplanter Abbau AZK</label>
                <input type="text" id="pd-azk-abbau" value="${state.personalData.azk_abbau || ''}">
            </div>
            <div class="form-group" style="grid-column: span 2;">
                <label>zu haltender Unterricht</label>
                <input type="text" id="pd-unterricht-haltend" value="${state.personalData.unterricht_haltend || ''}">
            </div>

            <button type="submit" class="btn btn-primary" style="grid-column: span 2; justify-content: center; margin-top: 1rem;">
                Speichern
            </button>
        </form>
    `;

    modal.style.display = 'block';

    document.getElementById('personal-data-form').onsubmit = (e) => {
        e.preventDefault();
        state.personalData.name = document.getElementById('pd-name').value;
        state.personalData.dienstbezeichnung = document.getElementById('pd-dienst').value;
        state.personalData.geburtsdatum = document.getElementById('pd-geburt').value;
        state.personalData.schuljahr = document.getElementById('pd-schuljahr').value;
        state.personalData.woche = document.getElementById('pd-woche').value;
        state.personalData.schule = document.getElementById('pd-schule').value;
        state.personalData.fachrichtung = document.getElementById('pd-fachrichtung').value;
        state.personalData.zweitfach = document.getElementById('pd-zweitfach').value;
        state.personalData.privatanschrift = document.getElementById('pd-anschrift').value;
        state.personalData.telefon = document.getElementById('pd-telefon').value;
        state.personalData.klassleitung = document.getElementById('pd-klassleitung').value;
        state.personalData.besonderheiten = document.getElementById('pd-besonderheiten').value;
        state.personalData.max_std_tag = document.getElementById('pd-max-std-tag').value;
        state.personalData.max_tage_jahr = document.getElementById('pd-max-tage-jahr').value;
        state.personalData.stunden_summe = document.getElementById('pd-stunden').value;
        state.personalData.max_wochen_jahr = document.getElementById('pd-max-wochen-jahr').value;
        state.personalData.upz = document.getElementById('pd-upz').value;
        state.personalData.teilzeit_reduziert = document.getElementById('pd-teilzeit-reduziert').value;
        state.personalData.stundenreduzierung_grund = document.getElementById('pd-stundenreduzierung-grund').value;
        state.personalData.azk_uebertrag = document.getElementById('pd-azk-uebertrag').value;
        state.personalData.azk_abbau = document.getElementById('pd-azk-abbau').value;
        state.personalData.unterricht_haltend = document.getElementById('pd-unterricht-haltend').value;
        
        saveToLocalStorage();
        modal.style.display = 'none';
        tabs.style.display = 'flex';
        renderStundenplan(document.getElementById('view-container'));
    };
}

function selectColor(el) {
    document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('active'));
    el.classList.add('active');
}

// --- Export Logic ---

async function exportToWord() {
    try {
        if (typeof PizZip === 'undefined') {
            alert("Die Export-Bibliothek (PizZip) konnte nicht geladen werden. Bitte stellen Sie sicher, dass Sie eine Internetverbindung haben oder laden Sie die Seite neu.");
            return;
        }
        console.log("Starting export with bulletproof fallback...");

        function base64ToBuffer(base) {
            const binary = window.atob(base);
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
            return bytes.buffer;
        }

        let content;
        try {
            const response = await fetch('plaene/StundenplanLeer.docx');
            if (!response.ok) throw new Error("Fetch failed");
            content = await response.arrayBuffer();
        } catch (e) {
            console.warn("Fetch failed, using embedded template", e);
            content = base64ToBuffer(TEMPLATE_BASE64);
        }
        
        const zip = new PizZip(content);
        
        // Load the document.xml
        let docXml = zip.file("word/document.xml").asText();
        
        // Create a mapping of placeholders we'll use
        // We will look for cell markers or just replace based on grid positions if possible.
        // Actually, since I know the XML structure from previous research, 
        // I can target the cells in the second table.
        
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(docXml, "text/xml");
        const tables = xmlDoc.getElementsByTagName("w:tbl");
        const headerTable = tables[0];
        const mainTable = tables[1]; // The timetable table
        
        // --- Fill Header / Personal Data ---
        if (headerTable) {
            const hRows = headerTable.getElementsByTagName("w:tr");
            
            // Typical layout in Table 0:
            // Labels in Row 1, Values in Row 2 (Name, Dienst, Geburtstag)
            // Labels in Row 3, Values in Row 4 (Fachrichtung, Zweitfach)
            // Labels in Row 5, Values in Row 6 (Anschrift, Telefon)
            
            const fillBelowLabel = (searchPattern, value) => {
                for (let r = 0; r < hRows.length; r++) {
                    const hCells = hRows[r].getElementsByTagName("w:tc");
                    for (let c = 0; c < hCells.length; c++) {
                        const cellText = hCells[c].textContent || "";
                        if (cellText.includes(searchPattern)) {
                            // Found label. Fill cell directly below if it exists.
                            if (r + 1 < hRows.length) {
                                const targetRow = hRows[r+1];
                                const targetCells = targetRow.getElementsByTagName("w:tc");
                                // Tables often use gridSpan. We should aim for correct visual col.
                                // But usually indices match up if they aren't too crazy.
                                if (targetCells[c]) updateCellText(targetCells[c], value);
                                return true;
                            }
                        }
                    }
                }
                return false;
            };

            // Custom fill for special Schuljahr/valid from Row 0
            if (hRows[0]) {
                const r0c = hRows[0].getElementsByTagName("w:tc");
                for (let c = 0; c < r0c.length; c++) {
                    const text = r0c[c].textContent || "";
                    if (text.includes("im Schuljahr")) {
                        if (r0c[c+1]) updateCellText(r0c[c+1], state.personalData.schuljahr);
                    }
                    if (text.includes("gültig ab")) {
                        // The template has a complex FIELD in r0c[c+1], but we can try to fill it.
                        if (r0c[c+1]) updateCellText(r0c[c+1], state.personalData.woche);
                    }
                }
            }

            fillBelowLabel("Vorname Name", state.personalData.name);
            fillBelowLabel("Dienstbezeichnung", state.personalData.dienstbezeichnung);
            fillBelowLabel("Geburtsdatum", state.personalData.geburtsdatum);
            fillBelowLabel("Berufliche Fachrichtung", state.personalData.fachrichtung);
            fillBelowLabel("Zweitfach", state.personalData.zweitfach);
            fillBelowLabel("Privatanschrift", state.personalData.privatanschrift);
            fillBelowLabel("Telefon", state.personalData.telefon);
            
            // --- Fill Table 2 (Klassleitung / Max Std) ---
            const table2 = tables[2];
            if (table2) {
                const t2Rows = table2.getElementsByTagName("w:tr");
                const t2Text = table2.textContent || "";
                
                // Table 2 content is dense. We'll search and replace symbols or use fixed positions if Row 0.
                if (t2Rows[0]) {
                    const cells = t2Rows[0].getElementsByTagName("w:tc");
                    if (cells[0]) updateCellText(cells[0], "Klassenleitungen: " + state.personalData.klassleitung);
                    if (cells[1]) updateCellText(cells[1], "Besonderheiten: " + state.personalData.besonderheiten);
                    if (cells[2]) {
                        let rowText = `Maximale Unterrichtsstunden pro Tag ___ ${state.personalData.max_std_tag} ___ an ___ ${state.personalData.max_tage_jahr} ___ Unterrichtstagen im Jahr\n` +
                                     `Maximale Unterrichtsstunden pro Woche ___ ${state.personalData.stunden_summe} ___ in ___ ${state.personalData.max_wochen_jahr} ___ Wochen im Jahr`;
                        updateCellText(cells[2], rowText);
                    }
                }
            }

            // --- Fill Table 3 (Pflichtstundenmaß / Summary) ---
            const table3 = tables[3];
            if (table3) {
                const t3Rows = table3.getElementsByTagName("w:tr");
                if (t3Rows[0]) {
                    const c = t3Rows[0].getElementsByTagName("w:tc");
                    if (c[1]) updateCellText(c[1], state.personalData.upz);
                }
                if (t3Rows[1]) {
                    const c = t3Rows[1].getElementsByTagName("w:tc");
                    if (c[1]) updateCellText(c[1], state.personalData.teilzeit_reduziert);
                }
                if (t3Rows[2]) {
                    const c = t3Rows[2].getElementsByTagName("w:tc");
                    if (c[1]) updateCellText(c[1], state.personalData.stundenreduzierung_grund);
                }
                if (t3Rows[4]) {
                    const c = t3Rows[4].getElementsByTagName("w:tc");
                    if (c[1]) updateCellText(c[1], state.personalData.azk_uebertrag);
                }
                if (t3Rows[5]) {
                    const c = t3Rows[5].getElementsByTagName("w:tc");
                    if (c[1]) updateCellText(c[1], state.personalData.azk_abbau);
                }
                if (t3Rows[6]) {
                    const c = t3Rows[6].getElementsByTagName("w:tc");
                    if (c[1]) updateCellText(c[1], state.personalData.unterricht_haltend);
                }
            }
        }

        if (!mainTable) throw new Error("Could not find timetable table in document.");
        
        const rows = mainTable.getElementsByTagName("w:tr");
        
        for (let hourIdx = 0; hourIdx < 10; hourIdx++) {
            const rowIdx = hourIdx + 2;
            const row = rows[rowIdx];
            if (!row) continue;
            
            const cells = row.getElementsByTagName("w:tc");
            
            for (let dayIdx = 0; dayIdx < 5; dayIdx++) {
                const entryId = state.timetable[`${dayIdx}_${hourIdx}`];

                if (!entryId) continue;
                
                const entry = state.timetableEntries.find(e => e.id === entryId);
                if (!entry) continue;
                
                const baseIdx = 2 + (dayIdx * 3);
                
                if (entry.isSplit) {
                    updateCellText(cells[baseIdx], "1/2 " + entry.fach, entry.partnerName);
                    updateCellText(cells[baseIdx+1], entry.klasse);
                    updateCellText(cells[baseIdx+2], entry.zimmer + "/", entry.partnerRoom);
                } else {
                    updateCellText(cells[baseIdx], entry.fach);
                    updateCellText(cells[baseIdx+1], entry.klasse);
                    updateCellText(cells[baseIdx+2], entry.zimmer);
                }

                // Try to set color
                setCellColor(cells[baseIdx], entry.color);
                setCellColor(cells[baseIdx+1], entry.color);
                setCellColor(cells[baseIdx+2], entry.color);
            }
        }
        
        // Serialize back
        const serializer = new XMLSerializer();
        const newXml = serializer.serializeToString(xmlDoc);
        zip.file("word/document.xml", newXml);
        
        const out = zip.generate({
            type: "blob",
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        
        saveAs(out, "Mein_Stundenplan.docx");
        console.log("Export complete!");
        
    } catch (error) {
        console.error("Export failed:", error);
        alert("Export fehlgeschlagen: " + error.message);
    }
}

function updateCellText(cell, text, secondLine = "") {
    if (!cell) return;
    const paragraphs = cell.getElementsByTagName("w:p");
    if (paragraphs.length === 0) return;
    
    // We update the first paragraph
    const p = paragraphs[0];
    
    // Remove all existing runs
    const runs = p.getElementsByTagName("w:r");
    while (runs.length > 0) {
        p.removeChild(runs[0]);
    }
    
    const ns = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
    
    // Create new run
    const r = p.ownerDocument.createElementNS(ns, "w:r");
    
    // Add first line
    const t1 = p.ownerDocument.createElementNS(ns, "w:t");
    t1.textContent = text || "";
    r.appendChild(t1);
    
    // Add second line if provided
    if (secondLine) {
        const br = p.ownerDocument.createElementNS(ns, "w:br");
        r.appendChild(br);
        const t2 = p.ownerDocument.createElementNS(ns, "w:t");
        t2.textContent = secondLine;
        r.appendChild(t2);
    }
    
    p.appendChild(r);
}

function setCellColor(cell, hexColor) {
    if (!cell) return;
    let tcPr = cell.getElementsByTagName("w:tcPr")[0];
    if (!tcPr) {
        tcPr = cell.ownerDocument.createElementNS("http://schemas.openxmlformats.org/wordprocessingml/2006/main", "w:tcPr");
        cell.insertBefore(tcPr, cell.firstChild);
    }
    
    let shd = tcPr.getElementsByTagName("w:shd")[0];
    if (!shd) {
        shd = cell.ownerDocument.createElementNS("http://schemas.openxmlformats.org/wordprocessingml/2006/main", "w:shd");
        tcPr.appendChild(shd);
    }
    
    shd.setAttribute("w:val", "clear");
    shd.setAttribute("w:fill", hexColor.replace('#', ''));
    
    // Crucial fix: Remove theme attributes that would override our manual color
    shd.removeAttribute("w:themeFill");
    shd.removeAttribute("w:themeColor");
    shd.removeAttribute("w:themeFillTint");
    shd.removeAttribute("w:themeFillShade");
}
