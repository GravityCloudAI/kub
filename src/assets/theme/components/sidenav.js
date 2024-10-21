// Gravity UI Dashboard React base styles
import colors from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

// Gravity UI Dashboard React helper functions
import rgba from "assets/theme/functions/rgba";
import pxToRem from "assets/theme/functions/pxToRem";

const { white } = colors;
const { borderRadius } = borders;

export default {
  styleOverrides: {
    root: {
      width: pxToRem(250),
      whiteSpace: "nowrap",
      border: "none",
    },

    paper: {
      width: pxToRem(250),
      // backgroundColor: rgba(white.main, 0.8),
      backgroundColor: "#05050a !important",
      border: `1px solid #26282d !important`,
      // backdropFilter: `saturate(200%) blur(${pxToRem(30)})`,
      height: `calc(100vh - ${pxToRem(8)})`,
      margin: pxToRem(8),
      borderRadius: borderRadius.xl,
      // border: "none",
    },

    paperAnchorDockedLeft: {
      borderRight: "none",
    },
  },
};
