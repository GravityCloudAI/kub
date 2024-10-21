import { Card, Checkbox, CircularProgress, Divider, FormControl, Link, MenuItem, Modal, Tab, Tabs, Tooltip } from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { lazy, Suspense, useCallback, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import "./logs.css";

const PodMetricsChart = lazy(() => import('./PodMetricsChart'));

const MarkdownRenderer = ({ content }) => {
  const commonStyles = {
    color: 'white',
    fontSize: '14px',
    textWrap: 'wrap',
    fontFamily: 'inherit',
  };

  return (
    <ReactMarkdown
      components={{
        p: ({ node, ...props }) => <p style={commonStyles} {...props} />,
        h1: ({ node, ...props }) => <h1 style={{ ...commonStyles, fontSize: '20px', fontWeight: 'bold' }} {...props} />,
        h2: ({ node, ...props }) => <h2 style={{ ...commonStyles, fontSize: '18px', fontWeight: 'bold' }} {...props} />,
        h3: ({ node, ...props }) => <h3 style={{ ...commonStyles, fontSize: '16px', fontWeight: 'bold' }} {...props} />,
        h4: ({ node, ...props }) => <h4 style={{ ...commonStyles, fontSize: '15px', fontWeight: 'bold' }} {...props} />,
        h5: ({ node, ...props }) => <h5 style={{ ...commonStyles, fontWeight: 'bold' }} {...props} />,
        h6: ({ node, ...props }) => <h6 style={{ ...commonStyles, fontWeight: 'bold' }} {...props} />,
        ul: ({ node, ...props }) => <ul style={{ ...commonStyles, marginTop: '4px', marginBottom: '4px', marginLeft: '16px' }} {...props} />,
        ol: ({ node, ...props }) => <ol style={{ ...commonStyles, marginTop: '4px', marginBottom: '4px', marginLeft: '16px' }} {...props} />,
        li: ({ node, ...props }) => <li style={{ ...commonStyles, marginTop: '4px', marginBottom: '4px', marginLeft: '16px' }} {...props} />,
        a: ({ node, ...props }) => <a style={{ ...commonStyles, textDecoration: 'underline' }} {...props} />,
        em: ({ node, ...props }) => <em style={commonStyles} {...props} />,
        strong: ({ node, ...props }) => <strong style={{ ...commonStyles, fontWeight: 'bold' }} {...props} />,
        code: ({ node, inline, ...props }) =>
          inline
            ? <code style={{ ...commonStyles, backgroundColor: '#2D3748', padding: '2px 4px', borderRadius: '4px' }} {...props} />
            : <pre style={{ ...commonStyles, backgroundColor: '#2D3748', padding: '10px', borderRadius: '4px', overflowX: 'auto', margin: '8px' }}><code {...props} /></pre>,
        blockquote: ({ node, ...props }) => <blockquote style={{ ...commonStyles, borderLeft: '4px solid #4A5568', paddingLeft: '10px', margin: '10px 0' }} {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}


const ChartLineData02Icon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#818aff"} fill={"none"} {...props}>
    <circle cx="8.5" cy="10.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="14.5" cy="15.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="18.5" cy="7.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M15.4341 14.2963L18 9M9.58251 11.5684L13.2038 14.2963M3 19L7.58957 11.8792" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 21H9C5.70017 21 4.05025 21 3.02513 19.9749C2 18.9497 2 17.2998 2 14V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const DocumentCodeIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#818aff"} fill={"none"} {...props}>
    <path d="M18 16L19.8398 17.5858C20.6133 18.2525 21 18.5858 21 19C21 19.4142 20.6133 19.7475 19.8398 20.4142L18 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 16L12.1602 17.5858C11.3867 18.2525 11 18.5858 11 19C11 19.4142 11.3867 19.7475 12.1602 20.4142L14 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 13.0032L20 7.8199C20 6.12616 20 5.27929 19.732 4.60291C19.3013 3.51555 18.3902 2.65784 17.2352 2.25228C16.5168 2 15.6173 2 13.8182 2C10.6698 2 9.09563 2 7.83836 2.44148C5.81714 3.15122 4.22281 4.6522 3.46894 6.55509C3 7.73875 3 9.22077 3 12.1848L3 14.731C3 17.8013 3 19.3364 3.8477 20.4025C4.09058 20.708 4.37862 20.9792 4.70307 21.2078C5.61506 21.8506 6.85019 21.9757 9 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 12C3 10.159 4.49238 8.66667 6.33333 8.66667C6.99912 8.66667 7.78404 8.78333 8.43137 8.60988C9.00652 8.45576 9.45576 8.00652 9.60988 7.43136C9.78333 6.78404 9.66667 5.99912 9.66667 5.33333C9.66667 3.49238 11.1591 2 13 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CloudServerIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#818aff"} fill={"none"} {...props}>
    <path d="M17.4776 8.00005C17.485 8.00002 17.4925 8 17.5 8C19.9853 8 22 10.0147 22 12.5C22 14.9853 19.9853 17 17.5 17H7C4.23858 17 2 14.7614 2 12C2 9.40034 3.98398 7.26407 6.52042 7.0227M17.4776 8.00005C17.4924 7.83536 17.5 7.66856 17.5 7.5C17.5 4.46243 15.0376 2 12 2C9.12324 2 6.76233 4.20862 6.52042 7.0227M17.4776 8.00005C17.3753 9.1345 16.9286 10.1696 16.2428 11M6.52042 7.0227C6.67826 7.00768 6.83823 7 7 7C8.12582 7 9.16474 7.37209 10.0005 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 20.75V20.5C14 19.9477 13.5523 19.5 13 19.5H12M14 20.75V21C14 21.5523 13.5523 22 13 22H11C10.4477 22 10 21.5523 10 21V20.75M14 20.75H19M10 20.75V20.5C10 19.9477 10.4477 19.5 11 19.5H12M10 20.75H5M12 19.5V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Gravity UI Dashboard React components
import Drawer from '@mui/material/Drawer';
import GuiBox from "components/GuiBox";
import GuiTypography from "components/GuiTypography";
import { CellMeasurer, CellMeasurerCache, List } from 'react-virtualized';
import AutoSizer from "react-virtualized-auto-sizer";

// Gravity UI Dashboard React example components
import DashboardLayout from "components/DashboardLayout";
import DashboardNavbar from "components/DashboardNavbar";

// Gravity UI Dashboard React base styles
import colors from "assets/theme/base/colors";

// Dashboard layout components

import { Check, CheckCircle, CloseSharp, Delete, ErrorRounded, ExpandMoreRounded, InfoRounded } from "@mui/icons-material";
import pxToRem from "assets/theme/functions/pxToRem";
import { ArrowRight01Icon, Cancel01Icon, CircleArrowDown01Icon, DashboardSquare01Icon, Download04Icon, FilterIcon, StarsIcon } from "components/customIcons";
import GuiAvatar from "components/GuiAvatar";
import GuiButton from "components/GuiButton";
import GuiChip from "components/GuiChip";
import GuiInput from "components/GuiInput";
import GuiSelect from "components/GuiSelect";
import GuiSwitch from "components/GuiSwitch";
import MiniStatisticsCard from "components/MiniStatisticsCard";
import { ec2InstanceTypes } from "helpers/awsHelper";
import { deleteCookie, getCookie } from "helpers/cookieHelper";
import { execElectronCommand } from "helpers/electronHelper";
import { calculateRequestedResourcesForNode, eksAddOns, extractKubeNodeDetails, filterLabels } from "helpers/kubeHelper";
import { ec2PricingMap } from "helpers/pricingHelper";
import { convertECRImageURIToConsoleURL, extractRegionFromEksArn, findLatestTransition, getBaseAPIUrl, parsePodsStatus, parsePodStatus } from "helpers/stringHelper";
import { convertTimestampToReadableTimeWithTZ } from "helpers/timeHelper";
import useUserDataStore from "hooks/userDataStore";
import { WorkflowIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ApexCharts from 'react-apexcharts';
import { BsCheckCircleFill, BsPlusCircleFill } from "react-icons/bs";
import { FaCheck, FaFloppyDisk } from "react-icons/fa6";
import { HiArrowRight } from "react-icons/hi";
import { IoClose, IoKey, IoRefreshOutline } from "react-icons/io5";
import { SiKubernetes } from "react-icons/si";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmptySpace from "../../assets/images/emptyspace.svg";
import customAxios from "../../axiosi";
import KubeDaemonSetsTable from "./components/KubeDaemonSetsTable";
import KubeDeploymentsConditionsTable from "./components/KubeDeploymentsConditionsTable";
import KubeDeploymentsTable from "./components/KubeDeploymentsTable";
import KubeEventsTable from "./components/KubeEventsTable";
import KubeHelmChartsTable from "./components/KubeHelmChartsTable";
import KubeJobsTable from "./components/KubeJobsTable";
import KubeNodesTable from "./components/KubeNodesTable";
import KubePipelinesTable from "./components/KubePipelinesTable";
import KubePodConditionsTable from "./components/KubePodConditionsTable";
import KubeReplicaSetsTable from "./components/KubeReplicaSetsTable";
import KubeServicesTable from "./components/KubeServicesTable";
import KubeStatefulSetsTable from "./components/KubeStatefulSetsTable";
import KubeTable from "./components/KubeTable";
require('dotenv').config()
const pako = require('pako');

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 10, // An estimated height
});

const getTabPageNumber = (tabName) => {

  if (tabName === "" || !tabName) {
    return 0
  }

  if (tabName === "OVERVIEW") { return 0 }
  else if (tabName === "METRICS") { return 5 }
  else if (tabName === "CLUSTERS") { return 1 }
  else if (tabName === "WORKLOADS") { return 2 }
  else if (tabName === "HELM CHARTS") { return 4 }
  else if (tabName === "PIPELINES") { return 3 }
}

const getTabPageValue = (tabNumber) => {

  if (tabNumber === "" || !tabNumber) {
    return "OVERVIEW"
  }

  if (tabNumber === 0) return "OVERVIEW"
  else if (tabNumber === 5) return "METRICS"
  else if (tabNumber === 1) return "CLUSTERS"
  else if (tabNumber === 3) return "PIPELINES"
  else if (tabNumber === 2) return "WORKLOADS"
  else if (tabNumber === 4) return "HELM CHARTS"
}

function Kube() {
  const { gradients, info, white, chip, text, dark } = colors;
  const history = useHistory();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [kubeServicesData, setKubeServicesData] = useState(null);

  const [serviceDataIsRefreshing, setServiceDataIsRefreshing] = useState(false);

  const [modalData, setModalData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [logsModalOpen, setLogsModalOpen] = useState(false);
  const [logsData, setLogsData] = useState({});
  const [logsLoading, setLogsLoading] = useState(false)

  const [pipelineLogsLoading, setPipelineLogsLoading] = useState(false)
  const [pipelineLogsData, setPipelineLogsData] = useState({})
  const [pipelineLogsModalOpen, setPipelineLogsModalOpen] = useState(false)

  const [AISectionOpen, setAISectionOpen] = useState(false)
  const [karpenterLoading, setkarpenterLoading] = useState(false)
  const listRef = useRef(null);

  const [tableActionmodalData, setTableActionModalData] = useState({});
  const [tableActionmodalOpen, setTableActionModalOpen] = useState(false);

  const [kubeModalData, setkubeModalData] = useState({});
  const [kubemodalOpen, setkubemodalOpen] = useState(false);

  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [alertModalData, setAlertModalData] = useState({});

  const [kubePipelines, setKubePipelines] = useState([])
  const [podMetrics, setPodMetrics] = useState([])
  const [tabValue, setTabValue] = useState(0);
  // const [pageTabValue, setPageTabValue] = useState(0);

  const [pageTabValue, setPageTabValue] = useState(getTabPageNumber(params.get('tab')));
  const [toggleLocalK8s, setToggleLocalK8s] = useState(params?.get('mode') === "local" || localStorage.getItem('toggleLocalK8s') === "true");

  const [currentKubeContext, setCurrentKubeContext] = useState(localStorage.getItem('currentKubeContext') || null);
  const [allKubeContexts, setAllKubeContexts] = useState([])

  const [secondaryPageTabValue, setSecondaryPageTabValue] = useState(0);
  const [workloadFilterData, setWorkloadFilterData] = useState(() => {
    const savedFilter = localStorage.getItem('workloadFilterData');
    return savedFilter ? JSON.parse(savedFilter) : {
      cluster: null,
      namespace: ["all"],
      label: "all",
      status: "all"
    };
  });
  const [allClusterNames, setAllClusterNames] = useState([]);
  const [allNamespaces, setAllNamespaces] = useState(["all"]);
  const [allLabels, setAllLabels] = useState(["all"]);
  const [allStatuses, setAllStatuses] = useState(["all"]);
  const [statusText, setStatusText] = useState("Status")

  const [logsSearchTerm, setLogsSearchTerm] = useState('');

  const allSecondaryTabs = [
    "Pods", "Nodes", "Deployments", "Replica Set", "Stateful Sets", "Daemon Sets", "Jobs", "Cron Jobs", "PVC"]

  const [kubemodaltabValue, setkubemodaltabValue] = useState(0);

  const [tabValueSG, setTabValueSG] = useState(0);

  const [modalActionRunning, setModalActionRunning] = useState(false);
  const [envPairs, setEnvPairs] = useState([]);
  const [originaENVPairs, setOriginaENVPairs] = useState([]);

  const [modalRunText, setModalRunText] = useState();
  const [tableActionmodalRunText, setTableActionsetModalRunText] = useState();

  const [tempModalSelectionData, setTempModalSelectionData] = useState({ runEnabled: false });
  const [tempConfirmationModalSelectionData, setTempConfirmationModalSelectionData] = useState({});
  const [addOnSelectionData, setAddOnSelectionData] = useState({});

  const [iamsMappingData, setIamsMappingData] = useState(null);
  const [saveMappingsData, setsaveMappingsData] = useState({});

  const [iamsOGMappingData, setIamsOGMappingData] = useState(null);
  const iamMappingGroups = ["system:masters", "edit-only", "view-only", "system:bootstrappers", "system:nodes"]

  const [initModalSelectionData, setInitModalSelectionData] = useState({});
  const { getUserRoleLevel, currentUserObj, sharedState } = useUserDataStore()
  const [tagPairs, setTagPairs] = useState([]);

  const [selectedNodeName, setSelectedNodeName] = useState()

  let modalValidatorKeys = []

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  const handleSetToggleLocalK8s = () => {
    const currentValue = toggleLocalK8s || false
    setToggleLocalK8s(!currentValue)

    if (!currentValue === true) {
      params.set('mode', "local");
      history.push({ search: params.toString() });
      localStorage.setItem('toggleLocalK8s', true);
    } else {
      params.delete('mode');
      history.push({ search: params.toString() });
      localStorage.setItem('toggleLocalK8s', false);
    }
  }

  const handlePageSetTabValue = (event, newValue) => {
    setPageTabValue(newValue)
    params.set('tab', getTabPageValue(newValue));
    history.push({ search: params.toString() });
  };

  const handleSecondaryPageSetTabValue = (event, newValue) => setSecondaryPageTabValue(newValue);

  const handleSetKubeModalTabValue = (event, newValue) => setkubemodaltabValue(newValue);

  const handleSetTabValueSG = (event, newValue) => setTabValueSG(newValue);

  const handleModalSelectionDataChange = (key, value) => {
    if (key === "minInstances" || key === "maxInstances") { value = Number(value) }


    if (key === "subnets" || key === "instanceTypes") {
      if (!tempModalSelectionData[key]) {
        tempModalSelectionData[key] = []
      }
      if (tempModalSelectionData[key].includes(value)) {

        var index = tempModalSelectionData[key].indexOf(value);

        if (index !== -1) {
          tempModalSelectionData[key].splice(index, 1);
        }
      } else {
        tempModalSelectionData[key].push(value)
      }
    } else {
      tempModalSelectionData[key] = value
    }

    if (tempModalSelectionData["maxInstances"] < tempModalSelectionData["minInstances"]) {
      tempModalSelectionData["maxInstances"] = value
    }
    let flag = true;

    const a1 = JSON.parse(JSON.stringify(initModalSelectionData))
    const a2 = JSON.parse(JSON.stringify(tempModalSelectionData))

    delete a1.runEnabled
    delete a2.runEnabled

    flag = JSON.stringify(a1) === JSON.stringify(a2)
    tempModalSelectionData["runEnabled"] = !flag
    setTempModalSelectionData({ ...tempModalSelectionData })
  }

  const handleLogsSearchChange = useCallback((event) => {
    setLogsSearchTerm(event.target.value);
  }, []);

  const filteredLogs = useMemo(() => {
    if (!logsSearchTerm) return logsData?.resp;
    return logsData?.resp?.filter(log => log.toLowerCase().includes(logsSearchTerm.toLowerCase()));
  }, [logsData?.resp, logsSearchTerm]);


  const parseAnsiColors = (text) => {
    const colorMap = {
      30: 'black', 31: '#ff6969', 32: 'green', 33: 'yellow',
      34: '#0a66c2', 35: '#818aff', 36: 'cyan', 37: 'white',
      90: 'gray', 91: 'lightred', 92: 'lightgreen', 93: 'lightyellow',
      94: 'lightblue', 95: 'lightmagenta', 96: 'lightcyan', 97: 'white'
    };

    const bgColorMap = {
      40: 'black', 41: 'red', 42: 'green', 43: 'yellow',
      44: 'blue', 45: 'magenta', 46: 'cyan', 47: 'white',
      100: 'gray', 101: 'lightred', 102: 'lightgreen', 103: 'lightyellow',
      104: 'lightblue', 105: 'lightmagenta', 106: 'lightcyan', 107: 'white'
    };

    const styleMap = {
      1: 'font-weight: bold',
      3: 'font-style: italic',
      4: 'text-decoration: underline'
    };

    const parts = text.split(/(\u001b\[[0-9;]*m)/);
    let currentStyle = {}

    return parts.map((part, index) => {
      if (part.startsWith('\u001b[')) {
        const codes = part.slice(2, -1).split(';');
        codes.forEach(code => {
          const numCode = parseInt(code, 10);
          if (code === '0') {
            currentStyle = {};
          } else if (colorMap[numCode]) {
            currentStyle.color = colorMap[numCode];
          } else if (bgColorMap[numCode]) {
            currentStyle.backgroundColor = bgColorMap[numCode];
          } else if (styleMap[numCode]) {
            Object.assign(currentStyle, styleMap[numCode].split(': ').reduce((obj, str, i) => (i === 0 ? Object.assign(obj, { [str]: '' }) : Object.assign(obj, { [Object.keys(obj).pop()]: str })), {}));
          } else if (numCode >= 38 && numCode <= 47 && codes[index + 1] === '5') {
            // 8-bit colors (38;5;n for foreground, 48;5;n for background)
            const colorCode = parseInt(codes[index + 2], 10);
            currentStyle[numCode === 38 ? 'color' : 'backgroundColor'] = `rgb(${colorCode}, ${colorCode}, ${colorCode})`;
          }
        });
        return null;
      }
      return <span key={index} style={currentStyle}>{part}</span>;
    }).filter(Boolean);
  };

  const highlightSearchTerm = (text, searchTerm) => {
    if (!searchTerm) return parseAnsiColors(text);

    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ?
        <span key={index} style={{ paddingLeft: "4px", paddingRight: "4px", background: "#5F37FF", border: "1px solid #26282d", borderRadius: "5px" }}>{part}</span> :
        parseAnsiColors(part)
    );
  };

  const handleFilterChange = async (key, value) => {

    if (key === "namespace") {
      if (!workloadFilterData[key]) {
        workloadFilterData[key] = []
      }
      if (workloadFilterData[key].includes(value)) {

        var index = workloadFilterData[key].indexOf(value);

        if (index !== -1) {
          workloadFilterData[key].splice(index, 1);
        }
      } else {
        workloadFilterData[key].push(value)
      }

      if (value === "all") {
        workloadFilterData[key] = ["all"]
      }

      if (workloadFilterData[key].includes("all") && value !== "all") {
        var index = workloadFilterData[key].indexOf("all");

        if (index !== -1) {
          workloadFilterData[key].splice(index, 1);
        }
      }
      setWorkloadFilterData({ ...workloadFilterData })
      localStorage.setItem('workloadFilterData', JSON.stringify(workloadFilterData));
      return
    }

    if (key === "cluster") {
      const namespaces = []
      let labels = ["all"]
      kubeServicesData?.find(cl => cl?.clusterDetail?.name === value)?.pods?.items?.forEach(pod => {
        namespaces.push(pod?.metadata?.namespace)
        const allLabels = filterLabels(pod?.metadata?.labels)
        labels = labels.concat(allLabels)
      })

      kubeServicesData?.find(cl => cl?.clusterDetail?.name === value)?.nodeGroupsDetails?.forEach(ng => {
        const allLabels = filterLabels(ng?.labels)
        labels = labels.concat(allLabels)
      })

      setAllLabels([...new Set(labels)].sort((a, b) => a.localeCompare(b)))
      const updatedNamespaces = [...new Set(namespaces)].sort((a, b) => a.localeCompare(b))
      updatedNamespaces.unshift("all")
      setAllNamespaces(updatedNamespaces)
    }

    if (key === "searchText" && !value) {
      value = "n/a"
    }

    workloadFilterData[key] = value
    setWorkloadFilterData({ ...workloadFilterData })
    if (key !== "searchText") {
      localStorage.setItem('workloadFilterData', JSON.stringify(workloadFilterData));
    }
  }

  const handleModalClose = () => {
    setModalOpen(false)
    setTableActionModalOpen(false)
    setkubemodalOpen(false)
    modalValidatorKeys = []
    setTempModalSelectionData({ runEnabled: false })
    setTempConfirmationModalSelectionData({})
    setTabValue(0)
    setkubemodaltabValue(0)
    setInitModalSelectionData({})
    setModalActionRunning(false)
    setModalRunText(getModalText())
    setTableActionsetModalRunText(getTableActionModalText())
    setEnvPairs([])
    setOriginaENVPairs([])
    setAddOnSelectionData({})
    setIamsMappingData(null)
    setIamsOGMappingData(null)
  }

  const handleAlertModalClose = () => {
    setAlertModalOpen(false)
    setAlertModalData({})
    setTempConfirmationModalSelectionData({})
  }

  const deleteKubeResource = async (type, name, metadata) => {
    setAlertModalOpen(true)
    if (type === "nodegroup") {
      setAlertModalData({
        action: "eks-nodegroup-delete",
        title: `Delete nodegroup ${modalData.nodeGroup.nodegroupName}?`,
        subtitle: "This action is irreversible",
      })
    } else if (type === "cluster") {
      setAlertModalData({
        action: "eks-cluster-delete",
        title: `Delete cluster ${kubeModalData?.name}?`,
        subtitle: "This action is irreversible",
      })
    } else if (type === "pod") {
      setAlertModalData({
        action: "eks-pod-delete",
        title: `Delete pod ${name}?`,
        subtitle: "This action is irreversible but will create a new pod in place as per your replicaset config",
        metadata
      })
    }

  }

  const handleAddTagPair = () => {
    setTagPairs([...tagPairs, { Key: '', Value: '' }]);
  };

  const handleTagChange = (index, type, value) => {
    const newPairs = [...tagPairs];
    newPairs[index][type] = value;
    setTagPairs(newPairs);
  };

  const handleRemoveTagPair = (index) => {
    let newPairs = [...tagPairs];
    newPairs.splice(index, 1)
    setTagPairs(newPairs);
  };

  const updateService = async (type, metadata = {}) => {
    //
    if (modalRunText === "Update" && type === "nodegroup") {
      setAlertModalOpen(true)
      setAlertModalData({
        action: "eks-nodegroup-update",
        title: `Update nodegroup ${modalData.nodeGroup.nodegroupName}`,
        type
      })
    } else if (modalRunText === "Send for Approval" && type === "nodegroup") {
      setAlertModalOpen(true)
      setAlertModalData({
        action: "update-nodegroup-approval",
        title: `Update nodegroup ${modalData.nodeGroup.nodegroupName}`,
        subtitle: "The request for approval will be sent and upon approval the nodegroup will be updated",
        elements: [
          {
            key: "dropdown",
            value: {
              name: "Select Approver",
              key: "approveRequestTo",
              options: sharedState?.usersData?.filter((user) => (sharedState?.org?.roles?.find(role => role.id === user.role)?.level > getUserRoleLevel(sharedState, currentUserObj?.email ?? ""))).map(user => { return { id: user.email, n: user.name, a: user.avatar } })
            }
          }
        ]
      })
    } else if (modalRunText === "Update" && type === "cluster") {
      setAlertModalOpen(true)
      setAlertModalData({
        action: "eks-cluster-update",
        title: `Update cluster ${kubeModalData.name}`,
        type
      })
    } else if (modalRunText === "Send for Approval" && type === "cluster") {
      setAlertModalOpen(true)
      setAlertModalData({
        action: "update-cluster-approval",
        title: `Update cluster ${kubeModalData.name}`,
        subtitle: "The request for approval will be sent and upon approval the cluster will be updated",
        elements: [
          {
            key: "dropdown",
            value: {
              name: "Select Approver",
              key: "approveRequestTo",
              options: sharedState?.usersData?.filter((user) => (sharedState?.org?.roles?.find(role => role.id === user.role)?.level > getUserRoleLevel(sharedState, currentUserObj?.email ?? ""))).map(user => { return { id: user.email, n: user.name, a: user.avatar } })
            }
          }
        ]
      })
    } if (modalRunText === "Update" && type === "nodepool") {
      setAlertModalOpen(true)
      setAlertModalData({
        action: "eks-cluster-nodepool-update",
        title: `Update NodePool ${metadata?.nodepool?.metadata?.name}`,
        type,
        metadata
      })
    }
    else {
      handleModalClose()
    }
  }

  const triggerServiceDetailModal = (clusterName, nodegroupName, meta) => {
    if (meta?.type === "nodepool") {
      triggerKubeDetailModal(nodegroupName, "nodepool", meta?.meta)
    } else {
      const clusterObj = kubeServicesData.find(cluster => cluster.clusterDetail.name === clusterName)
      if (clusterObj && clusterObj.nodeGroupsDetails?.length > 0) {
        const data = {
          clusterDetails: clusterObj.clusterDetail,
          nodeGroup: clusterObj.nodeGroupsDetails?.find(nodeGroup => nodeGroup.nodegroupName === nodegroupName),
          clusterObj
        }

        const nodes = clusterObj?.nodes?.items?.filter(node =>
          node.metadata.labels?.['alpha.eksctl.io/nodegroup-name'] === nodegroupName ||
          node.metadata.labels?.['eks.amazonaws.com/nodegroup'] === nodegroupName
        );

        if (nodes && nodes.length >= 1) {
          setSelectedNodeName(nodes[0]?.metadata?.name)
        }

        setModalData(data)
        setModalOpen(true)
      }
    }
  }

  const getKubeModalData = (name, type, metadata) => {
    let dynamicModalData = { name, type, metadata }

    if (type === "service") {

      const service = metadata.service
      const deployment = metadata.deployment
      const replicaSet = metadata.replicaSet

      const microViews = []
      microViews.push({ k: "Service name", v: name })
      microViews.push({ k: "Cluster IP", v: service?.spec?.clusterIP })
      microViews.push({ k: "type", v: service?.spec?.type })
      microViews.push({ k: "Replicas", v: deployment?.spec?.replicas })
      microViews.push({ k: "Ports", v: service?.spec?.ports[0].targetPort + "/" + service?.spec?.ports[0].protocol })

      const microViews2 = []
      microViews2.push({ k: "Selector", v: Object.entries(deployment?.spec?.selector.matchLabels).map(([key, value]) => `${key}=${value}`) })
      microViews2.push({ k: "Deployment Strategy", v: deployment?.spec?.strategy.type })
      microViews2.push({ k: "Image", v: deployment?.spec?.template.spec?.containers[0]?.image, url: convertECRImageURIToConsoleURL(deployment?.spec?.template.spec?.containers[0]?.image) })

      const microViews3 = []
      microViews3.push({ k: "Desired Replicas", v: replicaSet?.metadata?.annotations?.["deployment.kubernetes.io/desired-replicas"] })
      microViews3.push({ k: "Max Replicas", v: replicaSet?.metadata?.annotations?.["deployment.kubernetes.io/max-replicas"] })

      dynamicModalData.view =
        (<>
          <GuiBox display="flex" flexDirection="column"
            sx={{ pb: `${pxToRem(80)}`, pt: `${pxToRem(20)}`, pl: `${pxToRem(20)}`, pr: `${pxToRem(20)}`, height: "100%" }}
          >
            <GuiBox display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: `${pxToRem(10)}` }}>

              <GuiBox display="flex" alignItems="center" sx={{ gap: "12px" }}>
                <GuiButton
                  sx={{ p: "0", borderRadius: "0.75rem", border: "none", background: "#20212E" }}
                  onClick={handleModalClose}
                  color="dark"
                  iconOnly={true}
                  rel="noreferrer"
                >
                  {
                    <IoClose size="20px" color="white" />
                  }
                </GuiButton>
                <GuiTypography variant="subtitle1" color="white" fontWeight="bold">
                  {name}
                </GuiTypography>
                <GuiButton
                  sx={{ ml: "12px", p: "0", borderRadius: "0.75rem", border: "1px solid #26282d", background: "#20212E" }}
                  onClick={fetchCurrentServices}
                  color="dark"
                  iconOnly={true}
                  rel="noreferrer"
                >
                  {
                    serviceDataIsRefreshing ? <CircularProgress size="1rem" thickness={2} sx={{ color: white.main }} /> : <IoRefreshOutline size="18px" color="white" />
                  }
                </GuiButton>
              </GuiBox>

              {/* {
                getUserRoleLevel(sharedState, currentUserObj?.email ?? "") === 9999 ?
                  <GuiButton
                    // onClick={() => deleteKubeResource(name, type, metadata)}
                    color="error"
                    sx={{ textAlign: "start", display: "flex" }}
                    rel="noreferrer"
                  >
                    <Delete size="25px" color="white" sx={{ mr: "8px" }} />
                    <GuiTypography variant="h7" fontWeight="bold" color="white" pl="0px" >
                      {`Delete ${type}`}
                    </GuiTypography>
                  </GuiButton>
                  : null
              } */}
            </GuiBox>
            <Divider light sx={{ mb: `${pxToRem(10)}` }} />
            <Tabs
              orientation="horizontal"
              value={kubemodaltabValue}
              onChange={handleSetKubeModalTabValue}
              sx={{ background: "transparent", display: "flex", justifyContent: "flex-start", mb: `${pxToRem(10)}` }}
            >
              <Tab label="OVERVIEW" />
            </Tabs>
            {
              kubemodaltabValue === 0 ?
                <GuiBox sx={{ overflowY: "auto", p: `${pxToRem(10)}`, pb: `${pxToRem(20)}` }}>
                  <GuiTypography variant="subtitle2" color="info" fontWeight="bold" sx={{ mb: `${pxToRem(10)}` }}>
                    Service Details
                  </GuiTypography>
                  <GuiBox display="flex" flexDirection="row" sx={{ mb: `${pxToRem(26)}` }}>
                    {
                      microViews.map(mv1 => {
                        return getMicroView(mv1)
                      })
                    }
                  </GuiBox>
                  <GuiBox display="flex" flexDirection="row" sx={{ mb: `${pxToRem(26)}` }}>
                    {
                      microViews2.map(mv1 => {
                        return getMicroView(mv1)
                      })
                    }
                  </GuiBox>
                  <GuiBox sx={{
                    mt: `${pxToRem(20)} !important`,
                    backgroundColor: white.main,
                    backgroundImage: white.main,
                    height: pxToRem(1),
                    margin: `${pxToRem(16)} 0`,
                    borderBottom: "none",
                    opacity: 0.10,
                  }}>

                  </GuiBox>
                  <GuiTypography variant="subtitle2" color="info" fontWeight="bold" sx={{ mb: `${pxToRem(10)}`, mt: `${pxToRem(20)}` }}>
                    Replica Set
                  </GuiTypography>
                  {
                    <GuiBox display="flex" flexDirection="row">
                      {
                        microViews3.map(mv => {
                          return getMicroView(mv)
                        })
                      }
                    </GuiBox>
                  }
                </GuiBox>
                : null
            }

          </GuiBox>
          <GuiBox display="flex" alignItems="center" justifyContent="space-between" sx={{ borderRadius: "0.75rem", minWidth: `calc(100%)`, overflowY: "auto", position: "absolute", bottom: "0", p: `${pxToRem(10)}`, backgroundColor: "#05050a" }}>
            <GuiTypography variant="h5" fontWeight="regular" color="white" sx={{ pl: `${pxToRem(12)}` }}>
              {/* <span>Estimated Cost: </span><span><b>{`~$${9.01 * 4 * (tempModalSelectionData["cpu"] ?? 0) * (tempModalSelectionData["minInstances"] ?? 0)}/month`}</b></span> */}
            </GuiTypography>
            <GuiBox display="flex" alignItems="center" justifyContent="right" mr={pxToRem(16)}>
              {/* {
                modalRunText !== "Completed" ?
                  <GuiButton
                    onClick={handleModalClose}
                    color="white"
                    sx={{ textAlign: "start", display: "flex" }}
                    rel="noreferrer"
                  >
                    <GuiTypography variant="h6" fontWeight="regular" color="dark" pl="0px">
                      Cancel
                    </GuiTypography>
                  </GuiButton>
                  : null
              } */}
            </GuiBox>
          </GuiBox>
        </>)

    } else if (type === "pod") {

      const pod = metadata?.pod
      const podStatus = parsePodStatus(pod)

      const microViews = []
      microViews.push({ k: "Pod name", v: pod?.metadata?.name })
      microViews.push({ k: "Namespace", v: pod?.metadata?.namespace ?? "default" })

      // if (pod?.spec?.containers[0]?.resources?.limits) {
      //   microViews.push({ k: "resources limits", v: Object.entries(pod?.spec?.containers[0]?.resources?.limits).map(([key, value]) => `${key}: ${value}`)?.join("\r/\r") })
      // }

      // if (pod?.spec?.containers[0]?.resources?.requests) {
      //   microViews.push({ k: "resources requests", v: Object.entries(pod?.spec?.containers[0]?.resources?.requests).map(([key, value]) => `${key}: ${value}`)?.join("\r/\r") })
      // }
      microViews.push({ k: "status", v: podStatus.status })
      microViews.push({ k: "age", v: podStatus.age })

      const microViewsMeta = []
      microViewsMeta.push({ k: "labels", v: Object.entries(pod?.metadata?.labels).map(([key, value], index) => ({ name: key, value })) })

      const microViewsMeta2 = []
      if (pod?.metadata?.annotations)
        microViewsMeta2.push({ k: "annotations", v: Object.entries(pod?.metadata?.annotations).map(([key, value], index) => ({ name: key, value })) })

      const containerData = []

      if (pod?.spec?.containers && pod?.spec?.containers?.length > 0) {
        pod?.spec?.containers?.forEach(container => {
          const data = {}
          const microView = []
          microView.push({ k: "Container name", v: container?.name })
          microView.push({ k: "Image", v: container?.image })
          microView.push({ k: "Image Pull Policy", v: container?.imagePullPolicy })

          if (container?.restartPolicy) {
            microView.push({ k: "Restart Policy", v: container?.restartPolicy })
          }

          data.view = microView

          const microView2 = []
          if (container?.resources?.limits?.cpu) {
            microView2.push({ k: "CPU", v: container?.resources?.limits?.cpu })
            microView2.push({ k: "Memory", v: container?.resources?.limits?.memory })
            data.view2 = microView2
          }

          const microView3 = []
          if (container?.resources?.requests?.cpu) {
            microView3.push({ k: "CPU", v: container?.resources?.requests?.cpu })
            microView3.push({ k: "Memory", v: container?.resources?.requests?.memory })
            data.view3 = microView3
          }

          containerData.push(data)

        })

      }

      dynamicModalData.view =
        (<>
          <GuiBox display="flex" flexDirection="column"
            sx={{ pb: `${pxToRem(80)}`, pt: `${pxToRem(20)}`, pl: `${pxToRem(20)}`, pr: `${pxToRem(20)}`, height: "100%" }}
          >
            <GuiBox display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: `${pxToRem(10)}` }}>

              <GuiBox display="flex" alignItems="center" sx={{ gap: "12px" }}>
                <GuiButton
                  sx={{ p: "0", borderRadius: "0.75rem", border: "none", background: "#20212E" }}
                  onClick={handleModalClose}
                  color="dark"
                  iconOnly={true}
                  rel="noreferrer"
                >
                  {
                    <IoClose size="20px" color="white" />
                  }
                </GuiButton>
                <GuiTypography variant="subtitle1" color="white" fontWeight="bold">
                  {name}
                </GuiTypography>
                <GuiButton
                  sx={{ ml: "12px", p: "0", borderRadius: "0.75rem", border: "1px solid #26282d", background: "#20212E" }}
                  onClick={fetchCurrentServices}
                  color="dark"
                  iconOnly={true}
                  rel="noreferrer"
                >
                  {
                    serviceDataIsRefreshing ? <CircularProgress size="1rem" thickness={2} sx={{ color: white.main }} /> : <IoRefreshOutline size="18px" color="white" />
                  }
                </GuiButton>
              </GuiBox>

              {
                getUserRoleLevel(sharedState, currentUserObj?.email ?? "") === 9999 ?
                  <GuiButton
                    onClick={() => deleteKubeResource("pod", name, metadata)}
                    color="error"
                    sx={{ textAlign: "start", display: "flex" }}
                    rel="noreferrer"
                  >
                    <Delete size="25px" color="white" sx={{ mr: "8px" }} />
                    <GuiTypography variant="h7" fontWeight="bold" color="white" pl="0px" >
                      {`Delete/Restart ${type}`}
                    </GuiTypography>
                  </GuiButton>
                  : null
              }
            </GuiBox>
            <Divider light sx={{ mb: `${pxToRem(10)}` }} />
            <Tabs
              orientation="horizontal"
              value={kubemodaltabValue}
              onChange={handleSetKubeModalTabValue}
              sx={{ background: "transparent", display: "flex", justifyContent: "flex-start", mb: `${pxToRem(10)}` }}
            >
              <Tab label="OVERVIEW" />
              <Tab label="EVENTS" />
              <Tab label="CONDITIONS" />
              <Tab label="CONTAINER" />
            </Tabs>
            {
              kubemodaltabValue === 0 ?
                <GuiBox sx={{ overflowY: "auto", p: `${pxToRem(10)}`, pb: `${pxToRem(20)}` }}>
                  <GuiTypography variant="subtitle2" color="info" fontWeight="bold" sx={{ mb: `${pxToRem(10)}` }}>
                    Pod Details
                  </GuiTypography>
                  <GuiBox display="flex" flexDirection="row" sx={{ mb: `${pxToRem(26)}` }}>
                    {
                      microViews.map(mv1 => {
                        return getMicroView(mv1)
                      })
                    }
                  </GuiBox>
                  <GuiBox display="flex" flexDirection="row" sx={{ mb: `${pxToRem(26)}` }}>
                    {
                      microViewsMeta.map(mv1 => {
                        return getMicroTagsView(mv1)
                      })
                    }
                  </GuiBox>
                  <GuiBox display="flex" flexDirection="row" sx={{ mb: `${pxToRem(26)}` }}>
                    {
                      microViewsMeta2.map(mv1 => {
                        return getMicroTagsView(mv1)
                      })
                    }
                  </GuiBox>
                </GuiBox>
                : (kubemodaltabValue === 3 ?
                  <GuiBox sx={{ overflowY: "auto", p: `${pxToRem(10)}`, pb: `${pxToRem(20)}` }}>
                    <GuiTypography variant="subtitle2" color="info" fontWeight="bold" sx={{ mb: `${pxToRem(10)}` }}>
                      Container Details
                    </GuiTypography>
                    {
                      containerData?.map(cont => {
                        return (
                          <>
                            <GuiBox display="flex" flexDirection="row" sx={{ mb: `${pxToRem(26)}` }}>
                              {
                                cont?.view.map(mv1 => {
                                  return getMicroView(mv1)
                                })
                              }
                            </GuiBox>
                            {
                              cont?.view2 ?
                                <>
                                  <GuiTypography variant="subtitle2" color="info" fontWeight="bold" sx={{ mb: `${pxToRem(10)}` }}>
                                    Resource Limits
                                  </GuiTypography>
                                  <GuiBox display="flex" flexDirection="row" sx={{ mb: `${pxToRem(26)}` }}>
                                    {
                                      cont?.view2.map(mv1 => {
                                        return getMicroView(mv1)
                                      })
                                    }
                                  </GuiBox>
                                </>
                                : null
                            }
                            {
                              cont?.view3 ?
                                <>
                                  <GuiTypography variant="subtitle2" color="info" fontWeight="bold" sx={{ mb: `${pxToRem(10)}` }}>
                                    Resource Requests
                                  </GuiTypography>
                                  <GuiBox display="flex" flexDirection="row" sx={{ mb: `${pxToRem(26)}` }}>
                                    {
                                      cont?.view3.map(mv1 => {
                                        return getMicroView(mv1)
                                      })
                                    }
                                  </GuiBox>
                                </>
                                : null
                            }
                          </>
                        )
                      })
                    }
                  </GuiBox>
                  : (kubemodaltabValue === 2 ?
                    <GuiBox sx={{ overflowY: "auto", p: `${pxToRem(10)}`, pb: `${pxToRem(20)}` }}>
                      <GuiTypography variant="subtitle2" color="info" fontWeight="bold" sx={{ mb: `${pxToRem(10)}` }}>
                        Conditions
                      </GuiTypography>
                      <GuiBox display="flex" alignItems="center" mb="20px">
                        {
                          pod?.status?.conditions ?
                            <>
                              <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
                                <Grid item xs={12} md={12} lg={12} mb={pxToRem(18)}>
                                  <KubePodConditionsTable
                                    title="All Conditions"
                                    data={pod?.status?.conditions?.sort((a, b) => new Date(b.lastTransitionTime) - new Date(a.lastTransitionTime))}
                                  />
                                </Grid>
                              </Grid>
                            </>
                            : null
                        }
                      </GuiBox>

                    </GuiBox>
                    : kubemodaltabValue === 1
                      ?
                      <>
                        <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
                          <Grid item xs={12} md={12} lg={12} mb={pxToRem(18)}>
                            <KubeEventsTable title="Pod Events" data={kubeServicesData?.map(em => em.events?.items).flat().filter(em => em?.involvedObject?.kind === "Pod" && em?.involvedObject?.name === pod?.metadata?.name).sort((a, b) => new Date(b.lastTimestamp) - new Date(a.lastTimestamp))?.filter(e => e !== undefined)} />
                          </Grid>
                        </Grid>
                      </>
                      : null
                  )
                )
            }

          </GuiBox>
          <GuiBox display="flex" alignItems="center" justifyContent="end" sx={{ borderRadius: "0.75rem", minWidth: `calc(100%)`, overflowY: "auto", position: "absolute", bottom: "0", p: `${pxToRem(10)}`, backgroundColor: "#05050a" }}>
            {/* <GuiBox display="flex" alignItems="center" justifyContent="right" mr={pxToRem(16)}>
              {
                modalRunText !== "Completed" ?
                  <GuiButton
                    onClick={handleModalClose}
                    color="white"
                    sx={{ textAlign: "start", display: "flex" }}
                    rel="noreferrer"
                  >
                    <GuiTypography variant="h6" fontWeight="regular" color="dark" pl="0px">
                      Cancel
                    </GuiTypography>
                  </GuiButton>
                  : null
              }
            </GuiBox> */}
          </GuiBox>
        </>)

    } else if (type === "cluster") {
      dynamicModalData.name = name
      dynamicModalData.region = metadata.region
      dynamicModalData.view =
        (<>
          <GuiBox display="flex" flexDirection="column"
            sx={{ pb: `${pxToRem(80)}`, pt: `${pxToRem(20)}`, pl: `${pxToRem(20)}`, pr: `${pxToRem(20)}`, height: "100%" }}
          >
            <GuiBox display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: `${pxToRem(10)}` }}>

              <GuiBox display="flex" alignItems="center" sx={{ gap: "12px" }}>
                <GuiButton
                  sx={{ p: "0", borderRadius: "0.75rem", border: "none", background: "#20212E" }}
                  onClick={handleModalClose}
                  color="dark"
                  iconOnly={true}
                  rel="noreferrer"
                >
                  {
                    <IoClose size="20px" color="white" />
                  }
                </GuiButton>
                <GuiTypography variant="subtitle1" color="white" fontWeight="bold">
                  {name}
                </GuiTypography>
                <GuiButton
                  sx={{ ml: "12px", p: "0", borderRadius: "0.75rem", border: "1px solid #26282d", background: "#20212E" }}
                  onClick={fetchCurrentServices}
                  color="dark"
                  iconOnly={true}
                  rel="noreferrer"
                >
                  {
                    serviceDataIsRefreshing ? <CircularProgress size="1rem" thickness={2} sx={{ color: white.main }} /> : <IoRefreshOutline size="18px" color="white" />
                  }
                </GuiButton>
              </GuiBox>

              {
                getUserRoleLevel(sharedState, currentUserObj?.email ?? "") === 9999 ?
                  <GuiButton
                    onClick={() => deleteKubeResource("cluster")}
                    color="error"
                    sx={{ textAlign: "start", display: "flex" }}
                    rel="noreferrer"
                  >
                    <Delete size="25px" color="white" sx={{ mr: "8px" }} />
                    <GuiTypography variant="h7" fontWeight="bold" color="white" pl="0px" >
                      {`Delete ${type}`}
                    </GuiTypography>
                  </GuiButton>
                  : null
              }
            </GuiBox>
            <Divider light sx={{ mb: `${pxToRem(10)}` }} />
            <Tabs
              orientation="horizontal"
              value={kubemodaltabValue}
              onChange={handleSetKubeModalTabValue}
              sx={{ background: "transparent", display: "flex", justifyContent: "flex-start", mb: `${pxToRem(10)}` }}
            >
              <Tab label="OVERVIEW" />
              <Tab label="NETWORK" />
              <Tab label="ACCESS CONTROL" />
              <Tab label="ADD ONS" />
              <Tab label="SCALING" />
            </Tabs>
            {
              kubemodaltabValue > -1 ? <> {getClusterTabContent(kubemodaltabValue, metadata)} </> : null
            }
          </GuiBox>
          <GuiBox display="flex" alignItems="center" justifyContent="end" sx={{ borderRadius: "0.75rem", minWidth: `calc(100%)`, overflowY: "auto", position: "absolute", bottom: "0", p: `${pxToRem(10)}`, backgroundColor: "#05050a" }}>
            <GuiBox display="flex" alignItems="center" justifyContent="right" mr={pxToRem(16)}>
              {/* {
                modalRunText !== "Completed" ?
                  <GuiButton
                    onClick={handleModalClose}
                    color="white"
                    sx={{ textAlign: "start", display: "flex" }}
                    rel="noreferrer"
                  >
                    <GuiTypography variant="h6" fontWeight="regular" color="dark" pl="0px">
                      Cancel
                    </GuiTypography>
                  </GuiButton>
                  : null
              } */}
              {
                getUserRoleLevel(sharedState, currentUserObj?.email ?? "") > 0 ?
                  <GuiButton
                    onClick={() => updateService("cluster")}
                    color={(modalRunText === "Update" || modalRunText === "Send for Approval") ? "info" : (modalRunText === "Completed" ? "success" : "warning")}
                    loadingColor={"white"}
                    loading={modalActionRunning}
                    disabled={(!tempModalSelectionData["runEnabled"] && modalRunText !== "Completed")}
                    sx={{ textAlign: "start", display: "flex", ml: `${pxToRem(12)}` }}
                    rel="noreferrer"
                  >
                    <>
                      <GuiTypography variant="h6" fontWeight="bold" color={modalRunText !== "Completed" ? "white" : "white"} pl="" sx={{ mr: "8px" }}>
                        {modalRunText}
                      </GuiTypography>
                      {
                        (modalRunText === "Update" || modalRunText === "Send for Approval") ?
                          <HiArrowRight size="20px" color="white" />
                          : modalRunText === "Completed" ? <CheckCircle size="25px" color="dark" /> : <ErrorRounded size="25px" color="dark" />
                      }
                    </>
                  </GuiButton>
                  : null
              }
            </GuiBox>
          </GuiBox>
        </>)
    } else if (type === "deployment") {
      const deployment = metadata?.deployment

      const microViews = []
      microViews.push({ k: "Pod name", v: deployment?.metadata?.name })
      microViews.push({ k: "Namespace", v: deployment?.metadata?.namespace ?? "default" })


      let status = "Pending"
      if (deployment?.status?.conditions?.length > 0) {
        const latestCondition = findLatestTransition(deployment?.status?.conditions);
        status = latestCondition?.type
      }

      microViews.push({ k: "status", v: status })
      microViews.push({ k: "generation / observed", v: deployment?.metadata?.generation + " / " + deployment?.status?.observedGeneration })
      microViews.push({ k: "Created at", v: convertTimestampToReadableTimeWithTZ(deployment?.metadata?.creationTimestamp) })

      const microViews2 = []
      microViews2.push({ k: "Replicas", v: deployment?.spec?.replicas })
      if (deployment?.spec?.minReadySeconds)
        microViews2.push({ k: "min Ready Seconds", v: deployment?.spec?.minReadySeconds })
      microViews2.push({ k: "strategy", v: deployment?.spec?.strategy?.type })

      const microViewsMeta = []
      microViewsMeta.push({ k: "", v: Object.entries(deployment?.metadata?.labels).map(([key, value], index) => ({ name: key, value })) })

      const microViewsMeta2 = []
      microViewsMeta2.push({ k: "", v: Object.entries(deployment?.metadata?.annotations).map(([key, value], index) => ({ name: key, value })) })

      dynamicModalData.view =
        (<>
          <GuiBox display="flex" flexDirection="column"
            sx={{ pb: `${pxToRem(80)}`, pt: `${pxToRem(20)}`, pl: `${pxToRem(20)}`, pr: `${pxToRem(20)}`, height: "100%" }}
          >
            <GuiBox display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: `${pxToRem(10)}` }}>

              <GuiBox display="flex" alignItems="center" sx={{ gap: "12px" }}>
                <GuiButton
                  sx={{ p: "0", borderRadius: "0.75rem", border: "none", background: "#20212E" }}
                  onClick={handleModalClose}
                  color="dark"
                  iconOnly={true}
                  rel="noreferrer"
                >
                  {
                    <IoClose size="20px" color="white" />
                  }
                </GuiButton>
                <GuiTypography variant="subtitle1" color="white" fontWeight="bold">
                  {name}
                </GuiTypography>
                <GuiButton
                  sx={{ ml: "12px", p: "0", borderRadius: "0.75rem", border: "1px solid #26282d", background: "#20212E" }}
                  onClick={fetchCurrentServices}
                  color="dark"
                  iconOnly={true}
                  rel="noreferrer"
                >
                  {
                    serviceDataIsRefreshing ? <CircularProgress size="1rem" thickness={2} sx={{ color: white.main }} /> : <IoRefreshOutline size="18px" color="white" />
                  }
                </GuiButton>
              </GuiBox>
            </GuiBox>
            <Divider light sx={{ mb: `${pxToRem(10)}` }} />
            <Tabs
              orientation="horizontal"
              value={kubemodaltabValue}
              onChange={handleSetKubeModalTabValue}
              sx={{ background: "transparent", display: "flex", justifyContent: "flex-start", mb: `${pxToRem(10)}` }}
            >
              <Tab label="OVERVIEW" />
              <Tab label="CONDITIONS" />
            </Tabs>
            {
              kubemodaltabValue === 0 ?
                <GuiBox sx={{ overflowY: "auto", p: `${pxToRem(10)}`, pb: `${pxToRem(20)}` }}>
                  <GuiTypography variant="subtitle2" color="info" fontWeight="bold" sx={{ mb: `${pxToRem(10)}` }}>
                    Deployment Details
                  </GuiTypography>
                  <GuiBox display="flex" flexDirection="row" sx={{ mb: `${pxToRem(26)}` }}>
                    {
                      microViews.map(mv1 => {
                        return getMicroView(mv1)
                      })
                    }
                  </GuiBox>
                  <GuiBox sx={{
                    mt: `${pxToRem(20)} !important`,
                    backgroundColor: white.main,
                    backgroundImage: white.main,
                    height: pxToRem(1),
                    margin: `${pxToRem(16)} 0`,
                    borderBottom: "none",
                    opacity: 0.10,
                  }}>
                  </GuiBox>
                  <GuiTypography variant="subtitle2" color="info" fontWeight="bold" sx={{ mb: `${pxToRem(10)}`, mt: `${pxToRem(20)}` }}>
                    Spec Details
                  </GuiTypography>
                  <GuiBox display="flex" flexDirection="row" sx={{ mb: `${pxToRem(26)}` }}>
                    {
                      microViews2.map(mv1 => {
                        return getMicroView(mv1)
                      })
                    }
                  </GuiBox>
                  <Card sx={{ borderRadius: "0.75rem", border: "1px solid #26282d", p: "12px", overflowX: "hidden", overflowY: "auto" }}>
                    <pre style={{ fontFamily: `"Fira Code", monospace`, padding: `${pxToRem(5)}`, fontSize: "13px", color: "#fff", opacity: "0.9", fontWeight: 400, wordBreak: "break-all" }}>
                      {JSON.stringify(deployment?.spec?.strategy ?? {}, null, 4)}
                    </pre>
                  </Card>
                  <GuiBox sx={{
                    mt: `${pxToRem(20)} !important`,
                    backgroundColor: white.main,
                    backgroundImage: white.main,
                    height: pxToRem(1),
                    margin: `${pxToRem(16)} 0`,
                    borderBottom: "none",
                    opacity: 0.10,
                  }}>
                  </GuiBox>
                  <GuiTypography variant="subtitle2" color="info" fontWeight="bold" sx={{ mb: `${pxToRem(10)}`, mt: `${pxToRem(20)}` }}>
                    Labels
                  </GuiTypography>
                  {
                    <GuiBox display="flex" flexDirection="row" sx={{ mb: `${pxToRem(26)}` }}>
                      {
                        microViewsMeta.map(mv => {
                          return getMicroTagsView(mv)
                        })
                      }
                    </GuiBox>
                  }
                  <GuiBox sx={{
                    mt: `${pxToRem(20)} !important`,
                    backgroundColor: white.main,
                    backgroundImage: white.main,
                    height: pxToRem(1),
                    margin: `${pxToRem(16)} 0`,
                    borderBottom: "none",
                    opacity: 0.10,
                  }}>
                  </GuiBox>
                  <GuiTypography variant="subtitle2" color="info" fontWeight="bold" sx={{ mb: `${pxToRem(10)}`, mt: `${pxToRem(20)}` }}>
                    Annotations
                  </GuiTypography>
                  {
                    <GuiBox display="flex" flexDirection="row" sx={{ mb: `${pxToRem(26)}` }}>
                      {
                        microViewsMeta2.map(mv => {
                          return getMicroTagsView(mv)
                        })
                      }
                    </GuiBox>
                  }
                </GuiBox>
                : (kubemodaltabValue === 1 ?
                  <GuiBox sx={{ overflowY: "auto", p: `${pxToRem(10)}`, pb: `${pxToRem(20)}` }}>
                    <GuiTypography variant="subtitle2" color="info" fontWeight="bold" sx={{ mb: `${pxToRem(10)}` }}>
                      Conditions
                    </GuiTypography>

                    <GuiBox display="flex" alignItems="center" mb="20px">
                      {
                        deployment?.status?.conditions ?
                          <>
                            <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
                              <Grid item xs={12} md={12} lg={12} mb={pxToRem(18)}>
                                <KubeDeploymentsConditionsTable
                                  title="All Conditions"
                                  data={deployment?.status?.conditions?.sort((a, b) => new Date(b.lastUpdateTime) - new Date(a.lastUpdateTime))}
                                />
                              </Grid>
                            </Grid>
                          </>
                          : null
                      }
                    </GuiBox>

                  </GuiBox>
                  : null)
            }

          </GuiBox>
          <GuiBox display="flex" alignItems="center" justifyContent="end" sx={{ borderRadius: "0.75rem", minWidth: `calc(100%)`, overflowY: "auto", position: "absolute", bottom: "0", p: `${pxToRem(10)}`, backgroundColor: "#05050a" }}>
            {/* <GuiBox display="flex" alignItems="center" justifyContent="right" mr={pxToRem(16)}>
            {
              modalRunText !== "Completed" ?
                <GuiButton
                  onClick={handleModalClose}
                  color="white"
                  sx={{ textAlign: "start", display: "flex" }}
                  rel="noreferrer"
                >
                  <GuiTypography variant="h6" fontWeight="regular" color="dark" pl="0px">
                    Cancel
                  </GuiTypography>
                </GuiButton>
                : null
            }
          </GuiBox> */}
          </GuiBox>
        </>)

    } else if (type === "node") {

      const node = metadata?.node

      const details = extractKubeNodeDetails(node)

      const microViews = []
      microViews.push({ k: "status", v: details.type })
      microViews.push({ k: "Kernel version", v: details.kernelVersion })
      microViews.push({ k: "Created", v: details.createdAt })

      const microViews2 = []
      microViews2.push({ k: "Architecture/OS", v: details.architecture + " / " + details.osImage })
      microViews2.push({ k: "Kubelet version", v: details.kubeletVersion })
      microViews2.push({ k: "Instance type", v: details.instanceType })

      const microViewsMeta = []
      microViewsMeta.push({ k: "labels", v: Object.entries(node?.metadata?.labels).map(([key, value], index) => ({ name: key, value })) })

      const microViewsMeta2 = []
      microViewsMeta2.push({ k: "annotations", v: Object.entries(node?.metadata?.annotations).map(([key, value], index) => ({ name: key, value })) })

      const workloadResources = calculateRequestedResourcesForNode(metadata?.pods, node.metadata.name)

      const totalCPU = parseInt(details.cpu?.total.replace("m", ""), 10);
      let availableCPU = parseInt(details.cpu?.available.replace("m", ""), 10)
      const usedCPU = totalCPU - availableCPU;
      availableCPU = availableCPU - workloadResources?.totalRequestedCPU
      const scaleFactorCPU = totalCPU / 100;

      // total, workload, used

      const totalRAM = parseFloat(details.ram?.total.replace(" GiB", ""));
      let availableRAM = parseFloat(details.ram?.available.replace(" GiB", ""))
      const usedRAM = totalRAM - availableRAM;
      availableRAM = availableRAM - workloadResources.totalRequestedRAM / 1024
      const scaleFactorRAM = 100 / totalRAM;

      const charts = [
        <ApexCharts
          type="donut"
          series={[
            availableCPU / scaleFactorCPU,
            usedCPU / scaleFactorCPU,
            workloadResources?.totalRequestedCPU / scaleFactorCPU
          ]}
          options={{
            labels: ['Available', 'Used', "Workload Reserved"],
            colors: ['#383B4E', '#818aff', "#4285F4"],
            stroke: {
              width: 4,
              colors: ["#0f1011"]
            },
            legend: {
              position: 'bottom',
              // useSeriesColors: true
              colors: ['#383B4E', '#818aff', "#4285F4"],
              labels: {
                colors: '#fff' // Legend text color
              }
            },
            plotOptions: {
              pie: {
                donut: {
                  labels: {
                    show: true,
                    name: {
                      show: true,
                    },
                    value: {
                      formatter: function (val) {
                        // Adjust the value back based on the scaleFactor
                        return Math.round(val * scaleFactorCPU) + 'm';
                      },
                      color: '#fff'
                    },
                    total: {
                      show: true,
                      label: 'Total CPU',
                      formatter: function () {
                        // Display the original total CPU
                        return totalCPU + 'm';
                      },
                      color: '#fff'
                    }
                  }
                }
              }
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  // Tooltip display adjustment
                  return Math.round(val * scaleFactorCPU) + 'm';
                }
              }
            }
          }}
        />,

        <ApexCharts
          type="donut"
          series={[
            availableRAM * scaleFactorRAM,
            usedRAM * scaleFactorRAM,
            workloadResources.totalRequestedRAM * scaleFactorRAM / 1024,
          ]}
          options={{
            labels: ['Available', 'Used', "Workload Reserved"],
            colors: ['#383B4E', '#818aff', "#4285F4"],
            legend: {
              position: 'bottom',
              colors: ['#383B4E', '#818aff', "#4285F4"],
              // useSeriesColors: true
              labels: {
                colors: '#fff' // Legend text color
              }
            },
            stroke: {
              width: 4,
              colors: ["#0f1011"]
            },
            plotOptions: {
              pie: {
                donut: {
                  labels: {
                    show: true,
                    name: {
                      show: true,
                      color: '#fff'
                    },
                    value: {
                      formatter: function (val) {
                        return (val / scaleFactorRAM).toFixed(2) + ' GiB';
                      },
                      color: '#fff'
                    },
                    total: {
                      show: true,
                      label: 'Total RAM',
                      formatter: function () {
                        return `${totalRAM.toFixed(2)} GiB`
                      },
                      color: '#fff'
                    }
                  }
                }
              }
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return (val / scaleFactorRAM).toFixed(2) + ' GiB';
                }
              }
            }
          }}
        />
      ]

      dynamicModalData.view =
        (<>
          <GuiBox display="flex" flexDirection="column"
            sx={{ pb: `${pxToRem(80)}`, pt: `${pxToRem(20)}`, pl: `${pxToRem(20)}`, pr: `${pxToRem(20)}`, height: "100%" }}
          >
            <GuiBox display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: `${pxToRem(10)}` }}>

              <GuiBox display="flex" alignItems="center" sx={{ gap: "12px" }}>
                <GuiButton
                  sx={{ p: "0", borderRadius: "0.75rem", border: "none", background: "#20212E" }}
                  onClick={handleModalClose}
                  color="dark"
                  iconOnly={true}
                  rel="noreferrer"
                >
                  {
                    <IoClose size="20px" color="white" />
                  }
                </GuiButton>
                <GuiTypography variant="subtitle1" color="white" fontWeight="bold">
                  {name}
                </GuiTypography>
                <GuiButton
                  sx={{ ml: "12px", p: "0", borderRadius: "0.75rem", border: "1px solid #26282d", background: "#20212E" }}
                  onClick={fetchCurrentServices}
                  color="dark"
                  iconOnly={true}
                  rel="noreferrer"
                >
                  {
                    serviceDataIsRefreshing ? <CircularProgress size="1rem" thickness={2} sx={{ color: white.main }} /> : <IoRefreshOutline size="18px" color="white" />
                  }
                </GuiButton>
              </GuiBox>

              {/* {
                getUserRoleLevel(sharedState, currentUserObj?.email ?? "") === 9999 ?
                  <GuiButton
                    onClick={() => deleteKubeResource("pod", name, metadata)}
                    color="error"
                    sx={{ textAlign: "start", display: "flex" }}
                    rel="noreferrer"
                  >
                    <Delete size="25px" color="white" sx={{ mr: "8px" }} />
                    <GuiTypography variant="h7" fontWeight="bold" color="white" pl="0px" >
                      {`Delete/Restart ${type}`}
                    </GuiTypography>
                  </GuiButton>
                  : null
              } */}
            </GuiBox>
            <Divider light sx={{ mb: `${pxToRem(10)}` }} />
            <Tabs
              orientation="horizontal"
              value={kubemodaltabValue}
              onChange={handleSetKubeModalTabValue}
              sx={{ background: "transparent", display: "flex", justifyContent: "flex-start", mb: `${pxToRem(10)}` }}
            >
              <Tab label="OVERVIEW" />
              <Tab label="DETAILS" />
            </Tabs>
            {
              kubemodaltabValue === 0 ?
                <GuiBox sx={{ overflowY: "auto", p: `${pxToRem(10)}`, pb: `${pxToRem(20)}` }}>
                  <GuiTypography variant="subtitle2" color="info" fontWeight="bold" sx={{ mb: `${pxToRem(10)}` }}>
                    Node Details
                  </GuiTypography>
                  <GuiBox display="flex" flexDirection="row" sx={{ mb: `${pxToRem(26)}` }}>
                    {
                      microViews.map(mv1 => {
                        return getMicroView(mv1)
                      })
                    }
                  </GuiBox>
                  <GuiBox display="flex" flexDirection="row" sx={{ mb: `${pxToRem(26)}` }}>
                    {
                      microViews2.map(mv1 => {
                        return getMicroView(mv1)
                      })
                    }
                  </GuiBox>
                  <GuiBox sx={{
                    mt: `${pxToRem(20)} !important`,
                    backgroundColor: white.main,
                    backgroundImage: white.main,
                    height: pxToRem(1),
                    margin: `${pxToRem(16)} 0`,
                    borderBottom: "none",
                    opacity: 0.10,
                  }}>
                  </GuiBox>
                  <GuiTypography variant="subtitle2" color="info" fontWeight="bold" sx={{ mb: `${pxToRem(10)}` }}>
                    Capacity Details
                  </GuiTypography>
                  <GuiBox display="flex" flexDirection="row" pt="30px" sx={{ overflowY: "auto", gap: "12px" }}>
                    {
                      charts.map(chart => {
                        return (chart)
                      })
                    }
                  </GuiBox>
                </GuiBox>
                : (kubemodaltabValue === 1 ?
                  <GuiBox sx={{ overflowY: "auto", p: `${pxToRem(10)}`, pb: `${pxToRem(20)}` }}>
                    <GuiTypography variant="subtitle2" color="info" fontWeight="bold" sx={{ mb: `${pxToRem(10)}` }}>
                      Details
                    </GuiTypography>
                    <GuiBox display="flex" flexDirection="row" sx={{ mb: `${pxToRem(26)}` }}>
                      {
                        microViewsMeta.map(mv1 => {
                          return getMicroTagsView(mv1)
                        })
                      }
                    </GuiBox>
                    <GuiBox sx={{
                      mt: `${pxToRem(20)} !important`,
                      backgroundColor: white.main,
                      backgroundImage: white.main,
                      height: pxToRem(1),
                      margin: `${pxToRem(16)} 0`,
                      borderBottom: "none",
                      opacity: 0.10,
                    }}>
                    </GuiBox>
                    <GuiBox display="flex" flexDirection="row" sx={{ mb: `${pxToRem(26)}` }}>
                      {
                        microViewsMeta2.map(mv1 => {
                          return getMicroTagsView(mv1)
                        })
                      }
                    </GuiBox>
                  </GuiBox>
                  : null
                )
            }

          </GuiBox>
          <GuiBox display="flex" alignItems="center" justifyContent="end" sx={{ borderRadius: "0.75rem", minWidth: `calc(100%)`, overflowY: "auto", position: "absolute", bottom: "0", p: `${pxToRem(10)}`, backgroundColor: "#05050a" }}>
            {/* <GuiBox display="flex" alignItems="center" justifyContent="right" mr={pxToRem(16)}>
            {
              modalRunText !== "Completed" ?
                <GuiButton
                  onClick={handleModalClose}
                  color="white"
                  sx={{ textAlign: "start", display: "flex" }}
                  rel="noreferrer"
                >
                  <GuiTypography variant="h6" fontWeight="regular" color="dark" pl="0px">
                    Cancel
                  </GuiTypography>
                </GuiButton>
                : null
            }
          </GuiBox> */}
          </GuiBox>
        </>)

    } else if (type === "nodepool") {
      const nodepool = metadata.nodepool
      const microViews = []
      microViews.push({ k: "Node Pool Name", v: nodepool?.metadata?.name })

      console.log("TYPESS: ", nodepool?.spec?.template?.spec?.requirements?.find(req => req.key === "node.kubernetes.io/instance-type")?.values)

      const microViewsConfig = []
      microViewsConfig.push({
        k: "instanceTypes", t: "Select Instance Types", d: "Specify the instance classes that nodepool can use", c: nodepool?.spec?.template?.spec?.requirements?.find(req => req.key === "node.kubernetes.io/instance-type")?.values, type: "dropdown-multiselect",
        options: ec2InstanceTypes.map(item => ({
          n: `${item.instance} - ${item.cpu}, ${item.ram} RAM`,
          id: item.instance,
          rightChip: `\$${item.costPerMonth}/m`
        }))
      })

      microViewsConfig.push({
        k: "cpuLimit", t: "Total CPU limit", d: "Specify the max CPU that a node can use", c: nodepool?.spec?.limits?.cpu, type: "drop",
        options: Array.from({ length: 100 }, (_, i) => (i + 1) * 1000).map(item => ({
          n: item,
          id: item
        }))
      })

      microViewsConfig.push({
        k: "memoryLimit", t: "Total Memory Limit", d: "Specify the max Memory that a node can use", c: nodepool?.spec?.limits?.memory?.replace("Gi", ""), type: "drop",
        options: Array.from({ length: 100 }, (_, i) => (i + 1) * 1000).map(item => ({
          n: item + "Gi",
          id: item
        }))
      })

      microViewsConfig.forEach(obj => {
        if (!tempModalSelectionData[obj.k]) {
          tempModalSelectionData[obj.k] = obj.c
        }
      })

      dynamicModalData.name = nodepool?.metadata?.name
      dynamicModalData.view =
        (<>
          <GuiBox display="flex" flexDirection="column"
            sx={{ pb: `${pxToRem(80)}`, pt: `${pxToRem(20)}`, pl: `${pxToRem(20)}`, pr: `${pxToRem(20)}`, height: "100%" }}
          >
            <GuiBox display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: `${pxToRem(10)}` }}>

              <GuiBox display="flex" alignItems="center" sx={{ gap: "12px" }}>
                <GuiButton
                  sx={{ p: "0", borderRadius: "0.75rem", border: "none", background: "#20212E" }}
                  onClick={handleModalClose}
                  color="dark"
                  iconOnly={true}
                  rel="noreferrer"
                >
                  {
                    <IoClose size="20px" color="white" />
                  }
                </GuiButton>
                <GuiTypography variant="subtitle1" color="white" fontWeight="bold">
                  {name}
                </GuiTypography>
                <GuiButton
                  sx={{ ml: "12px", p: "0", borderRadius: "0.75rem", border: "1px solid #26282d", background: "#20212E" }}
                  onClick={fetchCurrentServices}
                  color="dark"
                  iconOnly={true}
                  rel="noreferrer"
                >
                  {
                    serviceDataIsRefreshing ? <CircularProgress size="1rem" thickness={2} sx={{ color: white.main }} /> : <IoRefreshOutline size="18px" color="white" />
                  }
                </GuiButton>
              </GuiBox>

            </GuiBox>
            <Divider light sx={{ mb: `${pxToRem(10)}` }} />
            <Tabs
              orientation="horizontal"
              value={kubemodaltabValue}
              onChange={handleSetKubeModalTabValue}
              sx={{ background: "transparent", display: "flex", justifyContent: "flex-start", mb: `${pxToRem(10)}` }}
            >
              <Tab label="OVERVIEW" />
              <Tab label="CONFIGURATION" />
            </Tabs>
            {
              kubemodaltabValue === 0 ?
                <GuiBox sx={{ overflowY: "auto", p: `${pxToRem(10)}`, pb: `${pxToRem(20)}` }}>
                  <GuiTypography variant="subtitle2" color="info" fontWeight="bold" sx={{ mb: `${pxToRem(10)}` }}>
                    Deployment Details
                  </GuiTypography>
                  <GuiBox display="flex" flexDirection="row" sx={{ mb: `${pxToRem(26)}` }}>
                    {
                      microViews.map(mv1 => {
                        return getMicroView(mv1)
                      })
                    }
                  </GuiBox>
                  <GuiBox sx={{
                    mt: `${pxToRem(20)} !important`,
                    backgroundColor: white.main,
                    backgroundImage: white.main,
                    height: pxToRem(1),
                    margin: `${pxToRem(16)} 0`,
                    borderBottom: "none",
                    opacity: 0.10,
                  }}>
                  </GuiBox>
                  <GuiTypography variant="subtitle2" color="info" fontWeight="bold" sx={{ mb: `${pxToRem(10)}`, mt: `${pxToRem(20)}` }}>
                    Spec Details
                  </GuiTypography>
                  <Card sx={{ borderRadius: "0.75rem", border: "1px solid #26282d", p: "12px", overflowX: "hidden", overflowY: "auto" }}>
                    <pre style={{ fontFamily: `"Fira Code", monospace`, padding: `${pxToRem(5)}`, fontSize: "13px", color: "#fff", opacity: "0.9", fontWeight: 400, wordBreak: "break-all" }}>
                      {JSON.stringify(nodepool?.spec ?? {}, null, 4)}
                    </pre>
                  </Card>
                </GuiBox>
                : (kubemodaltabValue === 1 ?
                  <GuiBox sx={{ overflowY: "auto", p: `${pxToRem(10)}`, pb: `${pxToRem(20)}` }}>
                    <GuiTypography variant="subtitle2" color="info" fontWeight="bold" sx={{ mb: `${pxToRem(10)}` }}>
                      Configure
                    </GuiTypography>

                    {
                      <GuiBox display="flex" flexDirection="column" sx={{ mb: `${pxToRem(10)}` }}>
                        {
                          microViewsConfig.map(mv => {
                            return getMicroInputView(mv)
                          })
                        }
                      </GuiBox>
                    }
                  </GuiBox>
                  : null)
            }
          </GuiBox>
          <GuiBox display="flex" alignItems="center" justifyContent="end" sx={{ borderRadius: "0.75rem", minWidth: `calc(100%)`, overflowY: "auto", position: "absolute", bottom: "0", p: `${pxToRem(10)}`, backgroundColor: "#05050a" }}>
            <GuiBox display="flex" alignItems="center" justifyContent="right" mr={pxToRem(16)}>
              {
                modalRunText !== "Completed" ?
                  <GuiButton
                    onClick={handleModalClose}
                    color="white"
                    sx={{ textAlign: "start", display: "flex" }}
                    rel="noreferrer"
                  >
                    <GuiTypography variant="h6" fontWeight="regular" color="dark" pl="0px">
                      Cancel
                    </GuiTypography>
                  </GuiButton>
                  : null
              }
              {
                getUserRoleLevel(sharedState, currentUserObj?.email ?? "") > 0 ?
                  <GuiButton
                    onClick={() => updateService("nodepool", metadata)}
                    color={(modalRunText === "Update" || modalRunText === "Send for Approval") ? "info" : (modalRunText === "Completed" ? "success" : "warning")}
                    loadingColor={"white"}
                    loading={modalActionRunning}
                    disabled={(!tempModalSelectionData["runEnabled"] && modalRunText !== "Completed")}
                    sx={{ textAlign: "start", display: "flex", ml: `${pxToRem(12)}` }}
                    rel="noreferrer"
                  >
                    <>
                      <GuiTypography variant="h6" fontWeight="bold" color={modalRunText !== "Completed" ? "white" : "white"} pl="" sx={{ mr: "8px" }}>
                        {modalRunText}
                      </GuiTypography>
                      {
                        (modalRunText === "Update" || modalRunText === "Send for Approval") ?
                          <HiArrowRight size="20px" color="white" />
                          : modalRunText === "Completed" ? <CheckCircle size="25px" color="dark" /> : <ErrorRounded size="25px" color="dark" />
                      }
                    </>
                  </GuiButton>
                  : null
              }
            </GuiBox>
          </GuiBox>
        </>)
    }

    return dynamicModalData
  }

  useEffect(() => {
    cache.clearAll()
    if (listRef.current) {
      listRef.current?.recomputeRowHeights();
      listRef.current?.forceUpdateGrid();

      if (filteredLogs?.length > 0) {
        listRef.current?.measureAllRows();
      }

      const scrollToBottom = () => {
        const scrollableElement = listRef.current.scrollContainer;
        if (scrollableElement) {
          scrollableElement.scrollTop = scrollableElement.scrollHeight;
        }
      };

      const fetchData = async () => {
        while (!listRef.current) {
          await new Promise(resolve => setTimeout(resolve, 50)); // Adjust the delay as needed
        }

        if (filteredLogs?.length > 0) {
          requestAnimationFrame(scrollToBottom);
        }
      };

      fetchData();
    }
  }, [filteredLogs])

  const viewPodLogs = async (metadata) => {
    setLogsLoading(true)
    setLogsData({
      type: "pod",
      metadata
    })
    try {
      let response = {}
      if (localStorage.getItem('toggleLocalK8s') === 'true') {

        let logs = await execElectronCommand(`kubectl logs --tail=1000 ${metadata?.name} -n ${metadata?.namespace} --context=${currentKubeContext}`);


        let aiResponse = null
        if (metadata?.isPodUnhealthy) {
          let describePod = await execElectronCommand(`kubectl describe pod ${metadata?.name} -n ${metadata?.namespace} --context=${currentKubeContext}`);

          // make API call to get analysis
          aiResponse = await customAxios.post(`${getBaseAPIUrl()}/api/v1/graviton/analyze`,
            {
              data:
              {
                type: "analyze-pod",
                metadata,
                logs: logs?.data,
                describePod: describePod?.data
              },
            });
        }
        const splitLogs = typeof logs?.data === 'string' ? logs?.data?.split("\n") : []

        response.data = {
          type: "pod",
          metadata,
          resp: splitLogs,
          aiAnalysis: aiResponse?.data?.aiAnalysis || null
        }
      }
      if (response.data) {
        setLogsData(response.data)
        setLogsModalOpen(true)
        setLogsLoading(false)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const triggerKubeDetailModal = (name, type, metadata) => {

    const dynamicModalData = getKubeModalData(name, type, metadata)

    if (dynamicModalData && dynamicModalData.view) {
      setkubeModalData(dynamicModalData)
      setkubemodalOpen(true)
    }
  }

  const getClusterTabContent = (value, metadata) => {
    const clusterSelected = metadata?.clusterDetail
    const clusterObj = kubeServicesData?.find(cluster => cluster.clusterDetail.name === clusterSelected.name)

    if (iamsMappingData === null && clusterObj?.iamsMapping) {

      setIamsMappingData(JSON.parse(JSON.stringify(clusterObj?.iamsMapping)))
      setIamsOGMappingData(JSON.parse(JSON.stringify(clusterObj?.iamsMapping)))
    }

    if (kubemodaltabValue === 0) {

      const cluster = metadata.clusterDetail

      const microViews = []
      microViews.push({ k: "name", v: cluster?.name })
      microViews.push({ k: "version", v: cluster?.version })
      microViews.push({ k: "status", v: cluster?.status })
      microViews.push({ k: "platform Version", v: cluster?.platformVersion })
      microViews.push({ k: "CreatedAt", v: cluster?.createdAt ? convertTimestampToReadableTimeWithTZ(cluster.createdAt) : "creating..." })

      const microViewsMeta = []
      if (cluster?.tags) {
        microViewsMeta.push({ k: "tags", v: Object.entries(cluster?.tags).map(([key, value], index) => ({ name: key, value })) })
      }

      return (
        <GuiBox sx={{ overflowY: "auto", p: `${pxToRem(10)}`, pb: `${pxToRem(20)}` }}>
          <GuiTypography variant="subtitle2" color="info" fontWeight="bold" sx={{ mb: `${pxToRem(10)}` }}>
            Cluster Details
          </GuiTypography>
          <GuiBox display="flex" flexDirection="row" sx={{ mb: `${pxToRem(26)}` }}>
            {
              microViews.map(mv1 => {
                return getMicroView(mv1)
              })
            }
          </GuiBox>
          <GuiBox display="flex" flexDirection="row" sx={{ mb: `${pxToRem(26)}` }}>
            {
              microViewsMeta.map(mv1 => {
                return getMicroTagsView(mv1)
              })
            }
          </GuiBox>
        </GuiBox>
      )
    } else if (kubemodaltabValue === 1) {
      const cluster = metadata.clusterDetail

      const microViews = []
      microViews.push({ k: "VPC ID", v: cluster.resourcesVpcConfig?.vpcId })
      microViews.push({ k: "subnet Ids", v: cluster.resourcesVpcConfig?.subnetIds?.join("\r\n") })
      microViews.push({ k: "service Ipv4 Cidr", v: cluster.kubernetesNetworkConfig?.serviceIpv4Cidr })

      const microViews2 = []
      microViews2.push({ k: "endpoint", v: cluster.endpoint, url: cluster.endpoint })
      microViews2.push({ k: "arn", v: cluster.arn })

      const microViews3 = []
      microViews3.push({ k: "oidc", v: cluster.identity?.oidc?.issuer, url: cluster.identity?.oidc?.issuer })
      return (
        <GuiBox sx={{ overflowY: "auto", p: `${pxToRem(10)}`, pb: `${pxToRem(20)}` }}>
          <GuiTypography variant="subtitle2" color="info" fontWeight="bold" sx={{ mb: `${pxToRem(10)}` }}>
            Network Details
          </GuiTypography>
          <GuiBox display="flex" flexDirection="row" sx={{ mb: `${pxToRem(26)}` }}>
            {
              microViews.map(mv1 => {
                return getMicroView(mv1)
              })
            }
          </GuiBox>
          <GuiBox display="flex" flexDirection="row" sx={{ mb: `${pxToRem(26)}` }}>
            {
              microViews2.map(mv1 => {
                return getMicroView(mv1)
              })
            }
          </GuiBox>
          <GuiBox display="flex" flexDirection="row" sx={{ mb: `${pxToRem(26)}` }}>
            {
              microViews3.map(mv1 => {
                return getMicroView(mv1)
              })
            }
          </GuiBox>
        </GuiBox>
      )
    } else if (kubemodaltabValue === 3) {
      const microViews = []

      clusterObj?.addons?.forEach(addon => {
        const microView = []
        microView.push({ k: "Name", v: addon?.addonName })
        microView.push({ k: "status", v: addon?.status })
        microView.push({ k: "version", v: addon?.addonVersion })
        microView.push({ k: "createdAt", v: addon?.createdAt ? convertTimestampToReadableTimeWithTZ(addon?.createdAt) : "creating..." })

        microViews.push(microView)
      })

      const additionalAddOns = eksAddOns?.filter(addon => !clusterObj?.addons?.map(ao => ao.addonName).includes(addon.AddonName))

      return (
        <GuiBox sx={{ overflowY: "auto", p: `${pxToRem(10)}`, pb: `${pxToRem(20)}` }}>
          <GuiTypography variant="subtitle2" color="info" fontWeight="bold" sx={{ mb: `${pxToRem(10)}` }}>
            Current AddOns
          </GuiTypography>
          {
            microViews.map(mv => {
              return (<GuiBox display="flex" flexDirection="row" mb="8px">
                {
                  mv.map(mvx => {
                    return getMicroView(mvx)
                  })
                }
              </GuiBox>)
            })
          }
          <GuiBox sx={{
            mt: `${pxToRem(20)} !important`,
            backgroundColor: white.main,
            backgroundImage: white.main,
            height: pxToRem(1),
            margin: `${pxToRem(16)} 0`,
            borderBottom: "none",
            opacity: 0.10,
          }} />
          <GuiTypography variant="subtitle2" color="info" fontWeight="bold" sx={{ mb: `${pxToRem(10)}` }}>
            Install AddOns
          </GuiTypography>
          <GuiBox display="flex" flexDirection="row" sx={{ mb: `${pxToRem(26)}` }}>
            {
              additionalAddOns?.length > 0
                ?
                <GuiBox display="flex" flexDirection="row" mb="8px" sx={{ gap: "12px" }}>
                  <FormControl margin="none" sx={{ m: "0px", width: "fit-content", mt: `${pxToRem(24)}` }}>
                    <GuiSelect
                      IconComponent={() => <ExpandMoreRounded />}
                      variant="outlined"
                      sx={{ m: 0 }}
                      color="white"
                      size="small"
                      value={addOnSelectionData["addOnName"] ?? "Select AddOn"}
                      onChange={(e) => addOnChange("addOnName", e.target.value, additionalAddOns)}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <MenuItem disabled value="Select AddOn">
                        {"Select AddOn"}
                      </MenuItem>
                      {additionalAddOns.map(it => (
                        <MenuItem key={it.AddonName} value={it.AddonName} sx={{ color: "inherit" }}>
                          <GuiBox display="flex" flexDirection="column" sx={{ gap: "2px" }}>
                            <GuiTypography variant="h5" fontWeight="regular" color="white" sx={{ textWrap: "wrap", fontSize: `${pxToRem(14)}` }}>
                              {it.AddonName}
                            </GuiTypography>
                            <GuiTypography variant="h6" fontWeight="regular" color="white" sx={{ maxWidth: "200px", textWrap: "wrap", opacity: "0.7", fontSize: `${pxToRem(12)}` }}>
                              {it.Desc}
                            </GuiTypography>
                          </GuiBox>
                        </MenuItem>
                      ))}
                    </GuiSelect>
                  </FormControl>

                  <FormControl margin="none" sx={{ m: "0px", width: "fit-content", mt: `${pxToRem(24)}` }}>
                    <GuiSelect
                      IconComponent={() => <ExpandMoreRounded />}
                      variant="outlined"
                      sx={{ m: 0 }}
                      color="white"
                      size="small"
                      value={addOnSelectionData["addOnVersion"] !== null ? (addOnSelectionData["addOnVersion"]) : (addOnSelectionData["addOnName"] ? additionalAddOns.find(addon => addon.AddonName === addOnSelectionData["addOnName"])?.AddonVersions?.find(ver => ver?.Compatibilities?.[0]?.defaultVersion === true)?.AddonVersion : "Select Version")}
                      onChange={(e) => addOnChange("addOnVersion", e.target.value)}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                    >
                      <MenuItem disabled value={addOnSelectionData["addOnName"] ? additionalAddOns.find(addon => addon.AddonName === addOnSelectionData["addOnName"])?.AddonVersions?.find(ver => ver?.Compatibilities?.[0]?.defaultVersion === true)?.AddonVersion : "Select Version"}>
                        {addOnSelectionData["addOnName"] ? additionalAddOns.find(addon => addon.AddonName === addOnSelectionData["addOnName"])?.AddonVersions?.find(ver => ver?.Compatibilities?.[0]?.defaultVersion === true)?.AddonVersion : "Select Version"}
                      </MenuItem>
                      {additionalAddOns.find(addon => addon.AddonName === addOnSelectionData["addOnName"])?.AddonVersions?.map((it, index) => (
                        <MenuItem key={it.AddonVersion} value={it.AddonVersion} sx={{ color: "inherit" }}>
                          {it.AddonVersion} {it?.Compatibilities?.[0]?.defaultVersion === true ? " (default)" : ""} {index === 0 ? " (latest)" : ""}
                        </MenuItem>
                      ))}
                    </GuiSelect>
                  </FormControl>
                </GuiBox>
                : null
            }
          </GuiBox>
        </GuiBox>
      )
    } else if (kubemodaltabValue === 2) {

      return (
        <GuiBox sx={{ overflowY: "auto", p: `${pxToRem(10)}`, pb: `${pxToRem(20)}` }}>
          <GuiTypography variant="subtitle2" color="info" fontWeight="bold" sx={{ mb: `${pxToRem(10)}` }}>
            Identity Mapping
          </GuiTypography>
          {
            iamsMappingData?.map((mapping, index) => {
              return (
                <Grid container spacing={2} direction="row" sx={{ mb: `${pxToRem(12)}`, alignItems: "center" }}>
                  <Grid item xs={3} md={3} xl={3}>
                    {
                      mapping?.username ?
                        <GuiInput
                          label="name"
                          placeholder="name..."
                          disabled={true}
                          value={mapping?.username}
                        // onChange={(e) => handleEnvChange(index, 'name', e.target.value)}
                        />
                        :
                        <FormControl margin="none" sx={{ m: "0px", width: "fit-content" }}>
                          <GuiSelect
                            IconComponent={() => <ExpandMoreRounded />}
                            variant="outlined"
                            sx={{ m: 0 }}
                            color="white"
                            size="small"
                            value={"Select IAM"}
                            onChange={(e) => iamMappingOnChange("addnew", e.target.value, index)}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                          >
                            <MenuItem disabled value="Select IAM">
                              {"Select IAM"}
                            </MenuItem>
                            {sharedState?.iams?.filter(ia => !iamsMappingData?.map(iad => iad.userarn)?.includes(ia.Arn)).map(it => (
                              <MenuItem key={it?.UserName} value={it?.UserName} sx={{ color: "inherit" }}>
                                {it?.UserName}
                              </MenuItem>
                            ))}
                          </GuiSelect>
                        </FormControl>
                    }
                  </Grid>
                  <Grid item xs={5} md={5} xl={5}>
                    <GuiInput
                      label="rolearn"
                      placeholder="rolearn..."
                      disabled={true}
                      value={mapping?.rolearn ?? mapping?.userarn}
                    // onChange={(e) => handleEnvChange(index, 'name', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={3} md={3} xl={3}>
                    <FormControl margin="none" sx={{ m: "0px", width: "fit-content", maxWidth: "90%" }}>
                      <GuiSelect
                        IconComponent={() => <ExpandMoreRounded />}
                        variant="outlined"
                        sx={{ m: 0 }}
                        color={(mapping?.new || mapping?.changed) ? "warning" : "white"}
                        size="small"
                        value={mapping?.groups ?? "Select Permissions"}
                        onChange={(e) => iamMappingOnChange("groups", mapping?.username, e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        renderValue={(selected) => selected?.join(', ')}
                      >
                        <MenuItem disabled value="Select Permissions">
                          {"Select Permissions"}
                        </MenuItem>
                        {iamMappingGroups.map(it => (
                          <MenuItem key={it} value={it} sx={{ color: "inherit" }}>
                            <GuiBox display="flex" flexDirection="row" justifyContent="center" alignItems="center" sx={{ gap: "2px" }}>
                              {
                                mapping?.groups?.includes(it) ?
                                  <Check color="white" />
                                  : null
                              }

                              <GuiTypography variant="h5" fontWeight="regular" color="white" sx={{ textWrap: "wrap", fontSize: `${pxToRem(14)}` }}>
                                {it}
                              </GuiTypography>
                            </GuiBox>
                          </MenuItem>
                        ))}
                      </GuiSelect>
                    </FormControl>
                  </Grid>
                  <Grid item xs={1} md={1} xl={1}>
                    <CloseSharp color="white"
                      onClick={(e) => handleRemoveIamMapping(index)}
                      sx={{ alignItems: "center", justifyContent: "center", display: "flex", maxWidth: "100%" }} />
                  </Grid>

                </Grid>
              )
            })
          }
          <GuiButton
            sx={{ p: "0", borderRadius: "0.75rem", border: "1px solid #26282d", background: "#20212E" }}
            color="dark"
            iconOnly={true}
            onClick={handleAddIAMMapping}
            rel="noreferrer"
          >
            <BsPlusCircleFill />
          </GuiButton>
          <GuiButton
            onClick={() => saveIamsMapping(clusterObj?.clusterDetail?.name, extractRegionFromEksArn(clusterObj?.clusterDetail?.arn))}
            color="white"
            disabled={!saveMappingsData["enabled"]}
            loading={saveMappingsData["loading"]}
            sx={{ textAlign: "start", display: "flex", p: "8px", mt: "8px" }}
            rel="noreferrer"
            loadingColor={"dark"}
          >
            <FaFloppyDisk size="16px" color="black" />
            <GuiTypography variant="h6" fontWeight="regular" color="dark" ml="4px" sx={{ fontSize: "14px" }}>
              save settings
            </GuiTypography>
          </GuiButton>
        </GuiBox>
      )
    } else if (kubemodaltabValue === 4) {
      // check labels for karpenter
      const cluster = metadata.clusterDetail
      let isEnabled = false
      for (const key in cluster.tags) {
        if (["karpenter.sh/discovery"].some(pattern => key.includes(pattern))) {
          isEnabled = true
        }
      }

      return (
        <GuiBox sx={{ overflowY: "auto", p: `${pxToRem(10)}`, pb: `${pxToRem(20)}` }}>
          <GuiTypography variant="subtitle2" color="info" fontWeight="bold" sx={{ mb: `${pxToRem(10)}` }}>
            Karpenter
          </GuiTypography>
          {
            isEnabled ?
              <GuiBox display="flex" alignItems="center" lineHeight={0}>
                <BsCheckCircleFill color="green" size="15px" />
                <GuiTypography variant="button" fontWeight="regular" color="white" ml="5px">
                  <strong>Karpenter v0.37.0</strong> is enabled in the cluster - <a href="https://gallery.ecr.aws/karpenter/karpenter"><u>https://gallery.ecr.aws/karpenter/karpenter</u></a>
                </GuiTypography>
              </GuiBox>
              :
              <GuiButton
                onClick={() => enableKarpenter(clusterObj?.clusterDetail?.name, clusterObj?.clusterDetail?.arn, cluster.endpoint, extractRegionFromEksArn(clusterObj?.clusterDetail?.arn), cluster.resourcesVpcConfig?.vpcId, cluster?.identity?.oidc?.issuer)}
                color="white"
                loading={karpenterLoading}
                sx={{ textAlign: "start", display: "flex", p: "8px", mt: "8px" }}
                rel="noreferrer"
                loadingColor={"dark"}
              >
                <SiKubernetes size="16px" color="black" />
                <GuiTypography variant="h6" fontWeight="regular" color="dark" ml="4px" sx={{ fontSize: "14px" }}>
                  Enable Karpenter
                </GuiTypography>
              </GuiButton>
          }

        </GuiBox>
      )
    }
  }

  const triggerCreateNodeGroupAction = async (clusterName, region, metadata, type) => {
    if (type === "nodepool") {
      await fetchActionsDetail({ actionId: "eks-cluster-create-nodepool", clusterName, region, vpcId: metadata?.clusterDetail?.resourcesVpcConfig?.vpcId, clusterArn: metadata?.clusterDetail?.arn })
    } else {
      await fetchActionsDetail({ actionId: "eks-nodegroup-create", clusterName, region, vpcId: metadata?.clusterDetail?.resourcesVpcConfig?.vpcId, clusterArn: metadata?.clusterDetail?.arn })
    }
  }

  const updateModalData = () => {
    if (modalOpen) {
      const clusterObj = kubeServicesData.find(cluster => cluster.clusterDetail.name === modalData.clusterDetails.name)
      if (clusterObj && clusterObj.nodeGroupsDetails?.length > 0) {
        const data = {
          clusterDetails: clusterObj.clusterDetail,
          nodeGroup: clusterObj.nodeGroupsDetails?.find(nodeGroup => nodeGroup.nodegroupName === modalData.nodeGroup.nodegroupName),
          clusterObj
        }
        setModalData(data)
      }
    }
  }

  const getKubeContext = async () => {
    try {
      let kubeConfig = await execElectronCommand("kubectl config view --output=json");

      setAllKubeContexts(kubeConfig?.data?.contexts?.map(context => context.name))

      let kubeContext = localStorage.getItem('currentKubeContext') || kubeConfig?.data?.["current-context"];

      if (!kubeConfig?.data?.clusters) {
        return null
      }

      const minikubeContext = kubeConfig?.data?.contexts?.find(context => context.name === "minikube")
      if (minikubeContext && minikubeContext?.context?.cluster === "minikube") {
        kubeContext = "minikube"
      }

      return kubeContext
    } catch (err) {
      console.log(err)
      return null
    }
  }

  const fetchCurrentServices = async () => {
    setServiceDataIsRefreshing(true)

    try {

      let kubeRespons = { data: [] };
      if (localStorage.getItem('toggleLocalK8s') === 'true') {

        const cachedData = localStorage.getItem('kubeServicesData');
        if (cachedData) {
          setKubeServicesData(JSON.parse(cachedData));
        }

        // get all context
        // select minikube if present or docker-desktop as context
        try {

          if (currentKubeContext === null) {
            const kubeContext = await getKubeContext()
            setCurrentKubeContext(kubeContext)
            localStorage.setItem('currentKubeContext', kubeContext);
          } else {
            let kubeConfig = await execElectronCommand("kubectl config view --output=json");
            setAllKubeContexts(kubeConfig?.data?.contexts?.map(context => context.name))
          }

          if (currentKubeContext === "minikube") {

            // check if minikube is running
            let minikubeStatus = await execElectronCommand(`minikube status`)
            if (minikubeStatus?.data?.includes("Cannot connect to the Docker daemon")) {
              toast.error(`Docker Desktop not Running for Minikube to start`, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                style: {
                  background: "#05050a", // Background color
                  color: "#ffffff", // Text color
                  fontSize: "15px", // Font size
                  fontFamily: "Lato", // Font family
                  border: "1px solid #26282d", // Border color and width
                  boxShadow: "0 4px 10px rgba(129, 138, 255, 0.5)"
                },
              });
            } else if (minikubeStatus?.data?.includes("host: Stopped")) {

              toast.success(`Minikube detected, starting cluster with metrics`, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                style: {
                  background: "#05050a", // Background color
                  color: "#ffffff", // Text color
                  fontSize: "15px", // Font size
                  fontFamily: "Lato", // Font family
                  border: "1px solid #26282d", // Border color and width
                  boxShadow: "0 4px 10px rgba(129, 138, 255, 0.5)"
                },
              });
              await execElectronCommand(`minikube start --driver=docker --addons=metrics-server --kubernetes-version=v1.30 --extra-config=kubelet.housekeeping-interval=10s`)
            }
          }


          let [data, events, nodes, clusterVersion, helmCharts, k8sPodsMetrics] = await Promise.all([
            currentKubeContext ? execElectronCommand(`kubectl get all -A -o json --context=${currentKubeContext}`) : {},
            currentKubeContext ? execElectronCommand(`kubectl get events -A -o json --context=${currentKubeContext}`) : {},
            currentKubeContext ? execElectronCommand(`kubectl get nodes -A -o json --context=${currentKubeContext}`) : {},
            currentKubeContext ? execElectronCommand(`kubectl version -o json --context=${currentKubeContext}`) : {},
            currentKubeContext ? execElectronCommand(`helm list -A -o json  --kube-context ${currentKubeContext}`) : {},
            currentKubeContext ? execElectronCommand(`kubectl get pods.metrics.k8s.io -A -o json --context=${currentKubeContext}`) : {}
          ]);

          let nodeGroups = { data: [] };

          if (k8sPodsMetrics?.data?.items?.length > 0) {

            const cleanedPodsMetrics = k8sPodsMetrics?.data?.items?.map(item => {
              return {
                "namespace": item?.metadata?.namespace,
                "pod_name": item?.metadata?.name,
                "container_name": item?.containers?.[0]?.name,
                "cpu_usage": parseInt(item?.containers?.[0]?.usage?.cpu?.replace("n", ""), 10),
                "memory_usage": parseInt(item?.containers?.[0]?.usage?.memory?.replace("Ki", ""), 10),
                "timestamp": item?.timestamp
              }
            })

            // append pod metrics to state, given the timestamp is unique for each pod_name
            cleanedPodsMetrics?.forEach(metric => {
              const existingMetric = podMetrics?.find(podMetric => podMetric?.pod_name === metric?.pod_name && podMetric?.timestamp === metric?.timestamp)
              if (existingMetric) {
                existingMetric.cpu_usage = metric?.cpu_usage
                existingMetric.memory_usage = metric?.memory_usage
              } else {
                podMetrics?.push(metric)
              }
            })

            setPodMetrics(podMetrics)
          }

          let clusterName = currentKubeContext

          if (currentKubeContext) {
            data = data?.data
            events = events?.data
          }

          kubeRespons.data = [
            {
              clusterDetail: {
                name: clusterName?.trim(),
                arn: `arn:aws:eks:us-east-1:111111111111:cluster/${clusterName}`,
                version: `${clusterVersion?.data?.serverVersion?.major}.${clusterVersion?.data?.serverVersion?.minor}`,
                status: currentKubeContext ? "ACTIVE" : "INACTIVE",
                createdAt: clusterVersion?.data?.serverVersion?.buildDate,
                isLocal: true
              },
              nodeGroupsDetails: nodeGroups?.data,
              nodes: nodes?.data,
              services: { items: data?.items?.filter(datum => datum.kind === "Service") },
              deployments: { items: data?.items?.filter(datum => datum.kind === "Deployment") },
              pods: { items: data?.items?.filter(datum => datum.kind === "Pod") },
              replicaSets: { items: data?.items?.filter(datum => datum.kind === "ReplicaSet") },
              statefulSets: { items: data?.items?.filter(datum => datum.kind === "StatefulSet") },
              daemonSets: { items: data?.items?.filter(datum => datum.kind === "DaemonSet") },
              hpas: { items: data?.items?.filter(datum => datum.kind === "HorizontalPodAutoscaler") },
              priorityClasses: { items: data?.items?.filter(datum => datum.kind === "PriorityClass") },
              jobs: { items: data?.items?.filter(datum => datum.kind === "Job") },
              cronJobs: { items: data?.items?.filter(datum => datum.kind === "CronJob") },
              events: events,
              helmCharts: helmCharts?.data || []
            }
          ]
        } catch (err) {
          console.log(err)
        }

      }

      setKubeServicesData(kubeRespons?.data?.length > 0 ? kubeRespons?.data?.sort((a, b) => a.clusterDetail.name.localeCompare(b.clusterDetail.name)) : kubeRespons.data);
      if (localStorage.getItem('toggleLocalK8s') === 'true') {
        localStorage.setItem('kubeServicesData', JSON.stringify(kubeRespons.data));
      }

      const namespaces = []
      const labels = ["all"]

      if (!workloadFilterData?.cluster) {
        workloadFilterData.cluster = kubeRespons?.data?.[0]?.clusterDetail?.name ?? null

        kubeRespons?.data?.[0]?.pods?.items?.forEach(pod => {
          namespaces.push(pod?.metadata?.namespace)
          const allLabels = filterLabels(pod?.metadata?.labels)
          labels.concat(allLabels)
        })
        kubeRespons?.data?.[0]?.nodeGroupsDetails?.forEach(ng => {
          const allLabels = filterLabels(ng?.labels)
          labels.concat(allLabels)
        })
        setAllLabels([...new Set(labels)].sort((a, b) => a.localeCompare(b)))
        const updatedNamespaces = [...new Set(namespaces)].sort((a, b) => a.localeCompare(b))
        updatedNamespaces.unshift("all")
        setAllNamespaces(updatedNamespaces)
        setWorkloadFilterData({ ...workloadFilterData })
        localStorage.setItem('workloadFilterData', JSON.stringify(workloadFilterData));
      } else {
        const selectedCluster = kubeRespons?.data?.find(cl => cl?.clusterDetail?.name === workloadFilterData?.cluster);
        if (selectedCluster) {

          selectedCluster?.pods?.items?.forEach(pod => {
            namespaces.push(pod?.metadata?.namespace)
            const allLabels = filterLabels(pod?.metadata?.labels)
            labels.concat(allLabels)
          })

          const updatedNamespaces = [...new Set(namespaces)].sort((a, b) => a.localeCompare(b))
          updatedNamespaces.unshift("all")
          setAllNamespaces(updatedNamespaces)
        }
      }
      const allClusterNames = []
      kubeRespons?.data?.forEach(cl => {
        allClusterNames.push(cl?.clusterDetail?.name)
        setAllClusterNames([...allClusterNames])
      })

    } catch (error) {
      console.error("Error fetching data:", error);
      if (error?.response?.status === 401) {
        deleteCookie("gravity_sid")
        history.push("/authentication/sign-in")
      }
    } finally {
      setServiceDataIsRefreshing(false)
    }
  };

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'kubeServicesData') {
        setKubeServicesData(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    setKubeServicesData(null)
    fetchCurrentServices()
  }, [toggleLocalK8s, currentKubeContext])

  useEffect(() => {
    const dynamicModalDataUpdated = getKubeModalData(kubeModalData.name, kubeModalData.type, kubeModalData.metadata)

    if (dynamicModalDataUpdated && dynamicModalDataUpdated.view) {
      setkubeModalData(dynamicModalDataUpdated)
    }
  }, [kubemodaltabValue, addOnSelectionData, iamsMappingData, saveMappingsData, serviceDataIsRefreshing, karpenterLoading, tempModalSelectionData])

  useEffect(() => {
    updateModalData()
  }, [kubeServicesData])

  useEffect(() => {
    setModalRunText(getModalText())
    setTableActionsetModalRunText(getTableActionModalText())
  }, [kubeServicesData])

  useEffect(() => {
    const auth = getCookie("gravity_sid")
    // const accountCreated = getCookie("account")
    if (auth === false && process.env.REACT_APP_USE_MOCK_API !== "true") {
      history.push("/authentication/sign-in")
    }
    else {
      fetchCurrentServices()
      setInterval(() => {
        fetchCurrentServices();
      }, 60 * 1000);
    }
  }, []);

  const getModalText = () => {
    let tx = "Update"
    if (getUserRoleLevel(sharedState, currentUserObj?.email ?? "") <= 2) {
      tx = "Send for Approval"
    }
    return tx
  }

  const getMicroView = (obj) => {
    return (
      <GuiBox display="flex" flexDirection="column" sx={{ mr: `${pxToRem(24)}`, width: "fit-content" }}>
        <GuiTypography variant="h6" fontWeight="regular" color="white" sx={{ textWrap: "wrap", opacity: "0.7", fontSize: `${pxToRem(12)}` }}>
          {obj.k.toUpperCase()}
        </GuiTypography>
        <GuiBox display="flex" flexDirection="row" alignItems="center" justifyContent="start" sx={{ gap: "4px" }}>
          {
            obj.left ?? obj.left
          }
          {
            obj.url ?
              <GuiTypography variant="h5" fontWeight="bold" color="white" sx={{ maxWidth: "80%", textWrap: "wrap", fontSize: `${pxToRem(16)}`, textDecoration: "none !important", textUnderlineOffset: "2px" }}>
                <Link
                  target="_blank"
                  rel="noreferrer"
                  sx={{ textUnderlinePosition: "under" }}
                  href={obj.url}>
                  <u>{obj.v.trim() + " ↗"}</u>
                </Link>
              </GuiTypography>
              :
              <GuiTypography variant="h5" fontWeight="bold" color="white" sx={{ textWrap: "wrap", fontSize: `${pxToRem(16)}`, whiteSpace: "pre-line" }}>
                {obj.v}
              </GuiTypography>
          }
        </GuiBox>

      </GuiBox>
    )
  }

  const getMicroTagsView = (obj) => {
    return (<GuiBox display="flex" flexDirection="column" sx={{ mr: `${pxToRem(24)}`, minWidth: "70%" }}>
      <GuiTypography variant="h6" fontWeight="regular" color="white" sx={{ textWrap: "wrap", opacity: "0.7", fontSize: `${pxToRem(12)}`, mb: `${pxToRem(8)}` }}>
        {obj.k.toUpperCase()}
      </GuiTypography>
      {
        obj.v.map((pair, index) => (
          <Grid container spacing={2} key={index} direction="row" sx={{ mb: `${pxToRem(12)}`, alignItems: "center" }}>
            <Grid item xs={6} md={6} xl={6}>
              <GuiInput
                label="name"
                placeholder="name..."
                disabled={true}
                value={pair.name}
              />
            </Grid>
            <Grid item xs={6} md={6} xl={6}>
              <GuiInput
                type={"name"}
                label="Value"
                placeholder="value..."
                disabled={true}
                value={pair.value}
              />
            </Grid>
          </Grid>
        ))
      }
    </GuiBox>)
  }

  const getMicroInputView = (obj) => {

    if (obj.type === "dropdown-multiselect") {
      if (!tempModalSelectionData[obj.k]) {
        tempModalSelectionData[obj.k] = obj.c
        setTempModalSelectionData({ ...JSON.parse(JSON.stringify(tempModalSelectionData)) })
      }
    }

    return (
      <GuiBox display="flex" flexDirection="column" sx={{ mb: `${pxToRem(24)}` }}>
        <GuiTypography variant="h5" fontWeight="bold" color="white" sx={{ textWrap: "wrap", fontSize: `${pxToRem(16)}` }}>
          {obj.t}
        </GuiTypography>
        {
          obj.url ?
            <GuiTypography
              variant="h6" fontWeight="regular" color="white" sx={{ textWrap: "wrap", opacity: "0.7", fontSize: `${pxToRem(12)}` }}>
              <Link to={obj.url}>
                {obj.d}
              </Link>

            </GuiTypography>
            :
            <GuiTypography variant="h6" fontWeight="regular" color="white" sx={{ textWrap: "wrap", opacity: "0.7", fontSize: `${pxToRem(12)}` }}>
              {obj.d}
            </GuiTypography>
        }

        {
          obj.type === "input" ?

            <GuiInput
              placeholder="type here..."
              disabled={obj.disabled ?? false}
              inputProps={{ step: obj.step }}
              type="number"
              value={tempModalSelectionData[obj.k] ?? obj.c}
              onChange={(e) => handleModalSelectionDataChange(obj.k, e.target.value)}
              sx={({ breakpoints }) => ({
                mt: `${pxToRem(8)}`,
                marginRight: "8px",
                [breakpoints.down("sm")]: {
                  maxWidth: "80px",
                },
                [breakpoints.only("sm")]: {
                  maxWidth: "80px",
                },
                maxWidth: `${pxToRem(250)}`,
              })}
            />
            : (
              <>
                {
                  obj.type === "drop"
                    ?
                    <FormControl margin="none" sx={{
                      mt: `${pxToRem(8)}`, width: "min-content", border: "1 px #fff",
                    }}>
                      <GuiSelect
                        IconComponent={() => <ExpandMoreRounded />}
                        variant="outlined"
                        color="white"
                        sx={{ m: 0 }}
                        size="small"
                        value={tempModalSelectionData[obj.k] ?? obj.c}
                        onChange={(e) => handleModalSelectionDataChange(obj.k, e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                      >
                        {/* <MenuItem key={obj.c} value={obj.c}>{obj.c}</MenuItem> */}
                        {obj.options.map(it => (
                          <MenuItem key={it.n} value={it.id} >{it.n}</MenuItem>
                        ))}
                      </GuiSelect>
                    </FormControl>
                    :
                    <>
                      <FormControl margin="none" sx={{
                        mt: `${pxToRem(8)}`, width: "min-content", border: "1 px #fff",
                      }}>
                        <GuiSelect
                          IconComponent={() => <ExpandMoreRounded />}
                          variant="outlined"
                          sx={{ m: 0 }}
                          color="white"
                          size="small"
                          value={tempModalSelectionData[obj.k] ?? obj.c}
                          onChange={(e) => handleModalSelectionDataChange(obj.k, e.target.value)}
                          displayEmpty
                          inputProps={{ 'aria-label': 'Without label' }}
                          renderValue={(selected) => {
                            if (!selected || selected?.length === 0) {
                              return "Select Instance Types"
                            }
                            return selected?.join(", ")
                          }}
                        >
                          <MenuItem disabled value="Select Instance Types">
                            {"Select Instance Types"}
                          </MenuItem>

                          {obj.options?.map(it => (
                            <MenuItem key={it.id} value={it.id} sx={{ color: "inherit" }}>
                              <GuiBox display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" sx={{ width: "100%" }}>
                                <GuiBox display="flex" flexDirection="row" justifyContent="center" alignItems="center" sx={{ gap: "2px" }}>
                                  {
                                    (tempModalSelectionData[obj.k] ?? obj.c)?.includes(it.id) ?
                                      <Check color="success" size="18px" />
                                      : null
                                  }
                                  <GuiTypography variant="h5" fontWeight="regular" color="white" sx={{ textWrap: "wrap", fontSize: `${pxToRem(14)}` }}>
                                    {it.n}
                                  </GuiTypography>
                                </GuiBox>
                                {
                                  it.rightChip ?
                                    <GuiChip text={it.rightChip} color="info" size="small" />
                                    : null
                                }
                              </GuiBox>
                            </MenuItem>
                          ))}
                        </GuiSelect>
                      </FormControl>

                    </>
                }
              </>
            )
        }
      </GuiBox>
    )
  }

  useEffect(() => {
    if (tabValue === 2) {
      const microViews = []

      microViews.push({ k: "desiredInstances", t: "Desired Nodes", d: "Specify the minimum nodes desired", c: modalData.nodeGroup?.scalingConfig?.desiredSize, step: "1", type: "input" })
      microViews.push({ k: "minInstances", t: "Minimum Nodes", d: "Specify the minimum nodes needed", c: modalData.nodeGroup?.scalingConfig?.minSize, step: "1", type: "input" })
      microViews.push({ k: "maxInstances", t: "Maximum Nodes", d: "Specify the maximum nodes for autoscaling", c: modalData.nodeGroup?.scalingConfig?.maxSize, step: "1", type: "input" })
      microViews.push({
        k: "capacityType", t: "Capacity Type", d: "Specify the capacity type", c: modalData.nodeGroup.capacityType, type: "drop",
        options: [{
          n: "On Demand",
          id: "ON_DEMAND"
        },
        {
          n: "Spot",
          id: "SPOT"
        },
        ]
      })
      microViews.push({
        k: "instanceType", t: "Instance Type", d: "The instance type of node to be deployed and its associated memory size.", c: modalData.nodeGroup.instanceTypes[0], type: "drop",
        options: ec2InstanceTypes.map(item => ({
          n: `${item.instance} - ${item.cpu}, ${item.ram} RAM (\$${item.costPerMonth}/m)`,
          id: item.instance
        }))
      })

      microViews.forEach(obj => {
        tempModalSelectionData[obj.k] = obj.c
      })

      setTempModalSelectionData({ ...JSON.parse(JSON.stringify(tempModalSelectionData)) })
      setInitModalSelectionData({ ...JSON.parse(JSON.stringify(tempModalSelectionData)) })
    }
  }, [tabValue]);

  function matchKubernetesComponents(data) {
    const services = data?.services?.items;
    const deployments = data?.deployments?.items;
    const pods = data?.pods?.items;
    const replicaSets = data?.replicaSets?.items;
    const hpas = data?.hpas?.items;

    return services?.map(service => {
      const serviceName = service?.metadata?.name;
      const deployment = deployments?.find(deployment =>
        deployment?.metadata?.annotations?.['meta.helm.sh/release-name'] === service?.metadata?.annotations?.['meta.helm.sh/release-name']
      );
      const matchedPods = pods?.filter(pod =>
        pod?.metadata?.labels?.app === service?.spec?.selector?.['app.kubernetes.io/name']
        ||
        pod?.metadata?.labels?.['app.kubernetes.io/name'] === service?.spec?.selector?.['app.kubernetes.io/name']
      );

      const matchedrReplicaSets = replicaSets?.find(replicaSet =>
        replicaSet?.metadata?.annotations?.['meta.helm.sh/release-name'] === service?.metadata?.annotations?.['meta.helm.sh/release-name']
      );

      const matchedHpas = hpas?.find(hpa =>
        hpa.metadata?.annotations?.['meta.helm.sh/release-name'] === service?.metadata?.annotations?.['meta.helm.sh/release-name']
      );

      return {
        servicename: serviceName,
        data: {
          service,
          deployment: deployment ?? {},
          pods: matchedPods,
          replicaSet: matchedrReplicaSets ?? {},
          hpa: matchedHpas ?? {},
          clusterName: data?.clusterDetail?.name,
          clusterArn: data?.clusterDetail?.arn
        }
      };
    });
  }

  const getTabContent = () => {
    if (tabValue === 0) {
      const microViews = []
      microViews.push({ k: "cluster name", v: modalData.clusterDetails.name })
      microViews.push({ k: "node name", v: modalData.nodeGroup.nodegroupName })
      microViews.push({ k: "region", v: extractRegionFromEksArn(modalData.nodeGroup.nodegroupArn) })
      microViews.push({ k: "k8s version", v: modalData.nodeGroup.version })
      // microViews.push({ k: "repository", v: modalData.nodeGroup.metaData?.repository?.full_name, url: modalData.nodeGroup.metaData?.repository?.html_url })
      microViews.push({ k: "created at", v: convertTimestampToReadableTimeWithTZ(modalData.nodeGroup.createdAt) })
      microViews.push({ k: "modified At", v: convertTimestampToReadableTimeWithTZ(modalData.nodeGroup.modifiedAt) })

      const microViews2 = []
      microViews2.push({ k: "node role", v: modalData.nodeGroup.nodeRole?.split("role/")?.[1]?.trim() })
      microViews2.push({ k: "subnets", v: modalData.nodeGroup.subnets?.join("\r\n") })

      const microViewsMeta = []

      microViewsMeta.push({ k: "", v: Object.entries(modalData.nodeGroup.labels).map(([key, value], index) => ({ name: key, value })) })

      const microViewsMeta2 = []
      microViewsMeta2.push({ k: "", v: Object.entries(modalData.nodeGroup.tags).map(([key, value], index) => ({ name: key, value })) })

      const microResourceViews = []
      microResourceViews.push({ k: "Instance Type", v: modalData.nodeGroup.instanceTypes[0] })
      microResourceViews.push({ k: "AMI Type", v: modalData.nodeGroup.amiType })
      microResourceViews.push({ k: "Capacity Type", v: modalData.nodeGroup.capacityType })

      return (
        <GuiBox sx={{ overflowY: "auto", p: `${pxToRem(10)}`, pb: `${pxToRem(20)}` }}>
          <GuiTypography variant="subtitle2" color="info" fontWeight="bold" sx={{ mb: `${pxToRem(10)}` }}>
            Node Group Details
          </GuiTypography>
          {
            <GuiBox display="flex" flexDirection="row" sx={{ mb: `${pxToRem(26)}` }}>
              {
                microViews.map(mv => {
                  return getMicroView(mv)
                })
              }
            </GuiBox>
          }
          {
            <GuiBox display="flex" flexDirection="row" sx={{ mb: `${pxToRem(26)}` }}>
              {
                microViews2.map(mv => {
                  return getMicroView(mv)
                })
              }
            </GuiBox>
          }
          <GuiBox sx={{
            mt: `${pxToRem(20)} !important`,
            backgroundColor: white.main,
            backgroundImage: white.main,
            height: pxToRem(1),
            margin: `${pxToRem(16)} 0`,
            borderBottom: "none",
            opacity: 0.10,
          }}>

          </GuiBox>
          <GuiTypography variant="subtitle2" color="info" fontWeight="bold" sx={{ mb: `${pxToRem(10)}`, mt: `${pxToRem(20)}` }}>
            Resource Usage
          </GuiTypography>
          {
            <GuiBox display="flex" flexDirection="row">
              {
                microResourceViews.map(mv => {
                  return getMicroView(mv)
                })
              }
            </GuiBox>
          }
          <GuiBox sx={{
            mt: `${pxToRem(20)} !important`,
            backgroundColor: white.main,
            backgroundImage: white.main,
            height: pxToRem(1),
            margin: `${pxToRem(16)} 0`,
            borderBottom: "none",
            opacity: 0.10,
          }}>

          </GuiBox>
          <GuiTypography variant="subtitle2" color="info" fontWeight="bold" sx={{ mb: `${pxToRem(10)}`, mt: `${pxToRem(20)}` }}>
            Labels
          </GuiTypography>
          {
            <GuiBox display="flex" flexDirection="row" sx={{ mb: `${pxToRem(26)}` }}>
              {
                microViewsMeta.map(mv => {
                  return getMicroTagsView(mv)
                })
              }
            </GuiBox>
          }
          <GuiBox sx={{
            mt: `${pxToRem(20)} !important`,
            backgroundColor: white.main,
            backgroundImage: white.main,
            height: pxToRem(1),
            margin: `${pxToRem(16)} 0`,
            borderBottom: "none",
            opacity: 0.10,
          }}>

          </GuiBox>
          <GuiTypography variant="subtitle2" color="info" fontWeight="bold" sx={{ mb: `${pxToRem(10)}`, mt: `${pxToRem(20)}` }}>
            Tags
          </GuiTypography>
          {
            <GuiBox display="flex" flexDirection="row" sx={{ mb: `${pxToRem(26)}` }}>
              {
                microViewsMeta2.map(mv => {
                  return getMicroTagsView(mv)
                })
              }
            </GuiBox>
          }
        </GuiBox>
      )
    } else if (tabValue === 1) {

      const nodes = modalData.clusterObj?.nodes?.items?.filter(node =>
        node.metadata.labels?.['alpha.eksctl.io/nodegroup-name'] === modalData.nodeGroup.nodegroupName ||
        node.metadata.labels?.['eks.amazonaws.com/nodegroup'] === modalData.nodeGroup.nodegroupName
      );

      const nodeDetailsList = []

      nodes?.forEach(node => {
        const details = extractKubeNodeDetails(node)

        const microViews = []
        microViews.push({ k: "status", v: details.type })
        microViews.push({ k: "Kernel version", v: details.kernelVersion })
        microViews.push({ k: "Created", v: details.createdAt })

        const microViews2 = []
        microViews2.push({ k: "Architecture/OS", v: details.architecture + " / " + details.osImage })
        microViews2.push({ k: "Kubelet version", v: details.kubeletVersion })
        microViews2.push({ k: "Instance type", v: details.instanceType })

        const workloadResources = calculateRequestedResourcesForNode(modalData.clusterObj.pods, node.metadata.name)

        const totalCPU = parseInt(details.cpu?.total.replace("m", ""), 10);
        let availableCPU = parseInt(details.cpu?.available.replace("m", ""), 10)
        const usedCPU = totalCPU - availableCPU;
        availableCPU = availableCPU - workloadResources?.totalRequestedCPU
        const scaleFactorCPU = totalCPU / 100;

        // total, workload, used

        const totalRAM = parseFloat(details.ram?.total.replace(" GiB", ""));
        let availableRAM = parseFloat(details.ram?.available.replace(" GiB", ""))
        const usedRAM = totalRAM - availableRAM;
        availableRAM = availableRAM - workloadResources.totalRequestedRAM / 1024
        const scaleFactorRAM = 100 / totalRAM;

        const charts = [
          <ApexCharts
            type="donut"
            series={[
              availableCPU / scaleFactorCPU,
              usedCPU / scaleFactorCPU,
              workloadResources?.totalRequestedCPU / scaleFactorCPU
            ]}
            options={{
              labels: ['Available', 'Used', "Workload Reserved"],
              colors: ['#383B4E', '#818aff', "#4285F4"],
              stroke: {
                width: 4,
                colors: ["#0f1011"]
              },
              legend: {
                position: 'bottom',
                colors: ['#383B4E', '#818aff', "#4285F4"],
                labels: {
                  colors: '#fff'
                }
              },
              plotOptions: {
                pie: {
                  donut: {
                    labels: {
                      show: true,
                      name: {
                        show: true,
                      },
                      value: {
                        formatter: function (val) {
                          // Adjust the value back based on the scaleFactor
                          return Math.round(val * scaleFactorCPU) + 'm';
                        },
                        color: '#fff'
                      },
                      total: {
                        show: true,
                        label: 'Total CPU',
                        formatter: function () {
                          // Display the original total CPU
                          return totalCPU + 'm';
                        },
                        color: '#fff'
                      }
                    }
                  }
                }
              },
              tooltip: {
                y: {
                  formatter: function (val) {
                    // Tooltip display adjustment
                    return Math.round(val * scaleFactorCPU) + 'm';
                  }
                }
              }
            }}
          />,

          <ApexCharts
            type="donut"
            series={[
              availableRAM * scaleFactorRAM,
              usedRAM * scaleFactorRAM,
              workloadResources.totalRequestedRAM * scaleFactorRAM / 1024,
            ]}
            options={{
              labels: ['Available', 'Used', "Workload Reserved"],
              colors: ['#383B4E', '#818aff', "#4285F4"],
              legend: {
                position: 'bottom',
                colors: ['#383B4E', '#818aff', "#4285F4"],
                labels: {
                  colors: '#fff' // Legend text color
                }
                // useSeriesColors: true
              },
              stroke: {
                width: 4,
                colors: ["#0f1011"]
              },
              plotOptions: {
                pie: {
                  donut: {
                    labels: {
                      show: true,
                      name: {
                        show: true,
                      },
                      value: {
                        formatter: function (val) {
                          return (val / scaleFactorRAM).toFixed(2) + ' GiB';
                        },
                        color: '#fff'
                      },
                      total: {
                        show: true,
                        label: 'Total RAM',
                        formatter: function () {
                          return `${totalRAM.toFixed(2)} GiB`
                        },
                        color: '#fff'
                      }
                    }
                  }
                }
              },
              tooltip: {
                y: {
                  formatter: function (val) {
                    return (val / scaleFactorRAM).toFixed(2) + ' GiB';
                  }
                }
              }
            }}
          />
        ]

        const data = {
          name: node.metadata.name,
          views: [microViews, microViews2],
          charts
        }
        nodeDetailsList.push(data)
      })

      return (
        <>
          {
            modalData.clusterObj?.nodes?.items ?
              <GuiBox sx={{ overflowY: "auto", p: `${pxToRem(10)}`, pb: `${pxToRem(20)}`, height: "inherit" }}>
                <GuiTypography variant="subtitle2" color="info" fontWeight="bold" sx={{ mb: `${pxToRem(10)}` }}>
                  Available Nodes
                </GuiTypography>
                <GuiBox display="flex" flexDirection="row" sx={{ overflowY: "auto", height: "100%", gap: "36px" }}>
                  <GuiBox display="flex" flexDirection="column" sx={{ overflowY: "auto", gap: "4px", width: "30%" }}>
                    {
                      nodes?.map(node => {
                        return (
                          <GuiTypography
                            variant="h5"
                            component="a"
                            fontWeight="bold"
                            color="white"
                            sx={{
                              textWrap: "wrap", fontSize: `${pxToRem(16)}`, textDecoration: "none !important", textUnderlineOffset: "2px",
                              background: `${selectedNodeName === node.metadata.name ? "#383B4E" : "none"}`,
                              padding: "8px",
                              borderRadius: "8px",
                              cursor: "pointer"
                            }}
                            onClick={() => setSelectedNodeName(node.metadata.name)}
                          >
                            {node.metadata.name}
                          </GuiTypography>
                        )
                      })
                    }
                  </GuiBox>
                  <GuiBox sx={{
                    backgroundColor: white.main,
                    backgroundImage: white.main,
                    width: pxToRem(1.5),
                    height: "100%",
                    borderBottom: "none",
                    opacity: 0.40,
                  }} />
                  {
                    selectedNodeName && nodeDetailsList?.length > 0 && nodeDetailsList?.find(det => det.name === selectedNodeName)?.views.length > 0 ?
                      <GuiBox display="flex" flexDirection="column" sx={{ overflowY: "auto", gap: "12px", width: "100%" }}>
                        <GuiBox display="flex" flexDirection="column" sx={{ overflowY: "auto", gap: "12px" }}>
                          {
                            nodeDetailsList?.find(det => det.name === selectedNodeName)?.views.map(view => {
                              return (
                                <GuiBox display="flex" flexDirection="row" sx={{ mb: `${pxToRem(26)}` }}>
                                  {
                                    view.map(mv => {
                                      return getMicroView(mv)
                                    })
                                  }
                                </GuiBox>
                              )
                            })
                          }
                        </GuiBox>
                        <GuiTypography variant="subtitle2" color="info" fontWeight="bold" >
                          Capacity Allocation
                        </GuiTypography>
                        {
                          selectedNodeName ? <GuiBox display="flex" flexDirection="row" pt="30px" sx={{ overflowY: "auto", gap: "12px" }}>
                            {
                              nodeDetailsList?.find(det => det.name === selectedNodeName)?.charts.map(chart => {
                                return (chart)
                              })
                            }
                          </GuiBox> : null}
                      </GuiBox>
                      : null
                  }
                </GuiBox>
              </GuiBox>
              : null
          }
        </>
      )
    }
    else if (tabValue === 2) {
      const microViews = []
      microViews.push({ k: "desiredInstances", t: "Desired Nodes", d: "Specify the minimum nodes desired", c: modalData.nodeGroup?.scalingConfig?.desiredSize, step: "1", type: "input" })
      microViews.push({ k: "minInstances", t: "Minimum Nodes", d: "Specify the minimum nodes needed", c: modalData.nodeGroup?.scalingConfig?.minSize, step: "1", type: "input" })
      microViews.push({ k: "maxInstances", t: "Maximum Nodes", d: "Specify the maximum nodes for autoscaling", c: modalData.nodeGroup?.scalingConfig?.maxSize, step: "1", type: "input" })
      microViews.push({
        k: "capacityType", t: "Capacity Type", d: "Specify the capacity type", c: modalData.nodeGroup.capacityType, type: "drop",
        options: [{
          n: "On Demand",
          id: "ON_DEMAND"
        },
        {
          n: "Spot",
          id: "SPOT"
        },
        ]
      })
      microViews.push({
        k: "instanceType", t: "Instance Type", d: "The instance type of node to be deployed and its associated memory size.", c: modalData.nodeGroup.instanceTypes[0], type: "drop",
        options: ec2InstanceTypes.map(item => ({
          n: `${item.instance} - ${item.cpu}, ${item.ram} RAM (\$${item.costPerMonth}/m)`,
          id: item.instance
        }))
      })

      return (
        <GuiBox sx={{ overflowY: "auto", p: `${pxToRem(10)}`, pb: `${pxToRem(20)}` }}>
          <GuiTypography variant="subtitle2" color="info" fontWeight="bold" sx={{ mb: `${pxToRem(10)}` }}>
            Resources
          </GuiTypography>

          {
            <GuiBox display="flex" flexDirection="column" sx={{ mb: `${pxToRem(10)}` }}>
              {
                microViews.map(mv => {
                  return getMicroInputView(mv)
                })
              }
            </GuiBox>
          }
        </GuiBox >
      )
    } else if (tabValue === 3) {

      const microViewsList = []

      const clusterObj = kubeServicesData.find(cluster => cluster.clusterDetail.name === modalData.clusterDetails?.name)

      const services = matchKubernetesComponents(clusterObj)

      services?.filter(service => service?.servicename !== "kubernetes").forEach(service => {
        const microViews = []
        microViews.push({ k: "Service name", v: service?.servicename })
        microViews.push({ k: "Cluster IP", v: service?.data?.service?.spec?.clusterIP })
        microViews.push({ k: "type", v: service?.data?.service?.spec?.type })
        microViews.push({ k: "Ports", v: Object.entries(service?.data?.service?.spec?.ports[0]).map(([key, value]) => `${key}: ${value}`)?.join("\r/\r") })

        microViewsList.push(microViews)
      })

      return (
        <GuiBox sx={{ overflowY: "auto", p: `${pxToRem(10)}`, pb: `${pxToRem(20)}` }}>
          <GuiTypography variant="subtitle2" color="info" fontWeight="bold" sx={{ mb: `${pxToRem(10)}` }}>
            Services
          </GuiTypography>
          {
            microViewsList.map(mv => {
              return (<GuiBox display="flex" flexDirection="row" sx={{ mb: `${pxToRem(26)}` }}>
                {
                  mv.map(mv1 => {
                    return getMicroView(mv1)
                  })
                }
              </GuiBox>)
            })
          }
        </GuiBox>
      )
    }
  }

  const getSecondaryPageCommon = (title) => {
    return (
      <>
        <GuiBox display="flex" alignItems="center" mt="20px" mb="20px" ml="20px">
          <GuiTypography variant="subtitle1" color="info" fontWeight="bold" size="40px">
            {title}
          </GuiTypography>
          <GuiButton
            sx={{ ml: "12px", p: "0", borderRadius: "0.75rem", border: "1px solid #26282d", background: "#20212E" }}
            onClick={fetchCurrentServices}
            color="dark"
            iconOnly={true}
            rel="noreferrer"
          >
            {
              serviceDataIsRefreshing ? <CircularProgress size="1rem" thickness={2} sx={{ color: white.main }} /> : <IoRefreshOutline size="18px" color="white" />
            }
          </GuiButton>
        </GuiBox>
      </>
    )
  }

  const getSecondaryPage = () => {
    const selectedClusterDataOG = kubeServicesData?.find(kk => kk?.clusterDetail?.name === workloadFilterData?.cluster)

    let selectedClusterData = {}
    if (selectedClusterDataOG) {
      selectedClusterData = JSON.parse(JSON.stringify(selectedClusterDataOG))
    }
    const tabName = allSecondaryTabs[secondaryPageTabValue]

    console.log("selectedClusterData: ", selectedClusterData)

    switch (tabName) {
      case "Overview":
        return (
          <>
          </>
        )
      case "Nodes":
        return (
          <GuiBox display="flex" alignItems="center" mb="20px">
            {
              selectedClusterData?.nodes?.items ?
                <>
                  <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
                    <Grid item xs={12} md={12} lg={12} mb={pxToRem(18)}>
                      <KubeNodesTable
                        title="All Nodes"
                        cluster={selectedClusterData?.clusterDetail}
                        data={selectedClusterData?.nodes?.items?.filter(node => {
                          if (workloadFilterData["namespace"].includes("all") && workloadFilterData["label"] === "all") {
                            return true
                          } else {
                            if (workloadFilterData["label"] === "all" && !workloadFilterData["namespace"].includes("all")) {
                              return workloadFilterData["namespace"].includes(node?.metadata?.namespace)
                            } else if (workloadFilterData["label"] !== "all" && workloadFilterData["namespace"].includes("all")) {
                              return node?.metadata?.labels?.hasOwnProperty(workloadFilterData["label"])
                            } else {
                              return (workloadFilterData["namespace"].includes(node?.metadata?.namespace) || node?.metadata?.labels?.hasOwnProperty(workloadFilterData["label"]))
                            }
                          }
                        })}
                        pods={selectedClusterData?.pods}
                        triggerKubeDetailModal={triggerKubeDetailModal}
                      />
                    </Grid>
                  </Grid>
                </>
                : null
            }
          </GuiBox>
        )
      case "Pods":
        if (workloadFilterData.searchText && workloadFilterData.searchText !== "n/a" && workloadFilterData.searchText !== "" && workloadFilterData.searchText !== null) {
          selectedClusterData.pods.items = selectedClusterData?.pods?.items?.filter(pod => pod?.metadata?.name?.includes(workloadFilterData?.searchText))
        }
        return (
          <GuiBox display="flex" flexDirection="column" alignItems="start" mb="20px">
            {
              selectedClusterData?.pods?.items ?
                <>
                  <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
                    <Grid item xs={12} md={12} lg={12} mb={pxToRem(18)}>
                      <KubeServicesTable
                        title="All Pods"
                        cluster={selectedClusterData?.clusterDetail}
                        data={parsePodsStatus(selectedClusterData?.pods?.items?.filter(pod => {
                          if (workloadFilterData["namespace"].includes("all") && workloadFilterData["label"] === "all") {
                            return true
                          } else {
                            if (workloadFilterData["label"] === "all" && !workloadFilterData["namespace"].includes("all")) {
                              return workloadFilterData["namespace"].includes(pod?.metadata?.namespace)
                            } else if (workloadFilterData["label"] !== "all" && workloadFilterData["namespace"].includes("all")) {
                              return pod?.metadata?.labels?.hasOwnProperty(workloadFilterData["label"])
                            } else {
                              return (workloadFilterData["namespace"].includes(pod?.metadata?.namespace) || pod?.metadata?.labels?.hasOwnProperty(workloadFilterData["label"]))
                            }
                          }
                        }))}
                        triggerKubeDetailModal={triggerKubeDetailModal}
                        viewPodLogs={viewPodLogs}
                        logsLoading={logsLoading}
                        logsData={logsData}
                      />
                    </Grid>
                  </Grid>
                </>
                : null
            }
          </GuiBox>
        )
      case "Deployments":
        if (workloadFilterData.searchText && workloadFilterData.searchText !== "n/a" && workloadFilterData.searchText !== "" && workloadFilterData.searchText !== null) {
          selectedClusterData.deployments.items = selectedClusterData?.deployments?.items?.filter(dep => dep?.metadata?.name?.includes(workloadFilterData?.searchText))
        }

        return (
          <GuiBox display="flex" alignItems="center" mb="20px">
            {
              selectedClusterData?.deployments?.items ?
                <>
                  <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
                    <Grid item xs={12} md={12} lg={12} mb={pxToRem(18)}>
                      <KubeDeploymentsTable
                        title="All Deployments"
                        data={selectedClusterData?.deployments?.items?.filter(dep => {
                          if (workloadFilterData["namespace"].includes("all")) {
                            return true
                          } else {
                            return workloadFilterData["namespace"].includes(dep?.metadata?.namespace)
                          }
                        })}
                        triggerKubeDetailModal={triggerKubeDetailModal}
                      />
                    </Grid>
                  </Grid>
                </>
                : null
            }
          </GuiBox>
        )
      case "Replica Set":
        return (
          <GuiBox display="flex" alignItems="center" mb="20px">
            {
              selectedClusterData?.replicaSets?.items ?
                <>
                  <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
                    <Grid item xs={12} md={12} lg={12} mb={pxToRem(18)}>
                      <KubeReplicaSetsTable
                        title="All ReplicaSets"
                        data={selectedClusterData?.replicaSets?.items?.filter(dep => {
                          if (workloadFilterData["namespace"].includes("all")) {
                            return true
                          } else {
                            return workloadFilterData["namespace"].includes(dep?.metadata?.namespace)
                          }
                        })}
                        triggerKubeDetailModal={triggerKubeDetailModal}
                      // viewPodLogs={viewPodLogs}
                      // logsLoading={logsLoading}
                      // logsData={logsData}
                      />
                    </Grid>
                  </Grid>
                </>
                : null
            }
          </GuiBox>
        )
      case "Stateful Sets":
        return (
          <GuiBox display="flex" alignItems="center" mb="20px">
            {
              selectedClusterData?.statefulSets?.items ?
                <>
                  <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
                    <Grid item xs={12} md={12} lg={12} mb={pxToRem(18)}>
                      <KubeStatefulSetsTable
                        title="All Stateful Sets"
                        data={selectedClusterData?.statefulSets?.items?.filter(dep => {
                          if (workloadFilterData["namespace"].includes("all")) {
                            return true
                          } else {
                            return workloadFilterData["namespace"].includes(dep?.metadata?.namespace)
                          }
                        })}
                        triggerKubeDetailModal={triggerKubeDetailModal}
                      />
                    </Grid>
                  </Grid>
                </>
                : null
            }
          </GuiBox>
        )
      case "Daemon Sets":
        return (
          <GuiBox display="flex" alignItems="center" mb="20px">
            {
              selectedClusterData?.daemonSets?.items ?
                <>
                  <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
                    <Grid item xs={12} md={12} lg={12} mb={pxToRem(18)}>
                      <KubeDaemonSetsTable
                        title="All Daemon Sets"
                        data={selectedClusterData?.daemonSets?.items?.filter(dep => {
                          if (workloadFilterData["namespace"].includes("all")) {
                            return true
                          } else {
                            return workloadFilterData["namespace"].includes(dep?.metadata?.namespace)
                          }
                        })}
                        triggerKubeDetailModal={triggerKubeDetailModal}
                      />
                    </Grid>
                  </Grid>
                </>
                : null
            }
          </GuiBox>
        )
      case "Jobs":
        return (
          <GuiBox display="flex" alignItems="center" mb="20px">
            {
              selectedClusterData?.jobs?.items ?
                <>
                  <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
                    <Grid item xs={12} md={12} lg={12} mb={pxToRem(18)}>
                      <KubeJobsTable
                        title="All Daemon Sets"
                        data={selectedClusterData?.jobs?.items?.filter(dep => {
                          if (workloadFilterData["namespace"].includes("all")) {
                            return true
                          } else {
                            return workloadFilterData["namespace"].includes(dep?.metadata?.namespace)
                          }
                        })}
                        triggerKubeDetailModal={triggerKubeDetailModal}
                      />
                    </Grid>
                  </Grid>
                </>
                : null
            }
          </GuiBox>
        )
      case "Cron Jobs":
        return (
          <>
          </>
        )
      case "PVC":
        return (
          <>
          </>
        )
      case "Storage":
        return (
          <>
          </>
        )
      default:
        break;
    }
  }

  const getHelmChartsView = () => {
    const selectedClusterData = kubeServicesData?.find(kk => kk?.clusterDetail?.name === workloadFilterData?.cluster)

    return (<GuiBox display="flex" alignItems="center" mb="20px">
      {
        selectedClusterData?.helmCharts ?
          <>
            <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
              <Grid item xs={12} md={12} lg={12} mb={pxToRem(18)}>
                <KubeHelmChartsTable
                  title="All Installed Charts"
                  cluster={selectedClusterData?.clusterDetail}
                  data={selectedClusterData?.helmCharts?.filter(chart => {
                    if (workloadFilterData["namespace"].includes("all")) {
                      return true
                    } else {
                      return workloadFilterData["namespace"].includes(chart?.namespace)
                    }
                  })}
                  triggerKubeDetailModal={triggerKubeDetailModal}
                />
              </Grid>
            </Grid>
          </>
          : null
      }
    </GuiBox>)
  }

  const getPageTabContent = () => {
    if (pageTabValue === 0) {

      let totalNodeGroups = 0
      let totalNodes = 0
      let totalPods = 0
      let totalErrorPods = 0
      let totalDeployments = 0

      let totalReplicaSet = 0
      let totalStatefulSets = 0
      let totalDaemonSets = 0
      let totalJobs = 0
      let totalCronjobs = 0

      let totalNodesCostPerMonth = 0
      let totalNodesPotentialCostSavings = 0

      kubeServicesData?.forEach(em => {
        totalNodeGroups += em?.nodeGroupsDetails?.length ?? 0
        totalNodes += em?.nodes?.items?.length ?? 0

        totalPods += (em?.pods?.items?.filter(pod => pod?.status?.containerStatuses?.[0]?.state?.terminated?.reason !== "Completed")?.length ?? 0);
        totalDeployments += em?.deployments?.items?.length ?? 0

        totalReplicaSet += em?.replicaSets?.items?.length ?? 0
        totalStatefulSets += em?.statefulSets?.items?.length ?? 0
        totalDaemonSets += em?.daemonSets?.items?.length ?? 0
        totalJobs += em?.jobs?.items?.length ?? 0
        totalCronjobs += em?.cronJobs?.items?.length ?? 0

        em?.pods?.items?.forEach(pd => {
          const error = (pd?.status?.containerStatuses?.reduce((acc, cur) => {
            if (cur.ready) {
              return acc + 1;
            } else if (cur.state?.terminated?.reason === "Completed") {
              return acc + 1; // Count as "healthy" if terminated with "Completed" reason
            }
            return acc; // Otherwise, don't increment the count
          }, 0) || 0) !== pd?.spec?.containers?.length;

          if (error) {
            totalErrorPods += 1;
          }
        });

        em?.nodes?.items?.forEach(it => {
          const instanceCostsDetails = ec2PricingMap.find(ins => ins?.InstanceType === it?.metadata?.labels?.["node.kubernetes.io/instance-type"])

          let costPerMonth = 0

          if (instanceCostsDetails) {
            const capType = ((it?.metadata?.labels?.["eks.amazonaws.com/capacityType"] ?? it?.metadata?.labels?.["karpenter.sh/capacity-type"])?.replace("_", " ")?.toUpperCase())
            costPerMonth = capType === "ON DEMAND" ? instanceCostsDetails?.Cost * 720 : instanceCostsDetails?.SpotPrice * 720

            if (capType === "ON DEMAND") {
              totalNodesPotentialCostSavings += (instanceCostsDetails?.Cost - instanceCostsDetails?.SpotPrice) * 720
            }
          }
          totalNodesCostPerMonth += costPerMonth
        })
      });

      return (<>
        <GuiBox display="flex" alignItems="center" mt="20px" mb="20px">
          <GuiTypography variant="subtitle1" color="info" fontWeight="bold" size="40px">
            Overview
          </GuiTypography>
          <GuiButton
            sx={{ ml: "12px", p: "0", borderRadius: "0.75rem", border: "1px solid #26282d", background: "#20212E" }}
            onClick={fetchCurrentServices}
            color="dark"
            iconOnly={true}
            rel="noreferrer"
          >
            {
              serviceDataIsRefreshing ? <CircularProgress size="1rem" thickness={2} sx={{ color: white.main }} /> : <IoRefreshOutline size="18px" color="white" />
            }
          </GuiButton>
        </GuiBox>
        {
          kubeServicesData !== null && kubeServicesData !== undefined ?
            <>
              {
                kubeServicesData?.length > 0 ?
                  <>
                    {
                      localStorage.getItem('toggleLocalK8s') === 'true' ? null :

                        <GuiBox display="flex" alignItems="center" justifyContent="start" sx={{ gap: "12px", width: "39.5%", mb: "24px" }}>
                          <MiniStatisticsCard
                            title={{ text: "Estimated Monthly Cost", fontWeight: "regular" }}
                            count={"$" + totalNodesCostPerMonth?.toFixed(1)}
                            type="info"
                            percentage={{ color: "white", text: "all regions" }}
                            icon={{ color: "info", component: <IoKey size="20px" color="white" /> }}
                          />

                          <MiniStatisticsCard
                            title={{ text: "Potential Cost Savings", fontWeight: "regular" }}
                            count={"$" + totalNodesPotentialCostSavings?.toFixed(1)}
                            percentage={{ color: "white", text: "all regions" }}
                            icon={{ color: "info", component: <IoKey size="20px" color="white" /> }}
                          />
                        </GuiBox>
                    }
                    <GuiTypography variant="subtitle2" color="info" fontWeight="bold" mb="12px">
                      Workload Metrics
                    </GuiTypography>
                    <GuiBox display="flex" alignItems="start" justifyContent="start" sx={{ gap: "12px" }}>
                      <MiniStatisticsCard
                        title={{ text: "Clusters", fontWeight: "regular" }}
                        count={kubeServicesData?.length}
                        percentage={{ color: "white", text: "all healthy" }}
                        icon={{ color: "info", component: <IoKey size="20px" color="white" /> }}
                      />
                      <MiniStatisticsCard
                        title={{ text: "Node Groups", fontWeight: "regular" }}
                        count={totalNodeGroups}
                        percentage={{ color: "white", text: "all healthy" }}
                        icon={{ color: "info", component: <IoKey size="20px" color="white" /> }}
                      />
                      <MiniStatisticsCard
                        title={{ text: "Nodes", fontWeight: "regular" }}
                        count={totalNodes}
                        percentage={{ color: "white", text: "all healthy" }}
                        icon={{ color: "info", component: <IoKey size="20px" color="white" /> }}
                      />
                      {
                        totalErrorPods > 0
                          ?
                          <MiniStatisticsCard
                            title={{ text: "Pods", fontWeight: "regular" }}
                            count={totalPods}
                            type="error"
                            percentage={{ color: "white", text: totalErrorPods + " unhealthy" }}
                            icon={{ color: "info", component: <IoKey size="20px" color="white" /> }}
                          />
                          :
                          <MiniStatisticsCard
                            title={{ text: "Pods", fontWeight: "regular" }}
                            count={totalPods}
                            percentage={{ color: "white", text: "all healthy" }}
                            icon={{ color: "info", component: <IoKey size="20px" color="white" /> }}
                          />
                      }

                      <MiniStatisticsCard
                        title={{ text: "Deployments", fontWeight: "regular" }}
                        count={totalDeployments}
                        percentage={{ color: "white", text: "all healthy" }}
                        icon={{ color: "info", component: <IoKey size="20px" color="white" /> }}
                      />
                      {/* </GuiBox> */}
                      {/* <GuiBox display="flex" alignItems="center" justifyContent="start" sx={{ gap: "12px", mt: "24px" }}> */}

                      <MiniStatisticsCard
                        title={{ text: "Stateful Sets", fontWeight: "regular" }}
                        count={totalStatefulSets}
                        percentage={{ color: "white", text: "all healthy" }}
                        icon={{ color: "info", component: <IoKey size="20px" color="white" /> }}
                      />
                      <MiniStatisticsCard
                        title={{ text: "Replica Sets", fontWeight: "regular" }}
                        count={totalReplicaSet}
                        percentage={{ color: "white", text: "all healthy" }}
                        icon={{ color: "info", component: <IoKey size="20px" color="white" /> }}
                      />
                      <MiniStatisticsCard
                        title={{ text: "Daemon Sets", fontWeight: "regular" }}
                        count={totalDaemonSets}
                        percentage={{ color: "white", text: "all healthy" }}
                        icon={{ color: "info", component: <IoKey size="20px" color="white" /> }}
                      />
                      <MiniStatisticsCard
                        title={{ text: "Jobs", fontWeight: "regular" }}
                        count={totalJobs}
                        percentage={{ color: "white", text: "all healthy" }}
                        icon={{ color: "info", component: <IoKey size="20px" color="white" /> }}
                      />
                      <MiniStatisticsCard
                        title={{ text: "Cron Jobs", fontWeight: "regular" }}
                        count={totalCronjobs}
                        percentage={{ color: "white", text: "all healthy" }}
                        icon={{ color: "info", component: <IoKey size="20px" color="white" /> }}
                      />
                    </GuiBox>
                    <GuiBox display="flex" alignItems="center" mt="36px" mb="36px">
                      <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
                        <Grid item xs={12} md={12} lg={12} mb={pxToRem(18)}>
                          <KubeEventsTable title="K8s Events" data={kubeServicesData?.map(em => em.events?.items).flat().sort((a, b) => new Date(b.lastTimestamp) - new Date(a.lastTimestamp))?.filter(e => e !== undefined)} />
                        </Grid>
                      </Grid>

                    </GuiBox>
                  </>
                  :
                  <GuiBox display="flex" py={10} justifyContent="center" flexDirection="column" alignItems="center" sx={{ gap: "12px" }}>
                    <GuiBox component='img' src={EmptySpace} sx={{ maxWidth: "200px" }} />
                    <GuiTypography variant="h5" fontWeight="bold" color="white" sx={{ textWrap: "wrap", fontSize: `${pxToRem(16)}`, whiteSpace: "pre-line" }}>
                      No services found, launch a new EKS stack to create one
                    </GuiTypography>
                  </GuiBox>
              }
            </>
            : <GuiBox display="flex" py={35} justifyContent="center"><CircularProgress sx={{ color: info.main }} /></GuiBox>
        }
      </>
      )
    }
    else if (pageTabValue === 5) {
      return (<>
        <GuiBox display="flex" alignItems="center" mt="20px" mb="20px">
          <GuiTypography variant="subtitle1" color="info" fontWeight="bold" size="40px">
            Pod Metrics
          </GuiTypography>
          <GuiButton
            sx={{ ml: "12px", p: "0", borderRadius: "0.75rem", border: "1px solid #26282d", background: "#20212E" }}
            onClick={fetchCurrentServices}
            color="dark"
            iconOnly={true}
            rel="noreferrer"
          >
            {
              serviceDataIsRefreshing ? <CircularProgress size="1rem" thickness={2} sx={{ color: white.main }} /> : <IoRefreshOutline size="18px" color="white" />
            }
          </GuiButton>
        </GuiBox>
        {
          kubeServicesData !== null && kubeServicesData !== undefined ?
            <>
              {
                kubeServicesData?.length > 0 ?
                  <>
                    {
                      podMetrics?.length > 0 ?
                        <Suspense fallback={<GuiBox display="flex" justifyContent="center"><CircularProgress sx={{ color: info.main }} /></GuiBox>}>
                          <PodMetricsChart podMetrics={podMetrics} allClusterNames={allClusterNames} allNamespaces={allNamespaces} />
                        </Suspense>
                        : null
                    }
                  </>
                  :
                  <GuiBox display="flex" py={10} justifyContent="center" flexDirection="column" alignItems="center" sx={{ gap: "12px" }}>
                    <GuiBox component='img' src={EmptySpace} sx={{ maxWidth: "200px" }} />
                    <GuiTypography variant="h5" fontWeight="bold" color="white" sx={{ textWrap: "wrap", fontSize: `${pxToRem(16)}`, whiteSpace: "pre-line" }}>
                      No services found, launch a new EKS stack to create one
                    </GuiTypography>
                  </GuiBox>
              }
            </>
            : <GuiBox display="flex" py={35} justifyContent="center"><CircularProgress sx={{ color: info.main }} /></GuiBox>
        }
      </>
      )
    }
    else if (pageTabValue === 1) {
      return (<>
        <GuiBox display="flex" alignItems="center" mt="20px" mb="20px">
          <GuiTypography variant="subtitle1" color="info" fontWeight="bold" size="40px">
            Clusters
          </GuiTypography>
          <GuiButton
            sx={{ ml: "12px", p: "0", borderRadius: "0.75rem", border: "1px solid #26282d", background: "#20212E" }}
            onClick={fetchCurrentServices}
            color="dark"
            iconOnly={true}
            rel="noreferrer"
          >
            {
              serviceDataIsRefreshing ? <CircularProgress size="1rem" thickness={2} sx={{ color: white.main }} /> : <IoRefreshOutline size="18px" color="white" />
            }
          </GuiButton>
        </GuiBox>
        {
          kubeServicesData !== null ?
            <>
              {
                kubeServicesData.length > 0 ?
                  <>
                    {
                      kubeServicesData?.map(cluster => {
                        return (
                          <>
                            <GuiBox display="flex" alignItems="center" mb="20px">
                              {
                                cluster?.clusterDetail?.name ?
                                  <>
                                    <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
                                      <Grid item xs={12} md={12} lg={12} mb={pxToRem(18)}>
                                        <KubeTable version={cluster?.clusterDetail?.version} title={cluster?.clusterDetail?.name} data={cluster} triggerKubeDetailModal={triggerKubeDetailModal} region={extractRegionFromEksArn(cluster?.clusterDetail?.arn)} tableAction={triggerCreateNodeGroupAction} triggerServiceDetailModal={triggerServiceDetailModal} />
                                      </Grid>
                                    </Grid>
                                  </>
                                  : null
                              }
                            </GuiBox>
                          </>
                        )
                      })
                    }
                  </>
                  :
                  <GuiBox display="flex" py={10} justifyContent="center" flexDirection="column" alignItems="center" sx={{ gap: "12px" }}>
                    <GuiBox component='img' src={EmptySpace} sx={{ maxWidth: "200px" }} />
                    <GuiTypography variant="h5" fontWeight="bold" color="white" sx={{ textWrap: "wrap", fontSize: `${pxToRem(16)}`, whiteSpace: "pre-line" }}>
                      No services found, launch a new EKS stack to create one
                    </GuiTypography>
                  </GuiBox>
              }
            </>
            : <GuiBox display="flex" py={35} justifyContent="center"><CircularProgress sx={{ color: info.main }} /></GuiBox>
        }
      </>)
    } else if (pageTabValue === 3) {
      return (<>
        <GuiBox sx={{
          mt: `${pxToRem(20)} !important`,
          backgroundColor: white.main,
          backgroundImage: white.main,
          height: pxToRem(1),
          margin: `${pxToRem(16)} 0`,
          borderBottom: "none",
          opacity: 0.10,
        }}></GuiBox>
        <GuiBox display="flex" alignItems="center" justifyContent="space-between" mb="6px" mt="12px" mr="36px">
          {getSecondaryPageCommon("Pipelines")}
        </GuiBox>
        <GuiBox display="flex" alignItems="center" mb="36px">
          <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
            <Grid item xs={12} md={12} lg={12} mb={pxToRem(18)}>
              <KubePipelinesTable title="K8s Events" data={kubePipelines} triggerKubeDetailModal={viewPipelineLogs} />
            </Grid>
          </Grid>
        </GuiBox>
      </>)
    }
    else if (pageTabValue === 2) {

      return (<>
        <GuiBox sx={{
          mt: `${pxToRem(20)} !important`,
          backgroundColor: white.main,
          backgroundImage: white.main,
          height: pxToRem(1),
          margin: `${pxToRem(16)} 0`,
          borderBottom: "none",
          opacity: 0.10,
        }}></GuiBox>
        <Tabs
          orientation="horizontal"
          value={secondaryPageTabValue}
          onChange={handleSecondaryPageSetTabValue}
          sx={{
            background: "transparent", display: "flex", justifyContent: "flex-start", mb: `${pxToRem(10)}`
          }}
        >
          {
            allSecondaryTabs?.map(tab => {
              return (
                <Tab label={tab?.toLocaleUpperCase()} />
              )
            })
          }

        </Tabs>
        <GuiBox display="flex" alignItems="center" justifyContent="space-between" mb="6px" mt="12px" mr="36px">
          {getSecondaryPageCommon(allSecondaryTabs[secondaryPageTabValue])}
          <GuiBox display="flex" alignItems="center" mb="6px" mt="12px">
            <GuiInput
              placeholder="search..."
              autoFocus
              onChange={(e) => handleFilterChange("searchText", e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== "Escape") {
                  // Prevents autoselecting item while typing (default Select behaviour)
                  e.stopPropagation();
                }
              }}
              sx={({ breakpoints }) => ({
                margin: "8px",
                minWidth: "450px"
              })}
            />

            <FilterIcon width="36px" height="36px" />
            <FormControl sx={{ ml: "0.5rem", mr: "0.5rem", flexShrink: 0, mr: "12px" }}>
              <GuiSelect
                IconComponent={() => <ExpandMoreRounded />}
                variant="outlined"
                sx={{ m: 0 }}
                color="white"
                size="small"
                value={workloadFilterData["cluster"]}
                displayEmpty
                onChange={(e) => handleFilterChange("cluster", e.target.value)}
                inputProps={{ 'aria-label': 'Without label' }}
                renderValue={(selected) => {
                  if (localStorage.getItem('toggleLocalK8s') === 'true') {
                    let cleanedClusterName = selected
                    if (cleanedClusterName?.includes("arn:aws:eks")) {
                      cleanedClusterName = cleanedClusterName?.split("/")[1]
                    }
                    return `Cluster: ${cleanedClusterName}`
                  }
                  return `Cluster: ${selected}`
                }}              >
                {/* <MenuItem value={workloadFilterData["cluster"]}>
                  <GuiBox display="flex" alignItems="center" p="0px" sx={{ gap: "8px" }}>
                    {workloadFilterData["cluster"]}
                  </GuiBox>
                </MenuItem> */}
                {allClusterNames?.map(it => (
                  <MenuItem key={it} value={it} >
                    <GuiBox display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" sx={{ gap: "8px", color: "inherit", width: "-webkit-fill-available" }}>
                      <GuiTypography variant="h5" fontWeight="regular" sx={{ textWrap: "wrap", fontSize: `${pxToRem(14)}`, color: "inherit !important" }}>
                        {it}
                      </GuiTypography>
                      {
                        workloadFilterData["cluster"] === it ?
                          <FaCheck color="inherit" />
                          : null
                      }
                    </GuiBox>
                  </MenuItem>
                ))}
              </GuiSelect>
            </FormControl>
            <FormControl sx={{ mr: "0.5rem", flexShrink: 0, mr: "12px" }}>
              <GuiSelect
                IconComponent={() => <ExpandMoreRounded />}
                variant="outlined"
                sx={{ m: 0 }}
                color="white"
                size="small"
                value={workloadFilterData["namespace"]}
                displayEmpty
                onChange={(e) => handleFilterChange("namespace", e.target.value)}
                inputProps={{ 'aria-label': 'Without label' }}
                renderValue={(selected) => {
                  return `Namespaces: ${selected.join(", ")}`
                }}              >
                {/* <MenuItem value={workloadFilterData["namespace"]}>
                  <GuiBox display="flex" alignItems="center" p="0px" sx={{ gap: "8px" }}>
                    {workloadFilterData["namespace"]}
                  </GuiBox>
                </MenuItem> */}

                {allNamespaces?.map(it => (
                  <MenuItem key={it} value={it} >
                    <GuiBox display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" sx={{ gap: "8px", color: "inherit", width: "-webkit-fill-available" }}>
                      <GuiTypography variant="h5" fontWeight="regular" sx={{ textWrap: "wrap", fontSize: `${pxToRem(14)}`, color: "inherit !important" }}>
                        {it}
                      </GuiTypography>
                      {
                        workloadFilterData["namespace"]?.includes(it) ?
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
                disabled={(workloadFilterData["namespace"]?.length === 1 && workloadFilterData["namespace"]?.includes("all"))}
                onClick={() => {
                  setWorkloadFilterData({
                    ...workloadFilterData,
                    "namespace": ["all"]
                  });
                  localStorage.setItem("workloadFilterData", JSON.stringify({
                    ...workloadFilterData,
                    "namespace": ["all"]
                  }))
                }} color="dark"
                iconOnly={true}
                rel="noreferrer"
              >
                {
                  <Cancel01Icon />
                }
              </GuiButton>
            </Tooltip>
          </GuiBox>
        </GuiBox>
        {
          secondaryPageTabValue > -1 ? <> {getSecondaryPage(secondaryPageTabValue)} </> : null
        }

      </>)
    } else if (pageTabValue === 4) {

      return (<>
        <GuiBox sx={{
          mt: `${pxToRem(20)} !important`,
          backgroundColor: white.main,
          backgroundImage: white.main,
          height: pxToRem(1),
          margin: `${pxToRem(16)} 0`,
          borderBottom: "none",
          opacity: 0.10,
        }}></GuiBox>
        <GuiBox display="flex" alignItems="center" justifyContent="space-between" mb="6px" mt="12px" mr="36px">
          {getSecondaryPageCommon("Helm Charts")}
          <GuiBox display="flex" alignItems="center" mb="6px" mt="12px">
            <FormControl sx={{ mr: "0.5rem", flexShrink: 0, mr: "12px" }}>
              <GuiSelect
                IconComponent={() => <ExpandMoreRounded />}
                variant="outlined"
                sx={{ m: 0 }}
                color="white"
                size="small"
                value={workloadFilterData["cluster"]}
                displayEmpty
                onChange={(e) => handleFilterChange("cluster", e.target.value)}
                inputProps={{ 'aria-label': 'Without label' }}
                renderValue={(selected) => {
                  return `Cluster: ${selected}`
                }}
              >
                {allClusterNames?.map(it => (
                  <MenuItem key={it} value={it} >
                    <GuiBox display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" sx={{ gap: "8px", color: "inherit", width: "-webkit-fill-available" }}>
                      <GuiTypography variant="h5" fontWeight="regular" sx={{ textWrap: "wrap", fontSize: `${pxToRem(14)}`, color: "inherit !important" }}>
                        {it}
                      </GuiTypography>
                      {
                        workloadFilterData["cluster"] === it ?
                          <FaCheck color="inherit" />
                          : null
                      }
                    </GuiBox>
                  </MenuItem>
                ))}
              </GuiSelect>
            </FormControl>
            <FormControl sx={{ mr: "0.5rem", flexShrink: 0, mr: "12px" }}>
              <GuiSelect
                IconComponent={() => <ExpandMoreRounded />}
                variant="outlined"
                sx={{ m: 0 }}
                color="white"
                size="small"
                value={workloadFilterData["namespace"]}
                displayEmpty
                onChange={(e) => handleFilterChange("namespace", e.target.value)}
                inputProps={{ 'aria-label': 'Without label' }}
                renderValue={(selected) => {
                  return `Namespaces: ${selected.join(", ")}`
                }}
              >
                {allNamespaces?.map(it => (
                  <MenuItem key={it} value={it} >
                    <GuiBox display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" sx={{ gap: "8px", color: "inherit", width: "-webkit-fill-available" }}>
                      <GuiTypography variant="h5" fontWeight="regular" sx={{ textWrap: "wrap", fontSize: `${pxToRem(14)}`, color: "inherit !important" }}>
                        {it}
                      </GuiTypography>
                      {
                        workloadFilterData["namespace"]?.includes(it) ?
                          <FaCheck color="inherit" />
                          : null
                      }
                    </GuiBox>
                  </MenuItem>
                ))}
                {allNamespaces?.filter(k => !workloadFilterData["namespace"].includes(k))?.map(it => (
                  <MenuItem key={it} value={it}>{it}</MenuItem>
                ))}
              </GuiSelect>
            </FormControl>
          </GuiBox>
        </GuiBox>
        {
          secondaryPageTabValue > -1 ? <> {getHelmChartsView(secondaryPageTabValue)} </> : null
        }
      </>)
    }
  }

  return (
    <DashboardLayout>
      <React.Fragment key={"right"}>
        <DashboardNavbar />
        <Modal
          open={alertModalOpen}
          onClose={handleAlertModalClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <GuiBox display="flex" justifyContent="center" alignItems="start" sx={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} >
            <Card sx={{ borderRadius: "0.75rem", border: "1px solid #26282d", p: `${pxToRem(32)}`, backdropFilter: "blur(16px)", width: "fit-content" }}>
              <GuiTypography variant="h4" color="white" fontWeight="bold">
                Confirm Action
              </GuiTypography>
              <GuiTypography variant="h6" color="white" fontWeight="regular" sx={{ mt: `${pxToRem(12)}` }}>
                {alertModalData?.title}
              </GuiTypography>
              {
                alertModalData?.subtitle ?
                  <GuiTypography variant="h6" color="white" fontWeight="regular" sx={{ opacity: 0.8, mt: `${pxToRem(8)}` }}>
                    {alertModalData?.subtitle}
                  </GuiTypography>
                  : null
              }
              {
                alertModalData?.elements ?
                  <>
                    {
                      alertModalData?.elements.map(elem => {
                        if (elem.key === "dropdown") {
                          return (
                            <FormControl margin="none" sx={{ m: "0px", width: "fit-content", mt: `${pxToRem(24)}` }}>
                              <GuiSelect
                                IconComponent={() => <ExpandMoreRounded />}
                                variant="outlined"
                                sx={{ m: 0 }}
                                color="white"
                                size="small"
                                value={tempConfirmationModalSelectionData[elem.value.key] ?? ""}
                                onChange={(e) => handleConfirmationModalSelectionDataChange(elem.value.key, e.target.value)}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                              >
                                <MenuItem disabled value="">
                                  {elem.value.name}
                                </MenuItem>
                                {elem.value.options.map(it => (
                                  <MenuItem key={it.n} value={it.id} sx={{ color: "inherit" }}>
                                    <GuiBox display="flex" alignItems="center" sx={{ color: "inherit" }}>
                                      <GuiAvatar src={it.a} variant="rounded" shadow="md" sx={{
                                        width: pxToRem(24),
                                        height: pxToRem(24),
                                        mr: "4px"
                                      }} />
                                      <span sx={{ color: "inherit" }}>{it.n}</span>
                                    </GuiBox>
                                  </MenuItem>
                                ))}
                              </GuiSelect>
                            </FormControl>
                          )
                        }
                      })
                    }
                  </>
                  : null
              }
              <GuiBox display="flex" alignItems="center" justifyContent="start" sx={{ width: "400px", gap: `${pxToRem(12)}`, mt: `${pxToRem(24)}` }}>
                <GuiButton
                  onClick={handleAlertModalClose}
                  color="white"
                  sx={{ textAlign: "start", display: "flex" }}
                  rel="noreferrer"
                >
                  <GuiTypography variant="h6" fontWeight="regular" color="dark" p="0px" sx={{ minWidth: "100%" }}>
                    Cancel
                  </GuiTypography>
                </GuiButton>
                <GuiButton
                  onClick={() => triggerModalConfirmation()}
                  color="info"
                  sx={{ textAlign: "start", display: "flex" }}
                  rel="noreferrer"
                >
                  <GuiTypography variant="h6" fontWeight="bold" color="white" p="0px" sx={{ minWidth: "100%" }}>
                    Confirm
                  </GuiTypography>
                </GuiButton>
              </GuiBox>
            </Card>
          </GuiBox>
        </Modal>
        <Drawer
          anchor="right"
          open={modalOpen}
          ModalProps={{
            keepMounted: true,
            disableBackdropClick: true
          }}
          PaperProps={{
            sx: { minWidth: "82%", background: "transparent !important", borderRadius: "0.75rem" },
          }}
        >
          <GuiBox display="flex"
            sx={{ minHeight: '100%' }}
          >
            <Card sx={{ borderRadius: "0.75rem", border: "1px solid #26282d", minHeight: '100%', maxWidth: "100%", minWidth: "100%", p: "0px" }}>
              {
                modalData?.nodeGroup ?
                  <>
                    <GuiBox display="flex" flexDirection="column"
                      sx={{ pb: `${pxToRem(80)}`, pt: `${pxToRem(20)}`, pl: `${pxToRem(20)}`, pr: `${pxToRem(20)}`, height: "100%" }}
                    >
                      <GuiBox display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: `${pxToRem(10)}` }}>

                        <GuiBox display="flex" alignItems="center" sx={{ gap: "12px" }}>
                          <GuiButton
                            sx={{ p: "0", borderRadius: "0.75rem", border: "none", background: "#20212E" }}
                            onClick={handleModalClose}
                            color="dark"
                            iconOnly={true}
                            rel="noreferrer"
                          >
                            {
                              <IoClose size="20px" color="white" />
                            }
                          </GuiButton>
                          <GuiTypography variant="subtitle1" color="white" fontWeight="bold">
                            {modalData?.nodeGroup?.nodegroupName}
                          </GuiTypography>
                          <GuiButton
                            sx={{ p: "0", borderRadius: "0.75rem", border: "1px solid #26282d", background: "#20212E" }}
                            onClick={fetchCurrentServices}
                            color="dark"
                            iconOnly={true}
                            rel="noreferrer"
                          >
                            {
                              serviceDataIsRefreshing ? <CircularProgress size="1rem" thickness={2} sx={{ color: white.main }} /> : <IoRefreshOutline size="18px" color="white" />
                            }
                          </GuiButton>
                        </GuiBox>

                        {
                          getUserRoleLevel(sharedState, currentUserObj?.email ?? "") === 9999 ?
                            <GuiButton
                              onClick={() => deleteKubeResource("nodegroup")}
                              color="error"
                              disabled={modalData?.nodeGroup?.status !== "ACTIVE"}
                              sx={{ textAlign: "start", display: "flex" }}
                              rel="noreferrer"
                            >
                              <Delete size="25px" color="white" sx={{ mr: "8px" }} />
                              <GuiTypography variant="h7" fontWeight="bold" color="white" pl="0px" >
                                Delete Node Group
                              </GuiTypography>
                            </GuiButton>
                            : null
                        }
                      </GuiBox>
                      <Divider light sx={{ mb: `${pxToRem(10)}` }} />
                      <Tabs
                        orientation="horizontal"
                        value={tabValue}
                        onChange={handleSetTabValue}
                        sx={{ background: "transparent", display: "flex", justifyContent: "flex-start", mb: `${pxToRem(10)}` }}
                      >
                        <Tab label="OVERVIEW" />
                        <Tab label="NODES" />
                        <Tab label="CONFIGURATION" />
                        <Tab label="SERVICES" />
                      </Tabs>
                      {
                        tabValue > -1 ? <> {getTabContent(tabValue)} </> : null
                      }
                    </GuiBox>
                    <GuiBox display="flex" alignItems="center" justifyContent="space-between" sx={{ borderRadius: "0.75rem", minWidth: `calc(100%)`, overflowY: "auto", position: "absolute", bottom: "0", p: `${pxToRem(10)}`, backgroundColor: "#05050a" }}>
                      <GuiTypography variant="h5" fontWeight="regular" color="white" sx={{ pl: `${pxToRem(12)}` }}>
                        {/* <span>Estimated Cost: </span><span><b>{`~$${9.01 * 4 * (tempModalSelectionData["cpu"] ?? 0) * (tempModalSelectionData["minInstances"] ?? 0)}/month`}</b></span> */}
                      </GuiTypography>
                      <GuiBox display="flex" alignItems="center" justifyContent="right" mr={pxToRem(16)}>
                        {
                          getUserRoleLevel(sharedState, currentUserObj?.email ?? "") > 0 ?
                            <GuiButton
                              onClick={() => updateService("nodegroup")}
                              color={(modalRunText === "Update" || modalRunText === "Send for Approval") ? "info" : (modalRunText === "Completed" ? "success" : "warning")}
                              loadingColor={"white"}
                              loading={modalActionRunning}
                              disabled={(!tempModalSelectionData["runEnabled"] && modalRunText !== "Completed")}
                              sx={{ textAlign: "start", display: "flex", ml: `${pxToRem(12)}` }}
                              rel="noreferrer"
                            >
                              <>
                                <GuiTypography variant="h6" fontWeight="bold" color={modalRunText !== "Completed" ? "white" : "white"} pl="" sx={{ mr: "8px" }}>
                                  {modalRunText}
                                </GuiTypography>
                                {
                                  (modalRunText === "Update" || modalRunText === "Send for Approval") ?
                                    <HiArrowRight size="20px" color="white" />
                                    : modalRunText === "Completed" ? <CheckCircle size="25px" color="dark" /> : <ErrorRounded size="25px" color="dark" />
                                }
                              </>
                            </GuiButton>
                            : null
                        }

                      </GuiBox>
                    </GuiBox>
                  </>
                  : null
              }
            </Card>
          </GuiBox>
        </Drawer>

        <Drawer
          anchor="right"
          open={logsModalOpen}
          ModalProps={{
            keepMounted: true,
            disableBackdropClick: true
          }}
          PaperProps={{
            sx: { minWidth: "82%", background: "transparent !important", borderRadius: "0.75rem" },
          }}
        >
          <GuiBox display="flex"
            sx={{ minHeight: '100%' }}
          >
            {
              logsData && logsLoading !== null && logsModalOpen === true ?
                <Card sx={{ borderRadius: "0.75rem", border: "1px solid #26282d", minHeight: '100%', maxWidth: "100%", minWidth: "100%", p: "14px", overflowX: "hidden", overflowY: "auto" }}>
                  <GuiBox display="flex"
                    sx={{ gap: '12px', mb: "12px", mt: "12px" }}
                  >
                    <GuiButton
                      sx={{ p: "0", borderRadius: "0.75rem", border: "1px solid #26282d", background: "#20212E" }}
                      onClick={() => setLogsModalOpen(false)}
                      color="dark"
                      iconOnly={true}
                      rel="noreferrer"
                    >
                      {
                        <IoClose size="18px" color="white" />
                      }
                    </GuiButton>

                    <GuiTypography variant="subtitle1" color="white" fontWeight="bold">
                      {logsData?.metadata?.name}
                    </GuiTypography>

                    <GuiButton
                      sx={{ p: "0", borderRadius: "0.75rem", border: "1px solid #26282d", background: "#20212E" }}
                      onClick={() => viewPodLogs(logsData?.metadata)}
                      color="dark"
                      iconOnly={true}
                      rel="noreferrer"
                    >
                      {
                        logsLoading ? <CircularProgress size="1rem" thickness={2} sx={{ color: white.main }} /> : <IoRefreshOutline size="18px" color="white" />
                      }
                    </GuiButton>
                  </GuiBox>

                  {
                    logsData?.aiAnalysis ?
                      <>
                        <GuiBox sx={{
                          alignItems: "start",
                          display: "flex",
                          flexDirection: "column",
                          mb: `${pxToRem(12)}`,
                          gap: "12px"
                        }}>

                          <GuiBox sx={{
                            alignItems: "center",
                            display: "flex",
                            flexDirection: "row",
                            gap: "4px"
                          }}>
                            <StarsIcon width="20" height="20" color="#818aff" style={{ flexShrink: 0 }} />
                            <GuiTypography variant="subtitle2" color="info" fontWeight="bold" >
                              AI Analysis
                            </GuiTypography>
                            <CircleArrowDown01Icon width="20" height="20" color="#818aff" style={{ flexShrink: 0, rotate: AISectionOpen ? "180deg" : "0deg", transition: "all 0.1s ease-in-out" }} onClick={() => setAISectionOpen(!AISectionOpen)} />
                          </GuiBox>

                          <GuiBox sx={{
                            borderRadius: "0.75rem",
                            border: "0.5px solid #26282d",
                            p: "14px",
                            position: "relative",
                            display: "flex",
                            flexDirection: "column",
                            overflowX: "hidden",
                            '&:before': {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '2px',
                              background: 'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, #818aff 50%, rgba(0, 0, 0, 0) 100%)',
                              zIndex: 1,
                            },
                            '& > *': {
                              position: 'relative',
                              zIndex: 2,
                            },
                          }}>

                            <MarkdownRenderer content={AISectionOpen ? logsData?.aiAnalysis : logsData?.aiAnalysis?.slice(0, 200)} />

                            {/* <GuiTypography variant="button" color="white" fontWeight="regular" sx={{ maxWidth: "100%", textWrap: "wrap", whiteSpace: "pre-wrap" }}>
                              {AISectionOpen ? logsData?.aiAnalysis : logsData?.aiAnalysis?.slice(0, 200)}
                            </GuiTypography> */}
                            <GuiTypography
                              onClick={() => setAISectionOpen(!AISectionOpen)}
                              variant="button" color="info" fontWeight="regular" sx={{ mt: "4px", cursor: "pointer", color: "#818aff !important", textDecoration: "underline" }}>
                              show {AISectionOpen ? "less" : "more"}...
                            </GuiTypography>
                          </GuiBox>
                        </GuiBox>


                      </> : null
                  }

                  <GuiTypography variant="subtitle2" color="info" fontWeight="bold" sx={{ mb: `${pxToRem(10)}` }}>
                    Past {localStorage.getItem('toggleLocalK8s') === 'true' ? 1000 : 200} logs
                  </GuiTypography>

                  {/* <SyntaxHighlighter language="terminal" style={darkCodeTheme} className="logsClass"
                  customStyle={{ whiteSpace: 'pre-wrap', overflowX: 'hidden', wordWrap: 'break-word' }}
                > */}


                  <GuiInput
                    placeholder="search logs..."
                    autoFocus
                    value={logsSearchTerm}
                    onChange={handleLogsSearchChange}
                    onKeyDown={(e) => {
                      if (e.key !== "Escape") {
                        // Prevents autoselecting item while typing (default Select behaviour)
                        e.stopPropagation();
                      }
                    }}
                    sx={({ breakpoints }) => ({
                      marginBottom: "8px",
                      minWidth: "450px",
                      maxWidth: "450px"
                    })}
                  />

                  <AutoSizer>
                    {({ width, height }) => (
                      <>
                        <Card sx={{ borderRadius: "0.75rem", border: "1px solid #26282d", width: width, height: (height - 140), p: "12px", overflowX: "hidden", overflowY: "auto" }}>
                          <List
                            key={filteredLogs?.length ?? 0}
                            width={width}
                            height={height - 140}
                            ref={listRef}
                            rowCount={filteredLogs?.length ?? 0}
                            deferredMeasurementCache={cache}
                            rowHeight={cache.rowHeight}
                            overscanRowCount={200}
                            scrollToIndex={filteredLogs?.length + 20}
                            rowRenderer={({ key, index, style, parent }) => (
                              <CellMeasurer
                                key={key}
                                cache={cache}
                                parent={parent}
                                columnIndex={0}
                                rowIndex={index}
                              >
                                <div key={key} style={style}>
                                  <GuiTypography variant="subtitle2" color="white" fontWeight="regular"
                                    sx={{ pl: "8px", pr: "4px", mt: "4px", mb: "4px", fontSize: "14px", whiteSpace: 'pre-wrap', overflowX: 'hidden', wordWrap: 'break-word', borderLeft: '2px solid #ffffff40' }}
                                  >
                                    {highlightSearchTerm(filteredLogs?.[index]?.trim(), logsSearchTerm)}
                                  </GuiTypography>
                                </div>
                              </CellMeasurer>
                            )}
                          />
                        </Card>
                      </>
                    )}
                  </AutoSizer>

                  {/* <GuiBox display="flex" flexDirection="column"
                      sx={{ gap: '12px' }}
                    >
                      {

                        logsData.resp?.map(log => {
                          return (
                            <GuiTypography variant="subtitle2" color="white" fontWeight="regular" sx={{ fontSize: "14px", whiteSpace: 'pre-wrap', overflowX: 'hidden', wordWrap: 'break-word' }}>
                              {log}
                            </GuiTypography>
                          )
                        })
                      }
                    </GuiBox> */}
                  {/* </SyntaxHighlighter> */}

                </Card>
                : null
            }

          </GuiBox>
        </Drawer>

        <Drawer
          anchor="right"
          open={pipelineLogsModalOpen}
          ModalProps={{
            keepMounted: true,
            disableBackdropClick: true
          }}
          PaperProps={{
            sx: { minWidth: "82%", background: "transparent !important", borderRadius: "0.75rem" },
          }}
        >
          <GuiBox display="flex"
            sx={{ minHeight: '100%' }}
          >
            {
              pipelineLogsData && pipelineLogsLoading !== null && pipelineLogsModalOpen === true ?
                <Card sx={{ borderRadius: "0.75rem", border: "1px solid #26282d", minHeight: '100%', maxWidth: "100%", minWidth: "100%", p: "14px", overflowX: "hidden", overflowY: "auto" }}>
                  <GuiBox display="flex"
                    sx={{ gap: '12px', mb: "12px", mt: "12px" }}
                  >
                    <GuiButton
                      sx={{ p: "0", borderRadius: "0.75rem", border: "1px solid #26282d", background: "#20212E" }}
                      onClick={() => setPipelineLogsModalOpen(false)}
                      color="dark"
                      iconOnly={true}
                      rel="noreferrer"
                    >
                      {
                        <IoClose size="18px" color="white" />
                      }
                    </GuiButton>

                    <GuiTypography variant="subtitle1" color="white" fontWeight="bold">
                      {pipelineLogsData?.[0]?.logs?.[0]?.runId}
                    </GuiTypography>

                    <GuiButton
                      sx={{ p: "0", borderRadius: "0.75rem", border: "1px solid #26282d", background: "#20212E" }}
                      onClick={() => viewPipelineLogs(pipelineLogsData?.[0]?.logs?.[0]?.runId)}
                      color="dark"
                      iconOnly={true}
                      rel="noreferrer"
                    >
                      {
                        pipelineLogsLoading ? <CircularProgress size="1rem" thickness={2} sx={{ color: white.main }} /> : <IoRefreshOutline size="18px" color="white" />
                      }
                    </GuiButton>
                  </GuiBox>

                  <GuiTypography variant="subtitle2" color="info" fontWeight="bold" sx={{ mb: `${pxToRem(10)}` }}>
                    Pipeline Run Details
                  </GuiTypography>
                  {
                    pipelineLogsData && pipelineLogsData?.length > 0 ?
                      <>
                        {
                          pipelineLogsData?.map((log, index) => {
                            return (
                              <>
                                <GuiBox display="flex" flexDirection="column" sx={{ gap: "4px", p: "12px", background: "black", borderRadius: "8px", }}>
                                  <GuiBox display="flex" alignItems="center" justifyContent="space-between"
                                    sx={{
                                      pb: "8px",
                                      pt: "8px",
                                      pl: "4px",
                                      pr: "8px",
                                      background: "#20212e",
                                      borderRadius: "8px",
                                    }}
                                  >
                                    <GuiBox display="flex" alignItems="center" sx={{ gap: "0px" }}>
                                      <ArrowRight01Icon style={{ width: "18px", height: "18px" }} />
                                      <GuiTypography variant="subtitle2" color="white" fontWeight="bold" sx={{ fontSize: "14px", whiteSpace: 'pre-wrap', overflowX: 'hidden', wordWrap: 'break-word' }}>

                                        {log?.action?.replaceAll("_", " ")}
                                      </GuiTypography>
                                    </GuiBox>

                                    <GuiTypography variant="subtitle2" color="white" fontWeight="bold" sx={{ fontSize: "14px", whiteSpace: 'pre-wrap', overflowX: 'hidden', wordWrap: 'break-word' }}>
                                      {
                                        ((new Date(log?.logs?.[log?.logs?.length - 1]?.timestamp).getTime() - new Date(log?.logs?.[0]?.timestamp).getTime()) / 1000).toFixed(1)
                                      }s
                                    </GuiTypography>
                                  </GuiBox>
                                  {
                                    log?.logs?.length > 0 ?
                                      <>
                                        {
                                          log?.logs?.map((loggy, index) => {
                                            return (
                                              <GuiBox display="flex" flexDirection="column" sx={{ gap: "4px" }}>
                                                <GuiBox key={index} display="flex" flexDirection="row" sx={{
                                                  gap: "4px", maxWidth: "80%"
                                                }}>
                                                  <GuiTypography variant="subtitle2" color="white" fontWeight="regular" sx={{ fontFamily: `"Fira Code", monospace`, fontSize: "12px", color: "#959fd6" }}>
                                                    {index}
                                                  </GuiTypography>
                                                  <GuiTypography variant="subtitle2" color="white" fontWeight="regular" sx={{ fontFamily: `"Fira Code", monospace`, fontSize: "12px", color: "#959fd6" }}>
                                                    [{loggy?.timestamp}]
                                                  </GuiTypography>
                                                  <GuiBox display="flex" flexDirection="column" sx={{ gap: "4px" }}>
                                                    {
                                                      loggy?.message?.filter(msg => msg !== "")?.map((msg, index) => {
                                                        return (
                                                          <GuiTypography variant="subtitle2" color="white" fontWeight="regular" sx={{
                                                            pl: "4px",
                                                            fontFamily: `"Fira Code", monospace`, fontSize: "12px", whiteSpace: 'pre-wrap', overflowX: 'hidden', wordWrap: 'break-word', '&:hover': {
                                                              background: "#272937",
                                                              borderRadius: "4px",
                                                              zIndex: 99
                                                            }
                                                          }}>
                                                            {msg}
                                                          </GuiTypography>
                                                        )
                                                      })
                                                    }
                                                  </GuiBox>
                                                </GuiBox>
                                                {/* <span className="log" key={index} style={{}}>
                                                    <span style={{ fontFamily: `"Fira Code", monospace`, padding: `${pxToRem(5)}`, fontSize: "13px", flexShrink: 0, color: "#959fd6" }}>{index}</span>
                                                    <span style={{ fontFamily: `"Fira Code", monospace`, padding: `${pxToRem(5)}`, fontSize: "13px", flexShrink: 0, color: "#959fd6" }}>[{loggy?.timestamp}]</span>
                                                    {
                                                      loggy?.message?.map((msg, index) => {
                                                        return (
                                                          <span style={{ fontFamily: `"Fira Code", monospace`, padding: `${pxToRem(5)}`, fontSize: "13px", flexShrink: 0, color: `#fff`, width: "80%" }}>{msg === "" ? <br></br> : msg}</span>
                                                        )
                                                      })
                                                    }
                                                  </span> */}
                                              </GuiBox>
                                            )
                                          })
                                        }
                                      </>
                                      : null
                                  }
                                </GuiBox >
                              </>
                            )
                          })
                        }</> : null
                  }

                 
                </Card>
                : null
            }

          </GuiBox>
        </Drawer>

        <Drawer
          anchor="right"
          open={kubemodalOpen}
          ModalProps={{
            keepMounted: true,
            disableBackdropClick: true
          }}
          PaperProps={{
            sx: { minWidth: "82%", background: "transparent !important", borderRadius: "0.75rem" },
          }}
        >
          <GuiBox display="flex"
            sx={{ minHeight: '100%' }}
          >
            <Card sx={{ borderRadius: "0.75rem", border: "1px solid #26282d", minHeight: '100%', maxWidth: "100%", minWidth: "100%", p: "0px" }}>
              {
                kubeModalData?.view ?
                  <>
                    {kubeModalData?.view}
                  </>
                  : null
              }
            </Card>
          </GuiBox>
        </Drawer>

        <Drawer
          anchor="right"
          open={tableActionmodalOpen}
          // onClose={handleModalClose}
          ModalProps={{
            keepMounted: true,
            disableBackdropClick: true
          }}
          PaperProps={{
            sx: { minWidth: "82%", background: "transparent !important", borderRadius: "0.75rem" },
          }}
        >
          <GuiBox display="flex"
            sx={{ minHeight: '100%' }}
          >
            <Card sx={{ borderRadius: "0.75rem", border: "1px solid #26282d", minHeight: '100%', maxWidth: "100%", minWidth: "100%", p: "0px" }}>
              {
                tableActionmodalData?.components?.length > 0 ?
                  <>
                    <GuiBox display="flex" flexDirection="column"
                      sx={{ overflowY: "auto", pb: `${pxToRem(80)}`, pt: `${pxToRem(20)}`, pl: `${pxToRem(20)}`, pr: `${pxToRem(20)}` }}
                    >
                      {
                        tableActionmodalData?.components?.map(comp => {
                          const subComps = []
                          for (let [key, value] of Object.entries(comp)) {
                            if (key === "title") {
                              subComps.push(
                                <>
                                  <GuiBox display="flex" alignItems="center" sx={{ gap: "12px", mb: `${pxToRem(5)}` }}>
                                    <GuiButton
                                      sx={{ p: "0", borderRadius: "0.75rem", border: "none", background: "#20212E" }}
                                      onClick={handleModalClose}
                                      color="dark"
                                      iconOnly={true}
                                      rel="noreferrer"
                                    >
                                      {
                                        <IoClose size="20px" color="white" />
                                      }
                                    </GuiButton>
                                    <GuiTypography variant="h4" fontWeight="regular" color="white">
                                      {value}
                                    </GuiTypography>
                                  </GuiBox>
                                </>
                              )
                            } else if (key === "sub") {
                              subComps.push(
                                <>
                                  <GuiTypography variant="h6" fontWeight="regular" color="white" opacity="0.8" sx={{ mb: `${pxToRem(20)}`, textWrap: "wrap" }}>
                                    {value}
                                  </GuiTypography>
                                </>
                              )
                            }
                            else if (key === "info") {
                              subComps.push(
                                <Card sx={{ display: "flex", justifyContent: "center", borderRadius: "0.75rem", border: "1px solid #26282d", borderLeft: "6px solid #01B574", width: "fit-content", p: "20px", mb: `${pxToRem(20)}` }}>
                                  <GuiTypography variant="h6" fontWeight="regular" color="white" opacity="0.8" sx={{ p: "0px", textWrap: "wrap", fontSize: "14px", width: "100%" }}>
                                    {value}
                                  </GuiTypography>
                                </Card>
                              )
                            }
                            else if (key === "input") {
                              if (!value.optional) {
                                modalValidatorKeys.push(value.key)
                              }
                              subComps.push(
                                <>
                                  <GuiBox display="flex" alignItems="start" justifyContent="start" flexDirection="column" sx={{ mb: `${pxToRem(20)}`, gap: "4px" }}>

                                    <GuiBox display="flex" alignItems="center" justifyContent="start" sx={{ gap: `${pxToRem(8)}` }}>
                                      <GuiTypography variant="h6" fontWeight="regular" color="white">
                                        {value.name}
                                        {
                                          !value.optional ? <sup><b>{"*"}</b></sup> : null
                                        }
                                      </GuiTypography>
                                      {
                                        value.tooltip ?
                                          <Tooltip title={value.tooltip} placement="right">
                                            <InfoRounded color="white" sx={{ width: "16px", mt: `${!value.optional ? "4px" : "0px"}` }} />
                                          </Tooltip>
                                          : null
                                      }
                                    </GuiBox>
                                    <Tooltip title={value.eM} placement="right">
                                      <GuiInput
                                        placeholder="Type here..."
                                        error={tempModalSelectionData[`${value.key}_isvalid`] != null ? !tempModalSelectionData[`${value.key}_isvalid`] : false}
                                        helperText={tempModalSelectionData[`${value.key}_isvalid`] === false ? "There has been an error" : ""}
                                        value={tempModalSelectionData[value.key] ?? ""}
                                        onChange={(e) => handleModalSelectionDataChange(value.key, e.target.value, value.reg)}
                                        sx={({ breakpoints }) => ({
                                          marginRight: "8px",
                                          [breakpoints.down("sm")]: {
                                            maxWidth: "80px",
                                          },
                                          [breakpoints.only("sm")]: {
                                            maxWidth: "80px",
                                          },
                                          maxWidth: `${pxToRem(250)}`,
                                        })}
                                      />
                                    </Tooltip>
                                  </GuiBox>
                                </>
                              )
                            }
                            else if (key === "header") {
                              return (
                                <GuiTypography variant="subtitle1" color="info" fontWeight="bold" sx={{ mb: `${pxToRem(10)}` }}>
                                  {value.name}
                                </GuiTypography>
                              )
                            }
                            else if (key === "div") {
                              return (
                                <Divider light sx={{ mb: `${pxToRem(10)}` }} />
                              )
                            }
                            else if (key === "dropdown") {
                              // handleModalSelectionDataChange(value.name, '')
                              if (!value.optional) {
                                modalValidatorKeys.push(value.key)
                                if (value.skey) {
                                  modalValidatorKeys.push(value.skey)
                                }
                              }
                              if (value.default && !(value.key in tempModalSelectionData)) {
                                tempModalSelectionData[value.key] = value.default.id
                              }
                              subComps.push(
                                <>
                                  <GuiBox display="flex" alignItems="start" justifyContent="start" flexDirection="column" sx={{ mb: `${pxToRem(20)}`, gap: "4px" }}>
                                    <GuiBox display="flex" alignItems="center" justifyContent="start" sx={{ gap: `${pxToRem(8)}` }}>
                                      <GuiTypography variant="h6" fontWeight="regular" color="white">
                                        {value.name}
                                        {
                                          !value.optional ? <sup><b>{"*"}</b></sup> : null
                                        }
                                      </GuiTypography>
                                      {
                                        value.tooltip ?
                                          <Tooltip title={value.tooltip} placement="right">
                                            <InfoRounded color="white" sx={{ width: "16px", mt: `${!value.optional ? "4px" : "0px"}` }} />
                                          </Tooltip>
                                          : null
                                      }
                                    </GuiBox>
                                    <GuiBox display="flex" alignItems="end" justifyContent="end" sx={{ gap: `${pxToRem(12)}` }}>
                                      <FormControl margin="none" sx={{ m: "0px", minWidth: 80, mr: 1 }}>
                                        <GuiSelect
                                          IconComponent={() => <ExpandMoreRounded />}
                                          variant="outlined"
                                          sx={{ m: 0 }}
                                          color="white"
                                          size="small"
                                          value={tempModalSelectionData[value.key] ?? ""}
                                          onChange={(e) => handleModalSelectionDataChange(value.key, e.target.value)}
                                          displayEmpty
                                          inputProps={{ 'aria-label': 'Without label' }}
                                          renderValue={(selected) => {
                                            return selected ? selected : value.name
                                          }}
                                        >
                                          <MenuItem disabled value="">
                                            {value.name}
                                          </MenuItem>
                                          {value.options?.map(it => (
                                            <MenuItem key={it.n} value={it.id}>
                                              <GuiBox display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" sx={{ gap: "8px", color: "inherit", width: "-webkit-fill-available" }}>
                                                <GuiTypography variant="h5" fontWeight="regular" sx={{ textWrap: "wrap", fontSize: `${pxToRem(14)}`, color: "inherit !important" }}>
                                                  {it.n}
                                                </GuiTypography>
                                                {
                                                  tempModalSelectionData[value.key] === it.id ?
                                                    <FaCheck color="inherit" />
                                                    : null
                                                }
                                              </GuiBox>
                                            </MenuItem>
                                          ))}
                                        </GuiSelect>
                                      </FormControl>
                                      {
                                        value?.skey && value?.sname && tempModalSelectionData[value.key] ?
                                          <FormControl margin="none" sx={{ m: "0px", minWidth: 80, mr: 1 }}>
                                            <GuiSelect
                                              IconComponent={() => <ExpandMoreRounded />}
                                              variant="outlined"
                                              sx={{ m: 0 }}
                                              color="white"
                                              size="small"
                                              value={tempModalSelectionData[value.skey] ?? ""}
                                              onChange={(e) => handleModalSelectionDataChange(value.skey, e.target.value)}
                                              displayEmpty
                                              inputProps={{ 'aria-label': 'Without label' }}
                                              renderValue={(selected) => {
                                                return selected ? selected : value.name
                                              }}
                                            >
                                              {/* <MenuItem disabled value="">
                                                {value.sname}
                                              </MenuItem> */}
                                              {value.options.find(opt => opt.id === tempModalSelectionData[value.key])?.sid?.map(it => (
                                                <MenuItem key={it} value={it} >
                                                  <GuiBox display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" sx={{ gap: "8px", color: "inherit", width: "-webkit-fill-available" }}>
                                                    <GuiTypography variant="h5" fontWeight="regular" sx={{ textWrap: "wrap", fontSize: `${pxToRem(14)}`, color: "inherit !important" }}>
                                                      {it}
                                                    </GuiTypography>
                                                    {
                                                      tempModalSelectionData[value.key] === it ?
                                                        <FaCheck color="inherit" />
                                                        : null
                                                    }
                                                  </GuiBox>
                                                </MenuItem>
                                              ))}
                                            </GuiSelect>
                                          </FormControl>
                                          : null
                                      }
                                    </GuiBox>
                                  </GuiBox>
                                </>
                              )
                            }
                            else if (key === "dropdown-multiselect") {
                              // handleModalSelectionDataChange(value.name, '')
                              if (!value.optional) {
                                modalValidatorKeys.push(value.key)
                                if (value.skey) {
                                  modalValidatorKeys.push(value.skey)
                                }
                              }
                              if (value.default && !(value.key in tempModalSelectionData)) {
                                tempModalSelectionData[value.key] = [value.default.id]
                              }
                              subComps.push(
                                <>
                                  <GuiBox display="flex" alignItems="start" justifyContent="start" flexDirection="column" sx={{ mb: `${pxToRem(20)}`, gap: "4px" }}>
                                    <GuiBox display="flex" alignItems="center" justifyContent="start" sx={{ gap: `${pxToRem(8)}` }}>
                                      <GuiTypography variant="h6" fontWeight="regular" color="white">
                                        {value.name}
                                        {
                                          !value.optional ? <sup><b>{"*"}</b></sup> : null
                                        }
                                      </GuiTypography>
                                      {
                                        value.tooltip ?
                                          <Tooltip title={value.tooltip} placement="right">
                                            <InfoRounded color="white" sx={{ width: "16px", mt: `${!value.optional ? "4px" : "0px"}` }} />
                                          </Tooltip>
                                          : null
                                      }
                                    </GuiBox>
                                    <GuiBox display="flex" alignItems="end" justifyContent="end" sx={{ gap: `${pxToRem(12)}` }}>
                                      <FormControl margin="none" sx={{ m: "0px", minWidth: 80, mr: 1 }}>
                                        <GuiSelect
                                          IconComponent={() => <ExpandMoreRounded />}
                                          variant="outlined"
                                          sx={{ m: 0 }}
                                          color="white"
                                          size="small"
                                          value={tempModalSelectionData[value.key] ?? "Select Instance Types"}
                                          onChange={(e) => handleModalSelectionDataChange(value.key, e.target.value)}
                                          displayEmpty
                                          inputProps={{ 'aria-label': 'Without label' }}
                                          renderValue={(selected) => {
                                            if (!selected || selected?.length === 0) {
                                              return "Select Instance Types"
                                            }
                                            return selected?.join(", ")
                                          }}
                                        >
                                          <MenuItem disabled value="Select Instance Types">
                                            {"Select Instance Types"}
                                          </MenuItem>

                                          {value.options?.map(it => (
                                            <MenuItem key={it.id} value={it.id} sx={{ color: "inherit" }}>
                                              <GuiBox display="flex" flexDirection="row" justifyContent="center" alignItems="center" sx={{ gap: "2px" }}>
                                                {
                                                  tempModalSelectionData[value.key]?.includes(it.id) ?
                                                    <Check color="white" />
                                                    : null
                                                }
                                                <GuiTypography variant="h5" fontWeight="regular" color="white" sx={{ textWrap: "wrap", fontSize: `${pxToRem(14)}` }}>
                                                  {it.n}
                                                </GuiTypography>
                                              </GuiBox>
                                            </MenuItem>
                                          ))}
                                        </GuiSelect>
                                      </FormControl>
                                      {
                                        value?.skey && value?.sname && tempModalSelectionData[value.key] ?
                                          <FormControl margin="none" sx={{ m: "0px", minWidth: 80, mr: 1 }}>
                                            <GuiSelect
                                              IconComponent={() => <ExpandMoreRounded />}
                                              variant="outlined"
                                              sx={{ m: 0 }}
                                              color="white"
                                              size="small"
                                              value={tempModalSelectionData[value.skey] ?? ""}
                                              onChange={(e) => handleModalSelectionDataChange(value.skey, e.target.value)}
                                              displayEmpty
                                              inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                              <MenuItem disabled value="">
                                                {value.sname}
                                              </MenuItem>
                                              {value.options.find(opt => opt.id === tempModalSelectionData[value.key])?.sid?.map(it => (
                                                <MenuItem key={it} value={it}>{it}</MenuItem>
                                              ))}
                                            </GuiSelect>
                                          </FormControl>
                                          : null
                                      }
                                    </GuiBox>
                                  </GuiBox>
                                </>
                              )
                            }
                            else if (key === "subnets") {
                              if (!tempModalSelectionData[value.key]) {
                                tempModalSelectionData[value.key] = []
                              }

                              if (!value.optional) {
                                modalValidatorKeys.push(value.key)
                                if (value.skey) {
                                  modalValidatorKeys.push(value.skey)
                                }
                              }
                              if (value.default && !(value.key in tempModalSelectionData)) {
                                tempModalSelectionData[value.key] = value.default.id
                              }

                              subComps.push(
                                <>

                                  <GuiBox display="flex" alignItems="start" justifyContent="start" flexDirection="column" sx={{ mb: `${pxToRem(20)}`, gap: "4px" }}>
                                    <GuiBox display="flex" alignItems="center" justifyContent="start" sx={{ gap: `${pxToRem(8)}` }}>
                                      <GuiTypography variant="h6" fontWeight="regular" color="white">
                                        {value.name}
                                        {
                                          !value.optional ? <sup><b>{"*"}</b></sup> : null
                                        }
                                      </GuiTypography>
                                      {
                                        value.tooltip ?
                                          <Tooltip title={value.tooltip} placement="right">
                                            <InfoRounded color="white" sx={{ width: "16px", mt: `${!value.optional ? "4px" : "0px"}` }} />
                                          </Tooltip>
                                          : null
                                      }
                                    </GuiBox>
                                    <GuiBox display="flex" alignItems="end" justifyContent="end" sx={{ gap: `${pxToRem(12)}` }}>
                                      <FormControl margin="none" sx={{ m: "0px", minWidth: 80, mr: 1 }}>
                                        <GuiSelect
                                          IconComponent={() => <ExpandMoreRounded />}
                                          variant="outlined"
                                          sx={{ m: 0 }}
                                          color={"white"}
                                          size="small"
                                          value={tempModalSelectionData[value.key] ?? "Select Subnets"}
                                          onChange={(e) => handleModalSelectionDataChange(value.key, e.target.value)}
                                          displayEmpty
                                          inputProps={{ 'aria-label': 'Without label' }}
                                          renderValue={(selected) => {
                                            if (!selected || selected?.length === 0) {
                                              return "Select Subnets"
                                            }
                                            return selected?.join(", ")
                                          }}
                                        >
                                          <MenuItem disabled value="Select Subnets">
                                            {"Select Subnets"}
                                          </MenuItem>
                                          {value.options?.filter((subnet) => {
                                            if (tempModalSelectionData["vpc"]) {
                                              if (subnet.vpcId === tempModalSelectionData["vpc"]) {
                                                return true
                                              } else {
                                                return false
                                              }
                                            }
                                            return true
                                          }).map(it => (
                                            <MenuItem key={it.id} value={it.id} sx={{ color: "inherit" }}>
                                              <GuiBox display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" sx={{ gap: "8px", color: "inherit", width: "-webkit-fill-available" }}>
                                                <GuiTypography variant="h5" fontWeight="regular" color="white" sx={{ textWrap: "wrap", fontSize: `${pxToRem(14)}` }}>
                                                  {it.n}
                                                </GuiTypography>
                                                {
                                                  tempModalSelectionData[value.key]?.includes(it.id) ?
                                                    <FaCheck color="inherit" />
                                                    : null
                                                }
                                              </GuiBox>
                                            </MenuItem>
                                          ))}
                                        </GuiSelect>
                                      </FormControl>
                                    </GuiBox>
                                  </GuiBox>
                                </>
                              )
                            }
                            else if (key === "multi-input") {
                              subComps.push(
                                <>
                                  {
                                    envPairs.map((pair, index) => (
                                      <Grid container spacing={2} key={index} sx={{ mb: `${pxToRem(20)}`, minWidth: "90%", alignItems: "center" }}>
                                        <Grid item xs={4} md={4} xl={4}>
                                          <GuiInput
                                            label="name"
                                            placeholder="name..."
                                            value={pair.name}
                                            onChange={(e) => handleEnvChange(index, 'name', e.target.value)}
                                          />
                                        </Grid>
                                        <Grid item fullxs={4} md={4} xl={4}>
                                          <GuiInput
                                            label="Value"
                                            placeholder="value..."
                                            value={pair.value}
                                            onChange={(e) => handleEnvChange(index, 'value', e.target.value)}
                                          />
                                        </Grid>
                                        <Grid item fullxs={4} md={4} xl={4}>
                                          {/* <GuiButton
                                            onClick={(e) => handleRemoveEnvPair(index)}
                                            color="error"
                                            variant="contained"
                                            sx={{ textAlign: "start", display: "flex", maxWidth: "5%" }}
                                            rel="noreferrer"
                                          > */}
                                          <CloseSharp color="white" onClick={(e) => handleRemoveEnvPair(index)} sx={{ alignItems: "center", justifyContent: "center", display: "flex", maxWidth: "5%" }} />
                                          {/* </GuiButton> */}
                                        </Grid>
                                      </Grid>
                                    ))
                                  }
                                  <GuiButton
                                    onClick={handleAddEnvPair}
                                    color="info"
                                    variant="contained"
                                    sx={{ textAlign: "start", display: "flex", maxWidth: "5%" }}
                                    rel="noreferrer"
                                  >
                                    <BsPlusCircleFill />
                                  </GuiButton>
                                </>)
                            } else if (key === "checkbox") {
                              if (!value.optional) {
                                modalValidatorKeys.push(value.key)
                              }
                              subComps.push(
                                <>
                                  <GuiBox display="flex" alignItems="center" justifyContent="start" sx={{ mb: `${pxToRem(20)}`, gap: "8px" }}>
                                    <GuiBox display="flex" alignItems="center" justifyContent="start" sx={{ gap: `${pxToRem(8)}` }}>
                                      <GuiTypography variant="h6" fontWeight="regular" color="white">
                                        {value.name}
                                        {
                                          !value.optional ? <sup><b>{"*"}</b></sup> : null
                                        }
                                      </GuiTypography>
                                      {
                                        value.tooltip ?
                                          <Tooltip title={value.tooltip} placement="right">
                                            <InfoRounded color="white" sx={{ width: "16px", mt: `${!value.optional ? "4px" : "0px"}` }} />
                                          </Tooltip>
                                          : null
                                      }
                                    </GuiBox>
                                    <Checkbox style={{ color: "#fff" }} onChange={(e) => handleModalSelectionDataChange(value.key, e.target.checked)} />
                                  </GuiBox>
                                </>
                              )
                            } else if (key === "tags") {
                              subComps.push(
                                <>
                                  <GuiBox display="flex" alignItems="start" justifyContent="start" flexDirection="column" sx={{ mb: `${pxToRem(20)}`, gap: "4px" }}>
                                    <GuiBox display="flex" alignItems="center" justifyContent="start" sx={{ gap: `${pxToRem(8)}` }}>
                                      <GuiTypography variant="h6" fontWeight="regular" color="white">
                                        Add Resource Tags
                                      </GuiTypography>
                                      <Tooltip title="Basic Tags are automatically added such as created by, team, date" placement="right">
                                        <InfoRounded color="white" sx={{ width: "16px" }} />
                                      </Tooltip>
                                    </GuiBox>
                                    <GuiBox alignItems="start" justifyContent="end" display="flex" flexDirection="column">
                                      {
                                        tagPairs.map((pair, index) => (
                                          <GuiBox alignItems="center" justifyContent="end" display="flex" flexDirection="row" sx={{ gap: `${pxToRem(8)}`, mb: `${pxToRem(12)}` }}>
                                            <GuiInput
                                              label="Key"
                                              placeholder="key..."
                                              value={pair.Key}
                                              onChange={(e) => handleTagChange(index, 'Key', e.target.value)}
                                            />
                                            <GuiInput
                                              type={"name"}
                                              label="Value"
                                              placeholder="value..."
                                              value={pair.Value}
                                              onChange={(e) => handleTagChange(index, 'Value', e.target.value)}
                                            />
                                            <CloseSharp color="white" onClick={(e) => handleRemoveTagPair(index)} sx={{ alignItems: "center", justifyContent: "center", display: "flex", width: "18px" }} />

                                          </GuiBox>

                                          // <Grid container spacing={2} key={index} sx={{ mb: `${pxToRem(12)}`, alignItems: "center" }}>
                                          //   <Grid item xs={4} md={4} xl={4}>
                                          //     <GuiInput
                                          //       label="name"
                                          //       placeholder="name..."
                                          //       value={pair.name}
                                          //       onChange={(e) => handleTagChange(index, 'name', e.target.value)}
                                          //     />
                                          //   </Grid>
                                          //   <Grid item fullxs={4} md={4} xl={4}>
                                          //     <GuiInput
                                          //       type={"name"}
                                          //       label="Value"
                                          //       placeholder="value..."
                                          //       value={pair.value}
                                          //       onChange={(e) => handleTagChange(index, 'value', e.target.value)}
                                          //     />
                                          //   </Grid>
                                          //   <Grid item fullxs={4} md={4} xl={4}>
                                          //     <CloseSharp color="white" onClick={(e) => handleRemoveTagPair(index)} sx={{ alignItems: "center", justifyContent: "center", display: "flex", width: "18px" }} />
                                          //   </Grid>
                                          // </Grid>
                                        ))
                                      }
                                      <GuiButton
                                        sx={{ p: "0", borderRadius: "0.75rem", border: "1px solid #26282d", background: "#20212E" }}
                                        color="dark"
                                        iconOnly={true}
                                        onClick={handleAddTagPair}
                                        rel="noreferrer"
                                      >
                                        <BsPlusCircleFill />
                                      </GuiButton>
                                    </GuiBox>
                                  </GuiBox>
                                </>)
                            }
                          }

                          return subComps;
                        })
                      }
                    </GuiBox >
                    <GuiBox display="flex" alignItems="center" justifyContent="end" sx={{ borderRadius: "0.75rem", minWidth: `calc(100%)`, overflowY: "auto", position: "absolute", bottom: "0", p: `${pxToRem(10)}`, backgroundColor: "#05050a" }}>
                      <GuiBox display="flex" alignItems="center" justifyContent="right" mr={pxToRem(16)}>
                        {/* 
                        {
                          modalRunText !== "Completed" ?
                            <GuiButton
                              onClick={handleModalClose}
                              color="white"
                              sx={{ textAlign: "start", display: "flex" }}
                              rel="noreferrer"
                            >
                              <GuiTypography variant="h6" fontWeight="regular" color="dark" pl="0px" sx={{ minWidth: "100%" }}>
                                Cancel
                              </GuiTypography>
                            </GuiButton>
                            : null
                        } */}

                        <GuiButton
                          onClick={() => runAction(tableActionmodalData.id, tableActionmodalData.metadata)}
                          color={tableActionmodalRunText === "Create" ? "info" : "success"}
                          disabled={(!tempModalSelectionData["runEnabled"])}
                          sx={{ textAlign: "start", display: "flex", ml: `${pxToRem(12)}` }}
                          rel="noreferrer"
                        >
                          {
                            modalActionRunning ?
                              (<CircularProgress sx={{ color: "#05050a" }} size="25px" />)
                              :
                              (<>
                                <GuiTypography variant="h6" fontWeight="regular" color="white" pl="" sx={{ mr: "8px" }}>
                                  {tableActionmodalRunText}
                                </GuiTypography>
                                {
                                  tableActionmodalRunText === "Create" ?
                                    <HiArrowRight size="20px" color="white" />
                                    :
                                    <CheckCircle size="25px" color="white" />
                                }

                              </>)
                          }
                        </GuiButton>

                      </GuiBox>
                    </GuiBox>
                  </>
                  : null
              }
            </Card>
          </GuiBox>
        </Drawer>

        <GuiBox display="flex" flexDirection="row" alignItems="start" justifyContent="space-between">

          <Tabs
            orientation="horizontal"
            value={pageTabValue}
            onChange={handlePageSetTabValue}
            sx={{ background: "transparent", display: "flex", justifyContent: "flex-start", mb: `${pxToRem(10)}` }}
          >
            <Tab icon={<DashboardSquare01Icon />} iconPosition="start" label="OVERVIEW" />
            <Tab icon={<SiKubernetes color="#818aff" />} iconPosition="start" label="CLUSTERS" />
            <Tab icon={<CloudServerIcon />} iconPosition="start" label="WORKLOADS" />
            <Tab icon={<WorkflowIcon color="#818aff" />} iconPosition="start" label="PIPELINES" />
            <Tab icon={<DocumentCodeIcon />} iconPosition="start" label="HELM CHARTS" />
            <Tab icon={<ChartLineData02Icon />} iconPosition="start" label="METRICS" />
          </Tabs>
          {
            window?.electron ?
              <GuiBox display="flex" flexDirection="column" alignItems="end" justifyContent="end" sx={{ gap: "8px" }}>
                <GuiBox display="flex" flexDirection="row" alignItems="center" justifyContent="end" sx={{ gap: "8px" }}>
                  <GuiTypography variant="subtitle2" color="white" fontWeight="regular">
                    Toggle local cluster mode
                  </GuiTypography>
                  <GuiSwitch color="info" checked={toggleLocalK8s}
                    onChange={handleSetToggleLocalK8s}
                  />
                </GuiBox>
                {
                  toggleLocalK8s ?
                    <FormControl sx={{}}>
                      <GuiSelect
                        IconComponent={() => <ExpandMoreRounded />}
                        variant="outlined"
                        sx={{ m: 0 }}
                        color="white"
                        size="small"
                        value={currentKubeContext}
                        displayEmpty
                        onChange={(e) => {
                          setCurrentKubeContext(e.target.value);
                          localStorage.setItem('currentKubeContext', e.target.value);
                          setAllClusterNames([e.target.value]);
                          handleFilterChange("cluster", e.target.value)
                        }}
                        inputProps={{ 'aria-label': 'Without label' }}
                        renderValue={(selected) => {
                          return `Context: ${selected}`
                        }}              >
                        {allKubeContexts?.map(it => (
                          <MenuItem key={it} value={it} >
                            <GuiBox display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" sx={{ gap: "8px", color: "inherit", width: "-webkit-fill-available" }}>
                              <GuiTypography variant="h5" fontWeight="regular" sx={{ textWrap: "wrap", fontSize: `${pxToRem(14)}`, color: "inherit !important" }}>
                                {it}
                              </GuiTypography>
                              {
                                workloadFilterData["cluster"] === it ?
                                  <FaCheck color="inherit" />
                                  : null
                              }
                            </GuiBox>
                          </MenuItem>
                        ))}
                      </GuiSelect>
                    </FormControl>
                    : null
                }


              </GuiBox>
              : <GuiBox display="flex" flexDirection="col" alignItems="center" justifyContent="end" sx={{ gap: "8px" }}>
                <GuiButton
                  sx={{ mr: "8px", pt: "0px", pb: "0px", borderColor: "#326CE5", display: "flex", alignItems: "center", justtifyContent: "center", gap: "4px" }}
                  component={Link}
                  target="_blank"
                  href="https://gravitycloud.ai/download"
                  color="dark"
                  rel="noreferrer"
                >
                  <GuiTypography variant="body2" fontWeight="regular" color="white" sx={{ fontSize: `0.8rem` }}>
                    Run Local k8s
                  </GuiTypography>
                  <Download04Icon width="16px" height="16px" />
                </GuiButton>
              </GuiBox>
          }


        </GuiBox>
        {
          tabValue > -1 ? <> {getPageTabContent(tabValue)} </> : null
        }


      </React.Fragment >
    </DashboardLayout >
  );
}

export default Kube;
