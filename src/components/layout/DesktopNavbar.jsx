import React, { useEffect, Fragment } from "react";
import {
  AccountsIcon,
  SalesIcon,
  PurchaseIcon,
  OthersIcon
} from "./NavbarIcons";
import { NavLink } from "../common/NavLink";
import { connect } from "react-redux";
import { loadUser } from "./../../actions/authAction";

const DesktopNavbar = ({
  auth: { isAuthenticated },
  loadUser,
  activeIcons,
  setActiveIcons
}) => {
  const { accounts, sales, purchase, others } = activeIcons;

  const routeChange = path => {
    let pathname = path.split("/");
    if (
      pathname[1] === "accounts" ||
      pathname[1] === "sales" ||
      pathname[1] === "purchase" ||
      pathname[1] === "others"
    ) {
      document.getElementById(pathname[1]).classList.add("activeNav");
      setActiveIcons({ [pathname[1]]: true });
    }
  };

  useEffect(() => {
    // loadUser();
    routeChange(window.location.pathname);

    // eslint-disable-next-line
  }, []);

  const onClick = id => {
    document.getElementById(id).classList.add("activeNav");
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
                  active={accounts}
                />
              </li>
              <li>
                <NavLink
                  Icon={SalesIcon}
                  activeIcons={activeIcons}
                  onClick={onClick}
                  id="sales"
                  active={sales}
                />
              </li>
              <li>
                <NavLink
                  Icon={PurchaseIcon}
                  activeIcons={activeIcons}
                  onClick={onClick}
                  id="purchase"
                  active={purchase}
                />
              </li>
              <li>
                <NavLink
                  Icon={OthersIcon}
                  activeIcons={activeIcons}
                  onClick={onClick}
                  id="others"
                  active={others}
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
