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
          <p><b>A NER HOTEL egy olyan webes alkalmazás, ami átláthatóbbá teszi a magyar szállás- és a vendéglátóhelyek tulajdonosi és üzemeltetői hátterét.</b> Segítségével tájékozódhatsz, kinél cseng a
            kassza a költésed nyomán, ha asztalt vagy szállást foglalsz.</p>
          <p>Az oldal tartalmát az alábbi módszertan alapján a K-Monitor készíti. Az oldal fejlesztésben a <a href="https://github.com/Code-for-Hungary" target="new">Code for Hungary</a> önkéntesei vettek részt. Az eszköz <a href="https://github.com/Code-for-Hungary/nerhotel" target="new">nyílt forráskóddal</a> rendelkezik, így szabadon továbbfejleszthető, alakítható és felhasználható. Ha segítenél, <a href="https://docs.google.com/forms/d/e/1FAIpQLSeep6bUaI0nC-ZelkPjdUdw_kvzAJu2XJc8qpNhAJeIRSyZEA/viewform" target="new">itt tudsz beszállni a csapatba</a>!</p>

        </section>
        <section>
          <h2>Milyen helyek szerepelnek rajta?</h2>
          <p>A NER HOTEL olyan <b>vendéglátó-, idegenforgalmi- és szálláshelyeket jelenít meg, amelyek politikailag exponált személyekhez köthetőek</b>, az általuk
            termelt haszon ilyen szereplőknél jelenik meg. Előfordulhat, hogy egy ingatlannak más a tulajdonosa, mint az ott üzemelő helynek, ilyenkor az utóbbit vesszük alapul, mivel a fogyasztásból
            eredő haszon közvetlenül az üzemeltetőnél csapódik le. Politikailag exponált személynek elsősorban a <a href="https://net.jogtar.hu/jogszabaly?docid=a1700053.tv" target="new">2017. évi LIII. törvény</a> 4. §-ában adott meghatározást követve a kiemelt
            közszereplőket, ezek közeli hozzátartozóit és a velük közeli kapcsolatban álló személyeket tekintjük. Ez a definíció a nemzetközi pénzügyi visszaélésekkel összefüggésben, kockázati elven
            határozza meg a PEP-ek egy bizonyos körét. A hazai idegenforgalom politikailag exponált szereplőinek azonosítása érdekében a NER HOTEL a nemzetközi átvilágítási sztenderdekre is
            tekintettel egy ennél bővebb definíciót használ. Ez tartalmazza az önkormányzati döntéshozókat, a turisztikai ágazat kormányzati szervezeteinek vezetőit, illetve azokat a személyeket, akik
            sajtóprofiljuk alapján valamely politikailag exponált személlyel kiterjedt, a szereplők reputációját befolyásoló kapcsolatot tartanak fenn.</p>
          <p>A NER HOTEL célja, hogy ezen személyek turisztikai érdekeltségeiről hiteles és rendszerezett információt kínáljon, ami egy szempontja lehet a tudatos fogyasztói döntéseknek. Az ehhez
            szükséges információk feltérképezését nyilvánosan is elérhető sajtóhírek és cégadatok alapján, a <a href="https://k-monitor.hu/adatbazis" target="new">K-Monitor sajtóadatbázisát</a> felhasználva folyamatosan végezzük.</p>
            <p>Az aktuális adatbázis tartalmának csv formátumban letöltéséhez <a href="https://www.nerhotel.hu/#/data-export">kattints ide</a>.</p>
        </section>
        <section>
          <h2>Milyen adatokra alapozzuk mindezt?</h2>
          <p>Az oldalon feltüntetett, politikai érintettséget vagy gazdasági érdekeltséget alátámasztó, a köz érdeklődésére számot tartó információk bárki számára hozzáférhetőek és ellenőrizhetőek. Az
            adatbázisban szereplő helyek tulajdonosainak vagy üzemeltetőinek politikai szimpátiája nem szolgálhat alapul a NER Hotelen történő megjelenésre.</p>
          <p><strong>Személyek háttere:</strong> <a href="https://k-monitor.hu/adatbazis" target="_blank" rel="noopener noreferrer">K-Monitor sajtóadatbázis</a></p>
          <p><strong>Céginformációk:</strong> Bisnode</p>
          <p><strong>Helyek adatai:</strong> Országos Kereskedelmi Nyilvántartás, önkéntes gyűjtés (helyek honlapjai, sajtócikkek, <a href="https://k-monitor.hu/adatbazis/cimkek/kisfaludy-program" target="_blank" rel="noopener noreferrer">Kisfaludy Program</a>, stb.)</p>
        </section>
        <section>
          <h2>Milyen forrásból? Honnan volt rá pénz?</h2>
          <p>Az ötlet első publikus megfogalmazását jelentő 2018-ban írt <a href="https://k.blog.hu/2018/08/03/ner_hotel" target="new">blogposztunk</a> felhívására <b>116 támogatónk adott össze összesen 577.213 forintot</b>. Ebből az összegből részben a fejlesztés során felmerülő, valamint a fenntartáshoz szükséges elkerülhetetlen költségeket fedeztük, részben kommunikációra költöttünk.</p> Ezen mikroadományokon túl más forrás nem kapcsolódik a projekthez.
          <p><b>Ha értékesnek találod a munkánkat, <a href="https://tamogatas.k-monitor.hu" target="new">támogasd a K-Monitort rendszeres adományoddal</a>!</b></p>
        </section>
        <section>
          <h2>Hibát találtál? Jelezd felénk!</h2>
          <p>Az idegenforgalom és vendéglátás folyamatos mozgásban van, gyakran történnek változások a céges adatokban. Elképzelhető, hogy bizonyos, a NER Hotelben feltüntetett adatok mára elavultak, nem pontosak vagy éppen hiányosak.</p>
          <p>Büszkék vagyunk rá, hogy önkéntesek segítségével építettük az alkalmazást és nyitottak vagyunk minden észrevételre. Járulj hozzá te is a fejlesztéshez! <a href="mailto:info@k-monitor.hu">Írd meg nekünk</a>, ha hibát találsz, vagy ha egy hely megjelenítésével nem értesz egyet! A beküldött információkat természetesen nem közvetlenül, hanem csak a saját módszertanunkkal való összevetés után vezetjük fel.</p>
        </section>
      </div>
    </Layout>
  );
};

export default AboutView;
