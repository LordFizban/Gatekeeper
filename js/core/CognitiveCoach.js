/* ==========================================================================
   STRATEGY: COGNITIVE COACH (Weighted Scoring)
   ========================================================================== */
class CognitiveCoach {
    constructor(locale) {
        this.currentLocale = locale;
        this.config = LOCALE_CONFIG[locale];
        // Simplified config just for this class
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
        if (matches && matches.length >= 3) acQRes = { pass: true, title: msg.acDetailed, message: msg.acFoundItems.replace('{0}', matches.length) };
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
