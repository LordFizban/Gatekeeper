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
