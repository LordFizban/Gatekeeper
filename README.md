# The Iron Gatekeeper
**Current Version:** v3.0 (Dual-Mode)

**The Iron Gatekeeper** is a strict, client-side Definition of Ready (DoR) validation tool. It acts as a digital checkpoint for Agile teams, ensuring that no User Story enters the backlog or refinement without meeting a stringent set of criteria.

## 🎯 Goals

*   **Enforce Quality Standards**: preventing "lazy" or incomplete stories from wasting the team's time.
*   **Visualize Readiness**: Using a gamified "6 Seals" system to clearly indicate what is missing.
*   **Process Alignment**: Ensuring that not just the text, but the *rituals* (Refinement, Alignment) are honored via mandatory checks.
*   **Global Support**: Fully localized for English 🇺🇸 and Turkish 🇹🇷 teams.

## ⚔️ The 6 Seals Logic

The application parses text input using Regular Expressions to validate six core components:

1.  **Seal of Identity 🆔**: Title must be descriptive (>10 chars).
2.  **Seal of Value 💎**: Must contain a "So that" / "Böylece" clause.
3.  **Seal of Victory ⚔️**: Must have at least 3 distinct Acceptance Criteria bullets OR Gherkin syntax.
4.  **Seal of Terrain ⛰️**: Must have a "Dependencies" section with valid Links (Jira/Confluence).
5.  **Seal of Cost 💰**: Must include an Estimation or Points section.
6.  **Seal of Evidence 📜**: Must reference external assets (Figma, Mockups, Tech Analysis).

## 🏗️ Architecture

This is a lightweight, **Zero-Backend** web application.

*   **Core Logic (`script.js`)**:
    *   `StoryAnalyzer` Class: Contains the regex engine and validation logic. It returns a `seals` array and an `isBlocked` boolean.
    *   `UI` Class: Handles DOM manipulation, event listeners, and dynamic localization.
    *   **Localization**: A `LOCALE_CONFIG` object stores all static strings and regex patterns for supported languages.
*   **Structure (`index.html`)**: Semantic HTML5 with a focus on accessibility and clear feedback zones.
*   **Styling (`style.css`)**: Custom CSS variables, Glassmorphism effects, and responsive layout. No external frameworks (Tailwind/Bootstrap) were used to maintain zero dependencies.

## 🚀 Usage

Simply open `index.html` in any modern browser. No build step or installation required.
