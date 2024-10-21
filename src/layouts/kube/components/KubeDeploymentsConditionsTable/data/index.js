import pxToRem from "assets/theme/functions/pxToRem";
import GuiBox from "components/GuiBox";
import GuiChip from "components/GuiChip";
import GuiTypography from "components/GuiTypography";
import { deploymentReason } from "helpers/kubeHelper";
import { convertTimestampToReadableTimeWithTZ } from "helpers/timeHelper";

export default function parseActionsData(props, triggerKubeDetailModal, viewPodLogs) {
  return {
    columns: [
      { name: "message", align: "left" },
      { name: "reason", align: "center" },
      { name: "status", align: "center" },
      { name: "type", align: "center" },
      { name: "last Transition Time", align: "center" },
      { name: "last Update Time", align: "center" },
    ],

    rows: props?.data?.map(it => {
      return {
        "reason": (
          <GuiChip text={it?.reason} color={(deploymentReason?.find(item => item.reason === it?.reason) || { type: "progres" }).type === "success" ? "green" : ((deploymentReason?.find(item => item.reason === it?.reason) || { type: "progres" }).type === "failure" ? "red" : "lightblue")} />
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
          <GuiChip text={it?.type} color={it?.type === "Available" ? "green" : (it?.type === "ReplicaFailure") ? "red" : (it?.type === "Pending") ? "orange" : "lightblue"} />
        ),
        "message": (
          <GuiBox display="flex" alignItems="center" sx={{ maxWidth: `${pxToRem(250)}`, minWidth: `${pxToRem(250)}` }}>
            <GuiTypography
              pl="" color="white" variant="button" fontWeight="medium" sx={{ whiteSpace: "normal" }}>
              {it?.message}
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
        "last Update Time": (
          <GuiBox display="flex" alignItems="start">
            <GuiTypography
              pl="" color="white" variant="button" fontWeight="medium">
              {convertTimestampToReadableTimeWithTZ(it?.lastUpdateTime)}
            </GuiTypography>
          </GuiBox>
        ),
      }
    })
  };
}
