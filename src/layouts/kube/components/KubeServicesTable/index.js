import { useEffect, useState } from "react";

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
import { ExpandMoreRounded } from "@mui/icons-material";
import { FormControl, MenuItem, Tooltip } from "@mui/material";
import pxToRem from "assets/theme/functions/pxToRem";
import { Cancel01Icon, FilterIcon } from "components/customIcons";
import GuiButton from "components/GuiButton";
import GuiSelect from "components/GuiSelect";
import parseActionsData from "layouts/kube/components/KubeServicesTable/data";
import { BiErrorCircle } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";

function KubeServicesTable(props) {

  const [filteredPods, setFilteredPods] = useState(props?.data)
  const [columns, setColumns] = useState([])
  const [rows, setRows] = useState([])

  // const { columns, rows } = parseActionsData(props, props.triggerKubeDetailModal, props.viewPodLogs);
  // const [menu, setMenu] = useState(null);
  const [collapse, setCollapsed] = useState(false);

  const [statusFilter, setStatusFilter] = useState(["All"]);

  const unhealthyPods = props?.data?.filter(pod => !["Running", "Completed", "Pending"].includes(pod?.status))

  useEffect(() => {
    const filteredData = props?.data?.filter(pod => {
      if (statusFilter.includes("All")) {
        return true
      } else {
        return statusFilter.includes(pod?.status)
      }
    });
    setFilteredPods(filteredData);
    const { columns, rows } = parseActionsData({ ...props, data: filteredData }, props.triggerKubeDetailModal, props.viewPodLogs);
    setColumns(columns);
    setRows(rows);
  }, [props?.data, statusFilter])

  const handleFilterChange = (value) => {

    if (statusFilter.includes(value)) {
      var index = statusFilter.indexOf(value);

      if (index !== -1) {
        statusFilter.splice(index, 1);
        if (statusFilter.length === 0) {
          setStatusFilter(["All"])
        } else {
          setStatusFilter([...statusFilter])
        }
      }
    } else {

      if (value === "All") {
        setStatusFilter(["All"])
      } else {

        if (statusFilter.includes("All")) {
          var index = statusFilter.indexOf("All");
          if (index !== -1) {
            statusFilter.splice(index, 1);
          }
        }

        statusFilter.push(value)
        setStatusFilter([...statusFilter])
      }
    }
  }

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
          <GuiBox display="flex" alignItems="center" justifyContent="space-between">
            <GuiTypography color="white" variant="lg" mb="6px">
              {props?.title}
            </GuiTypography>
          </GuiBox>
          <GuiBox mt="8px" mb="auto" display="flex" flexDirection="row" sx={{ gap: "12px" }}>
            <GuiBox display="flex" alignItems="center" lineHeight={0}>
              <BsCheckCircleFill color="green" size="15px" />
              <GuiTypography variant="button" fontWeight="regular" color="text" ml="5px">
                &nbsp;<strong>{props?.data?.filter(pod => pod.status !== "Completed")?.length === 1 ? props?.data?.filter(pod => pod.status !== "Completed")?.length + " pod" : props?.data?.filter(pod => pod.status !== "Completed")?.length + " pods"}</strong>
              </GuiTypography>
            </GuiBox>
            <GuiBox display="flex" alignItems="center" lineHeight={0}>
              <BsCheckCircleFill color="#005EA3" size="15px" />
              <GuiTypography variant="button" fontWeight="regular" color="text" ml="5px">
                &nbsp;<strong>{props?.data?.filter(pod => pod.status === "Completed")?.length === 1 ? props?.data?.filter(pod => pod.status === "Completed")?.length + " completed pod" : props?.data?.filter(pod => pod.status === "Completed")?.length + " completed pods"}</strong>
              </GuiTypography>
            </GuiBox>
          </GuiBox>
        </GuiBox>
        <GuiBox display="flex" justifyContent="end" alignItems="center" mb="8px">
          {
            unhealthyPods?.length > 0 ?
              <>
                <GuiButton
                  color="dark"
                  onClick={() => {
                    // get a Set() of all status for unhealthy pods
                    const statusSet = new Set(unhealthyPods?.map(pod => pod?.status))
                    setStatusFilter([...statusSet])

                  }}
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    mr: "12px",
                    '&:before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '2px',
                      background: 'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, #FF5A5A 50%, rgba(0, 0, 0, 0) 100%)',
                      zIndex: 1,
                    },
                    '& > *': {
                      position: 'relative',
                      zIndex: 2,
                    },
                  }}
                >
                  <GuiBox display="flex" justifyContent="start" alignItems="center" gap="4px">
                    <BiErrorCircle color="#FF5A5A" />
                    <GuiTypography variant="body2" fontWeight="regular" color="white" sx={{ fontSize: `0.8rem` }}>
                      View {unhealthyPods?.length} unhealthy {unhealthyPods?.length === 1 ? "pod" : "pods"}
                    </GuiTypography>
                  </GuiBox>

                </GuiButton>
              </> : null
          }
          <FilterIcon />
          <FormControl sx={{ ml: "0.5rem", flexShrink: 0, mr: "12px" }}>
            <GuiSelect
              IconComponent={() => <ExpandMoreRounded />}
              variant="outlined"
              sx={{ m: 0 }}
              color="white"
              size="small"
              value={statusFilter}
              displayEmpty
              onChange={(e) => handleFilterChange(e.target.value)}
              inputProps={{ 'aria-label': 'Without label' }}
              renderValue={(selected) => {
                return `Status: ${selected.join(", ")}`
              }}              >
              {Array.from(["All", ...new Set(props?.data?.map(pod => pod?.status))]).map(it => (
                <MenuItem key={it} value={it} >
                  <GuiBox display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" sx={{ gap: "8px", color: "inherit", width: "-webkit-fill-available" }}>
                    <GuiTypography variant="h5" fontWeight="regular" sx={{ textWrap: "wrap", fontSize: `${pxToRem(14)}`, color: "inherit !important" }}>
                      {it}
                    </GuiTypography>
                    {
                      statusFilter?.includes(it) ?
                        <FaCheck color="inherit" />
                        : null
                    }
                  </GuiBox>
                </MenuItem>
              ))}
            </GuiSelect>
          </FormControl>

          <Tooltip title="Clear filter">
            <GuiButton
              sx={{ p: "0", borderRadius: "0.75rem", border: "1px solid #26282d", background: "#20212E" }}
              disabled={statusFilter?.length === 1 && statusFilter?.includes("All")}
              onClick={() => {
                setStatusFilter(["All"])
              }} color="dark"
              iconOnly={true}
              rel="noreferrer"
            >
              {
                <Cancel01Icon />
              }
            </GuiButton>
          </Tooltip>

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

export default KubeServicesTable;
