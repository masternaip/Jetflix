import React, { useRef, useState } from 'react';
import {
  NavItem,
  NavLeft,
  NavList,
  NavRight,
  Wrapper
} from './Navbar.style';
import logo from '../../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ navItems, button }) => {
  const [navBG, setNavBG] = useState(false);
  const [openBox, setOpenBox] = useState(false);
  const searchRef = useRef();
  const navigate = useNavigate();

  const changeBackground = () => {
    if (window.pageYOffset > 0) {
      setNavBG(true);
    } else {
      setNavBG(false);
    }
  };
  window.addEventListener('scroll', changeBackground);

  const showSearchBox = (e) => {
    e.stopPropagation();
    searchRef.current.focus();
    setOpenBox(!openBox);
  };

  return (
    <Wrapper navBG={navBG}>
      <NavRight>
        <div onClick={() => navigate('/')}>
          <img src={logo} alt="site logo" />
        </div>
        <div id="nav-dropdown">
          <span id="nav-dropdown-btn">Browse</span>
          <div className="arrow"></div>
          <NavList>
            {navItems?.map((navItem) => (
              <NavItem key={navItem.name} onClick={navItem.navNavigate}>
                {navItem.name}
              </NavItem>
            ))}
          </NavList>
        </div>
      </NavRight>
      <NavLeft openBox={openBox}>
        <div id="search-icon">
          <FontAwesomeIcon icon={faMagnifyingGlass} onClick={(e) => showSearchBox(e)} />
          <input
            ref={searchRef}
            id="search-box"
            placeholder="Title, people, genres"
          />
        </div>
        <div id="notification">
          <FontAwesomeIcon icon={faBell} />
        </div>
        {button?.map((item, index) => (
          <Button key={index} onClick={item.callBack}>
            {item.name}
          </Button>
        ))}
      </NavLeft>
    </Wrapper>
  );
};

export default Navbar;
