import React from 'react';
import Header from '../components/Header.js';
import styles from '../css/about.module.css';

const AboutView = () => (
  <div>
    <Header/>
    <div className={styles.about}>
      <section>
        <h2>Mi az a NER Hotel?</h2>
        <p>Egy olyan webes alkalmazás, ami térkép segítségével átláthatóbbá teszi a vendéglátóhelyek tulajdonosi hálóját. Egy olyan eszközt adunk a tudatos állampolgárok kezébe, amivel hitelesen
          tájékoztatnak a tulajdoni viszonyokról. Segítségével informálódni tudsz, mielőtt asztalt, szállást foglalsz, belépőt veszel.</p>
      </section>
      <section>
        <h2>Milyen helyek szerepelnek rajta?</h2>
        <p>Turizmusban érdekelt vendéglátó, szabadidő és szálláshelyeket, amiknek üzemeltetői a piaci körülmények adta lehetőségeken túl (politikai) pozíciójuk, családi kötődésük vagy más kapcsolataik
          révén kerültek előbbre. Előfordulhat, hogy egy hely ingatlanának más a tulajdonosa, mint az ott üzemelő helynek, az ilyen esetekben az utóbbi alapján dolgoztunk, hiszen a fogyasztásból eredő
          haszon közvetlenül az üzemeltetőnél jelenik meg.</p>
      </section>
      <section>

        <h2>Miért ezek a helyek kerültek fel?</h2>
        <p>Olyan helyeket jelenítünk meg, amelyeket üzemeltető társaságok tulajdonosai vagy vezető az alábbi kritériumok alapján a Nemzeti Együttműködés Rendszere haszonélvezői és kihasználói.</p>
        <p><strong>Vagyongyarapodás:</strong> nyilvános adatbázisok híján a magánvagyon gyarapodást feltételezni sajtóhírek és részben igazolni pedig céginformációs adatbázis alapján tudjuk. Minden
          esetben sikeres, jól teljesítő magánszemélyeket és társaságokat gyűjtöttünk.</p>
        <p><strong>Politikai hátszél:</strong> a vagyongyarapodás hátterében olyan személyeket kerestünk a sajtóhírekben, akik közbeszerzések kiemelkedő nyertesei, ingatlanok áron aluli megszerzői
          vagy vissza nem térítendő támogatások kedvezményezettjei. A személyekhez kapcsolt hivatkozásokat a K-Monitor korrupciós-közpénzes sajtóadatbázisában rendszerezve gyűjtjük. Feltüntettük
          továbbá politikusok és családtagjaikhoz üzemeltetésében álló szállás- és vendéglátóhelyeket is.</p>
      </section>
      <section>

        <h2>Milyen adatokra alapozzuk mindezt?</h2>
        <p><strong>Személyek:</strong> K-Monitor sajtóadatbázis</p>
        <p><strong>Céginformációk:</strong> Bisnode</p>
        <p><strong>Helyek:</strong> Országos Kereskedelmi Nyilvántartás, Momentum NOligarcha adatbázis, önkéntes gyűjtés internetről (helyek honlapjai, cikkek, Kisfaludy szálláshely program)</p>
      </section>
      <section>

        <h2>Hibát találtam!</h2>
        <p>Jelezd felénk!</p>
        <p>A vendéglátó iparág folyamatos mozgásban van, előfordulhatnak változások a céges adatokban.</p>
        <p>Elképzelhető az is, hogy a fejlesztés során kimaradt valami. Büszkék vagyunk rá, hogy önkéntesek segítségével építettük az alkalmazást, nyitottak vagyunk minden észrevételre. Járulj hozzá
          te is a fejlesztéshez!</p>
        <p>Igyekeztünk szigorú módszertan alapján összeválogatni a helyeket, ám írd meg nekünk azt is, ha egy hely szerepeltetésével nem értesz egyet!</p>
      </section>
    </div>
  </div>
);

export default AboutView;
