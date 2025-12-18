const LOCALE_CONFIG = {
    en: {
        patterns: {
            // Seal 1: Value
            valueClause: /So that\s+(.+)/i,

            // Seal 2: Victory
            acKeyword: /(Acceptance Criteria|ACs|Success Criteria)/i,
            gherkin: /(Given|When|Then)\s+/i,
            listItems: /^\s*(-|\*|\d+\.|•)\s+.+/gm,

            // Seal 3: Terrain (Dependencies)
            terrain: /(Dependencies|Risks|Technical Notes|Notes|Pre-requisites)/i,
            terrainNone: /(None|N\/A|No dependencies)/i,
            link: /(http|https|jira|confluence|\.com|\.org)/i,

            // Seal 4: Cost (Estimation)
            cost: /(Estimation|Points|Complexity|Story Points|Effort)/i,

            // Seal 5: Evidence (Docs/Design)
            evidence: /(Figma|Mockup|Screen|Screenshot|Design|Taslak|Draw\.io|Miro|Confluence|Tech Analysis|Analiz)/i
        },
        messages: {
            seal0Name: "Seal of Identity",
            seal0Pass: "Title Valid",
            seal0Fail: "REJECTED: Invalid Title",
            seal0MsgPass: "Title is clear and descriptive.",
            seal0MsgFail: "Title must be at least 10 characters long.",

            seal1Names: "Seal of Value",
            seal1Pass: "Value Defined",
            seal1Fail: "REJECTED: Value Statement Missing",
            seal1MsgPass: "The 'So that' clause is present.",
            seal1MsgFail: "You MUST include a 'So that' clause.",

            seal2Name: "Seal of Victory",
            seal2Pass: "Victory Conditions Met",
            seal2Fail: "REJECTED: Victory Conditions Unclear",
            seal2MsgPass: "Acceptance Criteria defined correctly.",
            seal2MsgFail: "Must have 'Acceptance Criteria' AND (3+ bullets OR Gherkin).",

            seal3Name: "Seal of Terrain",
            seal3Pass: "Terrain Scanned",
            seal3Fail: "REJECTED: Broken Dependencies",
            seal3MsgPass: "Dependencies section valid (Links present or marked None).",
            seal3MsgFail: "Dependencies must include a LINK (Jira/Conf) or be marked 'None'.",
            seal3Missing: "REJECTED: Missing Terrain Section",
            seal3MsgMissing: "Must include a 'Dependencies' section.",

            seal4Name: "Seal of Cost",
            seal4Pass: "Cost Estimated",
            seal4Fail: "REJECTED: Missing Estimation",
            seal4MsgPass: "Estimation/Points section found.",
            seal4MsgFail: "Must include an 'Estimation', 'Points', or 'Complexity' section.",

            seal5Name: "Seal of Evidence",
            seal5Pass: "Evidence Secured",
            seal5Fail: "REJECTED: Missing Assets",
            seal5MsgPass: "Reference to Design/Docs found.",
            seal5MsgFail: "Must mention: Figma, Mockup, Confluence, or Tech Analysis.",

            ritualNames: "Ritual Check",
            ritualFail: "REJECTED: Rituals Incomplete",
            ritualMsgFail: "You must confirm Refinement and Alignment."
        },
        ui: {
            titleSuffix: "Gatekeeper v2",
            subtitle: "The Iron Gatekeeper: Strict Definition of Ready (DoR) Validation.",
            labelTitle: "Story Title",
            phTitle: "e.g., User Login with Google Auth",
            labelContent: "Story Definition",
            labelAC: "(Must include: So that, ACs, Dependencies, Estimation)",
            phContent: "As a [role], I want to [action], so that [benefit]...\n\nAcceptance Criteria:\n- Criteria 1\n- Criteria 2\n- Criteria 3\n\nDependencies:\n- https://jira.company.com/browse/TEAM-123\n\nEstimation:\n- 3 Points\n\nEvidence:\n- See Figma mockups",
            btnAnalyze: "Verify Seals",
            btnDemo: "Load Perfect Story",
            btnClear: "Clear",
            btnJira: "Copy to Jira 📋",
            btnJiraCopied: "Copied! ✅",
            btnFixSeals: "Fix Broken Seals 🛑",

            stampPass: "READY FOR FORGE",
            stampFail: "REJECTED",

            checkRefinement: "Refinement Aligned?",
            checkAlignment: "Dependent Team Aligned?",

            headerCriteria: "The 6 Seals",
            refSeal0Title: "Identity", refSeal0Desc: "Title",
            refSeal1Title: "Value", refSeal1Desc: "So that...",
            refSeal2Title: "Victory", refSeal2Desc: "3+ ACs",
            refSeal3Title: "Terrain", refSeal3Desc: "Links",
            refSeal4Title: "Cost", refSeal4Desc: "Points",
            refSeal5Title: "Evidence", refSeal5Desc: "Docs/Figma",

            hintACFormat: "Format ACs with dashes ( - ) or numbers ( 1. )."
        },
        tooltips: {}
    },
    tr: {
        patterns: {
            valueClause: /Böylece\s+(.+)/i,
            acKeyword: /(Kabul Kriterleri|Kabul Şartları|ACs)/i,
            gherkin: /(Diyelim ki|Eğer ki|O zaman)/i,
            listItems: /^\s*(-|\*|\d+\.|•)\s+.+/gm,
            terrain: /(Bağımlılıklar|Riskler|Teknik Notlar|Notlar|Ön koşullar)/i,
            terrainNone: /(Yok|None|Bulunmuyor)/i,
            link: /(http|https|jira|confluence|\.com|\.org)/i,
            cost: /(Tahmin|Puan|Efor|Karmaşıklık|Story Points)/i,
            evidence: /(Figma|Mockup|Ekran|Screenshot|Görsel|Tasarım|Draw\.io|Miro|Confluence|Analiz)/i
        },
        messages: {
            seal0Name: "Kimlik Mührü",
            seal0Pass: "Başlık Geçerli",
            seal0Fail: "REDDEDİLDİ: Geçersiz Başlık",
            seal0MsgPass: "Başlık net ve açıklayıcı.",
            seal0MsgFail: "Başlık en az 10 karakter olmalıdır.",

            seal1Names: "Değer Mührü",
            seal1Pass: "Değer Tanımlandı",
            seal1Fail: "REDDEDİLDİ: Değer İfadesi Eksik",
            seal1MsgPass: "'Böylece' ifadesi mevcut.",
            seal1MsgFail: "Bir 'Böylece' (So that) cümlesi İÇERMELİDİR.",

            seal2Name: "Zafer Mührü",
            seal2Pass: "Zafer Koşulları Sağlandı",
            seal2Fail: "REDDEDİLDİ: Zafer Koşulları Belirsiz",
            seal2MsgPass: "Kabul Kriterleri doğru tanımlanmış.",
            seal2MsgFail: "'Kabul Kriterleri' VE (3+ madde VEYA Gherkin) olmalıdır.",

            seal3Name: "Arazi Mührü",
            seal3Pass: "Arazi Tarandı",
            seal3Fail: "REDDEDİLDİ: Hatalı Bağımlılık",
            seal3MsgPass: "Bağımlılık bölümü geçerli (Link var veya 'Yok').",
            seal3MsgFail: "Bağımlılıklar bir LİNK içermeli veya 'Yok' yazılmalı.",
            seal3Missing: "REDDEDİLDİ: Arazi Bölümü Eksik",
            seal3MsgMissing: "'Bağımlılıklar' bölümü eklenmelidir.",

            seal4Name: "Maliyet Mührü",
            seal4Pass: "Maliyet Tahmin Edildi",
            seal4Fail: "REDDEDİLDİ: Tahmin Eksik",
            seal4MsgPass: "Tahmin/Puan bölümü bulundu.",
            seal4MsgFail: "'Tahmin', 'Puan' veya 'Karmaşıklık' bölümü eklenmelidir.",

            seal5Name: "Kanıt Mührü",
            seal5Pass: "Kanıtlar Tamam",
            seal5Fail: "REDDEDİLDİ: Kanıt Eksik",
            seal5MsgPass: "Tasarım/Doküman referansı bulundu.",
            seal5MsgFail: "Figma, Ekran, Confluence veya Analiz'den bahsedilmeli.",

            ritualNames: "Ritüel Kontrolü",
            ritualFail: "REDDEDİLDİ: Ritüeller Tamamlanmadı",
            ritualMsgFail: "Refinement ve Hizalanma onaylanmalı."
        },
        ui: {
            titleSuffix: "Bekçisi v2",
            subtitle: "Demir Bekçi: Katı Hazır Tanımı (DoR) Doğrulaması.",
            labelTitle: "Hikaye Başlığı",
            phTitle: "örn., Google ile Giriş Yapma",
            labelContent: "Hikaye Tanımı",
            labelAC: "(Şunları içermelidir: Böylece, KK, Bağımlılıklar, Tahmin)",
            phContent: "[Rol] Olarak, [İstek] İstiyorum, Böylece [Fayda]...\n\nKabul Kriterleri:\n- Kriter 1\n- Kriter 2\n- Kriter 3\n\nBağımlılıklar:\n- Yok\n\nTahmin:\n- 3 Puan\n\nKanıtlar:\n- Figma linki ektedir.",
            btnAnalyze: "Mühürleri Kontrol Et",
            btnDemo: "Kusursuz Hikaye Yükle",
            btnClear: "Temizle",
            btnJira: "Jira'ya Kopyala 📋",
            btnJiraCopied: "Kopyalandı! ✅",
            btnFixSeals: "Mühürleri Onar 🛑",

            stampPass: "DÖKÜMHANE İÇİN HAZIR",
            stampFail: "REDDEDİLDİ",

            checkRefinement: "Refinement Yapıldı?",
            checkAlignment: "Bağımlılık Hizalandı?",

            headerCriteria: "6 Mühür",
            refSeal0Title: "Kimlik", refSeal0Desc: "Başlık",
            refSeal1Title: "Değer", refSeal1Desc: "Böylece...",
            refSeal2Title: "Zafer", refSeal2Desc: "3+ KK",
            refSeal3Title: "Arazi", refSeal3Desc: "Linkler",
            refSeal4Title: "Maliyet", refSeal4Desc: "Puan",
            refSeal5Title: "Kanıt", refSeal5Desc: "Belge/Tasarım",

            hintACFormat: "KK'leri tire ( - ) veya sayı ( 1. ) ile formatlayın."
        },
        tooltips: {}
    }
};

