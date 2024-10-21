import { useEffect, useState } from "react";

// react-router-dom components
import { TbLayoutSidebarLeftCollapseFilled, TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";
import { NavLink, useHistory, useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import List from "@mui/material/List";

// Gravity UI Dashboard React components
import GuiBox from "components/GuiBox";
import GuiButton from "components/GuiButton";
import GuiTypography from "components/GuiTypography";

// Gravity UI Dashboard React example components
import SidenavCollapse from "components/Sidenav/SidenavCollapse";

// Custom styles for the Sidenav
import SidenavRoot from "components/Sidenav/SidenavRoot";
import sidenavLogoLabel from "components/Sidenav/styles/sidenav";

// Gravity UI Dashboard React context
import { setMiniSidenav, useGravityUIController } from "context";

import GravLogo from "../../assets/images/favicon.png";
// Gravity UI Dashboard React icons
import { Menu, Tooltip } from "@mui/material";
import pxToRem from "assets/theme/functions/pxToRem";
import axios from "axios";
import axiosRetry from 'axios-retry';
import GuiAvatar from "components/GuiAvatar";
import NotificationItem from "components/NotificationItem";
import { deleteCookie } from "helpers/cookieHelper";
import useUserDataStore from "hooks/userDataStore";

import { BiBuilding } from "react-icons/bi";
axios.defaults.withCredentials = true
axiosRetry(axios, { retries: 1 });

// function Sidenav({ color, brand, brandName, routes, ...rest }) {
function Sidenav({ color, brandName, routes, ...rest }) {
  const [controller, dispatch] = useGravityUIController();
  const { miniSidenav, transparentSidenav } = controller;
  const location = useLocation();
  const { pathname } = location;
  const collapseName = pathname.split("/").slice(1)[0];
  const sharedState = useUserDataStore((state) => state.sharedState)
  const [openMenu, setOpenMenu] = useState(false);
  const history = useHistory();

  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);
  const { setSharedState } = useUserDataStore()


  const closeSidenav = () => {

    if (localStorage.getItem("sidenav_collapsed") === "true") {
      localStorage.setItem("sidenav_collapsed", "false")
      setMiniSidenav(dispatch, false);
    } else {
      localStorage.setItem("sidenav_collapsed", "true")
      setMiniSidenav(dispatch, true);
    }
  };

  const logout = () => {
    deleteCookie("gravity_sid")
    localStorage?.clear()
    history.push("/authentication/sign-in")
  }

  const renderMenu = () => (
    <Menu
      id="basic-menu"
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: 'top', // Aligns the bottom of the menu with the button
        horizontal: 'center', // Centers the menu horizontally in relation to the button
      }}
      transformOrigin={{
        vertical: 'bottom', // The menu grows upwards from the top
        horizontal: 'center', // Centers the growth horizontally
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: "-4px" }}
    >
      <NotificationItem
        title={["Logout"]}
        onClick={logout}
      />
    </Menu>
  );

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      if (localStorage.getItem("sidenav_collapsed") === "true") {
        setMiniSidenav(dispatch, true);
      } else {
        setMiniSidenav(dispatch, window.innerWidth < 1440);
      }
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(({ type, name, icon, title, noCollapse, key, route, href }) => {
    let returnValue;

    if (type === "collapse") {
      returnValue = href ? (
        <Link
          href={href}
          key={key}
          target="_blank"
          rel="noreferrer"
          sx={{ textDecoration: "none" }}
        >
          <SidenavCollapse
            color={color}
            name={name}
            icon={icon}
            active={key === collapseName}
            noCollapse={noCollapse}
          />
        </Link>
      ) : (
        <Tooltip title={name} placement="right">
          <NavLink to={route} key={key}>
            <SidenavCollapse
              color={color}
              key={key}
              name={name}
              icon={icon}
              active={key === collapseName}
              noCollapse={noCollapse}
            />
          </NavLink>
        </Tooltip>
      );
    } else if (type === "title") {
      returnValue = (
        <GuiTypography
          key={key}
          color="white"
          display="block"
          variant="caption"
          fontWeight="bold"
          textTransform="uppercase"
          pl={3}
          mt={2}
          mb={1}
          ml={1}
        >
          {title}
        </GuiTypography>
      );
    } else if (type === "divider") {
      returnValue = <Divider light key={key} />;
    } else if (type === "hidden") {
      if (sharedState?.org?.features?.some(feature => feature[key] === true)) {
        returnValue = href ? (
          <Link
            href={href}
            key={key}
            target="_blank"
            rel="noreferrer"
            sx={{ textDecoration: "none" }}
          >
            <SidenavCollapse
              color={color}
              name={name}
              icon={icon}
              active={key === collapseName}
              noCollapse={noCollapse}
            />
          </Link>
        ) : (
          <NavLink to={route} key={key}>
            <SidenavCollapse
              color={color}
              key={key}
              name={name}
              icon={icon}
              active={key === collapseName}
              noCollapse={noCollapse}
            />
          </NavLink>
        );
      }
    }

    return returnValue;
  });

  return (
    <SidenavRoot {...rest} variant="permanent" ownerState={{ transparentSidenav, miniSidenav }}
      sx={{
        overflow: "visible"
      }}
    >
      <GuiBox
        pt={3.5}
        pb={0.5}
        px={4}
        textAlign="center"
        sx={{
          overflow: "visible"
        }}
      >
        <GuiBox
          display="block"
          position="absolute"
          top={"64px"}
          right={"-10px"}
          onClick={closeSidenav}
          sx={{
            cursor: "pointer",
            transition: "all 0.3s ease-in-out",
            zIndex: "9000",
          }}
        >
          {miniSidenav ? <TbLayoutSidebarRightCollapseFilled color="#959fd6" size="24px" /> : <TbLayoutSidebarLeftCollapseFilled color="#959fd6" size="24px"/>}
        </GuiBox>
        <GuiBox component={NavLink} to="/" display="flex" alignItems="center">
          <GuiBox
            sx={
              ((theme) => sidenavLogoLabel(theme, { miniSidenav }),
              {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0",
                gap: "12px"
              })
            }
          >
            <GuiBox
              display="flex"
              justifyContent="center"
              p="0px"
            // sx={
            //   ((theme) => sidenavLogoLabel(theme, { miniSidenav, transparentSidenav }),
            //   {
            //     // mr: miniSidenav || (miniSidenav && transparentSidenav) ? 0 : 1,
            //   })
            // }
            >
              {/* <SimmmpleLogo size="24px" /> */}
              <GuiBox component='img' src={GravLogo} sx={{ maxWidth: "28px" }} />
            </GuiBox>
            <GuiTypography
              variant="button"
              color="white"
              fontWeight="bold"
              sx={
                ((theme) => sidenavLogoLabel(theme, { miniSidenav, transparentSidenav }),
                {
                  opacity: miniSidenav || (miniSidenav && transparentSidenav) ? 0 : 1,
                  maxWidth: miniSidenav || (miniSidenav && transparentSidenav) ? 0 : "100%",
                  margin: "0 auto",
                  fontSize: "18px"
                })
              }
            >
              {brandName}
            </GuiTypography>
          </GuiBox>
        </GuiBox>
      </GuiBox>
      <Divider light />
      {
        sharedState?.org ?
          <GuiBox
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="row"
            mb="18px"
            p="0px"
          >
            {
              sharedState?.org?.icon ? <GuiBox component='img' src={sharedState?.org?.icon} sx={{ maxWidth: "20px", borderRadius: "4px" }} />
                :
                <BiBuilding size="18px" color="white" />
            }

            <GuiTypography
              color="white"
              sx={
                ((theme) => sidenavLogoLabel(theme, { miniSidenav, transparentSidenav }),
                {
                  fontSize: "14px",
                  opacity: miniSidenav || (miniSidenav && transparentSidenav) ? 0 : 1,
                  maxWidth: miniSidenav || (miniSidenav && transparentSidenav) ? 0 : "100%",
                  marginLeft: miniSidenav || (miniSidenav && transparentSidenav) ? "0px" : "8px",
                })
              }
            >
              {sharedState?.org?.name}
            </GuiTypography>
          </GuiBox>
          :
          null
      }
      <List>{renderRoutes}</List>
      <GuiBox
        my={2}
        mx={2}
        mt="auto"
        sx={({ breakpoints }) => ({
          [breakpoints.up("xl")]: {
            pt: 2,
          },
          [breakpoints.only("xl")]: {
            pt: 1,
          },
          [breakpoints.down("xl")]: {
            pt: 2,
          },
        })}
      >
      </GuiBox>
      {
        sharedState?.usersData ?
          <GuiBox display="flex" alignItems="center" justifyContent="start" flexDirection="row" m="12px" p="0px">
            <GuiButton
              onClick={handleOpenMenu}
              aria-controls={openMenu ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? 'true' : undefined}
              color="dark"
              sx={{ minWidth: "100%", textAlign: "start", display: "flex", padding: "12px 0px 12px 0px" }}
              rel="noreferrer"
            >
              <GuiBox display="flex" alignItems="center" justifyContent="start" flexDirection="row" m="0px" p="0px" sx={{ gap: "12px" }}>
                <GuiAvatar src={sharedState?.usersData?.find(it => it.curr === true)?.avatar} variant="rounded" shadow="md" sx={{
                  width: pxToRem(34),
                  height: pxToRem(34)
                }} />
                {
                  miniSidenav || (miniSidenav && transparentSidenav)
                    ?
                    null
                    :
                    <GuiBox display="flex" alignItems="start" justifyContent="center" flexDirection="column">
                      <GuiTypography variant="h6" fontWeight="regular" color="white" sx={{ textWrap: "wrap", fontSize: `${pxToRem(14)}` }}>
                        {sharedState?.usersData?.find(it => it.curr === true)?.name}
                      </GuiTypography>
                      {/* <GuiTypography variant="h6" fontWeight="regular" color="white" sx={{ textWrap: "wrap", opacity: "0.7", maxWidth: "70%", fontSize: `${pxToRem(12)}` }}>
                  {sharedState?.usersData?.find(it => it.curr === true)?.email ?? ""}
                </GuiTypography> */}
                    </GuiBox>
                }
              </GuiBox>
            </GuiButton>
          </GuiBox>
          : null
      }
      {renderMenu()}

    </SidenavRoot >
  );
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "info",
  // brand: "",
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  // brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
