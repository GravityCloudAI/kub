// @mui material components
import Fade from "@mui/material/Fade";

// Gravity UI Dashboard React base styles
import borders from "assets/theme/base/borders";
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";

// Gravity UI Dashboard React helper functions
import pxToRem from "assets/theme/functions/pxToRem";

const { black, white, light, gradients } = colors;
const { size, fontWeightRegular } = typography;
const { borderRadius } = borders;

export default {
  defaultProps: {
    arrow: true,
    TransitionComponent: Fade,
  },

  styleOverrides: {
    tooltip: {
      maxWidth: pxToRem(200),
      backgroundColor: gradients.card.main,
      color: white.main,
      fontSize: size.sm,
      fontWeight: fontWeightRegular,
      textAlign: "center",
      borderRadius: borderRadius.md,
      border: `0.5px solid ${white.main}`,
      opacity: 0.7,
      boxShadow: "rgba(136, 165, 191, 0.18) 6px 2px 16px 0px, rgba(255, 255, 255, 0.1) -6px -2px 16px 0px",
      padding: `${pxToRem(5)} ${pxToRem(8)} ${pxToRem(4)}`,
    },

    arrow: {
      color: white.main
    },
  },
};
