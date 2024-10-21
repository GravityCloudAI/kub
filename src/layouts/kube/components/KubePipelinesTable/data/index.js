import pxToRem from "assets/theme/functions/pxToRem";
import GuiAvatar from "components/GuiAvatar";
import GuiBox from "components/GuiBox";
import GuiChip from "components/GuiChip";
import { NoMaxWidthTooltip } from "components/GuiToolTip";
import GuiTypography from "components/GuiTypography";
import { convertTimestampToReadableTimeWithTZ } from "helpers/timeHelper";

export default function parseActionsData(props, triggerPipelineDetailModal) {
  return {
    columns: [
      { name: "run Id", align: "left" },
      { name: "repository", align: "center" },
      { name: "branch", align: "center" },
      // { name: "commit", align: "center" },
      { name: "regions", align: "center" },
      { name: "destinations", align: "center" },
      { name: "status", align: "center" },

      { name: "created at", align: "center" },
      { name: "finished at", align: "center" },
      { name: "user", align: "center" },

    ],

    rows: props?.data?.map(it => {

      let userDetails = it?.userDetails

      try {
        const tempUserDetails = JSON.parse(it?.userDetails);
        if (tempUserDetails) {
          userDetails = tempUserDetails
        }
      } catch (err) {
        // ignore
      }

      return {
        "run Id": (
          <GuiBox display="flex" alignItems="start" sx={{ width: "150px" }}>
            <GuiTypography
              sx={{ cursor: "pointer", textUnderlinePosition: "under", width: "150px" }}
              onClick={() => triggerPipelineDetailModal(it?.runId, it)}
              pl="" color="white" variant="button" fontWeight="medium">
              <u>{it?.runId?.trim()?.substring(0, 6)}...</u>
            </GuiTypography>
          </GuiBox>
        ),
        "status": (
          <GuiChip text={it?.status} color={it?.status === "COMPLETED" ? "green" : it?.status === "FAILED" ? "red" : "lightblue"} loader={it?.status === "IN_PROGRESS"} />
        ),
        "repository": (
          <GuiBox display="flex" alignItems="start">
            <GuiTypography
              pl="" color="white" variant="button" fontWeight="medium">
              {it?.repository}
            </GuiTypography>
          </GuiBox>
        ),
        "branch": (
          <GuiBox display="flex" alignItems="start">
            <GuiTypography
              pl="" color="white" variant="button" fontWeight="medium">
              {it?.branch}
            </GuiTypography>
          </GuiBox>
        ),
        // "commit": (
        //   <GuiBox display="flex" alignItems="start">
        //     <GuiTypography
        //       pl="" color="white" variant="button" fontWeight="medium">
        //       {it?.commit}
        //     </GuiTypography>
        //   </GuiBox>
        // ),
        "regions": (
          <GuiBox display="flex" alignItems="center" justifyContent="center">
            <NoMaxWidthTooltip key="labels" title={
              <GuiBox display="flex" alignItems="center" justifyContent="center" sx={{ flexWrap: "wrap", maxWidth: "250px", p: "4px", gap: "4px" }}>
                {
                  (it?.regions || []).map((region) => (
                    <GuiTypography
                      key={region}
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
                      {region}
                    </GuiTypography>
                  ))
                }
              </GuiBox>
            }
              placement="top"
            >
              <GuiBox display="flex" alignItems="center" justifyContent="center" sx={{ width: "120px", flexWrap: "wrap", gap: "4px" }}>
                {
                  (regions => {
                    const sortedRegions = [...regions].sort((a, b) => a.length - b.length);
                    const displayedRegions = sortedRegions.slice(0, 1);
                    const remainingCount = sortedRegions.length - 1;
                    return (
                      <>
                        {displayedRegions.map((region) => (
                          <GuiTypography
                            key={region}
                            mr="4px"
                            color="white"
                            variant="button"
                            fontWeight="regular"
                            sx={{
                              fontSize: "12px",
                              background: "#0B3238",
                              borderRadius: "6px",
                              color: "#3FE3FD",
                              border: "1px solid #1B7583",
                              pl: "6px",
                              pr: "6px",
                              pt: "2px",
                              pb: "2px",
                            }}
                          >
                            {region}
                          </GuiTypography>
                        ))}
                        {remainingCount > 0 && (
                          <GuiTypography
                            mr="4px"
                            color="white"
                            variant="button"
                            fontWeight="regular"
                            sx={{
                              fontSize: "12px",
                              background: "#0B3238",
                              borderRadius: "6px",
                              color: "#3FE3FD",
                              border: "1px solid #1B7583",
                              pl: "6px",
                              pr: "6px",
                              pt: "2px",
                              pb: "2px",
                            }}
                          >
                            +{remainingCount}
                          </GuiTypography>
                        )}
                      </>
                    );
                  })(it?.regions || [])
                }
              </GuiBox>
            </NoMaxWidthTooltip>
          </GuiBox>
        ),
        "destinations": (
          <GuiBox display="flex" alignItems="center" justifyContent="center">
            <NoMaxWidthTooltip key="labels" title={
              <GuiBox display="flex" alignItems="center" justifyContent="center" sx={{ flexWrap: "wrap", maxWidth: "250px", p: "4px", gap: "4px" }}>
                {
                  (it?.destinations || []).map((region) => (
                    <GuiTypography
                      key={region}
                      mr="4px"
                      color="white"
                      variant="button"
                      fontWeight="regular"
                      opacity="0.8"
                      sx={{
                        fontSize: "12px",
                        background: "#0B1938",
                        borderRadius: "6px",
                        color: "#62A6FF",
                        border: "1px solid #0E3570",
                        pl: "4px",
                        pr: "4px",
                        pt: "2px",
                        pb: "2px",
                      }}
                    >
                      {region}
                    </GuiTypography>
                  ))
                }
              </GuiBox>
            }
              placement="top"
            >
              <GuiBox display="flex" alignItems="center" justifyContent="center" sx={{ width: "120px", flexWrap: "wrap", gap: "4px" }}>
                {
                  (regions => {
                    const sortedRegions = [...regions].sort((a, b) => a.length - b.length);
                    const displayedRegions = sortedRegions.slice(0, 1);
                    const remainingCount = sortedRegions.length - 1;
                    return (
                      <>
                        {displayedRegions.map((region) => (
                          <GuiTypography
                            key={region}
                            mr="4px"
                            color="white"
                            variant="button"
                            fontWeight="regular"
                            sx={{
                              fontSize: "12px",
                              background: "#0B1938",
                              borderRadius: "6px",
                              color: "#62A6FF",
                              border: "1px solid #0E3570",
                              pl: "6px",
                              pr: "6px",
                              pt: "2px",
                              pb: "2px",
                            }}
                          >
                            {region}
                          </GuiTypography>
                        ))}
                        {remainingCount > 0 && (
                          <GuiTypography
                            mr="4px"
                            color="white"
                            variant="button"
                            fontWeight="regular"
                            sx={{
                              fontSize: "12px",
                              background: "#434773",
                              borderRadius: "4px",
                              pl: "6px",
                              pr: "6px",
                              pt: "2px",
                              pb: "2px",
                            }}
                          >
                            +{remainingCount}
                          </GuiTypography>
                        )}
                      </>
                    );
                  })(it?.destinations || [])
                }
              </GuiBox>
            </NoMaxWidthTooltip>
          </GuiBox>
        ),
        "user": (
          <GuiBox display="flex" alignItems="center" sx={{ color: "inherit" }}>
            <GuiAvatar src={userDetails?.avatar_url} variant="rounded" sx={{
              width: pxToRem(18),
              height: pxToRem(18),
              mr: "6px"
            }} />
            <GuiTypography
              pl="" color="white" variant="button" fontWeight="medium">
              {userDetails?.login}
            </GuiTypography>
          </GuiBox>
        ),
        "created at": (
          <GuiBox display="flex" alignItems="start">
            <GuiTypography
              pl="" color="white" variant="button" fontWeight="medium">
              {convertTimestampToReadableTimeWithTZ(it?.createdAt)}
            </GuiTypography>
          </GuiBox>
        ),
        "finished at": (
          <GuiBox display="flex" alignItems="start">
            <GuiTypography
              pl="" color="white" variant="button" fontWeight="medium">
              {it?.status !== "IN_PROGRESS" ? convertTimestampToReadableTimeWithTZ(it?.updatedAt) : "-"}
            </GuiTypography>
          </GuiBox>
        ),
      }
    })
  };
}
