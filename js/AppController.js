/* ==========================================================================
   APP CONTROLLER
   ========================================================================== */
class AppController {
    constructor() {
        this.currentMode = 'GATEKEEPER'; // or 'COACH'
        this.currentLocale = 'en';

        // DOM Elements
        this.titleInput = document.getElementById('story-title');
        this.contentInput = document.getElementById('story-content');
        this.modeToggle = document.getElementById('mode-toggle-input');

        // Engines
        this.ironGuard = new IronGuard(this.currentLocale);
        this.cognitiveCoach = new CognitiveCoach(this.currentLocale);

        this.init();
    }

    init() {
        this.bindEvents();
        this.loadState(); // Restore previous session
        this.updateModeUI();
    }

    loadState() {
        const saved = sessionStorage.getItem('iron_gatekeeper_v3');
        if (saved) {
            try {
                const state = JSON.parse(saved);
                if (state.title) this.titleInput.value = state.title;
                if (state.content) this.contentInput.value = state.content;
                if (state.mode) {
                    this.currentMode = state.mode;
                    this.modeToggle.checked = (state.mode === 'COACH');
                }
                if (state.locale) {
                    this.currentLocale = state.locale;
                    const langSel = document.getElementById('lang-select');
                    if (langSel) langSel.value = state.locale;

                    // Update engines
                    this.ironGuard.setLocale(this.currentLocale);
                    this.cognitiveCoach.setLocale(this.currentLocale);
                }
            } catch (e) {
                console.error("Failed to load state", e);
            }
        }

        // Load History
        const savedHistory = sessionStorage.getItem('iron_gatekeeper_history');
        if (savedHistory) {
            try {
                this.history = JSON.parse(savedHistory);
            } catch (e) { this.history = []; }
        } else {
            this.history = [];
        }
    }

    saveState() {
        const state = {
            title: this.titleInput.value,
            content: this.contentInput.value,
            mode: this.currentMode,
            locale: this.currentLocale
        };
        sessionStorage.setItem('iron_gatekeeper_v3', JSON.stringify(state));
    }

    // --- HISTORY FEATURE ---
    pushHistory() {
        const snapshot = {
            title: this.titleInput.value,
            content: this.contentInput.value,
            mode: this.currentMode,
            locale: this.currentLocale,
            timestamp: Date.now()
        };

        // Prevent duplicates (simple check)
        if (this.history.length > 0) {
            const last = this.history[this.history.length - 1];
            if (last.title === snapshot.title && last.content === snapshot.content) return;
        }

        this.history.push(snapshot);
        if (this.history.length > 5) this.history.shift(); // Keep last 5
        sessionStorage.setItem('iron_gatekeeper_history', JSON.stringify(this.history));
    }

    popHistory() {
        if (this.history.length === 0) return;

        const snapshot = this.history.pop();
        sessionStorage.setItem('iron_gatekeeper_history', JSON.stringify(this.history));

        this.restoreSnapshot(snapshot);
    }

    restoreSnapshot(snapshot) {
        this.titleInput.value = snapshot.title || '';
        this.contentInput.value = snapshot.content || '';
        this.currentMode = snapshot.mode || 'GATEKEEPER';
        this.currentLocale = snapshot.locale || 'en';

        this.modeToggle.checked = (this.currentMode === 'COACH');
        const langSel = document.getElementById('lang-select');
        if (langSel) langSel.value = this.currentLocale;

        this.ironGuard.setLocale(this.currentLocale);
        this.cognitiveCoach.setLocale(this.currentLocale);

        this.updateModeUI();
        this.saveState(); // Update current storage
    }

    bindEvents() {
        // Mode Toggle
        this.modeToggle.addEventListener('change', (e) => {
            this.pushHistory(); // Save before mode switch
            this.currentMode = e.target.checked ? 'COACH' : 'GATEKEEPER';
            this.updateModeUI();
            this.saveState();
        });

        document.getElementById('analyze-btn').addEventListener('click', () => this.runAnalysis());

        document.getElementById('clear-btn').addEventListener('click', () => {
            this.pushHistory(); // Save before clear
            this.clear();
            this.saveState();
        });

        document.getElementById('load-btn').addEventListener('click', () => {
            this.pushHistory(); // Save before load
            this.loadExample();
            this.saveState();
        });

        document.getElementById('copy-jira-btn').addEventListener('click', () => this.copyToJira());

        this.titleInput.addEventListener('input', () => this.saveState());
        this.contentInput.addEventListener('input', () => this.saveState());

        const langSel = document.getElementById('lang-select');
        if (langSel) langSel.addEventListener('change', (e) => {
            this.currentLocale = e.target.value;
            this.ironGuard.setLocale(this.currentLocale);
            this.cognitiveCoach.setLocale(this.currentLocale);
            this.updateInterface();
            this.saveState();
        });

        // History UI
        const undoBtn = document.createElement('button');
        undoBtn.id = 'undo-btn';
        undoBtn.className = 'secondary-btn';
        undoBtn.innerText = LOCALE_CONFIG[this.currentLocale].ui.btnUndo;
        undoBtn.onclick = () => {
            if (this.history.length > 0) {
                this.popHistory();
            } else {
                alert("Nothing to undo!");
            }
        };

        // Insert Undo button before Clear button
        const clearBtn = document.getElementById('clear-btn');
        clearBtn.parentNode.insertBefore(undoBtn, clearBtn);

        // Update Undo button text on locale change
        this.undoBtn = undoBtn;
    }

