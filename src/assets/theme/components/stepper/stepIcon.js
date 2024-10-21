// Gravity UI Dashboard React base styles
import colors from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

// Gravity UI Dashboard React helper functions
import pxToRem from "assets/theme/functions/pxToRem";
import boxShadow from "assets/theme/functions/boxShadow";

const { dark, white, chip, info } = colors;
const { borderWidth, borderColor } = borders;

export default {
  styleOverrides: {
    root: {
      background: info.main,
      fill: white.main,
      stroke: white.main,
      strokeWidth: pxToRem(10),
      width: pxToRem(13),
      height: pxToRem(13),
      borderRadius: "20%",
      boxShadow: boxShadow([0, 0], [0, 2], info.main, 1),

      zIndex: 99,
      transition: "all 200ms linear",

      "&.Mui-active": {
        background: info.main,
        fill: info.main,
        stroke: info.main,
        borderColor: info.main,
        boxShadow: boxShadow([0, 0], [0, 2], info.main, 1),
      },

      "&.Mui-completed": {
        background: chip?.green?.border,
        fill: chip?.green?.border,
        stroke: chip?.green?.border,
        borderColor: chip?.green?.border,
        boxShadow: boxShadow([0, 0], [0, 2], chip?.green?.border, 1),
      },
    },
  },
};
