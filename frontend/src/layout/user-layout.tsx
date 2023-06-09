import React, { useContext } from "react";
import Sidebar, { Category } from "../components/sidebar/sidebar";
import Navbar from "../components/navbar/navbar";
import { UIContext } from "../contexts/ui-context";
import style from "./layout.module.scss";
import UserRoutes from "../routes/user-routes";

const categories: Category[] = [
  {
    headerName: "Kategoria 1",
    buttons: [
      {
        name: "Akwaria",
        to: "/aqua",
      },
      {
        name: "Dwa",
      },
      {
        name: "Trzy",
      },
    ],
  },
  {
    headerName: "Kategoria 2",
    buttons: [
      {
        name: "Jeden",
      },
      {
        name: "Page not found",
        to: "404",
      },
      {
        name: "Test1",
        to: "/test1",
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
