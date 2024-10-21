import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Custom styles for GuiInput
import GuiInputRoot from "components/GuiInput/GuiInputRoot";
import GuiInputWithIconRoot from "components/GuiInput/GuiInputWithIconRoot";
import GuiInputIconBoxRoot from "components/GuiInput/GuiInputIconBoxRoot";
import GuiInputIconRoot from "components/GuiInput/GuiInputIconRoot";

import { useGravityUIController } from "context";

import { FormHelperText } from '@mui/material';

const GuiInput = forwardRef(({ size, icon, error, success, disabled, helperText, ...rest }, ref) => {
  let template;
  const [controller] = useGravityUIController();
  const { direction } = controller;
  const iconDirection = icon.direction;

  if (icon.component && icon.direction === "left") {
    template = (
      <GuiInputWithIconRoot ref={ref} ownerState={{ error, success, disabled }}>
        <GuiInputIconBoxRoot ownerState={{ size }}>
          <GuiInputIconRoot fontSize="small" ownerState={{ size }}>
            {icon.component}
          </GuiInputIconRoot>
        </GuiInputIconBoxRoot>
        <GuiInputRoot
          {...rest}
          ownerState={{ size, error, success, iconDirection, direction, disabled, helperText }}
        />
      </GuiInputWithIconRoot>
    );
  } else if (icon.component && icon.direction === "right") {
    template = (
      <GuiInputWithIconRoot ref={ref} ownerState={{ error, success, disabled }}>
        <GuiInputRoot
          {...rest}
          ownerState={{ size, error, success, iconDirection, direction, disabled }}
        />
        <GuiInputIconBoxRoot ownerState={{ size }}>
          <GuiInputIconRoot fontSize="small" ownerState={{ size }}>
            {icon.component}
          </GuiInputIconRoot>
        </GuiInputIconBoxRoot>
      </GuiInputWithIconRoot>
    );
  } else {
    template = <><GuiInputRoot {...rest} ref={ref} ownerState={{ size, error, success, disabled }} />         {helperText && (
      <FormHelperText error={error} sx={{ pt: "4px" }}>
        {helperText}
      </FormHelperText>
    )}</>
  }

  return template;
});

// Setting default values for the props of GuiInput
GuiInput.defaultProps = {
  size: "medium",
  icon: {
    component: false,
    direction: "none",
  },
  error: false,
  success: false,
  disabled: false,
};

// Typechecking props for the GuiInput
GuiInput.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  icon: PropTypes.shape({
    component: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
    direction: PropTypes.oneOf(["none", "left", "right"]),
  }),
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default GuiInput;
