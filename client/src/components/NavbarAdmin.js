import React, { useState } from 'react';
import {FaBars} from 'react-icons/fa';
import {AiOutlineClose} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarAdmin } from './SidebarAdmin';
import './NavbarAdmin.css'
import { IconContext } from 'react-icons';

function NavbarAdmin() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#A9A9A9' }}>
        <div class='navbarAdm'>
          <Link to='#' class='menu-bars'>
            <FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav class={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul class='nav-menu-items' onClick={showSidebar}>
            <li class='navbar-toggle'>
              <Link to='#' class='menu-bars'>
                <AiOutlineClose />
              </Link>
            </li>
            {SidebarAdmin.map((item, index) => {
              return (
                <li key={index} class={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default NavbarAdmin