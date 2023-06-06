import React from "react";
import { Route, Routes } from "react-router-dom";
import TestPage from "../pages/common/test-page/test-page";
import PageNotFound from "../pages/common/page-not-found/page-not-found";
import AquariumsList from "../pages/user/aquariums/index/list";
import NewAquariumPage from "../pages/user/aquariums/new/new-aquarium-page";
import AquaPage from "../pages/user/aquariums/aqua/aqua";
import FishList from "../pages/user/fish/list/fish-list";
const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<></>} />
        <Route path="aqua">
          <Route index element={<AquariumsList />} />
          <Route path="new" element={<NewAquariumPage />} />
          <Route path=":id">
            <Route index element={<AquaPage />} />
            <Route path=":fishID" element={<FishList />} />
          </Route>
        </Route>
        <Route path="fish">
          <Route index element={<FishList />} />
        </Route>
        <Route path="/test1" element={<TestPage />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default UserRoutes;
