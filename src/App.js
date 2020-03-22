import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import setAuthToken from "./utils/setAuthToken";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import { Home } from "./components/pages/Home";
import DesktopNavbar from "./components/layout/DesktopNavbar";
import { MobileNavbar } from "./components/layout/MobileNavbar";
import { Accounts } from "./components/pages/Accounts";
import { Sales } from "./components/pages/Sales";
import { Purchase } from "./components/pages/Purchase";
import { Others } from "./components/pages/Others";
import { Provider } from "react-redux";
import store from "./store";
import "./css/style.css";
import { PrivateRoute } from "./components/routing/PrivateRoute";
import { NotFound } from "./components/pages/NotFound";
import { HideRoute } from "./components/routing/HideRoute";
import Alert from "./components/common/Alert";

if (localStorage.token) setAuthToken(localStorage.token);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Alert />
        <div
          className={`main ${
            !localStorage.getItem("token") ? "" : "container"
          }`}
        >
          <div className="row">
            {localStorage.getItem("token") && (
              <Fragment>
                <MobileNavbar />
                <DesktopNavbar />
              </Fragment>
            )}
            <Switch>
              <HideRoute exact path="/" component={Home} />
              <HideRoute exact path="/register" component={Register} />
              <HideRoute exact path="/login" component={Login} />
              <PrivateRoute exact path="/accounts" component={Accounts} />
              <PrivateRoute exact path="/sales" component={Sales} />
              <PrivateRoute exact path="/purchase" component={Purchase} />
              <PrivateRoute exact path="/others" component={Others} />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
