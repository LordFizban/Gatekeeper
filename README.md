# The Iron Gatekeeper
**Current Version:** v3.4 (Strategic Intelligence)

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
*   **Logic**: Weighted Scoring (0-100%) + **Strategic Value Intelligence**.
*   **Theme**: Modern SaaS / Nuanced Guidance.
*   **Goal**: Improve clarity and value. "Good is the enemy of Great."

---

## 🇹🇷 Türkçe Özet (Turkish Summary)

**The Iron Gatekeeper**, Agile takımlarının olgunluk seviyesine göre şekil değiştiren çift modlu bir "Hazır Tanımı" (DoR) aracıdır.

### Modlar
1.  **💪 Güç Modu (Bekçi)**: Sert kurallar. "6 Mühür" sistemi ile hikayeleri kontrol eder. Eksik varsa hikayeyi **REDDEDER**. Disiplin sağlar.
2.  **🧠 Koç Modu**: Puanlama sistemi. Hikayeyi 0-100 arasında puanlar.
    *   **YENİ: Stratejik Değer**: Hikayenizin türünü (İnovasyon, Verimlilik vb.) seçin.
    *   **Akıllı Doğrulama**: Seçtiğiniz değeri kanıtlarsanız (örn. Verimlilik için "%" veya "tasarruf" yazmak) **+10 Bonus Puan** kazanırsınız.

### Güncel Özellikler (v3.4)
*   **Yerelleştirilmiş Değer Seçimi**: Stratejik Değer menüsü artık tamamen Türkçe.
*   **Unicode Desteği**: Tüm Türkçe karakterler sorunsuz görüntülenir.

---

## 🚀 Key Features

*   **Dual-Mode Engine**: Instantly toggle between "Power" and "Coach" modes without losing data.
*   **Zero-Backend**: 100% Client-side. No data is ever sent to a server. Secure by design.
*   **Jira Integration**: "Copy to Jira" button formats your story with headers and bullets automatically.

### ✨ NEW: Strategic Value Intelligence (Coach Mode)
We declare *why* we are building features. Select a Value Type to enable **Smart Validation**:
*   **🚀 Innovation / Growth**: Focus on "new", "launch", "feature".
*   **⚡ Efficiency / Cost Cut**: Focus on "%", "save", "reduce".
*   **🛡️ Retention / Fix**: Focus on "bug", "fix", "stable".
*   **⚖️ Compliance / Mandatory**: Focus on "legal", "audit", "rule".
*   *Bonus Points awarded if your 'So that' clause matches your intent!*

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

The v3 architecture focuses on the **Strategy Pattern** and the **Hardened Perimeter**:
*   **AppController**: Manages state (Mode, Locale) and sanitized DOM updates.
*   **Sanitization**: All output is rendered via textContent (DOM Hardening).
*   **Privacy**: State is isolated to sessionStorage.
*   **Unicode-Safe**: Full support for international character sets via explicit escape sequences.

---

## 📜 Version History & Release Notes

### v3.4: Strategic Intelligence (Current)
- **Value Delivery**: **Strategic Alignment**. Teams can now categorize value (Innovation vs Efficiency) and get scored on their alignment.
- **Smart Validation**: Scoring engine now awards bonuses for proving value intent.
- **Bulletproof Localization**: Rewrote text handling with Unicode sequences to permanently solve character encoding issues (TR).
- **UI Refinement**: "Value Type" dropdown is context-aware and hides in Gatekeeper mode to reduce noise.

### v3.3: Hardened Perimeter
- **Value Delivery**: **Enterprise Data Protection**. Ensures no sensitive data is persisted on-disk and protects against XSS injection attacks.
- **Security Check**: DOM Hardening via sanitized rendering.
- **Privacy Lock**: Transitioned to sessionStorage for automatic cleanup.

### v3.2: Structure & Time Travel
- **Value Delivery**: **Sustainability & Flow Resilience**. Prevents rework via "Undo" and ensures the codebase can scale without technical debt.
- **Modular Core**: Clean decoupling of logic engines.
- **Snapshot History**: 5-step Undo stack for incident recovery.

### v3.1: Memory & Reliability
- **Value Delivery**: **Waste Reduction**. Prevents loss of progress via drafts and ensures build stability via automated tests.
- **Persistence**: Added localStorage support (now upgraded to session-based in v3.3).
