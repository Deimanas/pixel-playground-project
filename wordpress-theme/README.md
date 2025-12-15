# Pixel Playground WordPress tema

Šiame kataloge yra sukompiliuota WordPress tema, įkelianti visą „Pixel Playground“ React/Vite dizainą.

## Struktūra
- `pixel-playground-theme/style.css` – WP temos metaduomenys.
- `pixel-playground-theme/functions.php` – Vite manifest įkrovimas ir skriptų/CSS enqueuing.
- `pixel-playground-theme/index.php` – šakninis šablonas su `#root` elementu React aplikacijai.
- `pixel-playground-theme/build/` – automatiškai sugeneruojamos Vite bylos (CSS, JS, paveikslėliai, manifest).

## Naudojimas
1. Patalpinkite `pixel-playground-theme` aplanką į `wp-content/themes/` katalogą.
2. Aktyvuokite temą WordPress administravimo sąsajoje.
3. React aplikacija bus užkrauta per Vite manifesto failus (`build/.vite/manifest.json`).

Jeigu atnaujinate dizainą:
- Paleiskite `npm run build` projekto šaknyje – Vite build automatiškai įrašomas į `wordpress-theme/pixel-playground-theme/build/` kartu su manifestu.
- Atnaujinkite versiją `style.css` ir `package.json` pagal poreikį.
