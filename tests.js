
// Global Error Handler for Test Runner
window.onerror = function (msg, url, lineNo, columnNo, error) {
    const results = document.getElementById('results');
    if (results) {
        const div = document.createElement('div');
        div.className = 'test-item fail';
        div.innerHTML = '\u{1F6E1} <strong>RUNTIME ERROR</strong>: <br> <small>:' + (e ? e.message : 'Unknown') + '</small>';
        results.appendChild(div);
    }
    return false;
};

// Simple Test Harness
const runTest = (name, fn) => {
    const results = document.getElementById('results');
    const div = document.createElement('div');
    div.className = 'test-item';
    try {
        fn();
        div.classList.add('pass');
        div.innerHTML = '\u2705 <strong>PASS</strong>: ' + name;
    } catch (e) {
        div.classList.add('fail');
        div.innerHTML = '\u274C <strong>FAIL</strong>: ' + name + '<br><small>' + e.message + '</small>';
        console.error(e);
    }
    results.appendChild(div);
};

const assert = (condition, message) => {
    if (!condition) throw new Error(message || "Assertion failed");
};

// MOCK STORAGE
const mockLocal = {};
const mockSession = {};
Object.defineProperty(window, 'localStorage', {
    value: {
        getItem: (key) => mockLocal[key] || null,
        setItem: (key, val) => mockLocal[key] = val,
        clear: () => { for (let k in mockLocal) delete mockLocal[k]; }
    }
});
Object.defineProperty(window, 'sessionStorage', {
    value: {
        getItem: (key) => mockSession[key] || null,
        setItem: (key, val) => mockSession[key] = val,
        clear: () => { for (let k in mockSession) delete mockSession[k]; }
    }
});

