/**
 * The base border styles for the Gravity UI Dashboard  Material.
 * You can add new border width, border color or border radius using this file.
 * You can customized the borders value for the entire Gravity UI Dashboard  Material using thie file.
 */

// Gravity UI Dashboard React Base Styles
import colors from "assets/theme/base/colors";

// Gravity UI Dashboard React Helper Functions
import pxToRem from "assets/theme/functions/pxToRem";

const { borderCol } = colors;

export default {
  borderColor: {
    grey: { borderCol },
    white: "#fff",
    main: "#26282d"
  },

  borderWidth: {
    0: 0,
    1: pxToRem(1),
    2: pxToRem(2),
    3: pxToRem(3),
    4: pxToRem(4),
    5: pxToRem(5),
  },

  borderRadius: {
    xs: pxToRem(2),
    sm: pxToRem(4),
    md: pxToRem(8),
    button: pxToRem(12),
    lg: pxToRem(15),
    xl: pxToRem(20),
    xxl: pxToRem(24),
    form: pxToRem(24),
    section: pxToRem(160),
  },
};
