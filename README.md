## Mi ez?

A NER Hotel egy olyan webes alkalmazás, ami átláthatóbbá teszi a magyar szállás- és a vendéglátóhelyek tulajdonosi és üzemeltetői hátterét. Segítségével tájékozódhatsz, kinél cseng a kassza a költésed nyomán, ha asztalt vagy szállást foglalsz.

Az alkalmazás [React](https://reactjs.org/)-tal készült. Helyi fejlesztésre és buildelésre [Vite](https://vitejs.dev/)-t használunk. A renderelést kliens oldalon végezük, szerver oldali komponense nincs az alkalmazásnak.

A térképhez a [react-leaflet](https://react-leaflet.js.org/) library-t használjuk.

## Hogyan futattom a helyi gépemen?

1. Installáld fel a dependenciákat `npm install --legacy-peer-deps` vagy `yarn install --legacy-peer-deps` parancsal
2. Töltsd le a fordításokat! A fordításokat tartalmazó file-okat nem tároljuk verziókezelésben, mert minden egyes deploymentnél a fordítás menedzser rendszerünkből töltjük le őket. Ezért, amikor először futattod a projektet helyi gépen, kézzel le kell töltened őket. Ehhez a következőt kell tenned:
 - Szerezz be egy API kulcsot a [Tolgee-hoz](https://tolgee.io/) (fordítás menedzser). Ehhez először kelleni fog egy admin hozzáférés, amit valamelyik projekt admintól kérhetsz. Ezután kövesd a lépéseket a [Tolgee dokumenticiójából](https://tolgee.io/platform/account_settings/api_keys_and_pat_tokens).
 - Hozz létre egy `.env` file-t a projekt gyökérkönyvtárában (ez a file nem fog be kerülni a gitbe) és hozd létre benne ezt a környezeti változót:
 `TOLGEE_API_KEY=<Az API kulcs>`
 - Futasd az `npm run translations:download` parancsot a terminálodból. Ez létre fogja hozni a `hu.json`, `en.json`, `de.json` file-okat a `src/translations` mappában.
3. Futasd az alkalmazást DEV módban a `npm run dev` vagy az `yarn dev`

> ⚠️ **Fontos!** JavaScript csomagkezelőnek a NPM-t preferáljuk. Természetesen ettől még használhatsz localban Yarn-t (vagy bármi mást) is, ellenben a generált `yarn.lock`-t kivettük a verziókezelés alól, hogy a CI környezetben ne akadjon össze a `package-lock.json`-al és csak egy lock file-unk legyen, mint az igazság forrása.

> ⚠️ A `--legacy-peer-deps` parancsra szükségünk lesz, mert az egyik függőségünk ([`vite-plugin-markdown`](https://www.npmjs.com/package/vite-plugin-markdown)) korábbi Vite verziót határoz meg [peer dependency-ként](https://nodejs.org/es/blog/npm/peer-dependencies), mint amelyiket mi használunk.

## Honnan jönnek az adatok?

A térképen megjelenített helyeket egy [Google Sheetből](https://docs.google.com/spreadsheets/d/1FaeML93U76Fjh9GR7gbQhtb2O3Ga0ZY2honrYKyQQLo/edit#gid=0) szedjük.

A sheetnek van egy olyan URL-je ami kigenerálja az adatokat nyers CSV-ben. Ezt hívjuk le egy `fetch` kéréssel amikor elindítjuk az alkalmazást, majd kliensoldalon JS-ben használható adatstruktúrává alakítjuk.

## Fordításkezelés

Az oldal fordításait egy [Tolgee](https://tolgee.io/) nevű fordításkezelő rendszerben tartjuk (jelenleg a hostolt verzió ingyenes csomagját használjuk, de a rendszert lehet saját szerveren is hostolni). A fordítások megjelenítésére és a nyelvváltásra a [react-i18next](https://react.i18next.com/) csomagot haználjuk.

A fordításokat tartalmazó file-okat nem tároljuk verziókezelésben, mert minden egyes deploymentnél a fordítás menedzser rendszerünkből töltjük le őket.

A Tolgee [adminját itt](https://app.tolgee.io/login) éred el.

A fordításokat a következőképpen töltheted le:

- Szerezz be egy API kulcsot a [Tolgee-hoz](https://tolgee.io/) (fordítás menedzser). Ehhez először kelleni fog egy admin hozzáférés, amit valamelyik projekt admintól kérhetsz. Ezután kövesd a lépéseket a [Tolgee dokumenticiójából](https://tolgee.io/platform/account_settings/api_keys_and_pat_tokens).
- Hozz létre egy `.env` file-t a projekt gyökérkönyvtárában (ez a file nem fog be kerülni a gitbe) és hozd létre benne ezt a környezeti változót:
`TOLGEE_API_KEY=<Az API kulcs>`
- Futasd az `npm run translations:download` parancsot a terminálodból. Ez létre fogja hozni a `hu.json`, `en.json`, `de.json` file-okat a `src/translations` mappában.

Miután letöltötted a JSON file-okat, hozzáadhatsz új kucsokat vagy módoíthatod a mglévő fordításokat. Ahhoz, hogy ez be is kerüljön a fordításkezelőbe, természetesen fel is kell oda töltened őket.

Ezt az `npm run translations:upload` parancsal teheted meg.

> ⚠️ A parancsal nem fogsz tudni kulcsokat törölni! Ha törölsz egy kulcsot a JSON-okból és feltötöd őket az a Tolgee felületén még ugyanúgy ott lesz. Szintén ha átnevezel egy kulcsot, az új kulcsként fog megjelenni a Tolgee adminján. Szóval fordítő kulcsot átnevezni vagy törölni csak az adminról tudsz.

> ⚠️ A letöltött file-okban csak azok a kulcsok fognak szerplni, amikhez van fordítás az adott nyelvre. Ha gy nyelv létre van már hozva a Tolgee felültén, de nincs hozzá felvéve egyetlen fordítás sem, akkor letöltő zkript nem fogja létrrhozni az adott nelv JSON file-át.

> ℹ️ A fent említett `translations:download`, `translations:upload` parancsok a Tolgee CLI-t használják, erről bővbben [itt olvashatsz](https://tolgee.io/tolgee-cli/).

Ha egy új üres nyelvi file-t akarsz létrehozni azt megteheted az `npm run translations:empty-file <lang-code>` parancsal. A szkript létre fogja hozni az `src/translations/<lang-code>.json` file-t (tehát a filenév az lesz amit paraméterként átadunk a kitejesztés pedig automatikusan `.json`). A file gyakorlatilag lemásolja a `hu.json`-t és minden kulcs értékét üres sztringel helyetesti, ehhez természetesen az kell, hogy a `hu.json`-t korábban letöltsük.

A fordításokat minden egyes deploymentnél frissen letöltjük a Tolgee-ból.

Ha változtatsz valamit a Tolgee felületén az nem fog automatikusan megjelenni a weboldalon. Ehhez manuálisan el kell indítanod az éles deploymentet a github felületén. 

- Menj a repository `Actions` fülére és keresd meg a **Deploy-Production** actiont a bal oldalon
- Ha rákattintasz, jobb oldalt kell látnod egy `Run Workflow` gombot, kattints rá és várd meg amíg lefut a deployment

Lásd a [Github dokumentációját](https://docs.github.com/en/actions/using-workflows/manually-running-a-workflow).

### Honnan jönnek a szövegek?

A felhasználói felületen látható szövegek nagy része az `src/translations` mappában található. A `hu.json` tartalmaza a magyar, az `en.json` pedig az angol szövegeket. Bővebb információt a JSON file-ok struktúrájáról és a kulcsok használatáról a [react-i18next](https://react.i18next.com/) fordításkezelő könyvtár dokumentációjában találasz.

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
// hu.json
{
    "a-szovegunk-kulcsa": "Nagyon <1>fontos</1>, hogy hivatkozunk erre a <2>weboldalra</2> <3>itten ni</3>."
    "a-link-kulcsa-ami-mas-angolul-es-magyarul": "https://example.com/hu"
}
```

```json
// en.json
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

Az oldalt [Vercelen](https://vercel.com/) hosztoljuk.

A deploymentet Github actionök segítségével végezzük.

Minden egyes Pull Request elindítja a `Deploy-Preview` nevű actionönt (`.github/vercel-preview-deployment.yml`).
Ezzel a Vercel létrehoz egy Preview URL-t ahol az adott branch változtatásait nézhetjük meg. Az URL-t látni fogjuk a Github action logjaininak végén (keresd a `Deploy Project Artifacts to Vervel` alatt) illetve a Vercel admin felületén a **Deployments** menü alatt.

Minden `master` branchbe bemergelt Pull Request pedig elindítja a `Deploy-Production` nevű actionönt (`.github/vercel-production-deployment.yml`). Ez voltaképp ugyanazt csinálja, mint a `Deploy-Preview`, azzal a különbséggel, hogy ez már az éles domainre rakja ki a változtatásokat.

Minden logot megtalálsz a Vercel admin felületén.

A buildhez szükséges esetleges környezeti változókat a Github repó `Settings` menüpontja alatt lehet beállítani.

> ℹ️ A Vercelt akár automatikusan, Github actionök nélkül is össze lehet kötni a repóval, de azért választottuk a manuális deploymentet, mert így hozzá tudjuk adni a fordítási file-ok letöltését a CI-hoz.

## Az adatbázi lementése JSON-ba

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