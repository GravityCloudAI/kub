// Gravity UI Dashboard React base styles
import colors from "assets/theme/base/colors";

// Gravity UI Dashboard React helper functions
import pxToRem from "assets/theme/functions/pxToRem";

const { transparent } = colors;

export default {
  styleOverrides: {
    root: {
      margin: `${pxToRem(24)} 0`,
      padding: `0px`,

      "&.MuiPaper-root": {
        backgroundColor: transparent.main,
      },
    },
  },
};
