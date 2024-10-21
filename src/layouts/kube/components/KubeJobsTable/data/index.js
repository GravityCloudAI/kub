import GuiBox from "components/GuiBox";
import GuiChip from "components/GuiChip";
import GuiLabels from "components/GuiLabels";
import GuiTypography from "components/GuiTypography";
import { calculateAge } from "helpers/stringHelper";
import { calculateTimeDifference } from "helpers/timeHelper";
import { convertTimestampToReadableTimeWithTZ } from "helpers/timeHelper";

export default function parseActionsData(props, triggerKubeDetailModal) {
  return {
    columns: [
      { name: "name", align: "left" },
      { name: "Namespace", align: "left" },
      { name: "status", align: "center" },
      { name: "labels", align: "left" },
      { name: "start time", align: "left" },
      { name: "completion time", align: "center" },
      { name: "run time", align: "center" },
    ],

    rows: props?.data?.map(it => {

      let status = ""

      if (it?.status?.failed) {
        status = "Failed"
      } else {
        const latestCondition = it?.status?.conditions?.reduce((latest, current) => {
          return new Date(latest.lastUpdateTime) > new Date(current.lastUpdateTime) ? latest : current;
        });
        status = latestCondition?.type
      }

      return {
        "name": (
          <GuiBox display="flex" alignItems="start" sx={{ width: "300px" }}>
            <GuiTypography
              sx={{ cursor: "pointer", textUnderlinePosition: "under", width: "300px" }}
              onClick={() => { triggerKubeDetailModal(it?.name, "replica", { replica: it, data: props.data }) }}
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
        "status": (
          <GuiChip
            color={(status === "Failed" ? "red" : (status === "Complete" ? "green" : "lightblue"))}
            text={status}
          />
        ),
        "labels": (
          <GuiLabels labelsList={Object.entries(it?.metadata?.labels || {})} />
        ),
        "start time": (
          <GuiBox display="flex" alignItems="start">
            <GuiTypography
              pl="" color="white" variant="button" fontWeight="medium">
              {convertTimestampToReadableTimeWithTZ(it?.metadata?.creationTimestamp)}
            </GuiTypography>
          </GuiBox>
        ),
        "completion time": (
          <GuiBox display="flex" alignItems="start">
            <GuiTypography
              pl="" color="white" variant="button" fontWeight="medium">
              {it?.status?.completionTime ? convertTimestampToReadableTimeWithTZ(it?.status?.completionTime) : "--"}
            </GuiTypography>
          </GuiBox>
        ),
        "run time": (
          <GuiBox display="flex" alignItems="start">
            <GuiTypography
              pl="" color="white" variant="button" fontWeight="medium">
              {it?.status?.completionTime ? calculateTimeDifference(it?.metadata?.creationTimestamp, it?.status?.completionTime) : "--"}
            </GuiTypography>
          </GuiBox>
        ),
      }
    })
  };
}
