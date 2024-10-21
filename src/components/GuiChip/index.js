import { CircularProgress, Tooltip } from "@mui/material";
import colors from "assets/theme/base/colors";
import GuiButton from "components/GuiButton";
import GuiTypography from "components/GuiTypography";

const { default: GuiBox } = require("components/GuiBox");
const { chip, dark, white } = colors;

function GuiChip(props) {
    return (
        <GuiBox display="flex" alignItems="center">
            <Tooltip title={props?.tooltip} placement="top">
                <GuiButton
                    sx={{
                        pt: "0px",
                        pb: "0px",
                        pl: `${props?.size === "small" ? "4px" : "12px"}`,
                        pr: `${props?.size === "small" ? "4px" : "12px"}`,
                        borderRadius: `${props?.size === "small" ? "6px" : "12px"}`,
                        border: `1px solid ${chip[props.color].border}`,
                        background: chip[props.color].main,
                        minHeight: `${props?.size === "small" ? "1rem" : "2rem"}`,
                        '&:hover': {
                            background: dark.main,
                        }
                    }} onClick={() => props?.onClick && props?.onClick(props.data)}
                    color="info"
                    iconOnly={false}
                    rel="noreferrer"
                >
                    <GuiBox display="flex" sx={{ gap: "6px" }} alignItems="center">
                        <GuiTypography variant="button" fontWeight="medium" opacity={1}
                            sx={{
                                color: `${chip[props.color].text}`,
                                fontSize: `${props?.size === "small" ? "12px" : "12px"}`,
                                '&:hover': {
                                    color: white.main,
                                }
                            }}>
                            {props.text}
                        </GuiTypography>
                        {
                            props?.loader ? <CircularProgress sx={{ color: "#ffffff" }} size={`${props?.size === "small" ? "10px" : "12px"}`} /> : null
                        }

                    </GuiBox>
                </GuiButton>
            </Tooltip>
        </GuiBox>
    )
}

export default GuiChip;