    updateModeUI() {
        const body = document.body;
        const root = document.querySelector(':root');

        // Hide/Show specific Containers
        const gkPanel = document.getElementById('results-gatekeeper');
        const coachPanel = document.getElementById('results-coach');

        if (this.currentMode === 'GATEKEEPER') {
            body.classList.remove('mode-coach');
            body.classList.add('mode-gatekeeper');

            // Show Checkboxes
            document.querySelector('.ritual-checks').classList.remove('hidden');

            // Hide Coach Results if open
            if (coachPanel) coachPanel.classList.add('hidden');

            // App Title
            const titleSpan = document.querySelector('h1 .gradient-text');
            if (titleSpan) titleSpan.dataset.i18n = 'titleSuffix_GK';

        } else {
            body.classList.remove('mode-gatekeeper');
            body.classList.add('mode-coach');

            // Hide Checkboxes (Not used in Coach score)
            document.querySelector('.ritual-checks').classList.add('hidden');

            // Hide GK Results if open
            if (gkPanel) gkPanel.classList.add('hidden');

            const titleSpan = document.querySelector('h1 .gradient-text');
            if (titleSpan) titleSpan.dataset.i18n = 'titleSuffix_Coach';
        }

        this.updateInterface(); // refresh strings
    }

    updateInterface() {
        const lang = this.currentLocale;
        const uiConfig = LOCALE_CONFIG[lang].ui;

        // Common text updates
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (uiConfig[key] && !['INPUT', 'TEXTAREA'].includes(el.tagName)) {
                el.innerText = uiConfig[key];
            }
        });

        // Placeholder updates
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.dataset.i18nPlaceholder;
            if (uiConfig[key]) el.placeholder = uiConfig[key];
        });

        // Mode specific Label
        const modeLabel = document.getElementById('mode-label-text');
        if (modeLabel) modeLabel.innerText = this.currentMode === 'GATEKEEPER'
            ? uiConfig.modeGK
            : uiConfig.modeCoach;

        // Undo Button
        if (this.undoBtn) this.undoBtn.innerText = uiConfig.btnUndo;
    }

    runAnalysis() {
        const title = this.titleInput.value.trim();
        const content = this.contentInput.value.trim();
        if (!title && !content) return;

        if (this.currentMode === 'GATEKEEPER') {
            const opts = {
                refinement: document.getElementById('check-refinement').checked,
                alignment: document.getElementById('check-alignment').checked
            };
            const result = this.ironGuard.analyze(title, content, opts);
            this.renderGatekeeperResults(result);
        } else {
            const result = this.cognitiveCoach.analyze(title, content);
            this.renderCoachResults(result);
        }
    }

    renderGatekeeperResults(result) {
        const panel = document.getElementById('results-gatekeeper');
        panel.classList.remove('hidden');
        panel.scrollIntoView({ behavior: 'smooth' });

        const stamp = document.getElementById('digital-stamp');
        const stampText = stamp.querySelector('.stamp-text');
        const uiConfig = LOCALE_CONFIG[this.currentLocale].ui;

        stamp.className = 'digital-stamp ' + (result.isBlocked ? 'stamp-fail' : 'stamp-pass');
        stampText.textContent = result.isBlocked ? uiConfig.stampFail : uiConfig.stampPass;

        const list = document.getElementById('gk-feedback-list');
        list.innerHTML = '';
        result.seals.forEach(seal => {
            const item = this.el('div', 'seal-item ' + seal.status);
            
            const icon = this.el('div', 'seal-icon');
            icon.textContent = (seal.status === 'pass' ? '\u{1F6E1}\u{FE0F}' : '\u{1F494}\u{FE0F}');
            
            const content = this.el('div', 'seal-content');
            
            const h4 = this.el('h4');
            h4.textContent = seal.name;
            
            const pStatus = this.el('p', 'seal-status-msg');
            const strong = this.el('strong');
            strong.textContent = seal.title;
            pStatus.appendChild(strong);
            
            const pDesc = this.el('p', 'seal-desc');
            pDesc.textContent = seal.msg;
            
            content.append(h4, pStatus, pDesc);
            item.append(icon, content);
            list.appendChild(item);
        });
    }

    // Helper for safe element creation
    el(tag, className = '') {
        const e = document.createElement(tag);
        if (className) e.className = className;
        return e;
    }

    renderCoachResults(result) {
        const panel = document.getElementById('results-coach');
        panel.classList.remove('hidden');
        panel.scrollIntoView({ behavior: 'smooth' });

        // Score Ring
        const ring = document.querySelector('.progress-ring__circle');
        const scoreVal = document.querySelector('.score-value');

        // Reset animation
        const radius = ring.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        ring.style.strokeDasharray = `${circumference} ${circumference}`;

        const offset = circumference - ((result.score / 100) * circumference);
        ring.style.strokeDashoffset = offset;
        scoreVal.textContent = result.score;

        // Feedback
        const list = document.getElementById('coach-feedback-list');
        list.innerHTML = '';
        const uiConfig = LOCALE_CONFIG[this.currentLocale].ui;

        ['CLARITY', 'TESTABILITY', 'VALUE'].forEach(cat => {
            const data = result.categories[cat];
            const sec = this.el('div', 'category-section');

            const header = this.el('div', 'category-header');
            const h4 = this.el('h4');
            h4.textContent = uiConfig['cat' + cat];
            
            const catScore = this.el('div', 'category-score');
            const span = this.el('span', 'cat-percent');
            span.textContent = data.percent + '%';
            const catBar = this.el('div', 'cat-bar');
            const catFill = this.el('div', 'cat-fill');
            catFill.style.width = data.percent + '%';
            catBar.appendChild(catFill);
            catScore.append(span, catBar);
            header.append(h4, catScore);

            const feed = this.el('div', 'category-feed');
            if (data.feedback.length === 0) {
                const empty = this.el('div', 'feedback-item item-neutral');
                empty.textContent = "No issues found.";
                feed.appendChild(empty);
            } else {
                data.feedback.forEach(f => {
                    const fItem = this.el('div', 'feedback-item item-' + f.type);
                    const fIcon = this.el('div', 'feedback-icon');
                    fIcon.textContent = (f.type === 'check' ? '\u2713' : f.type === 'warning' ? '!' : '\u2715');
                    
                    const fContent = this.el('div', 'feedback-content');
                    const fH5 = this.el('h5');
                    fH5.textContent = f.title;
                    const fP = this.el('p');
                    fP.textContent = f.message;
                    
                    fContent.append(fH5, fP);
                    fItem.append(fIcon, fContent);
                    feed.appendChild(fItem);
                });
            }
            sec.append(header, feed);
            list.appendChild(sec);
        });
    }

    loadExample() {
        // Load a generic good story suitable for both
        const isTr = this.currentLocale === 'tr';
        if (isTr) {
            this.titleInput.value = "Google ile Giriş Entegrasyonu";
            this.contentInput.value = `Kayıtlı Kullanıcı Olarak,\nHesabıma Google ile giriş yapmak İstiyorum,\nBöylece şifre hatırlamak zorunda kalmadan hızlıca erişebilirim.\n\nKabul Kriterleri:\n- Kullanıcı "Google ile Giriş" butonunu görür.\n- Butona tıklandığında OAuth ekranı açılır.\n- Başarılı girişte ana sayfaya yönlendirilir.\n\nBağımlılıklar:\n- Yok\n\nTahmin:\n- 3 Puan\n\nKanıtlar:\n- Figma linki ektedir.`;
        } else {
            this.titleInput.value = "Google Login Integration";
            this.contentInput.value = `As a Registered User,\nI want to login with my Google account,\nSo that I can access the app quickly without remembering passwords.\n\nAcceptance Criteria:\n- User sees "Login with Google" button.\n- Clicking opens OAuth screen.\n- Success redirects to dashboard.\n\nDependencies:\n- None\n\nEstimation:\n- 3 Points\n\nEvidence:\n- See Figma.`;
        }
        // Check strict boxes
        document.getElementById('check-refinement').checked = true;
        document.getElementById('check-alignment').checked = true;

        this.runAnalysis();
    }

    clear() {
        this.titleInput.value = '';
        this.contentInput.value = '';
        document.querySelectorAll('.results-section').forEach(el => el.classList.add('hidden'));
    }

    async copyToJira() {
        const content = this.contentInput.value;
        const title = this.titleInput.value;
        if (!content) return;
        let jiraBody = `h2. Story: \n\n` + content;
        try {
            await navigator.clipboard.writeText(jiraBody);
            alert(LOCALE_CONFIG[this.currentLocale].ui.btnJiraCopied);
        } catch (e) { alert("Error copying"); }
    }
}





