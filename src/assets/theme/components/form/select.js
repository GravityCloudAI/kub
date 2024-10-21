// Gravity UI Dashboard React base styles
import colors from "assets/theme/base/colors";

// Gravity UI Dashboard React helper functions
import pxToRem from "assets/theme/functions/pxToRem";

const { transparent, info } = colors;

export default {
  styleOverrides: {
    select: {
      display: "grid",
      alignItems: "center",
      padding: `0 ${pxToRem(12)} !important`,
      "& .Mui-selected": {
        backgroundColor: transparent.main,
      },
      color:"#fff"
    },

    // selectMenu: {
    //   background: "none",
    //   height: "none",
    //   minHeight: "none",
    //   overflow: "unset",
    // },

    icon: {
      display: "none",
    },
  },
};
