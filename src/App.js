import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import setAuthToken from "./utils/setAuthToken";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import { Navbar } from "./components/layout/Navbar";
import { Home } from "./components/pages/Home";
import Accounts from "./components/pages/Accounts";
import Sales from "./components/pages/Sales";
import Purchase from "./components/pages/Purchase";
import Others from "./components/pages/Others";
import { Provider } from "react-redux";
import store from "./store";
import "./css/style.css";
import { PrivateRoute } from "./components/routing/PrivateRoute";
import { NotFound } from "./components/pages/NotFound";
import { HideRoute } from "./components/routing/HideRoute";
import Alert from "./components/common/Alert";

if (document.cookie && document.cookie.split("=")[1].length > 0) {
  setAuthToken(document.cookie.split("=")[1]);
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Alert />
        <div
          className={`main ${
            document.cookie && document.cookie.split("=")[1].length <= 0
              ? ""
              : "container"
          }`}
        >
          <div className="row">
            {document.cookie && document.cookie.split("=")[1].length > 0 && (
              <Fragment>
                <Navbar />
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
