import GuiBox from "components/GuiBox";
import GuiChip from "components/GuiChip";
import { NoMaxWidthTooltip } from "components/GuiToolTip";
import GuiTypography from "components/GuiTypography";
import { convertTimestampToReadableTimeWithTZ } from "helpers/timeHelper";

export default function parseActionsData(props, triggerKubeDetailModal, viewPodLogs) {
  return {
    columns: [
      { name: "replica name", align: "left" },
      { name: "Namespace", align: "left" },
      { name: "available replicas", align: "center" },
      { name: "desired replicas", align: "center" },
      { name: "max replicas", align: "center" },
      { name: "labels", align: "left" },
      { name: "created at", align: "right" },
      // { name: "execute", align: "right" },
    ],

    rows: props?.data?.map(it => {

      return {
        "replica name": (
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
        "desired replicas": (
          <GuiBox display="flex" alignItems="start">
            <GuiTypography
              pl="" color="white" variant="button" fontWeight="medium">
              {it.metadata.annotations?.['deployment.kubernetes.io/desired-replicas']}
            </GuiTypography>
          </GuiBox>
        ),
        "max replicas": (
          <GuiBox display="flex" alignItems="start">
            <GuiTypography
              pl="" color="white" variant="button" fontWeight="medium">
              {it.metadata.annotations?.['deployment.kubernetes.io/max-replicas']}
            </GuiTypography>
          </GuiBox>
        ),
        "available replicas": (
          <GuiChip text={it?.status?.replicas} color={it?.status?.replicas > 0 ? "green" : "orange"} />
        ),
        "labels": (
          <GuiBox display="flex" alignItems="center">
            <NoMaxWidthTooltip key="labels" title={
              <GuiBox display="flex" alignItems="center" sx={{ flexWrap: "wrap", maxWidth: "250px", p: "4px", gap: "4px" }}>
                {
                  Object.entries(it?.metadata?.labels || {}).map(([key, value]) => (<GuiTypography
                    key={key}
                    mr="4px"
                    color="white"
                    variant="button"
                    fontWeight="regular"
                    opacity="0.8"
                    sx={{
                      fontSize: "12px",
                      background: "#434773",
                      borderRadius: "4px",
                      pl: "4px",
                      pr: "4px",
                      pt: "2px",
                      pb: "2px",
                    }}
                  >
                    {key}:{value}
                  </GuiTypography>))

                }
              </GuiBox>
            }
              placement="top"
            >
              <GuiBox display="flex" alignItems="center" sx={{ width: "250px", flexWrap: "wrap", gap: "4px" }}>
                {
                  (entries => {
                    const sortedEntries = entries
                      .sort(([keyA, valueA], [keyB, valueB]) => (keyA + valueA).length - (keyB + valueB).length);
                    const displayedEntries = sortedEntries.slice(0, 1);
                    const remainingCount = sortedEntries.length - 1;
                    return (
                      <>
                        {displayedEntries.map(([key, value]) => (
                          <GuiTypography
                            key={key}
                            mr="4px"
                            color="white"
                            variant="button"
                            fontWeight="regular"
                            opacity="0.8"
                            sx={{
                              fontSize: "12px",
                              background: "#434773",
                              borderRadius: "4px",
                              pl: "4px",
                              pr: "4px",
                              pt: "2px",
                              pb: "2px",
                            }}
                          >
                            {key}:{value}
                          </GuiTypography>
                        ))}
                        {remainingCount > 0 && (
                          <GuiTypography
                            mr="4px"
                            color="white"
                            variant="button"
                            fontWeight="regular"
                            opacity="0.8"
                            sx={{
                              fontSize: "12px",
                              background: "#434773",
                              borderRadius: "4px",
                              pl: "4px",
                              pr: "4px",
                              pt: "2px",
                              pb: "2px",
                            }}
                          >
                            +{remainingCount}
                          </GuiTypography>
                        )}
                      </>
                    );
                  })(Object.entries(it?.metadata?.labels || {}))
                }
              </GuiBox>
            </NoMaxWidthTooltip>
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
