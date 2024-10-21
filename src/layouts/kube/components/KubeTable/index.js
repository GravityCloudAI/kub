import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import { BsCheckCircleFill } from "react-icons/bs";

// Gravity UI Dashboard React components
import GuiBox from "components/GuiBox";
import GuiTypography from "components/GuiTypography";

// Gravity UI Dashboard Materail-UI example components
import Table from "components/Table";

// Data
import GuiButton from "components/GuiButton";
import parseActionsData from "./data";
import { LinearProgress } from "@mui/material";
import GuiChip from "components/GuiChip";
import { extractRegionFromEksArn } from "helpers/stringHelper";

function KubeTable(props) {
  const { columns, rows } = parseActionsData(props, props.triggerServiceDetailModal, props.cdPipelineOnclick);
  // const [menu, setMenu] = useState(null);
  const [collapse, setCollapsed] = useState(false);
  const toggleChecked = () => setCollapsed(value => !value);

  let isKarpenterEnabled = false
  for (const key in props?.data?.clusterDetail.tags) {
    if (["karpenter.sh/discovery"].some(pattern => key.includes(pattern))) {
      isKarpenterEnabled = true
    }
  }

  return (
    <Card
      variant="outlined"
      raised={false}
      sx={{
        height: "100% !important",
        boxShadow: "none",
        borderRadius: "0.75rem", border: "1px solid #26282d",
        marginBottom: "0px",
        paddingTop: "8px",
        paddingBottom: "8px",
      }}
    >
      <GuiBox display="flex" justifyContent="space-between" alignItems="center" mb="8px" sx={{ cursor: "pointer" }}>
        <GuiBox mb="auto">
          <GuiBox mb="auto" display="flex" sx={{ alignItems: "center", justifyContent: "start", flexDirection: "row", gap: "8px" }}>
            <GuiTypography color="white" variant="lg" mb="6px" gutterBottom sx={{ cursor: "pointer", textUnderlinePosition: "under" }} onClick={() => { props.triggerKubeDetailModal(props?.title, "cluster", { ...props?.data, ...{ region: props?.region } }, props?.pusher) }}>
              <u>{props?.title}</u>
            </GuiTypography>
            <GuiChip text={extractRegionFromEksArn(props?.data?.clusterDetail?.arn)} color="yellow" size="small" />
            <GuiChip loader={props?.data?.clusterDetail?.status === "CREATING"} text={props?.data?.clusterDetail?.status} color={props?.data?.clusterDetail?.status === "ACTIVE" ? "green" : "lightblue"} size="small" />
          </GuiBox>
          <GuiBox display="flex" alignItems="center" lineHeight={0}>
            <BsCheckCircleFill color="green" size="15px" />
            <GuiTypography variant="button" fontWeight="regular" color="text" ml="5px">
              &nbsp;<strong>{rows.length + (rows.length > 1 ? ` node managers` : ` node manager`)} </strong>
            </GuiTypography>
          </GuiBox>
        </GuiBox>
        <GuiBox display="flex" justifyContent="end" alignItems="center" mb="8px">
          {!props?.data?.clusterDetail?.isLocal ? <GuiButton
            onClick={() => props.tableAction(props.title, props.region, props?.data, "nodegroup")}
            color="white"
            sx={{ textAlign: "start", display: "flex", pt: "0px", pb: "0px", pl: "12px", pr: "12px", zIndex: 99 }}
            rel="noreferrer"
          >
            <GuiTypography variant="h7" fontWeight="regular" color="dark" p="0px" sx={{ minWidth: "100%", fontSize: "14px" }}>
              Create a New NodeGroup
            </GuiTypography>
          </GuiButton> : null}
          {
            isKarpenterEnabled ?
              <GuiButton
                onClick={() => props.tableAction(props.title, props.region, props?.data, "nodepool")}
                color="white"
                sx={{ textAlign: "start", display: "flex", ml: "8px", pt: "0px", pb: "0px", pl: "12px", pr: "12px", zIndex: 99 }}
                rel="noreferrer"
              >
                <GuiTypography variant="h7" fontWeight="regular" color="dark" p="0px" sx={{ minWidth: "100%", fontSize: "14px" }}>
                  Create a New Pool
                </GuiTypography>
              </GuiButton>
              : null
          }

          <GuiBox color="text" px={2} onClick={toggleChecked}>
            {collapse === false ?
              <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
                expand_less
              </Icon>
              :
              <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
                expand_more
              </Icon>
            }
          </GuiBox>
        </GuiBox>
      </GuiBox>
      {/* {collapse === false ? */}
      <GuiBox
        sx={{
          overflow: "auto",
          "& th": {
            borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
              `${borderWidth[1]} solid ${grey[700]}`,
          },
          "& .MuiTableRow-root:not(:last-child)": {
            "& td": {
              borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                `${borderWidth[1]} solid ${grey[700]}`,
            },
          },
          transition: "max-height 300ms ease-in-out",
          // height: `${collapse === false ? "auto" : "0px"}`,
          maxHeight: `${collapse === false ? "1000px" : "0px"}`,
        }}
      >
        <Table columns={columns} rows={rows} />
      </GuiBox>
      {/* :
        <></>
      } */}
    </Card>
  );
}

export default KubeTable;
