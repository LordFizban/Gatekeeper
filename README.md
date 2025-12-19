# The Iron Gatekeeper
**Current Version:** v3.0 (Dual-Mode)

**The Iron Gatekeeper** is a "Dr. Jekyll & Mr. Hyde" tool for Agile teams. It combines a strict **Enforcement Engine** (Gatekeeper) with a nuanced **Coaching Engine** (Story Coach) to support teams at every stage of maturity.

---

## ☯️ Philosophy: The Shu-Ha-Ri Model

We believe that "one size fits all" tools fail because teams evolve.
*   **Shu (守) - Follow the Rule**: New teams need clear, rigid boundaries to feel safe. They need strict enforcement to learn the basics of a User Story.
*   **Ha (破) - Break the Rule**: Mature teams find strict rules insulting. They need coaching and scoring to help them refine quality, not just "pass" a check.

**The Iron Gatekeeper v3** solves this by offering two distinct modes in one application:

### 1. 🛡️ Power Mode (Gatekeeper) - *The Shu*
*   **Persona**: The Strict Enforcer.
*   **Logic**: Binary Pass/Fail Logic (The 6 Seals).
*   **Theme**: Dark Fantasy.
*   **Goal**: Stop "Lazy User Stories" from entering Refinement.
*   **Best For**: New teams, strict contracts, or when process discipline has slipped.

### 2. 🧠 Coach Mode (Story Coach) - *The Ha*
*   **Persona**: The Nuanced Guide.
*   **Logic**: Weighted Scoring (0-100%).
*   **Theme**: Modern SaaS (Light/Clean).
*   **Goal**: Improve clarity and value. "Good is the enemy of Great."
*   **Best For**: Mature teams, drafting sessions, and retrospective quality reviews.

---

## 🚀 Key Features

*   **Dual-Mode Engine**: Instantly toggle between "Power" and "Coach" modes without losing data.
*   **Zero-Backend**: 100% Client-side. No data is ever sent to a server. Secure by design.
*   **Localization 🌍**: Full support for **English (🇺🇸)** and **Turkish (🇹🇷)**.
*   **Jira Integration**: "Copy to Jira" button formats your story with headers and bullets automatically.

---

## ⚔️ The 6 Seals (Power Mode)

In **Power Mode**, the application enforces six strict mandatory criteria:

1.  **Seal of Identity 🆔**: Title must be descriptive (>10 chars).
2.  **Seal of Value 💎**: Must contain a "So that" / "Böylece" clause.
3.  **Seal of Victory ⚔️**: Must have at least 3 distinct Acceptance Criteria bullets OR Gherkin syntax.
4.  **Seal of Terrain ⛰️**: Must have a "Dependencies" section with valid Links (Jira/Confluence).
5.  **Seal of Cost 💰**: Must include an Estimation or Points section.
6.  **Seal of Evidence 📜**: Must reference external assets (Figma, Mockups, Tech Analysis).

---

## 📊 DoR Scoring (Coach Mode)

In **Coach Mode**, the strict gates are removed. Instead, the story is analyzed for quality:

*   **Clarity**: Is the persona specific? Is the title clear?
*   **Value**: Is the "So that" clause generic or specific (e.g., mentions "revenue", "efficiency")?
*   **Testability**: Are the acceptance criteria detailed enough (BDD/Gherkin)?

Result is a **0-100 Score** that challenges the team to improve.

---

## 🏗️ Architecture

The v3.0 release introduces a **Strategy Pattern** architecture:

*   **`AppController`**: The central brain that manages state (Mode, Locale) and DOM updates.
*   **`IronGuard` Class**: Encapsulates the binary validation logic for Gatekeeper Mode.
*   **`CognitiveCoach` Class**: Encapsulates the weighted scoring math for Coach Mode.
*   **Theme Engine**: Uses CSS Variables (`--bg-main`, `--text-main`) to instantly hot-swap the entire visual language of the app based on the selected mode.

---

## 🇹🇷 Türkçe Özet (Turkish Summary)

**The Iron Gatekeeper**, Agile takımlarının olgunluk seviyesine göre şekil değiştiren çift modlu bir "Hazır Tanımı" (DoR) aracıdır.

### Neden Çift Mod?
Her takımın ihtiyacı farklıdır. Yeni takımlar kuralları öğrenmek için **Sert Sınırlara**, olgun takımlar ise gelişmek için **Geri Bildirime** ihtiyaç duyar.

### Modlar
1.  **🛡️ Güç Modu (Bekçi)**: Sert kurallar. "6 Mühür" sistemi ile hikayeleri kontrol eder. Eksik varsa (örn. "Böylece" cümlesi yoksa) hikayeyi **REDDEDER**. Disiplin sağlar.
2.  **🧠 Koç Modu**: Puanlama sistemi. Hikayeyi 0-100 arasında puanlar. "Persona çok muğlak" veya "Kabul kriterleri az" gibi yapıcı geri bildirimler verir. Kaliteyi artırır.

### Nasıl Kullanılır?
*   Sağ üstteki **Power/Coach** anahtarı ile modlar arasında geçiş yapabilirsiniz.
*   Dil seçeneğini **Türkçe** yaparak tüm arayüzü ve analiz kurallarını (örn. "Olarak", "İstiyorum") Türkçeleştirebilirsiniz.
