// @mui material components
import Drawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import colors from "assets/theme/base/colors";
import linearGradient from "assets/theme/functions/linearGradient";

export default styled(Drawer)(({ theme, ownerState }) => {
  const { palette, boxShadows, transitions, breakpoints, functions } = theme;
  const { black } = colors;
  const { transparentSidenav, miniSidenav } = ownerState;

  const sidebarWidth = 200;
  const { transparent, gradients } = palette;
  const { xxl } = boxShadows;
  const { pxToRem } = functions;

  // styles for the sidenav when miniSidenav={false}
  const drawerOpenStyles = () => ({
    overflow: "visible",
    transform: "translateX(0)",
    transition: transitions.create("transform", {
      easing: transitions.easing.sharp,
      duration: transitions.duration.shorter,
    }),

    [breakpoints.up("xl")]: {
      boxShadow: transparentSidenav ? "none" : xxl,
      marginBottom: transparentSidenav ? 0 : "inherit",
      left: "0",
      width: sidebarWidth,
      transform: "translateX(0)",
      transition: transitions.create(["width", "background-color"], {
        easing: transitions.easing.sharp,
        duration: transitions.duration.enteringScreen,
      }),
    },
  });

  // styles for the sidenav when miniSidenav={true}
  const drawerCloseStyles = () => ({
    overflow: "visible",
    margin: pxToRem(8),
    height: `${window?.electron ? "95%" : `calc(100vh - ${pxToRem(8)})`}`,
    transform: `translateX(${pxToRem(-320)})`,
    transition: transitions.create("transform", {
      easing: transitions.easing.sharp,
      duration: transitions.duration.shorter,
    }),

    // [breakpoints.up("xl")]: {
    boxShadow: transparentSidenav ? "none" : xxl,
    marginBottom: transparentSidenav ? 0 : "inherit",
    left: "0",
    width: pxToRem(96),
    // margin: "10px !important",
    transform: "translateX(0)",
    transition: transitions.create(["width", "background-color"], {
      easing: transitions.easing.sharp,
      duration: transitions.duration.shorter
    }),
    // },

    // [breakpoints.up("md")]: {
    //   boxShadow: transparentSidenav ? "none" : xxl,
    //   marginBottom: transparentSidenav ? 0 : "inherit",
    //   left: "0",
    //   width: pxToRem(96),
    //   overflowX: "hidden",
    //   transform: "translateX(0)",
    //   transition: transitions.create(["width", "background-color"], {
    //     easing: transitions.easing.sharp,
    //     duration: transitions.duration.shorter,
    //   }),
    // },
  });

  return {
    "& .MuiDrawer-paper": {
      // boxShadow: xxl,
      border: "none",
      // background: transparentSidenav
      //   ? black.main
      //   : gradients.sidenav.main,
      // backdropFilter: transparentSidenav ? "unset" : "blur(120px)",
      ...(miniSidenav ? drawerCloseStyles() : drawerOpenStyles()),
    },
  };
});