// START TESTS
window.addEventListener('load', () => {

    try {
        console.log("\u{1F6E1} Starting Tests...");

        // Initialize App
        const app = new AppController();

        // --- 1. IRON GUARD TESTS ---
        runTest('IG: Clean Story should PASS', () => {
            const title = "Valid Story Title Check";
            const content = "As a user, I want X, So that Y.\n\nAcceptance Criteria:\n- item 1\n- item 2\n- item 3\n\nDependencies:\n- None\n\nEstimation:\n- 35\n\nEvidence:\n- Figma Link";

            document.getElementById('check-refinement').checked = true;
            document.getElementById('check-alignment').checked = true;

            const res = app.ironGuard.analyze(title, content, { refinement: true, alignment: true });
            assert(!res.isBlocked, "Story should not be blocked");
        });

        runTest('IG: Missing "So that" should FAIL', () => {
            const title = "Valid Story Title Check";
            const content = "As a user, I want X.\n\nAcceptance Criteria:\n- item 1\n- item 2\n- item 3\n\nDependencies:\n- None\n\nEstimation:\n- 35";

            const res = app.ironGuard.analyze(title, content, { refinement: true, alignment: true });
            assert(res.isBlocked, "Story MUST be blocked");
            const failSeal = res.seals.find(s => s.name.includes('Seal of Value'));
            assert(failSeal && failSeal.status === 'fail', "Seal of Value should be broken");
        });

        // --- 2. COACH TESTS ---
        runTest('CO: Good Story Score > 50', () => {
            const title = "Clarify User Login Flow";
            const content = "As a Registered User, I want to login, So that I can access my data securely.\n\nAcceptance Criteria:\n- Enter email\n- Enter pass\n- Click login\n\nDependencies:\n- None";

            const res = app.cognitiveCoach.analyze(title, content);
            assert(res.score > 50, "Score too low: " + res.score);
        });

        // --- 3. PERSISTENCE TESTS (v3.3 Update: sessionStorage) ---
        runTest('SYS: Saves to sessionStorage (Not localStorage)', () => {
            // Clear both
            for (let k in mockLocal) delete mockLocal[k];
            for (let k in mockSession) delete mockSession[k];

            app.titleInput.value = "Session Story";
            app.saveState();

            assert(!mockLocal['iron_gatekeeper_v3'], "Should NOT save to localStorage");
            const jsonStr = mockSession['iron_gatekeeper_v3'];
            assert(jsonStr, "Data should be in sessionStorage");
            const json = JSON.parse(jsonStr);
            assert(json.title === "Session Story", "Content mismatch");
        });

        // --- 4. HISTORY TESTS ---
        runTest('HIST: Stack Limit 5', () => {
            app.history = []; // reset
            for(let i=1; i<=7; i++) {
                app.titleInput.value = "Title " + i;
                app.contentInput.value = "Content " + i;
                app.pushHistory(); // Simulate save trigger
            }
            assert(app.history.length === 5, `"History should be capped at 5, got `" + app.history.length);
            assert(app.history[4].title === "Title 7", `"Last item should be Title 7, got `" + app.history[4].title);
            assert(app.history[0].title === "Title 3", `"First item should be Title 3 (shifted), got `" + app.history[0].title);
        });

        runTest('HIST: Restore works', () => {
             app.history = [];
             app.titleInput.value = "Original";
             app.contentInput.value = "Original Content";
             app.pushHistory();

             app.titleInput.value = "Modified";
             app.contentInput.value = "Modified Content";
             // Now pop explicitly
             
             app.popHistory();
             assert(app.titleInput.value === "Original", "Should restore title to Original");
             assert(app.contentInput.value === "Original Content", "Should restore content");
        });

                runTest('FIX: Coach Mode Ring should have correct offset', () => {
            const result = {
                score: 46,
                categories: {
                    'CLARITY': { percent: 40, feedback: [] },
                    'TESTABILITY': { percent: 60, feedback: [] },
                    'VALUE': { percent: 33, feedback: [] }
                }
            };
            app.renderCoachResults(result);
            const ring = document.querySelector('.progress-ring__circle');
            const radius = ring.r.baseVal.value;
            const circumference = radius * 2 * Math.PI;
            const expectedOffset = circumference - (46 / 100 * circumference);
            const actualOffset = parseFloat(ring.style.strokeDashoffset);
            
            // Tolerance for float comparison
            assert(Math.abs(actualOffset - expectedOffset) < 1, "Offset mismatch!");
            assert(ring.style.strokeDasharray.includes(circumference.toString().split('.')[0]), "DashArray not set properly");
        });

        // --- 5. DOM HARDENING (XSS) TESTS ---
        runTest('XSS: Gatekeeper results should neutralize script tags', () => {
            const maliciousResult = {
                type: 'gatekeeper',
                isBlocked: true,
                seals: [{
                    name: 'Identity',
                    status: 'fail',
                    title: 'Broken Header',
                    msg: '<img src=x onerror=alert(1)>' // Malicious payload
                }]
            };
            app.renderGatekeeperResults(maliciousResult);
            
            const list = document.getElementById('gk-feedback-list');
            const desc = list.querySelector('.seal-desc');
            // If textContent is used, it should literally show the tag
            assert(desc.innerHTML.includes('&lt;img'), "Tag should be escaped/neutralized");
            assert(desc.textContent.includes('<img src=x'), "Payload should be literal text");
            assert(desc.querySelector('img') === null, "No image element should be created from payload");
        });

        runTest('XSS: Coach feedback should neutralize script tags', () => {
            const maliciousCoach = {
                score: 10,
                categories: {
                    'CLARITY': { percent: 10, feedback: [{ type: 'fail', title: 'XSS', message: '<script>alert(1)</script>' }] }
                }
            };
            app.renderCoachResults(maliciousCoach);
            const list = document.getElementById('coach-feedback-list');
            const feedbackItem = list.querySelector('.feedback-content p');
            assert(feedbackItem.querySelector('script') === null, "No script element should be injected");
        });

    } catch (criticalError) {
        const results = document.getElementById('results');
        const div = document.createElement('div');
        div.className = 'test-item fail';
        div.innerHTML = '\u{1F6E1} <strong>CRITICAL FAIL</strong>: ' + (criticalError ? criticalError.message : 'Unknown');
        results.appendChild(div);
    }
});

