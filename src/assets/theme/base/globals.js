import colors from "assets/theme/base/colors";

const { info, dark } = colors;
export default {
  html: {
    scrollBehavior: "smooth",
    background: dark.body,
  },
  body: {
    // background: `url(${bgAdmin})`,
    // background: "#181922",
    // background: "radial-gradient(50% 50% at 50% 50%, #3f2d6b2b 0%, rgba(20, 64, 83, 0.00) 100%), #181922",
    background: `${window?.electron ? "#05050a80" : "#05050a"}`,
    // backgroundSize: "cover",
  },
  "*::selection": {
    color: "#58d8be !important",
    backgroundColor: "#58d8be20 !important",
  },
  "*, *::before, *::after": {
    margin: 0,
    padding: 0,
  },
  "a, a:link, a:visited": {
    textDecoration: "dotted !important",
    color: `${info.secondary} !important`
  },
  "a.link, .link, a.link:link, .link:link, a.link:visited, .link:visited": {
    color: `${info.secondary} !important`,
    textDecoration: "dotted !important",
    transition: "color 150ms ease-in !important",
  },
  "a.link:hover, .link:hover, a.link:focus, .link:focus": {
    color: `${info.secondary} !important`,
    textDecoration: "dotted !important",
  },
  "u": {
    color: `${info.secondary}`,
    textDecoration: "none !important",
    borderStyle: "dashed",
    borderBottomWidth: "1.5px",
    borderColor: "#e3efff6b",
    borderTop: "none",
    borderLeft: "none",
    borderRight: "none",
    cursor: "pointer"
  },
  "u:hover": {
    color: `#0094fff7 !important`,
    borderColor: "#0094fff7 !important",
    // color: `#818aff !important`,
    // borderColor: "#818aff",
  },
  ".recharts-tooltip-item-name": {
    flexGrow: 1,
  },
  ".recharts-tooltip-item-value": {
    marginLeft: '24px !important'
  }
};
