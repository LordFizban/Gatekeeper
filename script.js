
/* ==========================================================================
   THE IRON GATEKEEPER v3 (Dual-Mode Engine)
   ========================================================================== 
   Contains two distinct analysis strategies:
   1. IronGuard: Strict, binary validation (The 6 Seals).
   2. CognitiveCoach: Weighted scoring and constructive feedback (DoR Score).
   ========================================================================== */

const LOCALE_CONFIG = {
    en: {
        patterns: {
            // Shared & Coach Patterns
            format: /As (?:a|an)\s+.+I\s+want\s+.+So\s+that\s+.+/is,
            lazyPersona: /As an? (user|admin|administrator)[\s,]/i,

            // Gatekeeper & General Patterns
            valueClause: /So that\s+(.+)/i,
            acKeyword: /(Acceptance Criteria|ACs|Success Criteria)/i,
            gherkin: /(Given|When|Then)\s+/i,
            listItems: /^\s*(-|\*|\d+\.|•)\s+.+/gm, // stricter start-of-line check for GK, general for Coach

            terrain: /(Dependencies|Risks|Technical Notes|Notes|Pre-requisites)/i,
            terrainNone: /(None|N\/A|No dependencies)/i,
            link: /(http|https|jira|confluence|\.com|\.org)/i,

            cost: /(Estimation|Points|Complexity|Story Points|Effort)/i,
            evidence: /(Figma|Mockup|Screen|Screenshot|Design|Taslak|Draw\.io|Miro|Confluence|Tech Analysis|Analiz)/i
        },
        keywords: [ // Coach Mode Business Value Keywords
            'revenue', 'profit', 'save', 'cost', 'churn', 'retention',
            'conversion', 'compliance', 'legal', 'audit', 'performance',
            'latency', 'scale', 'user experience', 'ux', 'efficiency',
            'automate', 'manual', 'time', 'risk'
        ],
        messages: {
            // --- GATEKEEPER MESSAGES ---
            seal0Name: "Seal of Identity", seal0Pass: "Title Valid", seal0Fail: "REJECTED: Invalid Title",
            seal0MsgPass: "Title is clear and descriptive.", seal0MsgFail: "Title must be at least 10 characters long.",

            seal1Names: "Seal of Value", seal1Pass: "Value Defined", seal1Fail: "REJECTED: Value Statement Missing",
            seal1MsgPass: "The 'So that' clause is present.", seal1MsgFail: "You MUST include a 'So that' clause.",

            seal2Name: "Seal of Victory", seal2Pass: "Victory Conditions Met", seal2Fail: "REJECTED: Victory Conditions Unclear",
            seal2MsgPass: "Acceptance Criteria defined correctly.", seal2MsgFail: "Must have 'Acceptance Criteria' AND (3+ bullets OR Gherkin).",

            seal3Name: "Seal of Terrain", seal3Pass: "Terrain Scanned", seal3Fail: "REJECTED: Broken Dependencies",
            seal3MsgPass: "Dependencies section valid (Links present or marked None).", seal3MsgFail: "Dependencies must include a LINK or be marked 'None'.",
            seal3Missing: "REJECTED: Missing Terrain Section", seal3MsgMissing: "Must include a 'Dependencies' section.",

            seal4Name: "Seal of Cost", seal4Pass: "Cost Estimated", seal4Fail: "REJECTED: Missing Estimation",
            seal4MsgPass: "Estimation/Points section found.", seal4MsgFail: "Must include an 'Estimation' or 'Points' section.",

            seal5Name: "Seal of Evidence", seal5Pass: "Evidence Secured", seal5Fail: "REJECTED: Missing Assets",
            seal5MsgPass: "Reference to Design/Docs found.", seal5MsgFail: "Must mention: Figma, Mockup, Confluence, or Tech Analysis.",

            ritualNames: "Ritual Check", ritualFail: "REJECTED: Rituals Incomplete", ritualMsgFail: "You must confirm Refinement and Alignment.",

            // --- COACH MESSAGES ---
            titlePass: "Title Present", titlePassMsg: "Good job providing a descriptive title.",
            titleFail: "Missing Title", titleFailMsg: "A clear title helps identify the story.",
            formatPass: "Standard Format", formatPassMsg: "Follows the standard template.",
            formatFail: "Incorrect Format", formatFailMsg: "Try using: 'As a... I want... So that...'.",
            acPass: "AC Section Found", acPassMsg: "Explicit Acceptance Criteria section detected.",
            acFail: "Missing ACs", acFailMsg: "No 'Acceptance Criteria' section found.",
            acDetailed: "Detailed Criteria",
            acGherkin: "Gherkin Syntax", acGherkinMsg: "Uses Behavior Driven Development (BDD) style.",
            acSparse: "Sparse Criteria", acSparseMsg: "Found very few acceptance criteria.",
            acUnhappy: "Unhappy Path", acUnhappyMsg: "Could not detect clear list items.",
            lenShort: "Too Short", lenShortMsg: "Story seems too brief.",
            lenLong: "Too Long", lenLongMsg: "Story might be too complex.",
            lenGood: "Good Length", lenGoodMsg: "Story length is reasonable.",
            personaFail: "Vague Persona", personaFailMsg: "Avoid generic personas like 'User'.",
            personaPass: "Specific Persona", personaPassMsg: "Good job using a specific persona.",
            valueFail: "Missing Value", valueFailMsg: "The 'So that' clause is crucial.",
            valueStrong: "Strong Business Value",
            valueWeak: "Weak Value", valueWeakMsg: "The value clause is too vague.",
            valueGeneric: "Generic Value", valueGenericMsg: "Value statement present, but could be stronger."
        },
        ui: {
            titleSuffix_GK: "Gatekeeper",
            titleSuffix_Coach: "Coach",
            subtitle: "Dual-Mode Definition of Ready Validation.",

            labelTitle: "Story Title", phTitle: "e.g., User Login with Google Auth",
            labelContent: "Story Definition",
            labelAC: "(Must include: So that, ACs, Dependencies, Estimation)",
            phContent: "As a [role], I want to [action], so that [benefit]...\\n\\nAcceptance Criteria:\\n- Criteria 1\\n- Criteria 2\\n\\nDependencies:\\n- None\\n\\nEstimation:\\n- 3 Points",

            btnAnalyze: "Analyze Story",
            btnDemo: "Load Demo Story",
            btnClear: "Clear",
            btnJira: "Copy to Jira 📋", btnJiraCopied: "Copied! ✅",
            btnFixSeals: "Fix Broken Seals 🛑",

            stampPass: "READY FOR FORGE",
            stampFail: "REJECTED",

            checkRefinement: "Refinement Aligned?",
            checkAlignment: "Dependent Team Aligned?",

            labelScore: "DoR Score",
            catCLARITY: "Clarity", catTESTABILITY: "Testability", catVALUE: "Value",

            // Criteria Cards (Gatekeeper)
            headerCriteria: "The 6 Seals",
            refSeal0Title: "Identity", refSeal0Desc: "Title",
            refSeal1Title: "Value", refSeal1Desc: "So that...",
            refSeal2Title: "Victory", refSeal2Desc: "3+ ACs",
            refSeal3Title: "Terrain", refSeal3Desc: "Links",
            refSeal4Title: "Cost", refSeal4Desc: "Points",
            refSeal5Title: "Evidence", refSeal5Desc: "Docs/Figma",

            modeLabel: "Mode:",
            modeGK: "🛡️ Power",
            modeCoach: "🧠 Coach"
        }
    },
    tr: {
        patterns: {
            format: /(.+)\\s+Olarak\\s*,?\\s*(.+)\\s+İstiyorum\\s*,?\\s*Böylece\\s+(.+)/is,
            lazyPersona: /(?<!Kayıtlı\\s+)(Kullanıcı|Yönetici|Admin)\\s+Olarak/i,
            valueClause: /Böylece\\s+(.+)/i,
            acKeyword: /(Kabul Kriterleri|Kabul Şartları|ACs)/i,
            gherkin: /(Diyelim ki|Eğer ki|O zaman)/i,
            listItems: /^\\s*(-|\\*|\\d+\\.|•)\\s+.+/gm,
            terrain: /(Bağımlılıklar|Riskler|Teknik Notlar|Notlar|Ön koşullar)/i,
            terrainNone: /(Yok|None|Bulunmuyor)/i,
            link: /(http|https|jira|confluence|\\.com|\\.org)/i,
            cost: /(Tahmin|Puan|Efor|Karmaşıklık|Story Points)/i,
            evidence: /(Figma|Mockup|Ekran|Screenshot|Görsel|Tasarım|Draw\\.io|Miro|Confluence|Analiz)/i
        },
        keywords: [
            'gelir', 'kar', 'tasarruf', 'maliyet', 'kayıp', 'sadakat',
            'dönüşüm', 'uyumluluk', 'yasal', 'denetim', 'performans',
            'gecikme', 'ölçek', 'kullanıcı deneyimi', 'ux', 'verimlilik',
            'otomasyon', 'manuel', 'zaman', 'risk', 'hız', 'güvenlik'
        ],
        messages: {
            // Gatekeeper
            seal0Name: "Kimlik Mührü", seal0Pass: "Başlık Geçerli", seal0Fail: "REDDEDİLDİ: Geçersiz Başlık",
            seal0MsgPass: "Başlık net ve açıklayıcı.", seal0MsgFail: "Başlık en az 10 karakter olmalıdır.",

            seal1Names: "Değer Mührü", seal1Pass: "Değer Tanımlandı", seal1Fail: "REDDEDİLDİ: Değer İfadesi Eksik",
            seal1MsgPass: "'Böylece' ifadesi mevcut.", seal1MsgFail: "Bir 'Böylece' (So that) cümlesi İÇERMELİDİR.",

            seal2Name: "Zafer Mührü", seal2Pass: "Zafer Koşulları Sağlandı", seal2Fail: "REDDEDİLDİ: Zafer Koşulları Belirsiz",
            seal2MsgPass: "Kabul Kriterleri doğru tanımlanmış.", seal2MsgFail: "'Kabul Kriterleri' VE (3+ madde VEYA Gherkin) olmalıdır.",

            seal3Name: "Arazi Mührü", seal3Pass: "Arazi Tarandı", seal3Fail: "REDDEDİLDİ: Hatalı Bağımlılık",
            seal3MsgPass: "Bağımlılık bölümü geçerli (Link var veya 'Yok').", seal3MsgFail: "Bağımlılıklar bir LİNK içermeli veya 'Yok' yazılmalı.",
            seal3Missing: "REDDEDİLDİ: Arazi Bölümü Eksik", seal3MsgMissing: "'Bağımlılıklar' bölümü eklenmelidir.",

            seal4Name: "Maliyet Mührü", seal4Pass: "Maliyet Tahmin Edildi", seal4Fail: "REDDEDİLDİ: Tahmin Eksik",
            seal4MsgPass: "Tahmin/Puan bölümü bulundu.", seal4MsgFail: "'Tahmin' veya 'Puan' bölümü eklenmelidir.",

            seal5Name: "Kanıt Mührü", seal5Pass: "Kanıtlar Tamam", seal5Fail: "REDDEDİLDİ: Kanıt Eksik",
            seal5MsgPass: "Tasarım/Doküman referansı bulundu.", seal5MsgFail: "Figma, Ekran, Confluence veya Analiz'den bahsedilmeli.",

            ritualNames: "Ritüel Kontrolü", ritualFail: "REDDEDİLDİ: Ritüeller Tamamlanmadı", ritualMsgFail: "Refinement ve Hizalanma onaylanmalı.",

            // Coach
            titlePass: "Başlık Mevcut", titlePassMsg: "Açıklayıcı bir başlık sağladığınız için teşekkürler.",
            titleFail: "Başlık Eksik", titleFailMsg: "Net bir başlık hikayeyi tanımlamaya yardımcı olur.",
            formatPass: "Standart Format", formatPassMsg: "Standart şablona uyuyor.",
            formatFail: "Hatalı Format", formatFailMsg: "Şunu deneyin: '[Rol] Olarak, [İstek] İstiyorum, Böylece [Fayda]'.",
            acPass: "Kabul Kriterleri Bulundu", acPassMsg: "Açık bir Kabul Kriterleri bölümü tespit edildi.",
            acFail: "Kabul Kriterleri Eksik", acFailMsg: "'Kabul Kriterleri' bölümü bulunamadı.",
            acDetailed: "Detaylı Kriterler",
            acGherkin: "Gherkin Sözdizimi", acGherkinMsg: "Davranış Odaklı Geliştirme (BDD) stili kullanılıyor.",
            acSparse: "Seyrek Kriterler", acSparseMsg: "Çok az kabul kriteri bulundu.",
            acUnhappy: "Mutsuz Yol", acUnhappyMsg: "Net madde işaretleri tespit edilemedi.",
            lenShort: "Çok Kısa", lenShortMsg: "Hikaye hazır olmak için çok kısa görünüyor.",
            lenLong: "Çok Uzun", lenLongMsg: "Hikaye çok karmaşık olabilir. Bölmeyi düşünün.",
            lenGood: "İyi Uzunluk", lenGoodMsg: "Hikaye uzunluğu makul.",
            personaFail: "Muğlak Persona", personaFailMsg: "'Kullanıcı' gibi genel personalardan kaçının.",
            personaPass: "Belirgin Persona", personaPassMsg: "Belirgin bir persona kullandığınız için tebrikler.",
            valueFail: "Değer Eksik", valueFailMsg: "'Böylece' ifadesi çok önemlidir.",
            valueStrong: "Güçlü İş Değeri",
            valueWeak: "Zayıf Değer", valueWeakMsg: "Değer ifadesi çok muğlak.",
            valueGeneric: "Genel Değer", valueGenericMsg: "Değer ifadesi mevcut ama daha güçlü olabilir."
        },
        ui: {
            titleSuffix_GK: "Bekçisi",
            titleSuffix_Coach: "Koçu",
            subtitle: "Çift Modlu Hazır Tanımı (DoR) Doğrulaması.",

            labelTitle: "Hikaye Başlığı", phTitle: "örn., Google ile Giriş Yapma",
            labelContent: "Hikaye Tanımı ve Kriterler",
            labelAC: "(Format: Böylece, KK, Bağımlılıklar, Tahmin)",
            phContent: "[Rol] Olarak, [İstek] İstiyorum, Böylece [Fayda]...\\n\\nKabul Kriterleri:\\n- Kriter 1\\n- Kriter 2\\n\\nBağımlılıklar:\\n- Yok\\n\\nTahmin:\\n- 3 Puan",

            btnAnalyze: "Analiz Et",
            btnDemo: "Örnek Yükle",
            btnClear: "Temizle",
            btnJira: "Jira'ya Kopyala 📋", btnJiraCopied: "Kopyalandı! ✅",
            btnFixSeals: "Mühürleri Onar 🛑",

            stampPass: "DÖKÜMHANE İÇİN HAZIR",
            stampFail: "REDDEDİLDİ",

            checkRefinement: "Refinement Yapıldı?",
            checkAlignment: "Bağımlılık Hizalandı?",

            labelScore: "DoR Puanı",
            catCLARITY: "Netlik", catTESTABILITY: "Test Edilebilirlik", catVALUE: "Değer",

            headerCriteria: "6 Mühür",
            refSeal0Title: "Kimlik", refSeal0Desc: "Başlık",
            refSeal1Title: "Değer", refSeal1Desc: "Böylece...",
            refSeal2Title: "Zafer", refSeal2Desc: "3+ KK",
            refSeal3Title: "Arazi", refSeal3Desc: "Linkler",
            refSeal4Title: "Maliyet", refSeal4Desc: "Puan",
            refSeal5Title: "Kanıt", refSeal5Desc: "Belge",

            modeLabel: "Mod:",
            modeGK: "🛡️ Güç",
            modeCoach: "🧠 Koç"
        }
    }
};

