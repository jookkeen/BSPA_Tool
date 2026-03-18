/**
 * BSPA Elektro Planungs-Tool Logic
 */

// --- Configuration & State ---
const state = {
    currentView: 'dashboard',
    activeWidgets: ['gemeinsam', 'privat', 'abteilung', 'info', 'jahresaufgaben', 'blockplaene'],
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
        { kw: 44, von: '27.10.25', bis: '31.10.25', tage: 5, klassen: 'EL 10 C, EI 10 D, EBT 13, Mech 10', notes: '' },
        { kw: 45, von: '03.11.25', bis: '07.11.25', tage: 0, klassen: '--- FERIEN ---', notes: 'Allerheiligenferien' },
        { kw: 46, von: '10.11.25', bis: '14.11.25', tage: 5, klassen: 'EL 10 A, EBT 11 A, EBT 12 A, Mech 12', notes: '' },
        { kw: 47, von: '17.11.25', bis: '21.11.25', tage: 4, klassen: 'EL 10 B, EBT 11 B, EBT 12 B', notes: '19.11. Buß- u. Bettag' },
        { kw: 2, von: '05.01.26', bis: '09.01.26', tage: 3, klassen: '--- FEIERTAG ---, Mech 10', notes: '06.01. Hl. Drei Könige' },
        { kw: 3, von: '12.01.26', bis: '16.01.26', tage: 5, klassen: 'EL 10A, EBT 11A, EBT 12B, Mech 12', notes: '' },
        { kw: 4, von: '19.01.26', bis: '23.01.26', tage: 5, klassen: 'EL 10B, EBT 11B, EBT 12A, Mech 10', notes: '' },
        { kw: 5, von: '26.01.26', bis: '30.01.26', tage: 5, klassen: 'EL 10C, EI 10D, EEG 11A, Mech 11', notes: '' },
        { kw: 6, von: '02.02.26', bis: '06.02.26', tage: 5, klassen: 'EL 10A, EBT 11A, EBT 12B, Mech 12', notes: '' },
        { kw: 7, von: '09.02.26', bis: '13.02.26', tage: 5, klassen: 'EL 10B, EBT 11B, EBT 12A, Mech 10', notes: '' },
        { kw: 8, von: '16.02.26', bis: '20.02.26', tage: 0, klassen: '--- FERIEN ---', notes: 'Frühjahrsferien' },
        { kw: 9, von: '23.02.26', bis: '27.02.26', tage: 5, klassen: 'EL 10C, EI 10D, EEG 11B, Mech 11', notes: '' },
        { kw: 10, von: '02.03.26', bis: '06.03.26', tage: 5, klassen: 'EL 10A, EBT 11A, EBT 12B, Mech 12', notes: '' },
        { kw: 11, von: '09.03.26', bis: '13.03.26', tage: 5, klassen: 'EL 10B, EBT 11B, EBT 12A, Mech 11', notes: '' },
        { kw: 12, von: '16.03.26', bis: '20.03.26', tage: 5, klassen: 'EL 10C, EI 10D, EEG 11A, Mech 10', notes: 'IHK-Prüfung Teil 1' },
        { kw: 13, von: '23.03.26', bis: '27.03.26', tage: 5, klassen: 'EL 10A, EBT 11A, EBT 12B, Mech 12', notes: '' },
        { kw: 14, von: '30.03.26', bis: '03.04.26', tage: 0, klassen: '--- FERIEN ---', notes: 'Osterferien' },
        { kw: 15, von: '06.04.26', bis: '10.04.26', tage: 0, klassen: '--- FERIEN ---', notes: 'Osterferien' },
        { kw: 16, von: '13.04.26', bis: '17.04.26', tage: 5, klassen: 'EL 10B, EBT 11B, EBT 12A, Mech 12', notes: '' },
        { kw: 17, von: '20.04.26', bis: '24.04.26', tage: 5, klassen: 'EL 10C, EI 10D, EEG 11B, Mech 10', notes: '' },
        { kw: 18, von: '27.04.26', bis: '01.05.26', tage: 4, klassen: 'EL 10A, EBT 11A, EBT 12A, Mech 12', notes: '01.05. Tag der Arbeit' },
        { kw: 19, von: '04.05.26', bis: '08.05.26', tage: 5, klassen: 'EL 10B, EBT 11B, Mech 11', notes: 'IHK-Prüfung Teil 2' },
        { kw: 20, von: '11.05.26', bis: '15.05.26', tage: 3, klassen: 'EL 10C, EI 10D, EEG 11A, Mech 10', notes: '14.05./15.05. Feier/Brückentag' },
        { kw: 21, von: '18.05.26', bis: '22.05.26', tage: 5, klassen: 'EL 10A, EBT 11A, EBT 12B, Mech 11', notes: '' },
        { kw: 22, von: '25.05.26', bis: '29.05.26', tage: 0, klassen: '--- FERIEN ---', notes: 'Pfingstferien' },
        { kw: 23, von: '01.06.26', bis: '05.06.26', tage: 0, klassen: '--- FERIEN ---', notes: 'Pfingstferien' },
        { kw: 24, von: '08.06.26', bis: '12.06.26', tage: 5, klassen: 'EL 10B, EBT 11B, EBT 12A, Mech 11', notes: '' },
        { kw: 25, von: '15.06.26', bis: '19.06.26', tage: 5, klassen: 'EL 10C, EI 10D, EEG 11B, Mech 10', notes: '' },
        { kw: 26, von: '22.06.26', bis: '26.06.26', tage: 5, klassen: 'EL 10A, EBT 11A, EBT 12B, Mech 12', notes: '' },
        { kw: 27, von: '29.06.26', bis: '03.07.26', tage: 5, klassen: 'EL 10B, EBT 11B, EBT 12A, Mech 11', notes: '' },
        { kw: 28, von: '06.07.26', bis: '10.07.26', tage: 5, klassen: 'EL 10C, EI 10D, EEG 11A, Mech 10', notes: '' },
        { kw: 29, von: '13.07.26', bis: '17.07.26', tage: 5, klassen: 'EL 10A, EBT 11B, EBT 12B, Mech 12', notes: '' },
        { kw: 30, von: '20.07.26', bis: '24.07.26', tage: 5, klassen: 'EL 10B, EBT 11A, EBT 12A, Mech 11', notes: '' },
        { kw: 31, von: '27.07.26', bis: '31.07.26', tage: 5, klassen: 'EL 10C, EI 10D, EEG 11B, Mech 10', notes: 'Letzter Schultag' }
    ],
    pdfFiles: [
        { name: 'Elektro Block I', path: 'pläne/2025_26_Ele_Block_I.pdf' },
        { name: 'Elektro Block II', path: 'pläne/2025_26_Ele_Block_II.pdf' },
        { name: 'Elektro Block III', path: 'pläne/2025_26_Ele_Block_III.pdf' },
        { name: 'Mechatroniker', path: 'pläne/2025_26_Ele_Block_Mech.pdf' },
        { name: 'Teilzeit (HWK)', path: 'pläne/2025_26_Ele_Block_TZ_HWK.pdf' }
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
    }
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initTheme();
    initGlobalSearch();
    loadFromLocalStorage();
    renderView('dashboard');
    initWidgetModal();
    updateTicker();
    updateNotificationCount();
});

