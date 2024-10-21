import Link from "@mui/material/Link";
import { useEffect, useState } from "react";
// react-router components
import { useHistory, useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";

// Vision UI Dashboard React components
import GuiBox from "components/GuiBox";

// Vision UI Dashboard React example components
import Breadcrumbs from "components/Breadcrumbs";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarMobileMenu,
  navbarRow
} from "./styles";

// Vision UI Dashboard React context
import {
  setMiniSidenav,
  setTransparentNavbar,
  useGravityUIController,
} from "context";

// Images
import { ExpandMoreRounded } from "@mui/icons-material";
import { FormControl, MenuItem } from "@mui/material";
import GuiButton from "components/GuiButton";
import GuiChip from "components/GuiChip";
import GuiSelect from "components/GuiSelect";
import GuiTypography from "components/GuiTypography";
import { deleteCookie } from "helpers/cookieHelper";
import useUserDataStore from "hooks/userDataStore";
import { FaAws } from "react-icons/fa";
import { DocumentCodeIcon } from "components/customIcons";

function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useGravityUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);
  const history = useHistory();
  const { sharedState } = useUserDataStore()

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    window.addEventListener("scroll", handleTransparentNavbar);
    handleTransparentNavbar();
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, miniSidenav);
  const handleCloseMenu = () => setOpenMenu(false);

  const logout = () => {
    deleteCookie("gravity_sid")
    localStorage.clear()
    history.push("/authentication/sign-in")
  }

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <GuiBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </GuiBox>

        <GuiBox display="flex">
          {
            sharedState?.billing?.status && (["trialing", "past_due", "unpaid"].includes(sharedState?.billing?.status)) ?
              <GuiBox display="flex" mr="12px">
                <GuiChip text={sharedState?.billing?.statusMessage} color={["past_due", "unpaid"].includes(sharedState?.billing?.status) ? "red" : "green"} />
              </GuiBox>
              : null
          }
          {
            sharedState?.awsAccountId ?
              <FormControl sx={{ mr: "0.5rem", flexShrink: 0, mr: "12px", background: "#05050a", borderRadius: "8px" }}>
                <GuiSelect
                  IconComponent={() => <ExpandMoreRounded />}
                  variant="outlined"
                  sx={{ m: 0 }}
                  color="white"
                  size="small"
                  value={sharedState?.awsAccountId}
                  displayEmpty
                  // onChange={(e) => handleFilterChange("dateRange", e.target.value)}
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                  <MenuItem
                    value={sharedState?.awsAccountId}
                  >
                    <GuiBox display="flex" alignItems="center" p="0px" sx={{ gap: "8px" }}>
                      <FaAws color="white" size="20px" />
                      {sharedState?.awsAccountId}
                    </GuiBox>
                  </MenuItem>
                </GuiSelect>
              </FormControl>
              :
              null
          }
          <GuiButton
            sx={{ mr: "8px", pt: "0px", pb: "0px", width: "min-content", display: "flex", alignItems: "center", justtifyContent: "center", gap: "4px" }}
            component={Link}
            target="_blank"
            href="https://docs.gravitycloud.ai"
            color="dark"
            rel="noreferrer"
          >
            <DocumentCodeIcon />
            <GuiTypography variant="body2" fontWeight="regular" color="white" sx={{ fontSize: `0.8rem`, maxWidth: "100%" }}>
            </GuiTypography>

          </GuiButton>
          {isMini ? null : (
            <GuiBox sx={(theme) => navbarRow(theme, { isMini })}>
              <GuiBox color={light ? "white" : "inherit"}>
                <IconButton
                  size="small"
                  color="inherit"
                  sx={navbarMobileMenu}
                  onClick={handleMiniSidenav}
                >
                  <Icon className={"text-white"}>{miniSidenav ? "menu_open" : "menu"}</Icon>
                </IconButton>
              </GuiBox>
            </GuiBox>
          )}
        </GuiBox>
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
