import React, { useEffect, useState } from "react";
import UserLayout from "./layout/user-layout";
import AuthorizedLayout from "./layout/authorized-layout";
import { firebaseAuth, getToken } from "./utils/firebase";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./layout/admin-layout";
import UserApi from "./utils/api/user.service";

function App() {
  const [status, setStatus] = useState("UNAUTHORIZED");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = firebaseAuth().onAuthStateChanged(async (user) => {
      const { isAdmin } = await UserApi.isAdmin();
      console.log("🚀 ~ file: App.tsx:16 ~ unsubscribe ~ isAdmin:", isAdmin);
      if (user) {
        if (isAdmin) {
          setStatus("ADMIN");
        } else {
          setStatus("USER");
        }
        // navigate("/");
      } else {
        setStatus("UNAUTHORIZED");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  switch (status) {
    case "UNAUTHORIZED":
      return <AuthorizedLayout />;
    case "USER":
      return <UserLayout />;
    case "ADMIN":
      return <AdminLayout />;
    default:
      return <AuthorizedLayout />;
  }
}

export default App;
