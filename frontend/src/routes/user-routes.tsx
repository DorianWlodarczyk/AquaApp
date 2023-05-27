import React from 'react'
import { Route, Routes } from 'react-router-dom'
import TestPage from '../pages/common/test-page/test-page'
import PageNotFound from '../pages/common/page-not-found/page-not-found'
import AquariumsList from '../pages/user/aquariums-list/aquariums-list'

const UserRoutes = () => {
  return (
    <Routes>
      <Route path='/'>
        <Route index element={<></>} />
        <Route path='/aquariums' element={<AquariumsList />} />
        <Route path='/test1' element={<TestPage />} />
      </Route>
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  )
}

export default UserRoutes