/* ==========================================================================
   STRATEGY: IRON GUARD (Strict Gates)
   ========================================================================== */
class IronGuard {
    constructor(locale) {
        this.config = LOCALE_CONFIG[locale];
    }

    setLocale(locale) { this.config = LOCALE_CONFIG[locale]; }

    analyze(title, content, options = {}) {
        const seals = [];
        let isBlocked = false;
        const msg = this.config.messages;
        const pat = this.config.patterns;

        // 1. Identity
        if (typeof title === 'string' && title.trim().length >= 10) {
            seals.push({ name: msg.seal0Name, status: 'pass', title: msg.seal0Pass, msg: msg.seal0MsgPass });
        } else {
            seals.push({ name: msg.seal0Name, status: 'fail', title: msg.seal0Fail, msg: msg.seal0MsgFail });
            isBlocked = true;
        }

        // 2. Value
        if (pat.valueClause.test(content)) {
            seals.push({ name: msg.seal1Names, status: 'pass', title: msg.seal1Pass, msg: msg.seal1MsgPass });
        } else {
            seals.push({ name: msg.seal1Names, status: 'fail', title: msg.seal1Fail, msg: msg.seal1MsgFail });
            isBlocked = true;
        }

        // 3. Victory
        const hasACKeyword = pat.acKeyword.test(content);
        const matches = content.match(pat.listItems);
        const bulletCount = matches ? matches.length : 0;
        const hasGherkin = pat.gherkin.test(content);
        if (hasACKeyword && (bulletCount >= 3 || hasGherkin)) {
            seals.push({ name: msg.seal2Name, status: 'pass', title: msg.seal2Pass, msg: msg.seal2MsgPass });
        } else {
            seals.push({ name: msg.seal2Name, status: 'fail', title: msg.seal2Fail, msg: msg.seal2MsgFail });
            isBlocked = true;
        }

        // 4. Terrain
        const hasTerrainHeader = pat.terrain.test(content);
        if (hasTerrainHeader) {
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

        // 5. Cost
        if (pat.cost.test(content)) {
            seals.push({ name: msg.seal4Name, status: 'pass', title: msg.seal4Pass, msg: msg.seal4MsgPass });
        } else {
            seals.push({ name: msg.seal4Name, status: 'fail', title: msg.seal4Fail, msg: msg.seal4MsgFail });
            isBlocked = true;
        }

        // 6. Evidence
        if (pat.evidence.test(content)) {
            seals.push({ name: msg.seal5Name, status: 'pass', title: msg.seal5Pass, msg: msg.seal5MsgPass });
        } else {
            seals.push({ name: msg.seal5Name, status: 'fail', title: msg.seal5Fail, msg: msg.seal5MsgFail });
            isBlocked = true;
        }

        // Rituals
        if (!options.refinement || !options.alignment) {
            seals.push({ name: msg.ritualNames, status: 'fail', title: msg.ritualFail, msg: msg.ritualMsgFail });
            isBlocked = true;
        }

        return { type: 'gatekeeper', isBlocked, seals };
    }
}

/* ==========================================================================
   STRATEGY: COGNITIVE COACH (Weighted Scoring)
   ========================================================================== */
class CognitiveCoach {
    constructor(locale) {
        this.currentLocale = locale;
        this.config = LOCALE_CONFIG[locale];
        // Simplified config just for this class, no localStorage needed for "v3.0" MVP
        this.weights = {
            title: 1, format: 3, length: 1,
            ac_presence: 3, ac_quality: 2,
            persona: 1, value: 2
        };
        this.thresholds = { min: 50, max: 2000 };
    }

