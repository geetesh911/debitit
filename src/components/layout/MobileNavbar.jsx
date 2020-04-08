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

const MobileNavbar = ({
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
      setActiveIcons({ [pathname[1]]: true });
    }
  };

  useEffect(() => {
    routeChange(window.location.pathname);

    // eslint-disable-next-line
  }, []);

  const onClick = id => {
    document.getElementById(id).classList.add("activeNav");
    setActiveIcons({ [id]: true });
  };

  return (
    <Fragment>
      <nav className="dr-mobile-nav">
        <div className="mobile-nav-items">
          <NavLink
            Icon={AccountsIcon}
            activeIcons={activeIcons}
            onClick={onClick}
            id="mobile-accounts"
            active={accounts}
            onlyIcon={true}
          />
        </div>
        <div className="mobile-nav-items">
          <NavLink
            Icon={SalesIcon}
            activeIcons={activeIcons}
            onClick={onClick}
            id="mobile-sales"
            active={sales}
            onlyIcon={true}
          />
        </div>
        <div className="mobile-nav-items">
          <NavLink
            Icon={PurchaseIcon}
            activeIcons={activeIcons}
            onClick={onClick}
            id="mobile-purchase"
            active={purchase}
            onlyIcon={true}
          />
        </div>
        <div className="mobile-nav-items">
          <NavLink
            Icon={OthersIcon}
            activeIcons={activeIcons}
            onClick={onClick}
            id="mobile-others"
            active={others}
            onlyIcon={true}
          />
        </div>
      </nav>
    </Fragment>
  );
};
const mapStateToProps = state => ({
  auth: state.auth,
  nav: state.nav
});

export default connect(mapStateToProps, { loadUser })(MobileNavbar);
