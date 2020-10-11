import React, { useState, useEffect } from "react";
import { Drawer } from "@material-ui/core";
import Link from "next/link";

const SideBar = ({ leftMenu, handleMenu }) => {
  const menu = [
    { href: "/", label: "Home" },
    { href: "/driver", label: "Driver Management" },
  ];

  return (
    <div className="h-screen">
      <div className="ml-4 mt-16">
        {menu.map(({ href, label }, index) => (
          <div button key={index} className="mb-6" style={{ borderColor: "#9a0000" }}>
            <Link href={href}>
              <a>{label}</a>
            </Link>
          </div>
        ))}
      </div>
      <Drawer anchor="left" open={leftMenu} onClose={handleMenu}>
        <div className="w-48 ml-4 mt-16">
          {menu.map(({ href, label }, index) => (
            <div button key={index} className="mb-6" style={{ borderColor: "#9a0000" }}>
              <Link href={href}>
                <a>{label}</a>
              </Link>
            </div>
          ))}
        </div>
      </Drawer>
    </div>
  );
};

export default SideBar;
