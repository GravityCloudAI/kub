function collapseItem(theme, ownerState) {
  const { palette, transitions, breakpoints, boxShadows, borders, functions } = theme;
  const { active, transparentSidenav } = ownerState;

  const { transparent, white, sidenav } = palette;
  const { xxl } = boxShadows;
  const { borderRadius } = borders;
  const { pxToRem } = functions;

  return {
    background: active ? sidenav.button : transparent.main,
    color: white.main,
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: `${pxToRem(9)} ${pxToRem(9)} ${pxToRem(9)} ${pxToRem(9)}`,
    justifyContent: "center",
    margin: `0 ${pxToRem(16)}`,
    borderRadius: borderRadius.lg,
    cursor: "pointer",
    userSelect: "none",
    whiteSpace: "nowrap",
    // boxShadow: active && transparentSidenav ? xxl : "none",
    // [breakpoints.up("xl")]: {
    //   boxShadow: () => {
    //     if (active) {
    //       return transparentSidenav ? xxl : "none";
    //     }

    //     return "none";
    //   },
    //   transition: transitions.create("box-shadow", {
    //     easing: transitions.easing.easeInOut,
    //     duration: transitions.duration.shorter,
    //   }),
    // },
  };
}

function collapseIconBox(theme, ownerState) {
  const { palette, transitions, breakpoints, boxShadows, borders, functions } = theme;
  const { active, color } = ownerState;

  const { white, info, gradients, transparent, sidenav } = palette;
  const { md } = boxShadows;
  const { borderRadius } = borders;
  const { pxToRem } = functions;

  return {
    // background: (active) => {
    //   if (active) {
    //     return color === "default" ? white.button : sidenav.button;
    //   }
    //   return sidenav.button;
    // },
    minWidth: pxToRem(24),
    minHeight: pxToRem(24),
    borderRadius: "0.5rem",
    display: "grid",
    placeItems: "center",
    // boxShadow: md,
    transition: transitions.create("margin", {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.standard,
    }),

    // [breakpoints.up("xl")]: {
    //   background: () => {
    //     let background;

    //     if (!active) {
    //       background = sidenav.button;
    //     } else if (color === "default") {
    //       background = info.main;
    //     } else if (color === "warning") {
    //       background = gradients.warning.main;
    //     } else {
    //       background = palette[color].main;
    //     }

    //     return background;
    //   },
    // },

    // backgroundColor: active ? palette[color].main : transparent.main,
    "& svg, svg g": {
      color: active ? palette[color].main: white.main,
    },
    "&:hover": {
      animation: "rotate 0.3s ease-in-out",
    },
    "@keyframes rotate": {
      "0%": {
        transform: "rotate(0deg)",
      },
      "50%": {
        transform: "rotate(20deg)",
      },
      "100%": {
        transform: "rotate(0deg)",
      },
    },
  };
}

const collapseIcon = ({ palette: { white, gradients } }, { active }) => ({
  color: active ? white.main : gradients.dark.state,
});

function collapseText(theme, ownerState) {
  const { typography, transitions, breakpoints, functions } = theme;
  const { miniSidenav, active } = ownerState;

  const { size, fontWeightMedium, fontWeightRegular } = typography;
  const { pxToRem } = functions;

  return {
    marginLeft: pxToRem(12.8),

    // [breakpoints.down("xl")]: {
    opacity: miniSidenav ? 0 : 1,
    maxWidth: miniSidenav ? 0 : "100%",
    marginLeft: miniSidenav ? 0 : pxToRem(12.8),
    transition: transitions.create(["opacity", "margin"], { easing: transitions.easing.easeInOut, duration: transitions.duration.standard }),
    // },

    "& span": {
      fontWeight: active ? fontWeightMedium : fontWeightRegular,
      fontSize: size.sm,
      lineHeight: 0,
    },
  };
}

export { collapseItem, collapseIconBox, collapseIcon, collapseText };
