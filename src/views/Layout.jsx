import { useEffect, useContext } from "react";
import Header from "../components/Header";
import List from "../components/List";
import Menu from "../components/Menu";
import { MapContext } from "../context";

const Layout = (props) => {
    const { dispatch, showList } = useContext(MapContext);

    useEffect(() => {
        dispatch({ type: "ToggleMenu", showMenu: false });
    }, [dispatch]);

    return (
        <>
            <Header withSearch={props.withSearch} history={props.history} />
            <Menu />
            {props.children}
            {props.withList && showList && <List />}
        </>
    );
};

export default Layout;
