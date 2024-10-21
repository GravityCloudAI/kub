import { CircularProgress } from "@mui/material";
import pxToRem from "assets/theme/functions/pxToRem";
import GuiBox from "components/GuiBox";
import GuiButton from "components/GuiButton";
import GuiChip from "components/GuiChip";
import GuiTypography from "components/GuiTypography";
import { convertToReadableTime } from "helpers/timeHelper";
import { convertTimestampToReadableTimeWithTZ } from "helpers/timeHelper";
import { HiOutlineRefresh } from "react-icons/hi";

export default function parseEventsData(props, triggerRollback) {
  return {
    columns: [
      // { name: "id", align: "left" },
      { name: "message", align: "left" },
      { name: "created at", align: "right" }
    ],

    rows: props.data.map(it => {
      return {
        // "id": (
        //   <GuiBox display="flex" alignItems="center" sx={{ minWidth: `${pxToRem(12)}` }}>
        //     <GuiTypography pl="" color="white" fontWeight="medium">
        //       {it.id}
        //     </GuiTypography>
        //   </GuiBox>
        // ),
        "message": (
          <GuiBox display="flex" alignItems="center" >

            <GuiTypography variant="body2" pl="" color="white" fontWeight="medium" sx={{ maxWidth: "100%", wordBreak: "break-all", textWrap: "wrap", whiteSpace: "pre-line", fontSize: "14px" }}>
              {it.message}
            </GuiTypography>
          </GuiBox>
        ),
        "created at": (
          <GuiBox display="flex" alignItems="center" sx={{ minWidth: `${pxToRem(12)}` }}>
            <GuiTypography pl="" color="white" fontWeight="regular" sx={{ opacity: "0.8", color: "#5F6587", fontSize: "14px" }}>
              {convertTimestampToReadableTimeWithTZ(it.createdAt)}
            </GuiTypography>
          </GuiBox>
        )
      }
    })
  };
}
