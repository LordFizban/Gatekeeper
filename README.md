# The Iron Gatekeeper
**Current Version:** v3.3 (Hardened Security)

**The Iron Gatekeeper** is a "Dr. Jekyll & Mr. Hyde" tool for Agile teams. It combines a strict **Enforcement Engine** (Gatekeeper) with a nuanced **Coaching Engine** (Story Coach) to support teams at every stage of maturity.

---

## ☯️ Philosophy: The Shu-Ha-Ri Model

We believe that "one size fits all" tools fail because teams evolve.
*   **Shu (守) - Follow the Rule**: New teams need clear, rigid boundaries to feel safe. They need strict enforcement to learn the basics of a User Story.
*   **Ha (破) - Break the Rule**: Mature teams find strict rules insulting. They need coaching and scoring to help them refine quality, not just "pass" a check.

**The Iron Gatekeeper v3** solves this by offering two distinct modes in one application:

### 1. 💪 Power Mode (Gatekeeper) - *The Shu*
*   **Logic**: Binary Pass/Fail Logic (The 6 Seals).
*   **Theme**: Dark Fantasy / Strict Discipline.
*   **Goal**: Stop "Lazy User Stories" from entering Refinement.

### 2. 🧠 Coach Mode (Story Coach) - *The Ha/Ri*
*   **Logic**: Weighted Scoring (0-100%).
*   **Theme**: Modern SaaS / Nuanced Guidance.
*   **Goal**: Improve clarity and value. "Good is the enemy of Great."

---

## 🇹🇷 Türkçe Özet (Turkish Summary)

**The Iron Gatekeeper**, Agile takımlarının olgunluk seviyesine göre şekil değiştiren çift modlu bir "Hazır Tanımı" (DoR) aracıdır.

### Modlar
1.  **💪 Güç Modu (Bekçi)**: Sert kurallar. "6 Mühür" sistemi ile hikayeleri kontrol eder. Eksik varsa hikayeyi **REDDEDER**. Disiplin sağlar.
2.  **🧠 Koç Modu**: Puanlama sistemi. Hikayeyi 0-100 arasında puanlar. Yapıcı geri bildirimler verir. Kaliteyi artırır.

### Güncel Güvenlik (v3.3)
Analiz sonuçları artık **XSS saldırılarına karşı korumalıdır** ve verileriniz gizlilik için sadece **oturum bazlı (sessionStorage)** saklanır.

---

## 🚀 Key Features

*   **Dual-Mode Engine**: Instantly toggle between "Power" and "Coach" modes without losing data.
*   **Zero-Backend**: 100% Client-side. No data is ever sent to a server. Secure by design.
*   **Jira Integration**: "Copy to Jira" button formats your story with headers and bullets automatically.

### ⚔️ The 6 Seals (Power Mode)
In **Power Mode**, we enforce six strict mandatory criteria:
1. **Identity 🆔**: Title > 10 chars.
2. **Value 💎**: Must contain "So that" / "Böylece".
3. **Victory ⚔️**: Minimum 3 AC bullets or Gherkin.
4. **Terrain ⛰️**: Dependency links.
5. **Cost 💰**: Estimation/Points.
6. **Evidence 📜**: Figma/Mockup links.

---

## 🏗️ Architecture & Security

The v3.3 release focuses on the **Strategy Pattern** and the **Hardened Perimeter**:
*   **AppController**: Manages state (Mode, Locale) and sanitized DOM updates.
*   **Sanitization**: All output is rendered via textContent (DOM Hardening).
*   **Privacy**: State is isolated to sessionStorage.

---

## 📜 Version History & Release Notes

### v3.3: Hardened Perimeter (Current)
- **DOM Hardening**: XSS mitigation via sanitized rendering.
- **Privacy Lock**: Moved to sessionStorage for automatic data purging.

### v3.2: Structure & Time Travel
- **Modular Core**: Split into IronGuard.js, CognitiveCoach.js, AppController.js.
- **Snapshot History**: Added a 5-step Undo stack.
- **Visuals**: Fixed Turkish encoding and colorful emojis.

### v3.1: Memory & Reliability
- Added localStorage persistence (v3.3 has since upgraded this to sessionStorage).
- Integrated test.html test suite.

### v3.0: Dual-Mode Architecture
- Introduction of the Shu-Ha-Ri multi-engine strategy.

