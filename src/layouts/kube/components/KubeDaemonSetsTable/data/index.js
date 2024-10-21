import GuiBox from "components/GuiBox";
import GuiLabels from "components/GuiLabels";
import GuiTypography from "components/GuiTypography";
import { calculateAge } from "helpers/stringHelper";

export default function parseActionsData(props, triggerKubeDetailModal) {
  return {
    columns: [
      { name: "name", align: "left" },
      { name: "Namespace", align: "left" },
      { name: "ready", align: "center" },
      { name: "labels", align: "left" },
      { name: "age", align: "center" },
    ],

    rows: props?.data?.map(it => {

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
        "ready": (
          <GuiBox display="flex" alignItems="start">
            <GuiTypography
              pl="" color="white" variant="button" fontWeight="medium">
              {it?.status?.currentNumberScheduled || 0} / {it?.status?.desiredNumberScheduled || 0}
            </GuiTypography>
          </GuiBox>
        ),
        "labels": (
          <GuiLabels labelsList={Object.entries(it?.metadata?.labels || {})} />
        ),
        "age": (
          <GuiBox display="flex" alignItems="start">
            <GuiTypography
              pl="" color="white" variant="button" fontWeight="medium">
              {calculateAge(new Date(it?.metadata?.creationTimestamp))}
            </GuiTypography>
          </GuiBox>
        )
      }
    })
  };
}
