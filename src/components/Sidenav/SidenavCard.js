// @mui material components
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Icon from "@mui/material/Icon";
import Link from "@mui/material/Link";

// Gravity UI Dashboard React components
import GuiButton from "components/GuiButton";
import GuiBox from "components/GuiBox";
import GuiTypography from "components/GuiTypography";

// Custom styles for the SidenavCard
import { card, cardContent, cardIconBox, cardIcon } from "examples/Sidenav/styles/sidenavCard";

// Gravity UI Dashboard React context
import { useGravityUIController } from "context";

function SidenavCard({ color, ...rest }) {
  const [controller] = useGravityUIController();
  const { miniSidenav, sidenavColor } = controller;

  return (
    <Card sx={(theme) => card(theme, { miniSidenav })}>
      <CardContent sx={(theme) => cardContent(theme, { sidenavColor })}>
        <GuiBox
          bgColor="white"
          width="2rem"
          height="2rem"
          borderRadius="md"
          shadow="md"
          mb={2}
          sx={cardIconBox}
        >
          <Icon fontSize="medium" sx={(theme) => cardIcon(theme, { color })}>
            star
          </Icon>
        </GuiBox>
        <GuiBox lineHeight={1}>
          <GuiTypography variant="h6" color="white">
            Need help?
          </GuiTypography>
          <GuiBox mb={1.825} mt={-1}>
            <GuiTypography variant="caption" color="white" fontWeight="regular">
              Please check our docs
            </GuiTypography>
          </GuiBox>
          <GuiButton
            component={Link}
            href="https://www.creative-tim.com/learning-lab/react/quick-start/vision-ui-dashboard/"
            target="_blank"
            rel="noreferrer"
            size="small"
            // sx={{ color: "white !important", background: "red" }}
            sx={({ palette: { gradients, white }, functions: { linearGradient } }) => ({
              color: `${white.main} !important`,
              background: linearGradient(
                gradients.cardDark.main,
                gradients.cardDark.state,
                gradients.cardDark.deg
              ),
              "&:hover": {
                background: linearGradient(
                  gradients.cardDark.main,
                  gradients.cardDark.state,
                  gradients.cardDark.deg
                ),
              },
            })}
            fullWidth
          >
            DOCUMENTATION
          </GuiButton>
        </GuiBox>
      </CardContent>
    </Card>
  );
}

export default SidenavCard;
