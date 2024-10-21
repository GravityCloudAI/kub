import borders from "assets/theme/base/borders";
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";

// Gravity UI Dashboard React helper functions
import pxToRem from "assets/theme/functions/pxToRem";

const { size, fontWeightRegular } = typography;
const { borderRadius } = borders;
const { white, info } = colors;

export default {
  styleOverrides: {
    root: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      textAlign: "center",
      maxWidth: "unset !important",
      minWidth: "min-content",
      minHeight: "35px",
      fontSize: size.md,
      fontWeight: fontWeightRegular,
      textTransform: "none",
      lineHeight: "inherit",
      padding: `${pxToRem(12)} !important`,
      // borderRadius: borderRadius.md,
      // borderRadius: "0.8rem 2rem",
      color: `${white.main} !important`,
      opacity: "1 !important",

      "& .material-icons, .material-icons-round": {
        marginBottom: "0 !important",
        marginRight: pxToRem(4),
      },

      "& svg": {
        marginBottom: "0 !important",
        marginRight: pxToRem(6),
        borderRadius: '10%', // Adjust the border radius as needed
        overflow: 'hidden', // Ensure icon doesn't overflow with rounded corners
        width: 20,
        height: 20,
      },

      "& img": {
        marginBottom: "0 !important",
        marginRight: pxToRem(6),
        fill: "black",
        borderRadius: '10%', // Adjust the border radius as needed
        overflow: 'hidden', // Ensure icon doesn't overflow with rounded corners
        width: 24,
        height: 24,
      },

      "&.Mui-selected": {
        // color: `${info.main} !important`,
        fontWeight: "bold"
      }
    },

    labelIcon: {
      paddingTop: pxToRem(4),
    },
  },
};
