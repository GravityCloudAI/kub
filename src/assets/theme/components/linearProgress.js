// Gravity UI Dashboard React base styles
import borders from "assets/theme/base/borders";
import colors from "assets/theme/base/colors";

// Gravity UI Dashboard React helper functions
import pxToRem from "assets/theme/functions/pxToRem";

const { borderRadius } = borders;
const { light } = colors;

export default {
  styleOverrides: {
    root: {
      height: pxToRem(12),
      borderRadius: borderRadius.sm,
      // overflow: "visible",
      // position: "relative",
    },

    // colorPrimary: {
    //   backgroundColor: light.main,
    // },

    // colorSecondary: {
    //   backgroundColor: light.main,
    // },

    bar: {
      height: pxToRem(12),
      borderRadius: borderRadius.sm,
      position: "absolute",
      transform: `translate(0, ${pxToRem(0)}) !important`,
      transition: "width 0.6s ease !important",
    },
  },
};
