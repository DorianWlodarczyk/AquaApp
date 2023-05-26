import React from 'react';
import Sidebar, { Category } from './components/sidebar/sidebar';


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


function App() {
  return (
    <>
      <Sidebar categories={categories}/>
    </>
  );
}

export default App;
