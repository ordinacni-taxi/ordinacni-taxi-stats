# Stárnutí populace ČR - Vizualizace pro Ordinační TAXI

Interaktivní vizualizace demografických a zdravotních dat z ÚZIS ČR demonstrující rostoucí potřebu dopravních služeb pro seniory a osoby se zdravotními omezeními.

## 🎯 Účel

Tato aplikace prezentuje data podporující potřebu služby **Ordinační TAXI** - specializované dopravy pacientů k lékařským vyšetřením a ošetřením.

## 📊 Klíčová data

- **2,26 mil. seniorů 65+** (2025) → **3,08 mil.** (2050) - nárůst o **+36%**
- **212 tis. velmi starých 85+** (2025) → **509 tis.** (2050) - nárůst o **+140%**
- **194 tis. osob s demencí** (2024) → **488 tis.** (2050) - nárůst o **+151%**
- **~338-451 tis. mobilitně omezených seniorů** (konzervativní odhad)
## 📁 Struktura projektu

```
ordinacni-taxi-stats/
├── app/
│   ├── page.tsx          # Hlavní stránka s vizualizacemi
│   ├── layout.tsx        # Layout komponenta
│   └── globals.css       # Globální styly
├── public/
│   └── data.json         # UZIS data
├── package.json
├── next.config.js
├── tsconfig.json
└── tailwind.config.js
```

## 🔧 Customizace

### Změna barev

Upravte `tailwind.config.js`:

```javascript
colors: {
  'ot-blue': '#2563eb',    // Primární barva
  'ot-green': '#10b981',   // Sekundární barva
  'ot-orange': '#f59e0b',  // Akcent
}
```

### Změna fontů

Upravte import v `app/globals.css` a `tailwind.config.js`

### Aktualizace dat

Nahraďte soubor `public/data.json` novými daty z UZIS

## 📄 Zdroj dat

**ÚZIS ČR** - Predikce potřeb zdravotní a sociální péče 2025

Data obsahují:
- Demografické predikce
- Chronická onemocnění (demence, Alzheimer, diabetes, onkologie, srdeční selhání)
- Polymorbiditu
- Geriatrické pacienty
- Osoby se zdravotním postižením

## 🔗 Links

- [Ordinační TAXI](https://ordinacnitaxi.cz)
- [ÚZIS ČR](https://uzis.cz)
- [Vercel Documentation](https://nextjs.org/docs)

## 📝 Licence

© 2025 Ordinační TAXI - Data z ÚZIS ČR
