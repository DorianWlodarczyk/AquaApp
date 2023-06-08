import React, { useContext } from "react";
import SidebarButton, {
  SidebarButtonProps,
} from "./sidebar-button/sidebar-button";
import { UIContext } from "../../contexts/ui-context";
import style from "./sidebar.module.css";
export interface Category {
  headerName?: string;
  buttons?: SidebarButtonProps[];
}
interface props {
  categories: Category[];
}

const Sidebar = ({ categories }: props) => {
  const uiContext = useContext(UIContext);

  const renderButtons = (buttons?: SidebarButtonProps[]) => {
    return (
      <>
        {buttons?.map((item: SidebarButtonProps, index) => {
          return (
            <div key={index}>
              <SidebarButton name={item.name} to={item.to} />
            </div>
          );
        })}
      </>
    );
  };

  const Categories = ({ categories }: props) => {
    return (
      <>
        {categories.map((item: Category, index) => {
          return (
            <div
              key={index}
              className={`${
                uiContext.isOpen ? style.categoriesOpen : style.categoriesClose
              }`}
            >
              <div className="mb-2">
                {uiContext.isExpanded ? item.headerName : ""}
              </div>
              <div>{renderButtons(item.buttons)}</div>
            </div>
          );
        })}
      </>
    );
  };

  const Header = () => {
    return (
      <div>
        <div className={`${style.header}`}>
          <div
            className={`${
              uiContext.isExpanded ? style.normalTitle : style.smallTitle
            }`}
          >
            AQUA FRIENDS
          </div>
        </div>
        <hr className={`${style.line}`} />
      </div>
    );
  };

  const Footer = () => {
    return (
      <div className={`${style.footer}`}>
        <div className={`${style.toggleButton}`}>
          <div
            className={`${style.toggleIcon}`}
            onClick={() => uiContext.setExpanded(!uiContext.isExpanded)}
          >
            {uiContext.isExpanded ? "<" : ">"}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {uiContext.isOpen && (
        <div
          className={style.blackout}
          onClick={() => uiContext.setOpen(false)}
        >
          s
        </div>
      )}
      <div className={`${style.sidebar}`}>
        <div>
          <Header />
          <Categories categories={categories} />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Sidebar;
