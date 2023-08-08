import React from "react";
import LoginPage from "../pages/unauthorized/login-page";
import { Route, Routes } from "react-router-dom";
import RegistrationPage from "../pages/unauthorized/registration-page";

const UnauthorizedRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<LoginPage />}></Route>
      <Route path="registration" element={<RegistrationPage />}></Route>
    </Routes>
  );
};

export default UnauthorizedRoutes;
