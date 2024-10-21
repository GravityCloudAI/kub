import GuiBox from "components/GuiBox";
import GuiChip from "components/GuiChip";
import GuiTypography from "components/GuiTypography";
import { convertTimestampToReadableTimeWithTZ } from "helpers/timeHelper";
import axios from 'axios';
import { extractChartName } from "helpers/stringHelper";

const attemptLatestVersion = async (name) => {
  try {
    const response = await axios.get(`https://artifacthub.io/api/v1/packages/helm/${name}/${name}`);
    if (response.data && response.data.app_version) {
      return response.data.app_version
    } else {
      return '--'
    }
  } catch (error) {
    return '--'
  }
}

export default function parseActionsData(props) {
  return {
    columns: [
      { name: "chart", align: "left" },
      { name: "name", align: "left" },
      { name: "namespace", align: "left" },
      { name: "revision", align: "center" },
      { name: "status", align: "center" },
      { name: "installed version", align: "center" },
      // { name: "latest version", align: "center" },
      { name: "updated at", align: "center" },
    ],


    rows: props?.data?.map((it) => {

      // const latestV = await attemptLatestVersion(extractChartName(it?.chart))
      // console.log('latestV', latestV)

      return {
        "name": (
          <GuiBox display="flex" alignItems="start">
            <GuiTypography
              pl="" color="white" variant="button" fontWeight="medium">
              {it?.name}
            </GuiTypography>
          </GuiBox>
        ),
        "namespace": (
          <GuiBox display="flex" alignItems="start">
            <GuiTypography
              pl="" color="white" variant="button" fontWeight="medium">
              {it?.namespace}
            </GuiTypography>
          </GuiBox>
        ),
        "revision": (
          <GuiBox display="flex" alignItems="start">
            <GuiTypography
              pl="" color="white" variant="button" fontWeight="medium">
              {it?.revision}
            </GuiTypography>
          </GuiBox>
        ),
        "chart": (
          <GuiBox display="flex" alignItems="start">
            <GuiTypography
              pl="" color="white" variant="button" fontWeight="medium">
              {it?.chart}
            </GuiTypography>
          </GuiBox>
        ),
        "updated at": (
          <GuiBox display="flex" alignItems="start">
            <GuiTypography
              pl="" color="white" variant="button" fontWeight="medium">
              {convertTimestampToReadableTimeWithTZ(it?.updated)}
            </GuiTypography>
          </GuiBox>
        ),
        "installed version": (
          <GuiBox display="flex" alignItems="start">
            <GuiTypography
              pl="" color="white" variant="button" fontWeight="medium">
              {it?.app_version}
            </GuiTypography>
          </GuiBox>
        ),
        "latest version": (
          <GuiBox display="flex" alignItems="start">
            <GuiTypography
              pl="" color="white" variant="button" fontWeight="medium">
              { }
            </GuiTypography>
          </GuiBox>
        ),
        "status": (
          <GuiChip text={it?.status} color={it?.status === "deployed" ? "green" : (it?.status === "failed" ? "red" : "lightblue")} />
        ),
      }
    })
  };
}
