// Gravity UI Dashboard React base styles
import colors from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

// Gravity UI Dashboard React helper functions
import pxToRem from "assets/theme/functions/pxToRem";

const { grey, info } = colors;
const { borderRadius } = borders;

export default {
  styleOverrides: {
    root: {
      position: "relative",
      backgroundColor: grey[100],
      borderRadius: borderRadius.md,
      minHeight: "55px",
      padding: pxToRem(4),
    },

    flexContainer: {
      height: "100%",
      position: "relative",
      zIndex: 10,
    },

    fixed: {
      overflow: "unset !important",
      overflowX: "unset !important",
    },

    vertical: {
      "& .MuiTabs-indicator": {
        width: "100%",
      },
    },

    indicator: {
      minHeight: "100%",
      // borderRadius: borderRadius.lg,
      borderRadius: "8px 8px 0px 0px",
      // borderRadius: 0,
      // borderBottom: `2px solid ${info.main}`,
      // backgroundColor: "#0F101E",
      borderBottom: "2px solid #818AFF",
      // backgroundColor: info.main,
      backgroundColor: "transparent",
      transition: "all 500ms ease",
    },
  },
};
