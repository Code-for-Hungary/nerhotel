import React from 'react';
import Header from '../components/Header.js';
import List from '../components/List.js';
import Menu from '../components/Menu';
import { MapContext } from '../context';

const Layout = (props) => {
  const {dispatch, showList } = React.useContext(MapContext);

  React.useEffect(() => {
    dispatch({ type: 'ToggleMenu', showMenu: false });
  }, [dispatch]);

  return (
    <>
      <Header withSearch={props.withSearch} history={props.history}/>
      <Menu/>
      {props.children}
      {props.withList && showList && <List/>}
    </>
  );
};


export default Layout;
