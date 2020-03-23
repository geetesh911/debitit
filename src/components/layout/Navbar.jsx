import React, { Fragment, useState } from "react";
import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";

export const Navbar = () => {
  const [activeIcons, setActiveIcons] = useState({
    home: false,
    accounts: false,
    sales: false,
    purchase: false,
    others: false
  });

  return (
    <Fragment>
      <MobileNavbar activeIcons={activeIcons} setActiveIcons={setActiveIcons} />
      <DesktopNavbar
        activeIcons={activeIcons}
        setActiveIcons={setActiveIcons}
      />
    </Fragment>
  );
};
