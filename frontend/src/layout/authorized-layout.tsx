import React from "react";
import UnauthorizedRoutes from "../routes/unauthorized-routes";

const AuthorizedLayout = () => {
  return (
    <div>
      <UnauthorizedRoutes />
    </div>
  );
};

export default AuthorizedLayout;
