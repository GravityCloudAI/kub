import { useEffect, useMemo } from "react";

import { Redirect, Route, Switch, useHistory, useLocation } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { useGravityUIController } from "context";

import GuiBox from "components/GuiBox";

import Sidenav from "components/Sidenav";

import theme from "assets/theme";

import routes from "routes";

import customAxios from "axiosi";
import { getCookie } from "helpers/cookieHelper";
import { ToastContainer } from "react-toastify";
import { getBaseAPIUrl } from "helpers/stringHelper";

export default function App() {
  const { pathname } = useLocation();
  const history = useHistory();

  const [controller, dispatch] = useGravityUIController();
  const {layout} = controller;

  useEffect(() => {
    window?.electron?.ipcRenderer?.on('protocol-data', (event, data) => {
      customAxios.post(`${getBaseAPIUrl()}/api/v1/auth/app-callback`,
        {
          data: data.auth
        }).then(rezz => {
          history.push("/")
        })
    });

    return () => {
      window?.electron?.ipcRenderer?.removeAllListeners('protocol-data');
    };

  }, []);

  useMemo(() => {
    const auth = getCookie("gravity_sid")
    if (auth === false) {
      history.push("/authentication/sign-in")
    }
  }, []);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} component={route.component} key={route.key} />;
      }

      return null;
    });

  return (<ThemeProvider theme={theme} >
    <GuiBox sx={{ height: "auto" }}>
      <ToastContainer />
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            brandName="Kub"
            routes={routes}
          />
        </>
      )}
      <Switch>
        {getRoutes(routes)}
        <Redirect from="*" to="/kubernetes" />
      </Switch>
    </GuiBox>
  </ThemeProvider>);
}
