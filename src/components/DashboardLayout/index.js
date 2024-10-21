import { useEffect } from "react";

// react-router-dom components
import { useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Vision UI Dashboard React components
import GuiBox from "components/GuiBox";

// Gravity UI Dashboard React context
import { setLayout, useGravityUIController } from "context";

function DashboardLayout({ children }) {
  const [controller, dispatch] = useGravityUIController();
  const { miniSidenav } = controller;
  const { pathname } = useLocation();

  useEffect(() => {
    setLayout(dispatch, "dashboard");
  }, [pathname]);

  return (
    <GuiBox
      sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
        p: 3,
        position: "relative",
        minHeight: "100vh",
        [breakpoints.up("xl")]: {
          marginLeft: miniSidenav ? pxToRem(100) : pxToRem(200),
          transition: transitions.create(["margin-left", "margin-right"], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },

        [breakpoints.up("md")]: {
          marginLeft: miniSidenav ? pxToRem(100) : pxToRem(200),
          transition: transitions.create(["margin-left", "margin-right"], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },
      })}
    >
      {children}
    </GuiBox>
  );
}

// Typechecking props for the DashboardLayout
DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
