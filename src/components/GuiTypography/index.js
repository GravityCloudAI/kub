import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for GuiTypography
import GuiTypographyRoot from "components/GuiTypography/GuiTypographyRoot";

const GuiTypography = forwardRef(
  (
    {
      color,
      fontWeight,
      textTransform,
      verticalAlign,
      fontSize,
      textGradient,
      opacity,
      children,
      ...rest
    },
    ref
  ) => (
    <GuiTypographyRoot
      {...rest}
      ref={ref}
      ownerState={{
        color,
        textTransform,
        verticalAlign,
        fontSize,
        fontWeight,
        opacity,
        textGradient,
      }}
    >
      {children}
    </GuiTypographyRoot>
  )
);

// Setting default values for the props of GuiTypography
GuiTypography.defaultProps = {
  color: "dark",
  fontWeight: false,
  fontSize: "16px",
  textTransform: "none",
  verticalAlign: "unset",
  textGradient: false,
  opacity: 1,
};

// Typechecking props for the GuiTypography
GuiTypography.propTypes = {
  color: PropTypes.oneOf([
    "inherit",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
    "text",
    "white",
    "logo",
  ]),
  fontWeight: PropTypes.oneOf([false, "light", "regular", "medium", "bold"]),
  textTransform: PropTypes.oneOf(["none", "capitalize", "uppercase", "lowercase"]),
  verticalAlign: PropTypes.oneOf([
    "unset",
    "baseline",
    "sub",
    "super",
    "text-top",
    "text-bottom",
    "middle",
    "top",
    "bottom",
  ]),
  textGradient: PropTypes.bool,
  children: PropTypes.node.isRequired,
  opacity: PropTypes.number,
};

export default GuiTypography;
