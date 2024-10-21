// Gravity UI Dashboard React base styles
import borders from "assets/theme/base/borders";
import colors from "assets/theme/base/colors";

const { dark, white, grey, chip } = colors;
const { borderWidth, borderColor } = borders;

export default {
  styleOverrides: {
    root: {
      color: borderColor,
      transition: "all 200ms linear",

      "&.Mui-active": {
        color: grey[700] + " !important",
      },

      "&.Mui-completed": {
        color: chip?.green?.border + " !important",
      },
    },

    alternativeLabel: {
      top: "12%",
      left: "-50%",
      right: "50%",
    },

    line: {
      borderWidth: `${borderWidth[2]} !important`,
      // borderColor: white.main
    },
  },
};
