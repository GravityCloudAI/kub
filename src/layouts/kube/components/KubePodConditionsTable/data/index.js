import pxToRem from "assets/theme/functions/pxToRem";
import GuiBox from "components/GuiBox";
import GuiChip from "components/GuiChip";
import GuiTypography from "components/GuiTypography";
import { podConditions } from "helpers/kubeHelper";
import { convertTimestampToReadableTimeWithTZ } from "helpers/timeHelper";

export default function parseActionsData(props, triggerKubeDetailModal, viewPodLogs) {
  return {
    columns: [
      { name: "message", align: "left" },
      { name: "reason", align: "center" },
      { name: "status", align: "center" },
      { name: "type", align: "center" },
      { name: "last Transition Time", align: "center" },
    ],

    rows: props?.data?.map(it => {
      return {
        "reason": (
          <>
            {
              it?.reason ?
                <GuiChip text={it?.reason} color={(podConditions?.find(item => item.reason === it?.reason) || { type: "progres" }).type === "success" ? "green" : ((podConditions?.find(item => item.reason === it?.reason) || { type: "progres" }).type === "failure" ? "red" : "lightblue")} />
                :
                <GuiBox display="flex" alignItems="start">
                  <GuiTypography
                    pl="" color="white" variant="button" fontWeight="medium">
                    {it?.reason ?? "--"}
                  </GuiTypography>
                </GuiBox>
            }</>

        ),
        "status": (
          <GuiBox display="flex" alignItems="start">
            <GuiTypography
              pl="" color="white" variant="button" fontWeight="medium">
              {it?.status}
            </GuiTypography>
          </GuiBox>
        ),
        "type": (
          <GuiChip text={it?.type} color={(podConditions?.find(item => item.reason === it?.type) || { type: "progres" }).type === "success" ? "green" : ((podConditions?.find(item => item.reason === it?.type) || { type: "progres" }).type === "failure" ? "red" : "lightblue")} />
        ),
        "message": (
          <GuiBox display="flex" alignItems="center" sx={{ maxWidth: `${pxToRem(250)}`, minWidth: `${pxToRem(250)}` }}>
            <GuiTypography
              pl="" color="white" variant="button" fontWeight="medium" sx={{ whiteSpace: "normal" }}>
              {it?.message ?? "--"}
            </GuiTypography>
          </GuiBox>
        ),
        "last Transition Time": (
          <GuiBox display="flex" alignItems="start">
            <GuiTypography
              pl="" color="white" variant="button" fontWeight="medium">
              {convertTimestampToReadableTimeWithTZ(it?.lastTransitionTime)}
            </GuiTypography>
          </GuiBox>
        ),
      }
    })
  };
}