class StoryAnalyzer {
    constructor() {
        this.currentLocale = 'en';
        this.config = LOCALE_CONFIG[this.currentLocale];
    }

    setLocale(locale) {
        if (LOCALE_CONFIG[locale]) {
            this.currentLocale = locale;
            this.config = LOCALE_CONFIG[locale];
        }
    }

    analyze(title, content, options = {}) {
        const seals = [];
        let isBlocked = false;
        const msg = this.config.messages;
        const pat = this.config.patterns;

        // Seal 0: Identity (Title check)
        if (typeof title === 'string' && title.trim().length >= 10) {
            seals.push({ name: msg.seal0Name, status: 'pass', title: msg.seal0Pass, msg: msg.seal0MsgPass });
        } else {
            seals.push({ name: msg.seal0Name, status: 'fail', title: msg.seal0Fail, msg: msg.seal0MsgFail });
            isBlocked = true;
        }

        // Seal 1: Value ("So that" clause)
        const hasValue = pat.valueClause.test(content);
        if (hasValue) {
            seals.push({ name: msg.seal1Names, status: 'pass', title: msg.seal1Pass, msg: msg.seal1MsgPass });
        } else {
            seals.push({ name: msg.seal1Names, status: 'fail', title: msg.seal1Fail, msg: msg.seal1MsgFail });
            isBlocked = true;
        }

        // Seal 2: Victory (AC Keyword + (3 bullets OR Gherkin))
        const hasACKeyword = pat.acKeyword.test(content);
        pat.listItems.lastIndex = 0;
        const matches = content.match(pat.listItems);
        const bulletCount = matches ? matches.length : 0;
        const hasGherkin = pat.gherkin.test(content);

        const isVictory = hasACKeyword && (bulletCount >= 3 || hasGherkin);

        if (isVictory) {
            seals.push({ name: msg.seal2Name, status: 'pass', title: msg.seal2Pass, msg: msg.seal2MsgPass });
        } else {
            seals.push({ name: msg.seal2Name, status: 'fail', title: msg.seal2Fail, msg: msg.seal2MsgFail });
            isBlocked = true;
        }

        // Seal 3: Terrain (Dependencies with Links OR None)
        const hasTerrainHeader = pat.terrain.test(content);
        if (hasTerrainHeader) {
            // Find the dependency section content roughly (simple loose check)
            // Ideally we'd parse it, but for now let's just check if the WHOLE text contains Link or None
            // A stricter way: extract text after "Dependencies" until next section.
            // Let's keep it simple: Does the content contain "Dependencies" AND (Link OR None)?
            const hasLink = pat.link.test(content);
            const hasNone = pat.terrainNone.test(content);

            if (hasLink || hasNone) {
                seals.push({ name: msg.seal3Name, status: 'pass', title: msg.seal3Pass, msg: msg.seal3MsgPass });
            } else {
                seals.push({ name: msg.seal3Name, status: 'fail', title: msg.seal3Fail, msg: msg.seal3MsgFail });
                isBlocked = true;
            }
        } else {
            seals.push({ name: msg.seal3Name, status: 'fail', title: msg.seal3Missing, msg: msg.seal3MsgMissing });
            isBlocked = true;
        }

        // Seal 4: Cost (Estimation)
        const hasCost = pat.cost.test(content);
        if (hasCost) {
            seals.push({ name: msg.seal4Name, status: 'pass', title: msg.seal4Pass, msg: msg.seal4MsgPass });
        } else {
            seals.push({ name: msg.seal4Name, status: 'fail', title: msg.seal4Fail, msg: msg.seal4MsgFail });
            isBlocked = true;
        }

        // Seal 5: Evidence (Figma/Confluence keyword)
        const hasEvidence = pat.evidence.test(content);
        if (hasEvidence) {
            seals.push({ name: msg.seal5Name, status: 'pass', title: msg.seal5Pass, msg: msg.seal5MsgPass });
        } else {
            seals.push({ name: msg.seal5Name, status: 'fail', title: msg.seal5Fail, msg: msg.seal5MsgFail });
            isBlocked = true;
        }

        // Ritual Checks (Manual)
        // If checkboxes not checked, fail.
        if (options.refinement && options.alignment) {
            // Pass silently or show a check? Let's show a "Ritual" seal.
            // seals.push({ name: msg.ritualNames, status: 'pass', title: "Rituals Honored", msg: "Process confirmed." });
            // Actually, if it passes, we don't necessarily need to crowd the UI, but let's show it for completeness.
        } else {
            seals.push({ name: msg.ritualNames, status: 'fail', title: msg.ritualFail, msg: msg.ritualMsgFail });
            isBlocked = true;
        }

        return { isBlocked, seals };
    }
}

