# CAREER COMPASS — Personalized Geographical College Matching System

> **A Software Engineering College Project Prototype**  
> Tailored for 12th standard students in Tamil Nadu exploring engineering careers, branches, and colleges.

---

## 1. Project Philosophy & Core Innovation

Conventional college predictors only answer: *"Do my cutoffs exceed past admission bars?"*  
**CAREER COMPASS** answers the real student dilemma:

$$\mathbf{\text{ACADEMIC FIT}} + \mathbf{\text{CAREER FIT}} + \mathbf{\text{LOCATION FIT}} = \mathbf{\text{PERSONALIZED COLLEGE FIT}}$$

> *"CAREER COMPASS combines academic suitability, career compatibility, and location preference to identify colleges that fit you — not just colleges you may qualify for."*

---

## 2. The Multi-Factor Fit Engine (Formula Specification)

$$\text{Overall Fit Score} = (\text{Academic Fit} \times 0.40) + (\text{Career Fit} \times 0.35) + (\text{Location Fit} \times 0.25)$$

### 1. Academic Fit (40% Weight)
- Calculates standard Tamil Nadu Engineering Admission (TNEA) cutoff index:
  $$\text{Cutoff} = \text{Mathematics} + \frac{\text{Physics}}{2} + \frac{\text{Chemistry}}{2} \quad (\text{out of } 200)$$
- Compares student score against prototype historical cutoffs ($\Delta = \text{Score} - \text{Cutoff}$).
- Classifies as **High Academic Fit**, **Medium Academic Fit**, or **Low Academic Fit**.
- Transparently alerts if $\Delta < 0$: *"Strong overall match, but academic competitiveness should be considered."* (Never falsely guarantees admission).

### 2. Career Fit (35% Weight)
- Evaluates student cognitive and behavioral trait scores across 8 categories via a 10-question assessment.
- Correlates with student's interest tags (e.g. *Programming*, *Artificial Intelligence*, *Problem Solving*) and target engineering branch wishlist (CSE, IT, AI&DS, ECE, EEE, Mechanical, Civil).

### 3. Location Fit (25% Weight)
- Uses local coordinates and Haversine distance from the student's preferred Tamil Nadu city.
- If *"Anywhere in Tamil Nadu"* is chosen, no geographical penalty is assessed (95%).
- Colleges within the preferred radius receive high proximity marks (80%–98%), while distances exceeding the threshold gradually decay.

### Recommendation Tiers
- 🟢 **BEST FIT**: Overall $\ge 85\%$
- 🟡 **POSSIBLE FIT**: Overall $70\% - 84\%$
- 🔴 **LOW FIT**: Overall $< 70\%$

---

## 3. Technology Stack & Zero-Dependency Architecture

- **Frontend Framework**: React 18 with TypeScript
- **Bundler & Tooling**: Vite 5
- **Styling**: Tailwind CSS with custom glassmorphic styling, glowing borders, and dark EdTech aesthetics
- **Icons**: Lucide React
- **Geographical Visualization**: Standalone, interactive SVG-based map of Tamil Nadu with coordinate projection (`projectLatLngToSvg`)
- **Persistence**: Centralized client-side `localStorage` abstraction (`src/utils/storage.ts`)
- **Runtime**: Self-contained Node.js LTS portable runtime in `.tools/node` ensuring 100% offline capability without requiring administrative installs or external API keys (no Google Maps API, OpenAI API, or paid services).

---

## 4. Complete Application Flow

```
LANDING PAGE
    ↓
TRY DEMO (Harsh, 97.5%, Chennai, 50km, Programming/AI) / GET STARTED
    ↓
STUDENT PROFILE (Live validation & % completion meter)
    ↓
CAREER ASSESSMENT (10 Questions with progress tracking)
    ↓
CAREER RESULTS (Ranked 🥇 Software Engg, 🥈 AI & DS, 🥉 Electronics)
    ↓
MY BEST-FIT COLLEGES (Explainable 40/35/25 breakdown & "Why this college?")
    ↓
COLLEGE MAP (Interactive Tamil Nadu SVG map with live filters)
    ↓
COLLEGE DETAILS (Cutoffs, seats, placements, explainability)
    ↓
COMPARE COLLEGES (Side-by-side up to 3 colleges with match winner badge)
    ↓
DASHBOARD (Comprehensive student control center & quick actions)
```

---

## 5. Demonstration Walkthrough (For Faculty Evaluation)

1. Open `http://127.0.0.1:3000/` in any browser (or double-click `run-dev.bat`).
2. Click **Try Demo** on the Landing Page.
3. Observe **Harsh's profile** auto-loaded:
   - 12th Percentage: 97.5%
   - Marks: Math: 98, Physics: 95, Chemistry: 96 (Cutoff: 193.5 / 200)
   - Preferred City: Chennai (Max Distance: 50 km)
   - Interests: Programming, Artificial Intelligence, Problem Solving
4. Inspect **Career Results**: Software Engineering (Top match) and AI & Data Science.
5. Click **Find My Best-Fit Colleges**:
   - Notice Academic Fit, Career Fit, and Location Fit broken down.
   - Expand *"How is this calculated?"* to view the exact math.
6. Open **College Map**:
   - Inspect green, yellow, and red markers placed accurately on the Tamil Nadu map.
   - Filter by **Branch: CSE** and **Recommendation: Best Fit**.
   - Click a marker to open the quick preview card.
7. Click **View Details** and **Add to Compare**.
8. Select 2 more colleges and open **Compare**:
   - Inspect side-by-side columns and the **Strongest Overall Match** trophy.
9. Return to **Dashboard** to see the student's progress and benchmark scores.
10. Click **Reset Demo** to clear all stored data and restart the presentation.

---

## 6. How to Run Locally

### Option A: Using Windows Batch Script (Recommended)
Simply double-click:
```bash
run-dev.bat
```
The server will start at `http://127.0.0.1:3000/`.

### Option B: Using PowerShell / Terminal
```powershell
$env:PATH = "h:\career compass - 2025503550\.tools\node;" + $env:PATH
npm run dev
```

### Option C: Production Build
```powershell
$env:PATH = "h:\career compass - 2025503550\.tools\node;" + $env:PATH
npm run build
```

---

## 7. Prototype Data Notice
> *College cutoffs, seat information, and distances shown in this software engineering prototype are sample demonstration values intended to validate the matching algorithm. They do not constitute official live TNEA admission predictions.*