// --- Search ---
function initGlobalSearch() {
    const searchInput = document.getElementById('global-search');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const value = e.target.value;
        state.filterQuery = value;
        
        if (state.currentView === 'blockplaene') {
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
            switchView(view);
            
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
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.getAttribute('data-view') === view);
    });
    renderView(view);
}

// --- Rendering Views ---
function renderView(view) {
    const container = document.getElementById('view-container');
    if (!container) return;
    container.innerHTML = '';

    switch (view) {
        case 'dashboard': renderDashboard(container); break;
        case 'gemeinsam': renderCommonArea(container); break;
        case 'privat': renderPrivateArea(container); break;
        case 'abteilung': renderDeptArea(container); break;
        case 'info': renderInfoArea(container); break;
        case 'jahresaufgaben': renderAnnualTasks(container); break;
        case 'blockplaene': renderBlockPlan(container); break;
        case 'settings': renderSettings(container); break;
        case 'ticker': renderTickerSetup(container); break;
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
        case 'blockplaene':
            title = 'Aktueller Block';
            icon = 'fa-table';
            content = `<p>KW ${state.blockPlan[0].kw}: ${state.blockPlan[0].klassen}</p>
                       <button class="btn btn-primary" style="margin-top: 10px; width: 100%" onclick="switchView('blockplaene')">Details</button>`;
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
