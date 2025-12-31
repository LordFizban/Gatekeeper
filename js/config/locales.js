/* ==========================================================================
   LOCALE CONFIGURATION
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
            btnJira: "Copy to Jira \u{1F4CB}", btnJiraCopied: "Copied! \u{2705}",
            btnFixSeals: "Fix Broken Seals \u{1F6D1}",

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
            modeGK: "\u{1F4AA}\u{FE0F} Power",
            modeCoach: "\u{1F9E0}\u{FE0F} Coach",

            // History
            btnUndo: "Undo \u{23EA}"
        }
    },
    tr: {
        patterns: {
            format: /(.+)\s+Olarak\s*,?\s*(.+)\s+İstiyorum\s*,?\s*Böylece\s+(.+)/is,
            lazyPersona: /(?<!Kayıtlı\s+)(Kullanıcı|Yönetici|Admin)\s+Olarak/i,
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
            btnJira: "Jira'ya Kopyala \u{1F4CB}", btnJiraCopied: "Kopyalandı! \u{2705}",
            btnFixSeals: "Mühürleri Onar \u{1F6D1}",

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
            modeGK: "\u{1F4AA}\u{FE0F} Güç",
            modeCoach: "\u{1F9E0}\u{FE0F} Koç",

            // History
            btnUndo: "Geri Al \u{23EA}"
        }
    }
};
