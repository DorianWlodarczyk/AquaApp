import React from 'react'
import { Route, Routes } from 'react-router-dom'
import TestPage from '../pages/test-page/test-page'

const UserRoutes = () => {
  return (
    <Routes>
      <Route path='/'>
        <Route index />

        <Route path='/test1' element={<TestPage />} />
      </Route>
    </Routes>
  )
}

export default UserRoutes