
// Global Error Handler for Test Runner
window.onerror = function (msg, url, lineNo, columnNo, error) {
    const results = document.getElementById('results');
    if (results) {
        const div = document.createElement('div');
        div.className = 'test-item fail';
        div.innerHTML = `⚠️ <strong>RUNTIME ERROR</strong>: ${msg} <br> <small>${url}:${lineNo}</small>`;
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
        div.innerHTML = `✅ <strong>PASS</strong>: ${name}`;
    } catch (e) {
        div.classList.add('fail');
        div.innerHTML = `❌ <strong>FAIL</strong>: ${name} <br> <small>${e.message}</small>`;
        console.error(e);
    }
    results.appendChild(div);
};

const assert = (condition, message) => {
    if (!condition) throw new Error(message || "Assertion failed");
};

// MOCK LOCALSTORAGE
const mockStorage = {};
Object.defineProperty(window, 'localStorage', {
    value: {
        getItem: (key) => mockStorage[key] || null,
        setItem: (key, val) => mockStorage[key] = val,
        clear: () => { for (let k in mockStorage) delete mockStorage[k]; }
    }
});

// START TESTS
window.addEventListener('load', () => {

    try {
        console.log("🚀 Starting Tests...");

        // Initialize App
        // We need to ensure we don't conflict with the main window.app if it exists
        const app = new AppController();

        // --- 1. IRON GUARD TESTS ---
        runTest('IG: Clean Story should PASS', () => {
            const title = "Valid Story Title Check";
            const content = "As a user, I want X, So that Y.\n\nAcceptance Criteria:\n- item 1\n- item 2\n- item 3\n\nDependencies:\n- None\n\nEstimation:\n- 35\n\nEvidence:\n- Figma Link";

            // Mock checkboxes
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
            assert(res.score > 50, `Score too low: ${res.score}`);
        });

        // --- 3. PERSISTENCE TESTS ---
        runTest('SYS: Saves to LocalStorage', () => {
            app.titleInput.value = "Saved Title";
            app.saveState();

            // Note: Since we mocked localStorage above, we check our mock
            const jsonStr = mockStorage['iron_gatekeeper_v3'];
            assert(jsonStr, "No data written to storage");
            const json = JSON.parse(jsonStr);
            assert(json.title === "Saved Title", "Title did not save to storage");
        });

    } catch (criticalError) {
        const results = document.getElementById('results');
        const div = document.createElement('div');
        div.className = 'test-item fail';
        div.innerHTML = `🛑 <strong>CRITICAL FAIL</strong>: ${criticalError.message}`;
        results.appendChild(div);
    }
});
