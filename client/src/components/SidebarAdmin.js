import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';
import * as IoIcons from 'react-icons/io';
import * as BiIcons from "react-icons/bi";

export const SidebarAdmin = [
  {
    title: 'Course',
    path: '/admin',
    icon: <BsIcons.BsBookHalf />,
    cName: 'nav-text'
  },
  {
    title: 'Order User',
    path: '/reports/orders',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Cart User',
    path: '/reports/carts',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  {
    title: 'User',
    path: '/reports/users',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Items Status',
    path: '/reports/items',
    icon: <BiIcons.BiSitemap />,
    cName: 'nav-text'
  },
];