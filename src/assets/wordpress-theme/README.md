# ArgasHub WordPress Theme

Lietuvos Minecraft serverio WordPress tema su tamsiu gaming dizainu ir emerald akcentais.

## Failo Struktūra

```
argashub-theme/
├── style.css              # Pagrindinė stilių lentelė (su temos header)
├── index.php              # Pagrindinis šablonas
├── header.php             # Header su navigacija
├── footer.php             # Footer
├── functions.php          # Temos funkcijos
├── screenshot.png         # Temos peržiūros nuotrauka (1200x900)
├── assets/
│   ├── css/
│   │   └── preloader.css  # Preloader stiliai
│   ├── js/
│   │   └── main.js        # JavaScript funkcionalumas
│   └── images/
│       ├── logo.png       # Temos logo
│       ├── hero-bg.png    # Hero fono nuotrauka
│       ├── favicon.png    # Favicon
│       └── og-image.png   # Social media nuotrauka
└── README.md              # Šis failas
```

## Įdiegimas

1. Sukurkite aplanką `argashub-theme` savo kompiuteryje
2. Nukopijuokite visus failus į šį aplanką
3. Pridėkite savo nuotraukas į `assets/images/`:
   - `logo.png` - ArgasHub logo
   - `hero-bg.png` - Hero sekcijos fonas
   - `favicon.png` - Favicon
   - `og-image.png` - Social media nuotrauka (1200x630)
4. Sukurkite `screenshot.png` (1200x900) - temos peržiūros nuotrauka
5. Supakuokite aplanką į ZIP failą
6. WordPress Admin: Appearance > Themes > Add New > Upload Theme

## Customizer Nustatymai

Tema palaiko šiuos Customizer nustatymus:
- **Hero Section**: Pavadinimas, aprašymas, fono nuotrauka
- **Server IP**: Serverio adresas
- **Statistics**: Žaidėjų skaičius, Discord nariai, metai
- **Social Links**: Discord, YouTube, TikTok nuorodos
- **Custom Logo**: Per standartinį WordPress logo nustatymą

## Custom Post Types

Tema registruoja šiuos custom post types:
- **Events** - Serverio renginiai su data/laiku
- **Gallery Items** - Galerijos nuotraukos

## Funkcijos

- ✅ Responsive dizainas
- ✅ Tamsus gaming dizainas
- ✅ Animuoti skaitikliai
- ✅ XP progress bar formoje
- ✅ AJAX formos siuntimas
- ✅ Smooth scroll navigacija
- ✅ Preloader su Minecraft stiliaus animacija
- ✅ Gallery lightbox
- ✅ SEO optimizuota
- ✅ Accessibility palaikymas

## Reikalavimai

- WordPress 5.0+
- PHP 7.4+

## Priklausomybės (įkraunamos per CDN)

- Font Awesome 6.4
- Google Fonts (Inter)

## Licencija

GPL v2 or later
