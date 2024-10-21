import GuiBox from "components/GuiBox";
import GuiChip from "components/GuiChip";
import GuiTypography from "components/GuiTypography";
import { deploymentReason } from "helpers/kubeHelper";
import { findLatestTransition } from "helpers/stringHelper";
import { convertTimestampToReadableTimeWithTZ } from "helpers/timeHelper";

export default function parseActionsData(props, triggerKubeDetailModal, viewPodLogs) {
  return {
    columns: [
      { name: "Deployment name", align: "left" },
      { name: "Namespace", align: "left" },
      { name: "status", align: "center" },
      { name: "latest condition", align: "center" },
      { name: "replicas", align: "center" },
      { name: "created at", align: "center" },
      // { name: "execute", align: "right" },
    ],

    rows: props?.data?.map(it => {

      let status = "Pending"
      let reason = "--"
      let statusMessage = "Pending"
      if (it?.status?.conditions?.length > 0) {
        const latestCondition = findLatestTransition(it?.status?.conditions);
        status = latestCondition?.type
        statusMessage = latestCondition?.message
        reason = latestCondition?.reason
      }

      return {
        "Deployment name": (
          <GuiBox display="flex" alignItems="start" sx={{ width: "350px" }}>
            <GuiTypography
              sx={{ cursor: "pointer", textUnderlinePosition: "under", width: "350px" }}
              onClick={() => { triggerKubeDetailModal(it?.name, "deployment", { deployment: it, data: props.data }) }}
              pl="" color="white" variant="button" fontWeight="medium">
              <u>{it?.metadata?.name}</u>
            </GuiTypography>
          </GuiBox>
        ),
        "Namespace": (
          <GuiBox display="flex" alignItems="start">
            <GuiTypography
              pl="" color="white" variant="button" fontWeight="medium">
              {it?.metadata?.namespace}
            </GuiTypography>
          </GuiBox>
        ),
        "latest condition": (
          <GuiChip text={reason} color={(deploymentReason?.find(item => item.reason === reason) || { type: "progres" }).type === "success" ? "green" : ((deploymentReason?.find(item => item.reason === reason) || { type: "progres" }).type === "failure" ? "red" : "lightblue")} />
        ),
        "status": (
          <GuiChip tooltip={statusMessage} text={status} loader={status === "Pending" || status === "Progressing"} color={status === "Available" ? "green" : (status === "ReplicaFailure") ? "red" : (status === "Pending") ? "orange" : "lightblue"} />
        ),
        "replicas": (
          <GuiBox display="flex" alignItems="start">
            <GuiTypography
              pl="" color="white" variant="button" fontWeight="medium">
              {it?.spec?.replicas}
            </GuiTypography>
          </GuiBox>
        ),
        "created at": (
          <GuiBox display="flex" alignItems="start">
            <GuiTypography
              pl="" color="white" variant="button" fontWeight="medium">
              {convertTimestampToReadableTimeWithTZ(it?.metadata?.creationTimestamp)}
            </GuiTypography>
          </GuiBox>
        ),
      }
    })
  };
}
