import React, { useState, useEffect } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const TopBar = ({ handleMenu }) => {
  return (
    <div className="w-full z-10 bg-white flex flex-row justify-between items-center px-4 h-16 fixed">
      <div className="flex flex-row items-center">
        <div className="sm:hidden">
          <IconButton
            onClick={handleMenu}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        </div>
        <img src="/logo.png" className="w-40 h-8" />
      </div>
      <div className="flex flex-row items-center">
        <p className="hidden sm:flex mr-4">
          Hello,&nbsp;<span className="text-red-700">Shiper User</span>
        </p>
        <Avatar />
      </div>
    </div>
  );
};

export default TopBar;
