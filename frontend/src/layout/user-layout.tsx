import React, { useContext } from "react";
import Sidebar, { Category } from "../components/sidebar/sidebar";
import Navbar from "../components/navbar/navbar";
import { UIContext } from "../contexts/ui-context";
import style from "./layout.module.scss";
import UserRoutes from "../routes/user-routes";

const categories: Category[] = [
  {
    headerName: "Panel",
    buttons: [
      {
        name: "Akwaria",
        to: "/aqua",
      },
      {
        name: "Ryby",
        to: "/fish",
      },
    ],
  },
];

const UserLayout = () => {
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
          <UserRoutes />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
