import React from 'react'
import { Route, Routes } from 'react-router-dom'
import TestPage from '../pages/common/test-page/test-page'
import PageNotFound from '../pages/common/page-not-found/page-not-found'

const UserRoutes = () => {
  return (
    <Routes>
      <Route path='/'>
        <Route index />

        <Route path='/test1' element={<TestPage />} />
      </Route>
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  )
}

export default UserRoutes