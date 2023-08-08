import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminHeaterPage from "../pages/admin/heater/admin-heater-page";
import AdminLampPage from "../pages/admin/lamp/admin-lamp-page";
import AdminPlantPage from "../pages/admin/plant/admin-plant-page";
import AdminPumpPage from "../pages/admin/pump/admin-pump-page";
import AdminAssetsPage from "../pages/admin/assets/admin-assets-page";
import AdminGroundPage from "../pages/admin/ground/admin-ground-page";
import AdminFishPage from "../pages/admin/fish/admin-fish-page";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<AdminFishPage />}></Route>
      <Route path="heater" element={<AdminHeaterPage />}></Route>
      <Route path="lamp" element={<AdminLampPage />}></Route>
      <Route path="plant" element={<AdminPlantPage />}></Route>
      <Route path="pump" element={<AdminPumpPage />}></Route>
      <Route path="asset" element={<AdminAssetsPage />}></Route>
      <Route path="ground" element={<AdminGroundPage />}></Route>
      <Route path="fish" element={<AdminFishPage />}></Route>
    </Routes>
  );
};

export default AdminRoutes;
