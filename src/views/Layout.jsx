import { useEffect, useContext } from "react";
import Header from "../components/header/Header";
import List from "../components/List";
import Menu from "../components/header/Menu";
import { MapContext } from "../context";

const Layout = (props) => {
    const { dispatch, showList } = useContext(MapContext);

    useEffect(() => {
        dispatch({ type: "ToggleMenu", showMenu: false });
    }, [dispatch]);

    return (
        <>
            <Header history={props.history} />
            <Menu />
            {props.children}
            {showList && <List />}
        </>
    );
};

export default Layout;
