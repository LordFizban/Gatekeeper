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
            listItems: /^\s*(-|\*|\d+\.|\u2022)\s*.+/gm, // stricter start-of-line check for GK, general for Coach

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
            acFoundItems: "Found {0} items.",
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

            // Value Type Options
            labelValueType: "Strategic Value",
            optSelectValue: "Select Value Type...",
            type_innovation: "\u{1F680} Innovation / Growth",
            type_retention: "\u{1F6E1}\u{FE0F} Retention / Fix",
            type_compliance: "\u{2696}\u{FE0F} Compliance / Mandatory",
            type_efficiency: "\u{26A1} Efficiency / Cost Cut",

            // History
            btnUndo: "Undo \u{23EA}"
        }
    },
    tr: {
        patterns: {
            format: /(.+)\s+Olarak\s*,?\s*(.+?)(?:\s+\u0130stiyorum)?\s*,?\s*B\u00f6ylece\s+(.+)/is,
            lazyPersona: /(?<!Kay\u0131tl\u0131\s+)(Kullan\u0131c\u0131|Y\u00f6netici|Admin)\s+Olarak/i,
            valueClause: /B\u00f6ylece\s+(.+)/i,
            acKeyword: /(Kabul Kriterleri|Kabul \u015eartlar\u0131|ACs)/i,
            gherkin: /(Diyelim ki|E\u011fer ki|O zaman)/i,
            listItems: /^\s*(-|\*|\d+\.|\u2022)\s*.+/gm,
            terrain: /(Ba\u011f\u0131ml\u0131l\u0131klar|Riskler|Teknik Notlar|Notlar|\u00d6n ko\u015fullar)/i,
            terrainNone: /(Yok|None|Bulunmuyor)/i,
            link: /(http|https|jira|confluence|\.com|\.org)/i,
            cost: /(Tahmin|Puan|Efor|Karma\u015f\u0131kl\u0131k|Story Points)/i,
            evidence: /(Figma|Mockup|Ekran|Screenshot|G\u00f6rsel|Tasar\u0131m|Draw\.io|Miro|Confluence|Analiz)/i
        },
        keywords: [
            'gelir', 'kar', 'tasarruf', 'maliyet', 'kay\u0131p', 'sadakat',
            'd\u00f6n\u00fc\u015f\u00fcm', 'uyumluluk', 'yasal', 'denetim', 'performans',
            'gecikme', '\u00f6l\u00e7ek', 'kullan\u0131c\u0131 deneyimi', 'ux', 'verimlilik',
            'otomasyon', 'manuel', 'zaman', 'risk', 'h\u0131z', 'g\u00fcvenlik'
        ],
        messages: {
            // Gatekeeper
            seal0Name: "Kimlik M\u00fchr\u00fc", seal0Pass: "Ba\u015fl\u0131k Ge\u00e7erli", seal0Fail: "REDDED\u0130LD\u0130: Ge\u00e7ersiz Ba\u015fl\u0131k",
            seal0MsgPass: "Ba\u015fl\u0131k net ve a\u00e7\u0131klay\u0131c\u0131.", seal0MsgFail: "Ba\u015fl\u0131k en az 10 karakter olmal\u0131d\u0131r.",

            seal1Names: "De\u011fer M\u00fchr\u00fc", seal1Pass: "De\u011fer Tan\u0131mland\u0131", seal1Fail: "REDDED\u0130LD\u0130: De\u011fer \u0130fadesi Eksik",
            seal1MsgPass: "'B\u00f6ylece' ifadesi mevcut.", seal1MsgFail: "Bir 'B\u00f6ylece' (So that) c\u00fcmlesi \u0130\u00c7ERMEL\u0130D\u0130R.",

            seal2Name: "Zafer M\u00fchr\u00fc", seal2Pass: "Zafer Ko\u015fullar\u0131 Sa\u011fland\u0131", seal2Fail: "REDDED\u0130LD\u0130: Zafer Ko\u015fullar\u0131 Belirsiz",
            seal2MsgPass: "Kabul Kriterleri do\u011fru tan\u0131mlanm\u0131\u015f.", seal2MsgFail: "'Kabul Kriterleri' VE (3+ madde VEYA Gherkin) olmal\u0131d\u0131r.",

            seal3Name: "Arazi M\u00fchr\u00fc", seal3Pass: "Arazi Tarand\u0131", seal3Fail: "REDDED\u0130LD\u0130: Hatal\u0131 Ba\u011f\u0131ml\u0131l\u0131k",
            seal3MsgPass: "Ba\u011f\u0131ml\u0131l\u0131k b\u00f6l\u00fcm\u00fc ge\u00e7erli (Link var veya 'Yok').", seal3MsgFail: "Ba\u011f\u0131ml\u0131l\u0131klar bir L\u0130NK i\u00e7ermeli veya 'Yok' yaz\u0131lmal\u0131.",
            seal3Missing: "REDDED\u0130LD\u0130: Arazi B\u00f6l\u00fcm\u00fc Eksik", seal3MsgMissing: "'Ba\u011f\u0131ml\u0131l\u0131klar' b\u00f6l\u00fcm\u00fc eklenmelidir.",

            seal4Name: "Maliyet M\u00fchr\u00fc", seal4Pass: "Maliyet Tahmin Edildi", seal4Fail: "REDDED\u0130LD\u0130: Tahmin Eksik",
            seal4MsgPass: "Tahmin/Puan b\u00f6l\u00fcm\u00fc bulundu.", seal4MsgFail: "'Tahmin' veya 'Puan' b\u00f6l\u00fcm\u00fc eklenmelidir.",

            seal5Name: "Kan\u0131t M\u00fchr\u00fc", seal5Pass: "Kan\u0131tlar Tamam", seal5Fail: "REDDED\u0130LD\u0130: Kan\u0131t Eksik",
            seal5MsgPass: "Tasar\u0131m/Dok\u00fcman referans\u0131 bulundu.", seal5MsgFail: "Figma, Ekran, Confluence veya Analiz'den bahsedilmeli.",

            ritualNames: "Rit\u00fcel Kontrol\u00fc", ritualFail: "REDDED\u0130LD\u0130: Rit\u00fceller Tamamlanmad\u0131", ritualMsgFail: "Refinement ve Hizalanma onaylanmal\u0131.",

            // Coach
            titlePass: "Ba\u015fl\u0131k Mevcut", titlePassMsg: "A\u00e7\u0131klay\u0131c\u0131 bir ba\u015fl\u0131k sa\u011flad\u0131\u011f\u0131n\u0131z i\u00e7in te\u015fekk\u00fcrler.",
            titleFail: "Ba\u015fl\u0131k Eksik", titleFailMsg: "Net bir ba\u015fl\u0131k hikayeyi tan\u0131mlamaya yard\u0131mc\u0131 olur.",
            formatPass: "Standart Format", formatPassMsg: "Standart \u015fablona uyuyor.",
            formatFail: "Hatal\u0131 Format", formatFailMsg: "\u015eunu deneyin: '[Rol] Olarak, [\u0130stek] \u0130stiyorum, B\u00f6ylece [Fayda]'.",
            acPass: "Kabul Kriterleri Bulundu", acPassMsg: "A\u00e7\u0131k bir Kabul Kriterleri b\u00f6l\u00fcm\u00fc tespit edildi.",
            acFail: "Kabul Kriterleri Eksik", acFailMsg: "'Kabul Kriterleri' b\u00f6l\u00fcm\u00fc bulunamad\u0131.",
            acDetailed: "Detayl\u0131 Kriterler",
            acFoundItems: "{0} madde bulundu.",
            acGherkin: "Gherkin S\u00f6zdizimi", acGherkinMsg: "Davran\u0131\u015f Odakl\u0131 Geli\u015ftirme (BDD) stili kullan\u0131l\u0131yor.",
            acSparse: "Seyrek Kriterler", acSparseMsg: "\u00c7ok az kabul kriteri bulundu.",
            acUnhappy: "Mutsuz Yol", acUnhappyMsg: "Net madde i\u015faretleri tespit edilemedi.",
            lenShort: "\u00c7ok K\u0131sa", lenShortMsg: "Hikaye haz\u0131r olmak i\u00e7in \u00e7ok k\u0131sa g\u00f6r\u00fcn\u00fcor.",
            lenLong: "\u00c7ok Uzun", lenLongMsg: "Hikaye \u00e7ok karma\u015f\u0131k olabilir. B\u00f6lmeyi d\u00fc\u015f\u00fcn\u00fcn.",
            lenGood: "\u0130yi Uzunluk", lenGoodMsg: "Hikaye uzunlu\u011fu makul.",
            personaFail: "Mu\u011flak Persona", personaFailMsg: "'Kullan\u0131c\u0131' gibi genel personalardan ka\u00e7\u0131n\u0131n.",
            personaPass: "Belirgin Persona", personaPassMsg: "Belirgin bir persona kulland\u0131\u011f\u0131n\u0131z i\u00e7in tebrikler.",
            valueFail: "De\u011fer Eksik", valueFailMsg: "'B\u00f6ylece' ifadesi \u00e7ok \u00f6nemlidir.",
            valueStrong: "G\u00fc\u00e7l\u00fc \u0130\u015f De\u011feri",
            valueWeak: "Zay\u0131f De\u011fer", valueWeakMsg: "De\u011fer ifadesi \u00e7ok mu\u011flak.",
            valueGeneric: "Genel De\u011fer", valueGenericMsg: "De\u011fer ifadesi mevcut ama daha g\u00fc\u00e7l\u00fc olabilir."
        },
        ui: {
            titleSuffix_GK: "Bek\u00e7isi",
            titleSuffix_Coach: "Ko\u00e7u",
            subtitle: "\u00c7ift Modlu Haz\u0131r Tan\u0131m\u0131 (DoR) Do\u011frulamas\u0131.",

            labelTitle: "Hikaye Ba\u015fl\u0131\u011f\u0131", phTitle: "\u00d6rn., Google ile Giri\u015f Yapma",
            labelContent: "Hikaye Tan\u0131m\u0131 ve Kriterler",
            labelAC: "(Format: B\u00f6ylece, KK, Ba\u011f\u0131ml\u0131l\u0131klar, Tahmin)",
            phContent: "[Rol] Olarak, [\u0130stek] \u0130stiyorum, B\u00f6ylece [Fayda]...\\n\\nKabul Kriterleri:\\n- Kriter 1\\n- Kriter 2\\n\\nBa\u011f\u0131ml\u0131l\u0131klar:\\n- Yok\\n\\nTahmin:\\n- 3 Puan",

            btnAnalyze: "Analiz Et",
            btnDemo: "\u00d6rnek Y\u00fckle",
            btnClear: "Temizle",
            btnJira: "Jira'ya Kopyala \u{1F4CB}", btnJiraCopied: "Kopyaland\u0131! \u{2705}",
            btnFixSeals: "M\u00fchrleri Onar \u{1F6D1}",

            stampPass: "D\u00d6K\u00dcMHANE \u0130\u00c7\u0130N HAZIR",
            stampFail: "REDDED\u0130LD\u0130",

            checkRefinement: "Refinement Yap\u0131ld\u0131?",
            checkAlignment: "Ba\u011f\u0131ml\u0131l\u0131k Hizaland\u0131?",

            labelScore: "DoR Puan\u0131",
            catCLARITY: "Netlik", catTESTABILITY: "Test Edilebilirlik", catVALUE: "De\u011fer",

            headerCriteria: "6 M\u00fch\u00fcr",
            refSeal0Title: "Kimlik", refSeal0Desc: "Ba\u015fl\u0131k",
            refSeal1Title: "De\u011fer", refSeal1Desc: "B\u00f6ylece...",
            refSeal2Title: "Zafer", refSeal2Desc: "3+ KK",
            refSeal3Title: "Arazi", refSeal3Desc: "Linkler",
            refSeal4Title: "Maliyet", refSeal4Desc: "Puan",
            refSeal5Title: "Kan\u0131t", refSeal5Desc: "Belge",

            modeLabel: "Mod:",
            modeGK: "\u{1F4AA}\u{FE0F} G\u00fc\u00e7",
            modeCoach: "\u{1F9E0}\u{FE0F} Ko\u00e7",

            // Value Type Options
            labelValueType: "Stratejik De\u011fer",
            optSelectValue: "De\u011fer T\u00fcr\u00fc Se\u00e7...",
            type_innovation: "\u{1F680} \u0130novasyon / B\u00fcy\u00fcme",
            type_retention: "\u{1F6E1}\u{FE0F} Koruma / D\u00fczeltme",
            type_compliance: "\u{2696}\u{FE0F} Uyumluluk / Zorunlu",
            type_efficiency: "\u{26A1} Verimlilik / Tasarruf",

            // History
            btnUndo: "Geri Al \u{23EA}"
        }
    }
};