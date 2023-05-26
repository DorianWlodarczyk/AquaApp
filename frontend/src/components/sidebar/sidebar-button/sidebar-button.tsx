import React, { useContext } from 'react'
import { SvgIconProps } from '@mui/material';
import { Link } from "react-router-dom";
import { UIContext } from '../../../contexts/ui-context';
import style from './sidebar-button.module.css'
export interface SidebarButtonProps {
  icon?: React.ReactElement<SvgIconProps>,
  name: string,
  to?: string
}

const SidebarButton = ({ icon, name, to }: SidebarButtonProps) => {
  const uiContext = useContext(UIContext);

  return (
    <Link to={to ? to : "/"}>
      <div className={`${style.button}`}>
        <div className={`${style.icon}`}>
          {icon ? icon : name[0]}
        </div>

        <div className={`${style.text}`}>
          {(uiContext.isExpanded || uiContext.isOpen) ? name : ''}
        </div>

        {!uiContext.isExpanded &&
          <div className={`${style.hint}`}>
            <div className={`${style.arrow}`} />
            {name}
          </div>}

      </div>
    </Link>
  )
}

export default SidebarButton