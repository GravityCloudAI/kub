// Gravity UI Dashboard React base styles
import colors from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";
import typography from "assets/theme/base/typography";

// Gravity UI Dashboard React helper functions
import pxToRem from "assets/theme/functions/pxToRem";

const { light, text, dark, info, transparent } = colors;
const { borderRadius } = borders;
const { size } = typography;

export default {
  styleOverrides: {
    root: {
      minWidth: pxToRem(160),
      minHeight: "unset",
      padding: `${pxToRem(8)} ${pxToRem(8)}`,
      marginLeft: pxToRem(4),
      marginTop:pxToRem(4),
      marginRight: pxToRem(4),
      borderRadius: borderRadius.md,
      borderRadius: borderRadius.sm,
      fontSize: size.sm,
      color: light.main,
      transition: "background-color 300ms ease, color 300ms ease",

      "&:focus, &.Mui-selected, &.Mui-selected:hover, &.Mui-selected:focus": {
        backgroundColor: light.main+"20 !important",
        color: "#ffffff",
      },

      "&:hover": {
        backgroundColor: light.main+"20 !important",
        color: "#ffffff",
      },

      // "&:disabled": {
      //   backgroundColor: light.main,
      //   color: info.main,
      // },
    },
  },
};
