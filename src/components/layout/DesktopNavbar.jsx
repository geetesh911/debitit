import React, { useEffect, useState, Fragment } from "react";
import {
  AccountsIcon,
  SalesIcon,
  PurchaseIcon,
  OthersIcon
} from "./NavbarIcons";
import { NavLink } from "../common/NavLink";
import { connect } from "react-redux";
import { loadUser } from "./../../actions/authAction";

const DesktopNavbar = ({ auth: { isAuthenticated }, loadUser }) => {
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
      document.getElementById(pathname[1]).classList.add("active");
      setActiveIcons({ [pathname[1]]: true });
    }
  };

  useEffect(() => {
    // loadUser();
    routeChange(window.location.pathname);
  }, []);

  const onClick = id => {
    document.querySelector(".active").classList.remove("active");
    document.getElementById(id).classList.add("active");
    setActiveIcons({ [id]: true });
  };

  return (
    <Fragment>
      {
        <div className="dr-nav">
          <div className="dr-nav-brand">
            <img
              src="https://i.ibb.co/LkbKKgt/logo.png"
              className="dr-nav-brand-img"
              alt=""
            />
          </div>
          <div className="dr-nav-menu">
            <ul>
              <li>
                <NavLink
                  Icon={AccountsIcon}
                  activeIcons={activeIcons}
                  onClick={onClick}
                  id="accounts"
                />
              </li>
              <li>
                <NavLink
                  Icon={SalesIcon}
                  activeIcons={activeIcons}
                  onClick={onClick}
                  id="sales"
                />
              </li>
              <li>
                <NavLink
                  Icon={PurchaseIcon}
                  activeIcons={activeIcons}
                  onClick={onClick}
                  id="purchase"
                />
              </li>
              <li>
                <NavLink
                  Icon={OthersIcon}
                  activeIcons={activeIcons}
                  onClick={onClick}
                  id="others"
                />
              </li>
            </ul>
          </div>
        </div>
      }
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { loadUser })(DesktopNavbar);
