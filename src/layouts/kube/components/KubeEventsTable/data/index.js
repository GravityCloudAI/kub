import { Tooltip } from "@mui/material";
import pxToRem from "assets/theme/functions/pxToRem";
import GuiBox from "components/GuiBox";
import GuiChip from "components/GuiChip";
import GuiTypography from "components/GuiTypography";
import { kubernetesEventsReasons } from "helpers/kubeHelper";
import { convertTimestampToReadableTimeWithTZ } from "helpers/timeHelper";

const Alert02Icon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color={"#F5A623"} fill={"none"} {...props}>
    <path d="M5.32171 9.6829C7.73539 5.41196 8.94222 3.27648 10.5983 2.72678C11.5093 2.42437 12.4907 2.42437 13.4017 2.72678C15.0578 3.27648 16.2646 5.41196 18.6783 9.6829C21.092 13.9538 22.2988 16.0893 21.9368 17.8293C21.7376 18.7866 21.2469 19.6548 20.535 20.3097C19.241 21.5 16.8274 21.5 12 21.5C7.17265 21.5 4.75897 21.5 3.46496 20.3097C2.75308 19.6548 2.26239 18.7866 2.06322 17.8293C1.70119 16.0893 2.90803 13.9538 5.32171 9.6829Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M11.992 16H12.001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 13L12 8.99997" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckmarkCircle01Icon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} color={"#00c228"} fill={"none"} {...props}>
    <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 12.75C8 12.75 9.6 13.6625 10.4 15C10.4 15 12.8 9.75 16 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function parseActionsData(props) {
  return {
    columns: [
      { name: "", align: "center" },
      { name: "message", align: "left" },
      { name: "object", align: "center" },
      { name: "name", align: "center" },
      { name: "reason", align: "center" },
      { name: "count", align: "center" },
      { name: "last timestamp", align: "center" },
    ],

    rows: props?.data?.map(it => {
      return {
        "": (
          <GuiBox pt="4px">
            {
              it?.type === "Normal" ?
                <CheckmarkCircle01Icon/>
                :
                <Alert02Icon/>
            }
          </GuiBox>
        ),
        "reason": (
          <GuiChip text={it?.reason} color={(kubernetesEventsReasons?.find(item => item.reason === it?.reason) ?? { type: "progres" }).type === "success" ? "green" : ((kubernetesEventsReasons?.find(item => item.reason === it?.reason) ?? { type: "progres" }).type === "failure" ? "red" : "lightblue")} />
        ),
        "count": (
          <GuiBox display="flex" alignItems="start">
            <GuiTypography
              pl="" color="white" variant="button" fontWeight="medium">
              {it?.count}
            </GuiTypography>
          </GuiBox>
        ),
        "message": (
          <GuiBox display="flex" alignItems="center" sx={{ maxWidth: `${pxToRem(350)}`, minWidth: `${pxToRem(350)}`, wordBreak: "break-word" }}>
            <Tooltip title={it?.message} placement="top">
              <GuiTypography
                pl="" color="white" variant="button" fontWeight="bold" sx={{ whiteSpace: "normal" }}>
                {it?.message?.replace(/(.{180})..+/, "$1…")}
              </GuiTypography>
            </Tooltip>
          </GuiBox>
        ),
        "last timestamp": (
          <GuiBox display="flex" alignItems="start">
            <GuiTypography
              pl="" color="white" variant="button" fontWeight="medium">
              {convertTimestampToReadableTimeWithTZ(it?.lastTimestamp)}
            </GuiTypography>
          </GuiBox>
        ),
        "object": (
          <GuiBox display="flex" alignItems="start">
            <GuiTypography
              pl="" color="white" variant="button" fontWeight="medium">
              {it?.involvedObject?.kind}
            </GuiTypography>
          </GuiBox>
        ),
        "name": (
          <GuiBox display="flex" alignItems="start">
            <GuiTypography
              pl="" color="white" variant="button" fontWeight="medium">
              {it?.involvedObject?.name}
            </GuiTypography>
          </GuiBox>
        ),
        "namespace": (
          <GuiBox display="flex" alignItems="start">
            <GuiTypography
              pl="" color="white" variant="button" fontWeight="medium">
              {it?.involvedObject?.namespace ?? "--"}
            </GuiTypography>
          </GuiBox>
        )
      }
    })
  };
}
