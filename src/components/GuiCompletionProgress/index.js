import GuiBox from "components/GuiBox";
import GuiProgress from "components/GuiProgress";
import GuiTypography from "components/GuiTypography";

function GuiCompletionProgress({ value, color }) {
    return (
        <GuiBox display="flex" flexDirection="column" alignItems="flex-start">
            <GuiTypography variant="button" color="white" fontWeight="medium" mb="4px">
                {value}%&nbsp;
            </GuiTypography>
            <GuiBox width="6rem">
                <GuiProgress value={value} color={color} sx={{ background: "#2D2E5F", color }} label={false} />
            </GuiBox>
        </GuiBox>
    );
}

export default GuiCompletionProgress;