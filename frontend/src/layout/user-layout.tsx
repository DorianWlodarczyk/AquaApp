import React, { useContext } from 'react'
import Sidebar, { Category } from '../components/sidebar/sidebar';
import Navbar from '../components/navbar/navbar';
import { MainContext } from '../contexts/main-context';
import style from './layout.module.css';

const categories: Category[] = [
  {
    headerName: 'Kategoria 1',
    buttons: [
      {
        name: 'Jeden'
      },
      {
        name: 'Dwa'
      },
      {
        name: 'Trzy'
      }
    ]
  },
  {
    headerName: 'Kategoria 2',
    buttons: [
      {
        name: 'Jeden'
      },
      {
        name: 'Dwa'
      },
      {
        name: 'Trzy'
      }
    ]
  }
];

const UserLayout = () => {
  const mainContext = useContext(MainContext);
  return (
    <div className={`${mainContext.isOpen ? style.open : style.collapsed} ${style.user} `}>
      <div className='row-span-2'><Sidebar categories={categories} /></div>
      <div><Navbar /></div>
      <div>body</div>
    </div>
  )
}

export default UserLayout