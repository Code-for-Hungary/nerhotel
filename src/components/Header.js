import React from 'react'
import { Link } from "react-router-dom";

import Search from './Search'
import Menu from './Menu'
import styles from '../css/header.module.css'
import Icon from './Icon';
import listIcon from '../assets/menu-icon.svg';


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
        <Link to="/"><h1>NER Hotel</h1></Link>
        <div className={styles.menubutton} onClick={this.openMenu}>
          <Icon img={listIcon} size="large" />
        </div>
        {this.props.withSearch && <Search/>}
        {this.state.showMenu && <Menu close={this.closeMenu}/>}
      </div>
    )
  }
}

export default Header
