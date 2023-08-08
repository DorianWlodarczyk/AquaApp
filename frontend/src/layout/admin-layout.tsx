import React, { useContext } from "react";
import Sidebar, { Category } from "../components/sidebar/sidebar";
import Navbar from "../components/navbar/navbar";
import { UIContext } from "../contexts/ui-context";
import style from "./layout.module.scss";
import AdminRoutes from "../routes/admin-routes";

const categories: Category[] = [
  {
    headerName: "Ryby",
    buttons: [
      {
        name: "Ryby",
        to: "/fish",
      },
    ],
  },
  {
    headerName: "Akwaria",
    buttons: [
      {
        name: "Grzałki",
        to: "/heater",
      },
      {
        name: "Oświetlenie",
        to: "/lamp",
      },
      {
        name: "Rośliny",
        to: "/plant",
      },
      {
        name: "Pompy",
        to: "/pump",
      },
      {
        name: "Dodatki",
        to: "/asset",
      },
      {
        name: "Podłoże",
        to: "/ground",
      },
    ],
  },
];

const AdminLayout = () => {
  const uiContext = useContext(UIContext);

  const getExpandedStyle = (): string => {
    return `${uiContext.isExpanded ? style.expanded : style.collapsed}`;
  };

  const getOpenStyle = (): string => {
    return `${uiContext.isOpen ? style.opened : style.closed}`;
  };

  return (
    <div className={`${getExpandedStyle()}`}>
      <div className={`${getOpenStyle()}`}>
        <Sidebar categories={categories} />
      </div>
      <div className={`${style.navbar}`}>
        <Navbar />
      </div>
      <div className={`${style.body}`}>
        <div className={style.bodyContent}>
          <AdminRoutes />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
