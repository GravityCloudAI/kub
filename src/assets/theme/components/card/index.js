// Gravity UI Dashboard React Base Styles
import colors from "assets/theme/base/colors";
import linearGradient from "assets/theme/functions/linearGradient";
import borders from "assets/theme/base/borders";
import boxShadows from "assets/theme/base/boxShadows";

// Gravity UI Dashboard React Helper Function
import rgba from "assets/theme/functions/rgba";

const { black, gradients } = colors;
const { card } = gradients;
const { borderWidth, borderRadius } = borders;
const { xxl } = boxShadows;

export default {
  styleOverrides: {
    root: {
      display: "flex",
      flexDirection: "column",
      // background: linearGradient(card.main, card.state, card.deg),
      // background: card.main,
      background: "#0f1011",
      // backdropFilter: "blur(20px)",
      position: "relative",
      minWidth: 0,
      padding: "22px",
      wordWrap: "break-word",
      backgroundClip: "border-box",
      boxShadow: xxl,
      borderRadius: "0.75rem", 
      border: "1px solid #26282d",
      // border: "1px solid #26282d", 
      transition: "all 200ms ease-in-out"
    },
  },
};
