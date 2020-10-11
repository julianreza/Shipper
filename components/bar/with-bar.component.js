import React, { useState, useEffect } from "react";
import SideBar from "./side-bar.component";
import TopBar from "./top-bar.component";

const WithBar = (WrappedComponent) => () => {
  const [leftMenu, setLeftMenu] = useState(false);

  console.log(leftMenu);

  const handleMenu = () => {
    console.log("test");
    setLeftMenu(!leftMenu);
  };

  return (
    <div className="w-full flex flex-col">
      <TopBar handleMenu={handleMenu} />
      <div className="flex flex-row">
        <div className="hidden sm:flex sm:w-1/6 mt-16">
          <SideBar handleMenu={handleMenu} leftMenu={leftMenu} />
        </div>
        <div className="w-full sm:w-5/6 bg-gray-200 mt-16">
          <WrappedComponent />
        </div>
      </div>
    </div>
  );
};

export default WithBar;
