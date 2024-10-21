import PropTypes from "prop-types";

// @mui material components
import Collapse from "@mui/material/Collapse";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Icon from "@mui/material/Icon";

// Gravity UI Dashboard React components
import GuiBox from "components/GuiBox";

// Custom styles for the SidenavCollapse
import {
  collapseItem,
  collapseIconBox,
  collapseIcon,
  collapseText,
} from "components/Sidenav/styles/sidenavCollapse";

// Gravity UI Dashboard React context
import { useGravityUIController } from "context";
import { SiKubernetes } from "react-icons/si";

function SidenavCollapse({ color, icon, name, children, active, noCollapse, open, ...rest }) {
  const [controller] = useGravityUIController();
  const { miniSidenav, transparentSidenav } = controller;

  return (
    <>
      <ListItem component="li">
        <GuiBox {...rest} sx={(theme) => collapseItem(theme, { active, transparentSidenav })}>
          <ListItemIcon
            sx={(theme) => collapseIconBox(theme, { active, transparentSidenav, color })}
          >
            {typeof icon === "string" ? (
              <Icon sx={(theme) => collapseIcon(theme, { active })}>{icon}</Icon>
            ) : (
              <>
                {
                  name !=="Kubernetes" ? icon : <SiKubernetes size="22px" fill={`${active ? "#818aff": "#ffffff"}`} />
                }</>

            )}
          </ListItemIcon>

          <ListItemText
            primary={name}
            sx={(theme) => ({
              ...collapseText(theme, { miniSidenav, transparentSidenav, active }),
              marginLeft: "0.3rem", // Adjust the value as needed
            })}
          />
        </GuiBox>
      </ListItem>
      {children && (
        <Collapse in={open} unmountOnExit>
          {children}
        </Collapse>
      )}
    </>
  );
}

// Setting default values for the props of SidenavCollapse
SidenavCollapse.defaultProps = {
  color: "info",
  active: false,
  noCollapse: false,
  children: false,
  open: false,
};

// Typechecking props for the SidenavCollapse
SidenavCollapse.propTypes = {
  color: PropTypes.oneOf(["info", "success", "warning", "error", "dark"]),
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
  active: PropTypes.bool,
  noCollapse: PropTypes.bool,
  open: PropTypes.bool,
};

export default SidenavCollapse;
