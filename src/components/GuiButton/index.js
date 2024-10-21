import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for GuiButton
import { CircularProgress } from "@mui/material";
import GuiButtonRoot from "components/GuiButton/GuiButtonRoot";

const GuiButton = forwardRef(
  ({ color, variant, size, circular, iconOnly, children, loading, loadingColor, disabled, ...rest }, ref) => (
    <GuiButtonRoot
      {...rest}
      ref={ref}
      color="white"
      disabled={disabled || loading}
      variant={variant === "gradient" ? "contained" : variant}
      size={size}
      ownerState={{ color, variant, size, circular, iconOnly }}
    >
      {
        loading ?
          <CircularProgress sx={{ color: `${loadingColor ?? "#ffffff"}` }} size="18px" />
          :
          children
      }

    </GuiButtonRoot>
  )
);

// Setting default values for the props of GuiButton
GuiButton.defaultProps = {
  size: "medium",
  variant: "contained",
  color: "white",
  circular: false,
  iconOnly: false,
};

// Typechecking props for the GuiButton
GuiButton.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  variant: PropTypes.oneOf(["text", "contained", "outlined", "gradient"]),
  color: PropTypes.oneOf([
    "white",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "action",
    "error",
    "light",
    "dark",
    "text",
  ]),
  circular: PropTypes.bool,
  iconOnly: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default GuiButton;
