import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for GuiButton
import GuiSelectRoot from "./GuiSelectRoot";

const GuiSelect = forwardRef(
  ({ color, variant, size, circular, iconOnly, children, ...rest }, ref) => (
    <GuiSelectRoot
      {...rest}
      ref={ref}
      color="white"
      variant={variant === "gradient" ? "contained" : variant}
      size={size}
      ownerState={{ color, variant, size, circular, iconOnly }}
    >
      {children}
    </GuiSelectRoot>
  )
);

// Setting default values for the props of GuiButton
GuiSelect.defaultProps = {
  size: "medium",
  variant: "outlined",
  color: "white",
  circular: false,
  iconOnly: false,
};

// Typechecking props for the GuiButton
GuiSelect.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  variant: PropTypes.oneOf(["text", "contained", "outlined", "gradient"]),
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
    "text",
  ]),
  circular: PropTypes.bool,
  iconOnly: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default GuiSelect;
