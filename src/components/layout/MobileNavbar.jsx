import React, { useEffect, useState, Fragment } from "react";
import {
  AccountsIcon,
  SalesIcon,
  PurchaseIcon,
  OthersIcon
} from "./NavbarIcons";
import { NavLink } from "../common/NavLink";

export const MobileNavbar = () => {
  const [activeIcons, setActiveIcons] = useState({
    home: false,
    accounts: false,
    sales: false,
    purchase: false,
    others: false
  });

  const routeChange = path => {
    let pathname = path.split("/");
    if (
      pathname[1] === "accounts" ||
      pathname[1] === "sales" ||
      pathname[1] === "purchase" ||
      pathname[1] === "others"
    ) {
      document.getElementById(`mobile-${pathname[1]}`).classList.add("active");
      setActiveIcons({ [pathname[1]]: true });
    }
  };

  useEffect(() => {
    routeChange(window.location.pathname);
  }, []);

  const onClick = id => {
    document.querySelector(".active").classList.remove("active");
    document.getElementById(id).classList.add("active");
    setActiveIcons({ [id]: true });
  };

  return (
    <Fragment>
      <div className="dr-mobile-nav">
        {/* <div className="mobile-nav-items">
          <NavLink
            Icon={HomeIcon}
            activeIcons={activeIcons}
            onClick={onClick}
            id="mobile-home"
          />
        </div> */}
        <div className="mobile-nav-items">
          <NavLink
            Icon={AccountsIcon}
            activeIcons={activeIcons}
            onClick={onClick}
            id="mobile-accounts"
          />
        </div>
        <div className="mobile-nav-items">
          <NavLink
            Icon={SalesIcon}
            activeIcons={activeIcons}
            onClick={onClick}
            id="mobile-sales"
          />
        </div>
        <div className="mobile-nav-items">
          <NavLink
            Icon={PurchaseIcon}
            activeIcons={activeIcons}
            onClick={onClick}
            id="mobile-purchase"
          />
        </div>
        <div className="mobile-nav-items">
          <NavLink
            Icon={OthersIcon}
            activeIcons={activeIcons}
            onClick={onClick}
            id="mobile-others"
          />
        </div>
      </div>
    </Fragment>
  );
};
