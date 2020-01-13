import React from 'react'
import { Link } from "react-router-dom";

import Search from './Search'
import Menu from './Menu'
import styles from '../css/header.module.css'
import Icon from './Icon';
import listIcon from '../assets/menu-icon.svg';

import logo from '../assets/nh-logo.svg';
import hotel from '../assets/nh-hotel.svg';
import beach from '../assets/nh-beach.svg';
import restaurant from '../assets/nh-restaurant.svg';
import golf from '../assets/nh-golf.svg';


class Header extends React.Component {
  constructor () {
    super()
    this.state = {
      showMenu: false
    }
    this.openMenu = this.openMenu.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
  }

  openMenu () {
    this.setState({showMenu: true})
  }

  closeMenu () {
    this.setState({showMenu: false})
  }

  render () {
    const headerHeight = this.props.withSearch ? styles.large : styles.small

    return (
      <div className={[styles.header, headerHeight].join(' ')}>
        <div className={styles.menubutton} onClick={this.openMenu}>
          <Icon img={listIcon} size="large" />
        </div>
        <div className={styles.headerWrapper}>
          <Link to="/" className={styles.logo}>
            <img src={logo}/>
          </Link>
          <div className={styles.headerInner}>
            <div className={styles.icons}>
              <img src={hotel}/>
              <img src={beach}/>
              <img src={restaurant}/>
              <img src={golf}/>
            </div>
            {this.props.withSearch && <Search/>}
          </div>
        </div>
        {this.state.showMenu && <Menu close={this.closeMenu}/>}
      </div>
    )
  }
}

export default Header
