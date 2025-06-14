## Mi ez?

A NER Hotel egy olyan webes alkalmazás, ami átláthatóbbá teszi a magyar szállás- és a vendéglátóhelyek tulajdonosi és üzemeltetői hátterét. Segítségével tájékozódhatsz, kinél cseng a kassza a költésed nyomán, ha asztalt vagy szállást foglalsz.

Az alkalmazás [React](https://reactjs.org/)-tal készült. Helyi fejlesztésre és buildelésre [Vite](https://vitejs.dev/)-t használunk. A renderelést kliens oldalon végezük, szerver oldali komponense nincs az alkalmazásnak.

A térképhez a [react-leaflet](https://react-leaflet.js.org/) library-t használjuk.

## Hogyan futattom a helyi gépemen?

1. Installáld fel a dependenciákat `npm install --legacy-peer-deps` vagy `yarn install --legacy-peer-deps` parancsal
2. Ahhoz, hogy megkapd és szerkeszteni is tud a lefordított szövegeket, szükséged lesz egy API kulcsra a [Tolgee fordítás menedzserhez](https://tolgee.io/). API kulcsot az admin felületről tudsz generálni. A [dokumentációban](https://tolgee.io/blog/how-to-localize-vue-app#step-3-generate-api-key) láthatod, hogy hogyan. Az admin felülethez hozzáférést a projekt egyik adminjától kaphatsz.
3. Futasd az alkalmazást DEV módban a `npm run dev` vagy az `yarn dev`

> ⚠️ **Fontos!** JavaScript csomagkezelőnek a NPM-t preferáljuk. Természetesen ettől még használhatsz localban Yarn-t (vagy bármi mást) is, ellenben a generált `yarn.lock`-t kivettük a verziókezelés alól, hogy a CI környezetben ne akadjon össze a `package-lock.json`-al és csak egy lock file-unk legyen, mint az igazság forrása.

> ⚠️ A `--legacy-peer-deps` parancsra szükségünk lesz, mert az egyik függőségünk ([`vite-plugin-markdown`](https://www.npmjs.com/package/vite-plugin-markdown)) korábbi Vite verziót határoz meg [peer dependency-ként](https://nodejs.org/es/blog/npm/peer-dependencies), mint amelyiket mi használunk.

## Honnan jönnek az adatok?

A térképen megjelenített helyeket egy [Google Sheetből](https://docs.google.com/spreadsheets/d/1FaeML93U76Fjh9GR7gbQhtb2O3Ga0ZY2honrYKyQQLo/edit#gid=0) szedjük.

A sheetnek van egy olyan URL-je ami kigenerálja az adatokat nyers CSV-ben. Ezt hívjuk le egy `fetch` kéréssel amikor elindítjuk az alkalmazást, majd kliensoldalon JS-ben használható adatstruktúrává alakítjuk.

## Fordításkezelés

Az oldal fordításait egy [Tolgee](https://tolgee.io/) nevű fordításkezelő rendszerben tartjuk (jelenleg a hostolt verzió ingyenes csomagját használjuk, de a rendszert lehet saját szerveren is hostolni). A fordítások megjelenítésére és a nyelvváltásra a [react-i18next](https://react.i18next.com/) csomagot és a [Tolgee SDK-ját](https://tolgee.io/js-sdk) használjuk.

A Tolgee [adminját itt](https://app.tolgee.io/login) éred el.

Mind fejlesztéskor mind az éles környezetben közvetlenül a Tolgee-ból kapjuk a szövegeket.

A fejlesztői környezetben a saját felhasználói felületünkről tudjuk is szerkeszteni a fordításokat, kommenteket, tageket, screenshotokat feltölteni. Ha az `alt` (`option`) billentyű lenyomásával együtt fölé megyünk az egérrel egy olyan szövegnek, ami fordításként van jelen, akkor rákattinva megnyílik egy panel ahol közvetlenül tudjuk szerkeszteni anélkül, hogy megnyitnánk a Tolgee adminját. Ezt in-context fordításnak hívjuk, [itt olvashatsz](https://tolgee.io/js-sdk#in-context-translating) többet róla.

Az éles környezetben is közvetlenül a Tolgee-ból húzzuk be a fordításokat, az úgy nevezett [Content Delivery](https://tolgee.io/platform/projects_and_organizations/content_delivery) segítségével. Ez azt jelenti, hogy ha valamit megváltoztatsz a Tolgee adminján az weboldalon is meg fog változni \*, kód kirakása nélkül.

`*` Mivel a JSON file-kat a Tolgee cacheli ezért van, hogy 10-15 percet is várni kell amíg a változtatásaink megjelenek.

#### HTML a lefordítot szövegekben

Ha egyszerű HTML formázó tageket (`<em>`, `<strong>`) vagy linkeket akarunk rakni a fordításokba, akkor NE írjuk be a HTML tageket a JSON-ban tárolt szövegekbe.
Ehelyett a JSX kódban a `react-i18next` által felkínált [`<Trans>` komponenst](https://react.i18next.com/latest/trans-component) kell használnunk, a JSON-ban pedig az adott pozícióban lévő tageket számként rakjuk be.

Alapból a `Trans` tagek közé rakunk egy szöveget az alapértelmezett nyelven és a szövegbe rakunk tetszőleges HTML tageket és/vagy további fordítandó szövegeket, melyek más kulcsokra hivatkoznak.

Például:
```jsx
// a React kódban
import { useTranslation, Trans } from "react-i18next";
const { t } = useTranslation();

return (
    <Trans i18nKey="a-szovegunk-kulcsa">
        Nagyon <strong>fontos</strong>, hogy hivatkozunk erre a <a href={t('a-link-kulcsa-ami-mas-angolul-es-magyarul')} target="_blank">weboldalra</a> <em>itten ni</em>.
    </Trans>
)

```

```json
{
    "a-szovegunk-kulcsa": "Nagyon <1>fontos</1>, hogy hivatkozunk erre a <2>weboldalra</2> <3>itten ni</3>."
    "a-link-kulcsa-ami-mas-angolul-es-magyarul": "https://example.com/hu"
}
```

```json
{
    "a-szovegunk-kulcsa": "It's very <1>important</1>, to refer to this <2>website</2> <3>here</3>."
    "a-link-kulcsa-ami-mas-angolul-es-magyarul": "https://example.com/en"
}
```

Figyeljük meg, hogy a JSON-ban szereplő `<1></1>`, `<2></2>`, `<3></3>`... `<n></n>` tageket bárhova tehetjük a szövegünkben (ezek természetesen nem "valódi" HTML tagek, csak a fordító keretrendszerben léteznek és bármilyen szám lehet a `<>` között csak az a lényeg, hogy sorrendben egymás után következenek), hiszen nem biztos, hogy a kiemelni vagy linkelni kívánt szó ugyanott lesz az angol meg a magyar mondatban. Ha a HTML tagekre attribútumokat akarunk rakni azt a JSX kódban kell megtenni. 

Lásd például a fenti kódban a `target="_blank"` attribútumot az `<a>` tagen, értelemszerűen ez minden nyelvi verzióban ugyanaz lesz.

Ha az attribútumok értékeit is le akarjuk fordítani akkor azokra külön kulcsot kell felvenni a JSON file-okban és a `t()` függvénnyel kell beinjektálni a HTML-be.

További információt a [react-i18next dokumentációjában](https://react.i18next.com/latest/trans-component) találsz.

#### Szöveges oldalak

A hosszabb szövegeket - például amikor teljes oldalak szövegét kell több nyelven definiálnunk - viszont külön [markdown](https://www.markdownguide.org/) file-okban tároljuk az `src/content` mappában. Minden egyes oldalhoz egy azonos nevű `.md` file tartozik egy az `en/` egy másik pedig a `hu/` mappában.

Például a _Mi ez?_ oldal magyar tartalma az `src/hu/about.md` file-ban, míg az angol tartalom az `src/en/about.md`-ben található.

> ⚠️ **Fontos!** A markdown file-ok nevének meg kell egyeznie annak a relatív elérési úttal (route-tal), ahol az oldal található. Értsd ha a szöveges oldalunk címe `nerhotel.hu/about` akkor szövegeket tartalmazó file-nak mindenképpen `about.md`-nek kell lennie, különben nem fog működni.

Ha az `.md` file-okban lévő szövegeket megváltoztatjuk (ehhez persze commitolnuk kell git-be és be kell küldenünk a változtatásainkat a `master` branchbe), akkor a felületen lévő szövegek is rögtön meg fognak változni (amint sikeresen lefutott a [build és a deploy folyamat](#hol-lakik-az-oldal-es-hogyan-deployolok)).

A Markdown alapvetően [standard szintaxist](https://www.markdownguide.org/basic-syntax/) használ, pár dologra azonban oda kell figyelni:

1. A külső linkek (`http://example.com`) mindig új ablakban fognak megnyílni, ehhez semmi extrát nem kell tenni
2. Ha a NERHotelen belül akarsz linkelni egy aloldalra, akkor használj relatív URL-t. pl.: `[link a kapcsolat oldalra](/contact)`
3. A nagyobb szövegtömböket amiket címsorok határolnak `<section>` elemekbe kell foglalnunk, azért hogy rendesen működjön a CSS formázás. Ellenben mivel a Markdown nem ismeri a `section` taget ezért nekünk kell ezeket a szövegrészeket kézzel `<section></section>` közé foglalni (a Markdown szintaxisba berakhatunk tetszőleges HTML tageket).
4. Ha a nyitó `section`-ön belül közvetlenül egy címsorral akarjuk kezdeni a szövegünket, akkor kell a `<section>` után egy üres sort hagynunk, különben nem fog működni a Markdown formázásunk.

## Hol lakik az oldal és hogyan deployolok?

Az oldalt egy saját szerveren futó [coolify](https://github.com/coollabsio/coolify)-ból hosztoljuk.

A buildhez szükséges esetleges környezeti változókat is a Coolify-ban lehet beállítani.

Ha bemergelünk egy PR-t a `master` branchbe, akkor a Coolify automatikusan kirakja az éles domainre, ha pedig a `dev` branchbe mergelünk egy PR-t, akkor a `dev.nerhotel.hu` aldomainre fognak automatikusan kimenni a változtatások.

A `dev` és a `master` branchek "védettek", ami azt jelenti, hogy nem tudsz közvetlenül pusholni beléjük, csak PR-okat tudsz bemergelni.

Először mergelj be egy PR-t a `dev` branchbe, a változtatásokat le lehet ellenőrizni a staging környezeten (`dev.nerhotel.hu`) majd ha minden rendben van, akkor mergeld be a `dev`-t a `master`-be és a változtatások automatikusan kikerülnek az éles domainre.

## Az adatbázis lementése JSON-ba

Van egy Node.js szkript a `scripts/download-hotels-as-json.js`, ami ugyanazt a kódot használja az Google sheetsben tárolt adatok kinyerésére, mint amit futásidőben is meghívunk. A különbség az, hogy ez lementi a JSON-t a `data/nerhotel.json` file-ba.
Ez hasznos lehet, ha mondjuk egy másik adatbázisba akarjuk migrálni az adatokat.

### 1) Készítsünk egy bundle-t

Mivel a node.js szkript behúzza az `src` file-ban található JS modulokat amik ESM modulok így össze kell őket csomagolnunk hogy a node futatni tudja.
Ezt legegyszerűbben egy command line-ból kiadott [Rollup parancsal](https://rollupjs.org/command-line-interface/) tudjuk megtenni (az `npx` parancsot használva nem kell a Rollupot fel installálni sem a projektbe sem a gépünkre globálisan)

```bash
npx rollup scripts/download-hotels-as-json.js --file scripts/download-hotels-as-json.bundle.js --format esm
```
> ⚠️ A létrejött `scripts/download-hotels-as-json.bundle.js` nem fog bekerülni gitbe.

### 2) Futasuk a bundle-t

Miután létrehoztuk futassuk le

```bash
node scripts/download-hotels-as-json.bundle.js
```

> ⚠️ A szkript futásához minimum Node.js 18-as verzió fog kelleni ugyanis a behúzott szkriptben `fetch` API-t kell futattnunk. Ha nem akarsz globálisan frissíteni hanszálj [NVM](https://github.com/nvm-sh/nvm)-t.

Ha a szkript sikeresen lefutott, akkor látnod kell egy `data/nerhotel.json` file-t.

> ⚠️ A `data/nerhotel.json` nincs verzió kezelés alatt!

Ha a `data` mappa, vagy a file már létezik akkor a szkript nem fogja felülírni azokat, szóval ha újra le akarod tölteni és menteni az adatokat akkor kézzel törölnöd kell ezt a file-t és a mappát is.