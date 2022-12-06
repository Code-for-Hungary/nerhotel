## Mi ez?

A NER Hotel egy olyan webes alkalmazás, ami átláthatóbbá teszi a magyar szállás- és a vendéglátóhelyek tulajdonosi és üzemeltetői hátterét. Segítségével tájékozódhatsz, kinél cseng a kassza a költésed nyomán, ha asztalt vagy szállást foglalsz.

Az alkalmazás [React](https://reactjs.org/)-tal és azon belül [Create React App](https://create-react-app.dev/)-al készült. A renderelést kliens oldalon végezük, szerver oldali komponense nincs az alkalmazásnak.
A térképhez a [react-leaflet](https://react-leaflet.js.org/) library-t használjuk.

## Hogyan futattom a helyi gépemen?

1) Installáld fel a dependenciákat `yarn install` vagy `npm install` parancsal
2) Futasd az alkalmazást DEV módban a `yarn start` vagy az `npm run start`

**Fontos!** JavaScript csomagkezelőnek a [Yarnt](https://yarnpkg.com/) preferáljuk. Természetesen ettől még használhatsz localban NPM-t is, ellenben a generált `package-lock.json`-t kivettük a verziókezelés alól, hogy a CI környezetben ne akadjon össze a `yarn.lock`-al és csak egy lock file-unk legyen, mint az igazság forrása.

## Honnan jönnek az adatok?

A térképen megjelenített helyeket az `src/data/nerhotel.json` file-ban tároljuk. Ezt a file-t a tartalomszerkesztők kézzel generálják ebből a [Google Sheetből](https://docs.google.com/spreadsheets/d/e/2PACX-1vSEboU5aIOUgZ-hmNpLQIYB8EZTc1HYAFf9mL97jvjVl6S9auEiFxJ1fwMpbr6-7dwPYl57BOK4ANfs/pub?gid=0&single=true&output=csv).

A szerkesztők az [adat import oldalon](https://www.nerhotel.hu/#/data-import) található formmal letöltik és átkonvertálják a CSV-t, majd kézzel frissítik és bekommitolják az `src/data/nerhotel.json`-t.

## Hol lakik az oldal és hogyan deployolok?

Az oldalt [Vercelen](https://vercel.com/) hosztoljuk. A Vercel platform össze van kötve ezzel a repóval, minden egyes masterbe mergelt commit elindítja a buildet és a deploymentet. Minden logot a Vercel felületén lehet látni, de a pull requestek alatt a Vercel botja automatikusan kirak egy táblázatot a deployment státuszról.

A buildhez szükséges esetleges környezeti változókat, secreteket, build beállításokat is a Vercel felületén tudjuk kezelni. Erről bővebben lásd a [dokumentációt](https://vercel.com/guides/how-to-add-vercel-environment-variables).