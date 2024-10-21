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
import parseActionsData from "layouts/kube/components/KubeDeploymentsConditionsTable/data";

function KubeDeploymentsConditionsTable(props) {
  const { columns, rows } = parseActionsData(props, props.triggerKubeDetailModal, props.viewPodLogs);
  // const [menu, setMenu] = useState(null);
  const [collapse, setCollapsed] = useState(false);
  const toggleChecked = () => setCollapsed(value => !value);
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
          <GuiTypography color="white" variant="lg" mb="6px">
            {props?.title}
          </GuiTypography>
          <GuiBox mt="8px" mb="auto" display="flex" sx={{ gap: "8px" }}>
            <GuiBox display="flex" alignItems="center" lineHeight={0}>
              <BsCheckCircleFill color="green" size="15px" />
              <GuiTypography variant="button" fontWeight="regular" color="text" ml="5px">
                &nbsp;<strong>{props.data.length === 1 ? props.data.length + " condition" : props.data.length + " conditions"}</strong>
              </GuiTypography>
            </GuiBox>
          </GuiBox>
        </GuiBox>
        <GuiBox display="flex" justifyContent="end" alignItems="center" mb="8px">
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

export default KubeDeploymentsConditionsTable;
