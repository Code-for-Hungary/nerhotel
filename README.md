## Mi ez?

A NER Hotel egy olyan webes alkalmazás, ami átláthatóbbá teszi a magyar szállás- és a vendéglátóhelyek tulajdonosi és üzemeltetői hátterét. Segítségével tájékozódhatsz, kinél cseng a kassza a költésed nyomán, ha asztalt vagy szállást foglalsz.

Az alkalmazás [React](https://reactjs.org/)-tal készült. Helyi fejlesztésre és buildelésre [Vite](https://vitejs.dev/)-t használunk. A renderelést kliens oldalon végezük, szerver oldali komponense nincs az alkalmazásnak.

A térképhez a [react-leaflet](https://react-leaflet.js.org/) library-t használjuk.

## Hogyan futattom a helyi gépemen?

1. Installáld fel a dependenciákat `yarn install` vagy `npm install` parancsal
2. Futasd az alkalmazást DEV módban a `yarn dev` vagy az `npm run dev`

> ⚠️ **Fontos!** JavaScript csomagkezelőnek a [Yarnt](https://yarnpkg.com/) preferáljuk. Természetesen ettől még használhatsz localban NPM-t is, ellenben a generált `package-lock.json`-t kivettük a verziókezelés alól, hogy a CI környezetben ne akadjon össze a `yarn.lock`-al és csak egy lock file-unk legyen, mint az igazság forrása.

## Honnan jönnek az adatok?

A térképen megjelenített helyeket egy [Google Sheetből](https://docs.google.com/spreadsheets/d/1FaeML93U76Fjh9GR7gbQhtb2O3Ga0ZY2honrYKyQQLo/edit#gid=0) szedjük.

A sheetnek van egy olyan URL-je ami kigenerálja az adatokat nyers CSV-ben. Ezt hívjuk le egy `fetch` kéréssel amikor elindítjuk az alkalmazást, majd kliensoldalon JS-ben használható adatstruktúrává alakítjuk.

### Honnan jönnek a szövegek.

A felhasználói felületen látható szövegek nagy része az `src/translations` mappában található. A `hu.json` tartalmaza a magyar, az `en.json` pedig az angol szövegeket. Bővebb információt a JSON file-ok struktúrájáról és a kulcsok használatáról a [react-i18next](https://react.i18next.com/) fordításkezelő könyvtár dokumentációjában találasz.

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

Az oldalt [Vercelen](https://vercel.com/) hosztoljuk. A Vercel platform össze van kötve ezzel a repóval, minden egyes `master` branchbe mergelt commit elindítja a buildet és a deploymentet. Minden logot a Vercel felületén lehet látni, de a pull requestek alatt a Vercel botja automatikusan kirak egy táblázatot a deployment státuszról.

A buildhez szükséges esetleges környezeti változókat, secreteket, build beállításokat is a Vercel felületén tudjuk kezelni. Erről bővebben lásd a [dokumentációt](https://vercel.com/guides/how-to-add-vercel-environment-variables).