class UI {
    constructor() {
        this.analyzer = new StoryAnalyzer();
        this.titleInput = document.getElementById('story-title');
        this.contentInput = document.getElementById('story-content');
        this.resultsPanel = document.getElementById('results-panel');
        this.feedbackList = document.getElementById('feedback-list');
        this.langSelect = document.getElementById('lang-select');
        this.stampContainer = document.getElementById('stamp-container');

        // Manual Checkboxes
        this.checkRefinement = document.getElementById('check-refinement');
        this.checkAlignment = document.getElementById('check-alignment');

        // State
        this.lastAnalysisBlocked = true;

        this.bindEvents();
    }

    bindEvents() {
        document.getElementById('analyze-btn').addEventListener('click', () => this.runAnalysis());
        document.getElementById('clear-btn').addEventListener('click', () => this.clear());
        document.getElementById('load-btn').addEventListener('click', () => this.loadExample());
        document.getElementById('copy-jira-btn').addEventListener('click', () => this.copyToJira());

        if (this.langSelect) {
            this.langSelect.addEventListener('change', (e) => this.changeLanguage(e.target.value));
        }
    }

    changeLanguage(lang) {
        this.analyzer.setLocale(lang);
        this.updateInterface(lang);
        this.resultsPanel.classList.add('hidden');
    }

