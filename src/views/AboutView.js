import React from 'react';
import Layout from './Layout';
import styles from '../css/about.module.css';

const AboutView = (props) => {
  return (
    <Layout history={props.history}>
      <div className={styles.about}>
        <section>
          <h2>Mi az a NER Hotel?</h2>
          <p>A magyar közéletet régóta jellemzi a politikai elit törekvése egy vele összefonódó vállalkozói réteg létrehozására. Megfelelő kapcsolatokkal és politikai hátszéllel akár néhány év alatt
            jelentős vagyont lehet felhalmozni célzott közbeszerzések, vissza nem térítendő támogatások és kedvezményes hitelek révén. Mára a vendéglátás és az idegenforgalom területén is
            megkerülhetetlenné váltak azok a vállalkozások, amelyek ennek a folyamatnak a haszonélvezői, hotelek és éttermek százai kerültek politikaközeli szereplők érdekeltségébe szerte az
            országban. A rendszerszerű klientúraépítés felett az állampolgári kontroll lehetőségei beszűkültek, vásárlóként azonban továbbra is lehetőségünk van a pénztárcánkkal szavazni a vállalkozók
            mellett és a politikai hátszéllel segített vállalkozói réteg további térhódítása ellen.</p>
          <p>A NER Hotel egy olyan webes alkalmazás, ami átláthatóbbá teszi a magyar szállás- és a vendéglátóhelyek tulajdonosi és üzemeltetői hátterét. Segítségével tájékozódhatsz, kinél cseng a
            kassza a költésed nyomán, ha asztalt vagy szállást foglalsz.</p>
        </section>
        <section>
          <h2>Milyen helyek szerepelnek rajta?</h2>
          <p>A NER HOTEL olyan vendéglátó-, idegenforgalmi- és szálláshelyeket jelenít meg, amelyek politikailag exponált személyekhez (angolul politically exposed persons, PEP) köthetőek, az általuk
            termelt haszon ilyen szereplőknél jelenik meg. Előfordulhat, hogy egy ingatlannak más a tulajdonosa, mint az ott üzemelő helynek, ilyenkor az utóbbit vesszük alapul, mivel a fogyasztásból
            eredő haszon közvetlenül az üzemeltetőnél csapódik le. Politikailag exponált személynek elsősorban a <u>2017. évi LIII. törvény</u> 4. §-ában adott meghatározást követve a kiemelt
            közszereplőket, ezek közeli hozzátartozóit és a velük közeli kapcsolatban álló személyeket tekintjük. Ez a definíció a nemzetközi pénzügyi visszaélésekkel összefüggésben, kockázati elven
            határozza meg a PEP-ek egy bizonyos körét. A hazai idegenforgalom politikailag exponált szereplőinek azonosítása érdekében a NER HOTEL a nemzetközi átvilágítási sztenderdekre is
            tekintettel egy ennél bővebb definíciót használ. Ez tartalmazza az önkormányzati döntéshozókat, a turisztikai ágazat kormányzati szervezeteinek vezetőit, illetve azokat a személyeket, akik
            sajtóprofiljuk alapján valamely politikailag exponált személlyel kiterjedt, a szereplők reputációját befolyásoló kapcsolatot tartanak fenn.</p>
          <p>A NER HOTEL célja, hogy ezen személyek turisztikai érdekeltségeiről hiteles és rendszerezett információt kínáljon, ami egy szempontja lehet a tudatos fogyasztói döntéseknek. Az ehhez
            szükséges információk feltérképezését nyilvánosan is elérhető sajtóhírek és cégadatok alapján, a K-Monitor sajtóadatbázisát felhasználva folyamatosan végezzük.</p>
            <p>Az adatbázis tartalmának csv formátumban letöltéséhez <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vSEboU5aIOUgZ-hmNpLQIYB8EZTc1HYAFf9mL97jvjVl6S9auEiFxJ1fwMpbr6-7dwPYl57BOK4ANfs/pub?gid=0&single=true&output=csv">kattints ide</a> (2020. október 7-i állapot).</p>
        </section>
        <section>
          <h2>Milyen adatokra alapozzuk mindezt?</h2>
          <p>Az oldalon feltüntetett, politikai érintettséget vagy gazdasági érdekeltséget alátámasztó, a köz érdeklődésére számot tartó információk bárki számára hozzáférhetőek és ellenőrizhetőek. Az
            adatbázisban szereplő helyek tulajdonosainak vagy üzemeltetőinek politikai szimpátiája nem szolgálhat alapul a NER Hotelen történő megjelenésre.</p>
          <p><strong>Személyek háttere:</strong> <a href="https://k-monitor.hu/adatbazis" target="_blank" rel="noopener noreferrer">K-Monitor sajtóadatbázis</a></p>
          <p><strong>Céginformációk:</strong> Bisnode</p>
          <p><strong>Helyek adatai:</strong> Országos Kereskedelmi Nyilvántartás, önkéntes gyűjtés (helyek honlapjai, sajtócikkek, <a href="https://k-monitor.hu/adatbazis/cimkek/kisfaludy-program" target="_blank" rel="noopener noreferrer">Kisfaludy Program stb.)</a></p>
        </section>
        <section>
          <h2>Hibát találtál? Jelezd felénk!</h2>
          <p>Az idegenforgalom és vendéglátás folyamatos mozgásban van, gyakran történnek változások a céges adatokban. Elképzelhető, hogy bizonyos, a NER Hotelben feltüntetett adatok mára elavultak, nem pontosak vagy éppen hiányosak.</p>
          <p>Büszkék vagyunk rá, hogy önkéntesek segítségével építettük az alkalmazást és nyitottak vagyunk minden észrevételre. Járulj hozzá te is a fejlesztéshez! <a href="https://docs.google.com/forms/d/e/1FAIpQLSdi6uNP-ML46outzCbOifdwKefAaB1x_j9eXMzeTJYGB5NEnA/viewform" target="_blank" rel="noopener noreferrer">Írd meg nekünk</a>, ha hibát találsz, vagy ha egy hely megjelenítésével nem értesz egyet! A beküldött információkat természetesen nem közvetlenül, hanem csak a saját módszertanunkkal való összevetés után vezetjük fel.</p>
        </section>
      </div>
    </Layout>
  );
};

export default AboutView;
