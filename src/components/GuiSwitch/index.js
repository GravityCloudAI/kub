import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for GuiSwitch
import GuiSwitchRoot from "components/GuiSwitch/GuiSwitchRoot";

const GuiSwitch = forwardRef(({ color, size, ...rest }, ref) => (
  <GuiSwitchRoot {...rest} ref={ref} color="white" size={size} ownerState={{ color, size }} />
));

// Setting default values for the props of GuiSwitch
GuiSwitch.defaultProps = {
  size: "medium",
  color: "white",
};

// Typechecking props for the GuiSwitch
GuiSwitch.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf([
    "white",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
};

export default GuiSwitch;