    updateInterface(lang) {
        const uiConfig = LOCALE_CONFIG[lang].ui;
        if (!uiConfig) return;

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (uiConfig[key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    // For placeholders
                } else {
                    el.innerText = uiConfig[key];
                }
            }
        });

        // Manual handling for checkboxes labels as they might be structurally different
        // But let's assume I wrap them in <span data-i18n>
        document.getElementById('label-refinement').innerText = uiConfig.checkRefinement;
        document.getElementById('label-alignment').innerText = uiConfig.checkAlignment;

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.dataset.i18nPlaceholder;
            if (uiConfig[key]) {
                el.placeholder = uiConfig[key];
            }
        });
    }

    loadExample() {
        const isTr = this.analyzer.currentLocale === 'tr';

        // Check checkboxes for the user for the demo
        this.checkRefinement.checked = true;
        this.checkAlignment.checked = true;

        if (isTr) {
            this.titleInput.value = "Google ile Giriş Entegrasyonu";
            this.contentInput.value = `Kaydedilmiş Kullanıcı Olarak,
Hesabıma Google ile giriş yapmak İstiyorum,
Böylece şifre hatırlamak zorunda kalmadan hızlıca erişebilirim.

Kabul Kriterleri:
- Kullanıcı giriş sayfasında "Google ile Giriş" butonunu görür.
- Butona tıklandığında Google OAuth ekranı açılır.
- Başarılı girişte ana sayfaya yönlendirilir.

Bağımlılıklar:
- Google OAuth API (https://console.cloud.google.com)

Tahmin:
- 5 Puan

Teknik Notlar:
- Figma tasarımları incelendi.`;
        } else {
            this.titleInput.value = "Google Login Integration";
            this.contentInput.value = `As a Registered User,
I want to login with my Google account,
So that I can access the app quickly without remembering passwords.

Acceptance Criteria:
- User sees "Login with Google" button on login page.
- Clicking button opens Google OAuth consent screen.
- Successful login redirects to dashboard.

Dependencies:
- Google OAuth Client ID (https://console.cloud.google.com)

Estimation:
- 5 Points

Evidence:
- See Figma mockups.`;
        }

        this.runAnalysis();
    }

    async copyToJira() {
        if (this.lastAnalysisBlocked) {
            const btn = document.getElementById('copy-jira-btn');
            btn.classList.add('shake');
            setTimeout(() => btn.classList.remove('shake'), 500);
            return;
        }

        const title = this.titleInput.value;
        const content = this.contentInput.value;
        if (!title || !content) return;

        let jiraBody = `h2. Story: ${title}\n\n`;
        let formattedContent = content
            .replace(/(As a|As an|Olarak)/i, "*$1*")
            .replace(/(I want to|I want|İstiyorum)/i, "*$1*")
            .replace(/(So that|Böylece)/i, "*$1*")
            .replace(/(Acceptance Criteria:|Kabul Kriterleri:)/i, "h2. Acceptance Criteria")
            .replace(/(Dependencies:|Bağımlılıklar:)/i, "h2. Dependencies")
            .replace(/(Estimation:|Tahmin:)/i, "h2. Estimation")
            .replace(/(Evidence:|Kanıtlar:|Teknik Notlar:)/i, "h2. Evidence");

        formattedContent = formattedContent.replace(/^\s*(-|\*|\d+\.|•)\s/gm, "* ");

        const fullText = jiraBody + formattedContent;

        try {
            await navigator.clipboard.writeText(fullText);
            const btn = document.getElementById('copy-jira-btn');
            const originalText = btn.textContent;
            const uiConfig = LOCALE_CONFIG[this.analyzer.currentLocale].ui;
            btn.textContent = uiConfig ? uiConfig.btnJiraCopied : "Copied! ✅";
            setTimeout(() => btn.textContent = originalText, 2000);
        } catch (err) {
            alert("Failed to copy path");
        }
    }

    runAnalysis() {
        const title = this.titleInput.value.trim();
        const content = this.contentInput.value.trim();

        if (!content && !title) return;

        const options = {
            refinement: this.checkRefinement.checked,
            alignment: this.checkAlignment.checked
        };

        const result = this.analyzer.analyze(title, content, options);
        this.lastAnalysisBlocked = result.isBlocked;
        this.showResults(result);
    }

    showResults(result) {
        this.resultsPanel.classList.remove('hidden');

        setTimeout(() => {
            this.resultsPanel.scrollIntoView({ behavior: 'smooth' });
        }, 100);

        const stampEl = document.getElementById('digital-stamp');
        const stampTextEl = stampEl.querySelector('.stamp-text');
        const uiConfig = LOCALE_CONFIG[this.analyzer.currentLocale].ui;

        stampEl.className = 'digital-stamp ' + (result.isBlocked ? 'stamp-fail' : 'stamp-pass');
        stampTextEl.textContent = result.isBlocked ? uiConfig.stampFail : uiConfig.stampPass;

        const jiraBtn = document.getElementById('copy-jira-btn');
        if (result.isBlocked) {
            jiraBtn.classList.add('btn-blocked');
            jiraBtn.innerText = uiConfig.btnFixSeals;
            jiraBtn.disabled = true;
        } else {
            jiraBtn.classList.remove('btn-blocked');
            jiraBtn.innerText = uiConfig.btnJira;
            jiraBtn.disabled = false;
        }

        this.feedbackList.innerHTML = '';

        result.seals.forEach(seal => {
            const item = document.createElement('div');
            item.className = `seal-item ${seal.status}`;

            const icon = seal.status === 'pass' ? '🛡️' : '💔';

            item.innerHTML = `
                <div class="seal-icon">${icon}</div>
                <div class="seal-content">
                    <h4>${seal.name}</h4>
                    <p class="seal-status-msg"><strong>${seal.title}</strong></p>
                    <p class="seal-desc">${seal.msg}</p>
                </div>
            `;
            this.feedbackList.appendChild(item);
        });
    }

    clear() {
        this.titleInput.value = '';
        this.contentInput.value = '';
        this.resultsPanel.classList.add('hidden');
        this.checkRefinement.checked = false;
        this.checkAlignment.checked = false;
        this.lastAnalysisBlocked = true;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new UI();
});
