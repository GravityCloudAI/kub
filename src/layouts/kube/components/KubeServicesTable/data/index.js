import { CircularProgress, Tooltip } from "@mui/material";
import pxToRem from "assets/theme/functions/pxToRem";
import { PropertySearchIcon } from "components/customIcons";
import { StarsIcon } from "components/customIcons";
import GuiBox from "components/GuiBox";
import GuiButton from "components/GuiButton";
import GuiChip from "components/GuiChip";
import GuiTypography from "components/GuiTypography";
import { podConditions } from "helpers/kubeHelper";

export default function parseActionsData(props, triggerKubeDetailModal, viewPodLogs) {
  return {
    columns: [
      { name: "Pod name", align: "left" },
      { name: "Namespace", align: "left" },
      { name: "Ready", align: "center" },
      { name: "status", align: "center" },
      { name: "latest condition", align: "center" },
      { name: "restarts", align: "center" },
      { name: "age", align: "center" },
      { name: "logs", align: "center" },
      // { name: "execute", align: "right" },
    ],

    rows: props?.data?.map(it => {

      const isPodUnhealthy = it?.status === "CrashLoopBackOff" || it?.status === "CreateContainerConfigError"

      return {
        "Pod name": (
          <GuiBox display="flex" alignItems="start" sx={{ width: "350px" }}>
            <GuiTypography
              sx={{ cursor: "pointer", textUnderlinePosition: "under", width: "350px" }}
              onClick={() => { triggerKubeDetailModal(it?.name, "pod", { pod: it.pod, data: props?.cluster }) }}
              pl="" color="white" variant="button" fontWeight="medium">
              <u>{it?.name}</u>
            </GuiTypography>
          </GuiBox>
        ),
        "Namespace": (
          <GuiBox display="flex" alignItems="start">
            <GuiTypography
              pl="" color="white" variant="button" fontWeight="medium">
              {it?.namespace}
            </GuiTypography>
          </GuiBox>
        ),
        "Ready": (
          <GuiBox display="flex" alignItems="start">
            <GuiTypography
              pl="" color="white" variant="button" fontWeight="medium">
              {it?.ready}
            </GuiTypography>
          </GuiBox>
        ),
        "status": (
          <GuiChip text={it?.status} loader={it?.status === "Pending"} color={it?.status === "Running" ? "green" : (it?.status === "CrashLoopBackOff" || it?.status === "CreateContainerConfigError") ? "red" : (it?.status === "Pending") ? "lightblue" : "lightblue"} />
        ),
        "latest condition": (
          <GuiChip text={it?.latestCondition} color={(podConditions?.find(item => item.reason === it?.latestCondition) || { type: "progres" }).type === "success" ? "green" : ((podConditions?.find(item => item.reason === it?.latestCondition) || { type: "progres" }).type === "failure" ? "red" : "lightblue")} />
        ),
        "restarts": (
          <GuiBox display="flex" alignItems="start">
            <GuiTypography
              pl="" color="white" variant="button" fontWeight="medium">
              {it?.restarts}
            </GuiTypography>
          </GuiBox>
        ),
        "age": (
          <GuiBox display="flex" alignItems="start">
            <GuiTypography
              pl="" color="white" variant="button" fontWeight="medium">
              {it?.age}
            </GuiTypography>
          </GuiBox>
        ),
        "logs": (
          <Tooltip title={isPodUnhealthy ? "AI Analyze pod" : "View logs"} placement="top">
            <GuiButton
              onClick={() => viewPodLogs({ name: it?.name, namespace: it?.pod?.metadata?.namespace, clusterName: props.cluster?.name, clusterArn: props.cluster?.arn, isPodUnhealthy })}
              color="white"
              disabled={props.loading === -1 ? false : (props.loading !== it.revision ? true : false)}
              sx={{
                minWidth: "100%",
                textAlign: "start",
                display: "flex",
                pl: `${pxToRem(12)}`,
                pr: `${pxToRem(12)}`,
                background: isPodUnhealthy ? "linear-gradient(90deg, rgba(129,138,255,1) 0%, rgba(56,70,251,1) 100%)" : "white",
                position: "relative",
                overflow: "hidden",
                "&::before": isPodUnhealthy ? {
                  content: '""',
                  position: "absolute",
                  top: "-50%",
                  left: "-50%",
                  right: "-50%",
                  bottom: "-50%",
                  background: "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)",
                  animation: "shimmer 2s infinite",
                  transform: "rotate(30deg)",
                } : {},
                "@keyframes shimmer": {
                  "0%": {
                    transform: "translateX(-100%) rotate(30deg)",
                  },
                  "100%": {
                    transform: "translateX(100%) rotate(30deg)",
                  },
                },
              }}
              rel="noreferrer"
            >
              {
                isPodUnhealthy ?
                  <>
                    {props?.logsLoading && props?.logsData?.metadata?.name === it?.name ?
                      <>
                        <GuiTypography variant="h7" fontWeight="regular" color="white" pl="" sx={{ minWidth: "50%" }} mr={pxToRem(4)}>
                          analyzing...
                        </GuiTypography>
                        <CircularProgress size="1rem" thickness={2} sx={{ color: "#ffffff" }} />
                      </>
                      :
                      <GuiBox display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                        <StarsIcon />
                      </GuiBox>
                    }
                  </>
                  : <>
                    {props?.logsLoading && props?.logsData?.metadata?.name === it?.name ?
                      <>
                        <GuiTypography variant="h7" fontWeight="regular" color="dark" pl="" sx={{ minWidth: "50%" }} mr={pxToRem(4)}>
                          fetching...
                        </GuiTypography>
                        <CircularProgress size="1rem" thickness={2} sx={{ color: "#000000" }} />
                      </>
                      :
                      <GuiBox display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                        <PropertySearchIcon />
                      </GuiBox>
                    }
                  </>
              }
            </GuiButton>
          </Tooltip>
        )
      }
    })
  };
}