    setLocale(locale) {
        this.currentLocale = locale;
        this.config = LOCALE_CONFIG[locale];
    }

    analyze(title, content) {
        let totalScore = 0;
        let totalPossible = Object.values(this.weights).reduce((a, b) => a + b, 0);
        let categories = {
            'CLARITY': { score: 0, total: 0, feedback: [] },
            'TESTABILITY': { score: 0, total: 0, feedback: [] },
            'VALUE': { score: 0, total: 0, feedback: [] }
        };

        const addFeedback = (catKey, weight, result) => {
            const cat = categories[catKey];
            cat.total += weight;
            if (result.pass) {
                cat.score += weight;
                totalScore += weight;
                cat.feedback.push({ type: 'check', message: result.message, title: result.title });
            } else {
                if (result.partial) {
                    const p = weight * result.partial;
                    cat.score += p;
                    totalScore += p;
                }
                cat.feedback.push({
                    type: result.partial > 0 ? 'warning' : 'error',
                    message: result.message,
                    title: result.title
                });
            }
        };

        const msg = this.config.messages;
        const pat = this.config.patterns;

        // 1. Title (Clarity)
        addFeedback('CLARITY', this.weights.title,
            (title && title.length > 5)
                ? { pass: true, title: msg.titlePass, message: msg.titlePassMsg }
                : { pass: false, title: msg.titleFail, message: msg.titleFailMsg }
        );

        // 2. Format (Clarity)
        addFeedback('CLARITY', this.weights.format,
            pat.format.test(content)
                ? { pass: true, title: msg.formatPass, message: msg.formatPassMsg }
                : { pass: false, title: msg.formatFail, message: msg.formatFailMsg }
        );

        // 3. Length (Clarity)
        const len = content.length;
        let lenRes;
        if (len < this.thresholds.min) lenRes = { pass: false, title: msg.lenShort, message: msg.lenShortMsg };
        else if (len > this.thresholds.max) lenRes = { pass: false, title: msg.lenLong, message: msg.lenLongMsg };
        else lenRes = { pass: true, title: msg.lenGood, message: msg.lenGoodMsg };
        addFeedback('CLARITY', this.weights.length, lenRes);

        // 4. AC Presence (Testability)
        addFeedback('TESTABILITY', this.weights.ac_presence,
            pat.acKeyword.test(content)
                ? { pass: true, title: msg.acPass, message: msg.acPassMsg }
                : { pass: false, title: msg.acFail, message: msg.acFailMsg }
        );

        // 5. AC Quality (Testability)
        const matches = content.match(pat.listItems);
        const hasGherkin = pat.gherkin.test(content);
        let acQRes;
        if (matches && matches.length >= 3) acQRes = { pass: true, title: msg.acDetailed, message: `Found ${matches.length} items.` };
        else if (hasGherkin) acQRes = { pass: true, title: msg.acGherkin, message: msg.acGherkinMsg };
        else if (matches && matches.length > 0) acQRes = { pass: false, partial: 0.5, title: msg.acSparse, message: msg.acSparseMsg };
        else acQRes = { pass: false, title: msg.acUnhappy, message: msg.acUnhappyMsg };
        addFeedback('TESTABILITY', this.weights.ac_quality, acQRes);

        // 6. Persona (Value)
        addFeedback('VALUE', this.weights.persona,
            pat.lazyPersona.test(content)
                ? { pass: false, title: msg.personaFail, message: msg.personaFailMsg }
                : { pass: true, title: msg.personaPass, message: msg.personaPassMsg }
        );

        // 7. Value Statement (Value)
        const soThatMatch = content.match(pat.valueClause);
        let valRes;
        if (!soThatMatch) {
            valRes = { pass: false, title: msg.valueFail, message: msg.valueFailMsg };
        } else {
            const valStmt = soThatMatch[1].trim();
            const kws = this.config.keywords; // Already localized array
            const hits = kws.filter(k => valStmt.toLowerCase().includes(k.toLowerCase()));

            if (hits.length > 0) valRes = { pass: true, title: msg.valueStrong, message: `${msg.valueStrong}: ${[...new Set(hits)].join(', ')}.` };
            else if (valStmt.length < 15) valRes = { pass: false, title: msg.valueWeak, message: msg.valueWeakMsg };
            else valRes = { pass: true, partial: 0.5, title: msg.valueGeneric, message: msg.valueGenericMsg };
        }
        addFeedback('VALUE', this.weights.value, valRes);

        const finalScore = Math.round((totalScore / totalPossible) * 100);
        Object.keys(categories).forEach(k => {
            const c = categories[k];
            c.percent = c.total === 0 ? 0 : Math.round((c.score / c.total) * 100);
        });

        return { type: 'coach', score: finalScore, categories };
    }
}

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
        const saved = localStorage.getItem('iron_gatekeeper_v3');
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
    }

    saveState() {
        const state = {
            title: this.titleInput.value,
            content: this.contentInput.value,
            mode: this.currentMode,
            locale: this.currentLocale
        };
        localStorage.setItem('iron_gatekeeper_v3', JSON.stringify(state));
    }

    bindEvents() {
        // Mode Toggle
        this.modeToggle.addEventListener('change', (e) => {
            this.currentMode = e.target.checked ? 'COACH' : 'GATEKEEPER';
            this.updateModeUI();
            this.saveState();
        });

        document.getElementById('analyze-btn').addEventListener('click', () => this.runAnalysis());
        document.getElementById('clear-btn').addEventListener('click', () => {
            this.clear();
            this.saveState();
        });
        document.getElementById('load-btn').addEventListener('click', () => {
            this.loadExample();
            this.saveState();
        });
        document.getElementById('copy-jira-btn').addEventListener('click', () => this.copyToJira());

        // Autosave inputs
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
            const d = document.createElement('div');
            d.className = `seal-item ${seal.status}`;
            d.innerHTML = `
                <div class="seal-icon">${seal.status === 'pass' ? '🛡️' : '💔'}</div>
                <div class="seal-content">
                    <h4>${seal.name}</h4>
                    <p class="seal-status-msg"><strong>${seal.title}</strong></p>
                    <p class="seal-desc">${seal.msg}</p>
                </div>`;
            list.appendChild(d);
        });
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
            const sec = document.createElement('div');
            sec.className = 'category-section';

            let html = `
                <div class="category-header">
                    <h4>${uiConfig['cat' + cat]}</h4>
                    <div class="category-score">
                        <span class="cat-percent">${data.percent}%</span>
                        <div class="cat-bar"><div class="cat-fill" style="width: ${data.percent}%"></div></div>
                    </div>
                </div>
                <div class="category-feed">`;

            if (data.feedback.length === 0) {
                html += `<div class="feedback-item item-neutral">No issues found.</div>`;
            } else {
                data.feedback.forEach(f => {
                    const icon = f.type === 'check' ? '✓' : f.type === 'warning' ? '!' : '✕';
                    html += `
                        <div class="feedback-item item-${f.type}">
                            <div class="feedback-icon">${icon}</div>
                            <div class="feedback-content">
                                <h5>${f.title}</h5>
                                <p>${f.message}</p>
                            </div>
                        </div>`;
                });
            }
            html += `</div>`;
            sec.innerHTML = html;
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
        // Reuse simple logic
        const content = this.contentInput.value;
        const title = this.titleInput.value;
        if (!content) return;
        let jiraBody = `h2. Story: ${title}\n\n` + content; // simplified
        try {
            await navigator.clipboard.writeText(jiraBody);
            alert(LOCALE_CONFIG[this.currentLocale].ui.btnJiraCopied);
        } catch (e) { alert("Error copying"); }
    }
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    window.app = new AppController();
});
