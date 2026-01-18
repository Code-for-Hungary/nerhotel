import { useState } from "react";
import Header from "../components/header/Header";
import Menu from "../components/header/Menu";

const Layout = (props) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <>
            <Header onMenuOpen={() => setShowMenu(true)} />
            <Menu showMenu={showMenu} onClose={() => setShowMenu(false)} />
            {props.children}
        </>
    );
};

export default Layout;
