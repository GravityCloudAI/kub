import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Vision UI Dashboard React components
import colors from "assets/theme/base/colors";
import GuiBox from "components/GuiBox";
import GuiTypography from "components/GuiTypography";

function MiniStatisticsCard({ bgColor, title, count, percentage, type, icon, direction }) {
  const { info, card, chip } = colors;

  return (
    <Card sx={{ padding: "0px", borderRadius: "0.75rem", border: "1px solid #26282d", width: "100%" }}>
      <GuiBox >
        <GuiBox>
          {/* <Grid container alignItems="center"> */}
          {/* {direction === "left" && icon !== null ? (
              <Grid item>
                <GuiBox
                  bgColor={card}
                  color="#fff"
                  width="3rem"
                  height="3rem"
                  borderRadius="1rem"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  shadow="md"
                >
                  {icon.component}
                </GuiBox>
              </Grid>
            ) : null} */}
          {/* <Grid item > */}
          <GuiBox display="flex" flexDirection="column" sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <GuiTypography
              variant={title.variant ?? "caption"}
              color={"white"}
              textTransform="capitalize"
              sx={{ fontSize: "14px", padding: "12px" }}
            >
              {title.text}
            </GuiTypography>
            <Card sx={{ padding: "0px", m: "0px", borderRadius: "0.75rem", backgroundColor: `${type === "error" ? chip.red.main : (type === "info" ? info.main : chip.green.main)}`, width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <GuiTypography variant="subtitle1" fontWeight="bold" color="white" sx={{ fontSize: "24px" }}>
                {count}{" "}
              </GuiTypography>
              <GuiTypography variant="h5" color={percentage.color} fontWeight="bold" sx={{ pb: "8px", fontSize: "14px" }}>
                {percentage.text}
              </GuiTypography>
            </Card>
          </GuiBox>
          {/* </Grid> */}
          {/* {direction === "right" && icon !== null ? (
              <Grid item xs={3}>
                <GuiBox
                  bgColor="#818AFF"
                  color="white"
                  width="3rem"
                  height="3rem"
                  marginLeft="1rem"
                  borderRadius="lg"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  shadow="md"
                >
                  <Icon fontSize="small" color="inherit">
                    {icon.component}
                  </Icon>
                </GuiBox>
              </Grid>
            ) : null} */}
          {/* </Grid> */}
        </GuiBox>
      </GuiBox>
    </Card>
  );
}

// Setting default values for the props of MiniStatisticsCard
MiniStatisticsCard.defaultProps = {
  bgColor: "white",
  title: {
    fontWeight: "medium",
    text: "",
  },
  percentage: {
    color: "success",
    text: "",
  },
  direction: "right",
};

// Typechecking props for the MiniStatisticsCard
MiniStatisticsCard.propTypes = {
  bgColor: PropTypes.oneOf([
    "white",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  title: PropTypes.PropTypes.shape({
    fontWeight: PropTypes.oneOf(["light", "regular", "medium", "bold"]),
    text: PropTypes.string,
  }),
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  icon: PropTypes.shape({
    color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
    component: PropTypes.node.isRequired,
  }).isRequired,
  direction: PropTypes.oneOf(["right", "left"]),
};

export default MiniStatisticsCard;
