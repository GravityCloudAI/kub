// @mui material components
import Divider from "@mui/material/Divider";

// Vision UI Dashboard React components
import GuiBox from "components/GuiBox";
import GuiTypography from "components/GuiTypography";

function Separator() {
  return (
    <GuiBox position="relative" py={0.25}>
      <Divider />
      <GuiBox
        bgColor="white"
        position="absolute"
        top="50%"
        left="50%"
        px={1.5}
        lineHeight={1}
        sx={{ transform: "translate(-50%, -60%)" }}
      >
        <GuiTypography variant="button" fontWeight="medium" color="text">
          or
        </GuiTypography>
      </GuiBox>
    </GuiBox>
  );
}

export default Separator;
