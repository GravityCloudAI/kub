import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Vision UI Dashboard React components
import GuiTypography from "components/GuiTypography";

// Custom styles for GuiProgress
import GuiProgressRoot from "components/GuiProgress/GuiProgressRoot";

const GuiProgress = forwardRef(({ variant, color, value, label, ...rest }, ref) => (
  <>
    {label && (
      <GuiTypography variant="button" fontWeight="medium" color="text">
        {value}%
      </GuiTypography>
    )}
    <GuiProgressRoot
      {...rest}
      ref={ref}
      variant="determinate"
      value={value}
      ownerState={{ color, value, variant }}
    />
  </>
));

// Setting default values for the props of GuiProgress
GuiProgress.defaultProps = {
  variant: "contained",
  color: "info",
  value: 0,
  label: false,
};

// Typechecking props for the GuiProgress
GuiProgress.propTypes = {
  variant: PropTypes.oneOf(["contained", "gradient"]),
  color: PropTypes.string,
  value: PropTypes.number,
  label: PropTypes.bool,
};

export default GuiProgress;
