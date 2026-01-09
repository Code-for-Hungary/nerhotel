import { useContext, useState } from "react";
import Header from "../components/header/Header";
import List from "../components/List";
import Menu from "../components/header/Menu";
import { MapContext } from "../context";

const Layout = (props) => {
    const [showMenu, setShowMenu] = useState(false);
    const { showList } = useContext(MapContext);

    return (
        <>
            <Header onMenuOpen={() => setShowMenu(true)} />
            <Menu showMenu={showMenu} onClose={() => setShowMenu(false)} />
            {props.children}
            {showList && <List />}
        </>
    );
};

export default Layout;
