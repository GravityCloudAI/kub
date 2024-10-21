import LinearProgress from '@mui/material/LinearProgress';
import GuiBox from "components/GuiBox";
import GuiChip from "components/GuiChip";
import GuiTypography from "components/GuiTypography";
import colors from "assets/theme/base/colors";
import { extractKubeNodeDetails } from 'helpers/kubeHelper';
import { calculateRequestedResourcesForNode } from 'helpers/kubeHelper';
import { Tooltip } from '@mui/material';
import GuiCompletionProgress from 'components/GuiCompletionProgress';
import { ec2PricingMap } from 'helpers/pricingHelper';
import { NoMaxWidthTooltip } from 'components/GuiToolTip';

export default function parseActionsData(props, triggerServiceDetailModal) {
  const { chip } = colors;

  return {
    columns: [
      { name: "Name", align: "left" },
      { name: "version", align: "center" },
      { name: "status", align: "center" },
      { name: "type", align: "center" },
      { name: "Capacity type", align: "center" },
      { name: "Instance", align: "center" },
      { name: "Nodes", align: "center" },
      { name: "labels", align: "left" },
      { name: "Cost/Month", align: "center" },
      // { name: "Region", align: "center" },
      { name: "CPU Used", align: "left" },
      { name: "Memory Used", align: "left" },
      // { name: "execute", align: "right" },
    ],

    rows: props.data.nodeGroupsDetails?.map(it => {
      const nodes = props.data?.nodes?.items?.filter(node =>
        node.metadata.labels?.['alpha.eksctl.io/nodegroup-name'] === it?.nodegroupName ||
        node.metadata.labels?.['eks.amazonaws.com/nodegroup'] === it?.nodegroupName
      );

      let totalCPU = 0
      let totalMem = 0

      let avlCPU = 0
      let avlMem = 0

      let percentageCPU = 0
      let percentageMem = 0

      if (nodes?.length > 0) {
        nodes?.forEach(node => {
          const workloadResources = calculateRequestedResourcesForNode(props.data?.pods, node.metadata.name)
          const details = extractKubeNodeDetails(node)
          totalCPU = totalCPU + parseInt(details.cpu?.total.replace("m", ""), 10);
          totalMem = totalMem + parseFloat(details.ram?.total.replace(" GiB", ""));

          avlCPU = avlCPU + parseInt(details.cpu?.available.replace("m", ""), 10) - workloadResources?.totalRequestedCPU
          avlMem = avlMem + parseFloat(details.ram?.available.replace(" GiB", "")) - workloadResources.totalRequestedRAM / 1024
        })

        percentageCPU = (((totalCPU - avlCPU) * 100) / totalCPU) ?? 0
        percentageMem = (((totalMem - avlMem) * 100) / totalMem) ?? 0
      }

      const instanceCostsDetails = ec2PricingMap.find(ins => ins?.InstanceType === it?.instanceTypes[0])

      let costPerMonth = 0

      if (instanceCostsDetails) {
        costPerMonth = it?.capacityType === "ON_DEMAND" ? instanceCostsDetails?.Cost * 720 : instanceCostsDetails?.SpotPrice * 720
      }

      return {
        "Name": (
          <GuiBox display="flex" alignItems="start" sx={{ width: "150px" }}>
            <GuiTypography
              sx={{ cursor: "pointer", textUnderlinePosition: "under", width: "150px" }}
              onClick={() => triggerServiceDetailModal(props.title, it.nodegroupName)}
              pl="" color="white" variant="button" fontWeight="medium">
              <u>{it?.nodegroupName}</u>
            </GuiTypography>
          </GuiBox>
        ),
        version: (
          <GuiBox display="flex" alignItems="center">
            <GuiTypography pl="" color="white" variant="button" fontWeight="regular" opacity="0.8">
              {props?.version}
            </GuiTypography>
          </GuiBox>
        ),
        status: (
          <GuiChip tooltip={it?.health?.issues?.[0]?.message ?? "healthy"} text={it?.status} color={it?.status === "ACTIVE" ? "green" : (["DELETING", "CREATE_FAILED"].includes(it?.status) ? "red" : (it?.status === "DEGRADED" ? "orange" : "lightblue"))} loader={it?.status !== "ACTIVE" && it?.status !== "DEGRADED"} />
        ),
        "type": (
          <GuiBox display="flex" alignItems="center">
            <GuiTypography pl="" color="white" variant="button" fontWeight="regular" opacity="0.8">
              NodeGroup
            </GuiTypography>
          </GuiBox>
        ),
        "Capacity type": (
          <GuiBox display="flex" alignItems="center">
            <GuiTypography pl="" color="white" variant="button" fontWeight="regular" opacity="0.8">
              {it?.capacityType?.replace("_", " ")}
            </GuiTypography>
          </GuiBox>
        ),
        "Instance": (
          <GuiBox display="flex" alignItems="center">
            <GuiTypography pl="" color="white" variant="button" fontWeight="regular" opacity="0.8">
              {it?.instanceTypes[0]}
            </GuiTypography>
          </GuiBox>
        ),
        "Nodes": (
          <GuiBox display="flex" alignItems="center">
            <GuiTypography pl="" color="white" variant="button" fontWeight="regular" opacity="0.8">
              {nodes?.length ?? 0}
            </GuiTypography>
          </GuiBox>
        ),
        "labels": (
          <GuiBox display="flex" alignItems="center">
            <NoMaxWidthTooltip key="labels" title={
              <GuiBox display="flex" alignItems="center" sx={{ flexWrap: "wrap", maxWidth: "250px", p: "4px", gap: "4px" }}>
                {
                  Object.entries(it?.labels || {}).map(([key, value]) => (<GuiTypography
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
              <GuiBox display="flex" alignItems="center" sx={{ width: "120px", flexWrap: "wrap", gap: "4px" }}>
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
                  })(Object.entries(it?.labels || {}))
                }
              </GuiBox>
            </NoMaxWidthTooltip>
          </GuiBox>
        ),
        "Cost/Month": (
          <GuiChip text={"$" + ((nodes?.length ?? 0) * costPerMonth)?.toFixed(1)} color={"green"} />
        ),
        "Region": (
          <GuiBox display="flex" alignItems="center">
            <GuiTypography pl="" color="white" variant="button" fontWeight="regular" opacity="0.8">
              {props?.region}
            </GuiTypography>
          </GuiBox>
        ),
        "CPU Used": (
          <GuiBox sx={{ width: '6rem' }}>
            <Tooltip key="cpu" title={`${percentageCPU?.toFixed(1)}% used`} placement="top">
              <GuiCompletionProgress value={percentageCPU?.toFixed(1)} color={`${percentageCPU > 50 ? (percentageCPU > 70 ? chip?.red?.main : chip?.orange?.border) : chip?.green?.main}`} />
            </Tooltip>
          </GuiBox>
        ),
        "Memory Used": (
          <GuiBox sx={{ width: '6rem' }}>
            <Tooltip key="cpu" title={`${percentageMem?.toFixed(1)}% used`} placement="top">

              <GuiCompletionProgress value={percentageMem?.toFixed(1)} color={`${percentageMem > 50 ? (percentageMem > 70 ? chip?.red?.main : chip?.orange?.border) : chip?.green?.main}`} />
            </Tooltip>
          </GuiBox>
        )
      }
    })?.concat(props.data.nodepools?.items?.map(it => {

      const nodePoolName = it?.metadata?.name
      const provisioner = props.data.provisioners?.items?.find(it =>
        it?.spec?.labels?.["karpenter.sh/nodepool"] === nodePoolName
      );

      return {
        "Name": (
          <GuiBox display="flex" alignItems="start" sx={{ width: "150px" }}>
            <GuiTypography
              sx={{ cursor: "pointer", textUnderlinePosition: "under", width: "150px" }}
              onClick={() => triggerServiceDetailModal(props.title, it?.metadata?.name, { type: "nodepool", meta: { nodepool: it, clusterName: props?.data?.clusterDetail?.name, clusterArn: props?.data?.clusterDetail?.arn, provisioner: provisioner } })}
              pl="" color="white" variant="button" fontWeight="medium">
              <u>{it?.metadata?.name}</u>
            </GuiTypography>
          </GuiBox>
        ),
        version: (
          <GuiBox display="flex" alignItems="center">
            <GuiTypography pl="" color="white" variant="button" fontWeight="regular" opacity="0.8">
              {props?.version}
            </GuiTypography>
          </GuiBox>
        ),
        status: (
          <GuiChip tooltip={"NodePool is ready for provisioning"} text={"ACTIVE"} color={"green"} />
        ),
        "type": (
          <GuiBox display="flex" alignItems="center">
            <GuiTypography pl="" color="white" variant="button" fontWeight="regular" opacity="0.8">
              NodePool
            </GuiTypography>
          </GuiBox>
        ),
        "Capacity type": (
          <GuiBox display="flex" alignItems="center">
            <GuiTypography pl="" color="white" variant="button" fontWeight="regular" opacity="0.8">
              {it?.spec?.template?.spec?.requirements?.find(req => req.key === "karpenter.sh/capacity-type")?.values?.map(elem => elem?.toUpperCase())?.join(", ")}
            </GuiTypography>
          </GuiBox>
        ),
        "Instance": (
          <GuiBox display="flex" alignItems="center">
            <Tooltip key="cpu" title={it?.spec?.template?.spec?.requirements?.find(req => req.key === "node.kubernetes.io/instance-type")?.values?.join(", ")} placement="top">
              <GuiTypography pl="" color="white" variant="button" fontWeight="regular" opacity="0.8">
                {
                  (values => values.length > 3
                    ? values.slice(0, 3).join(", ") + `, ${values.length - 3}+`
                    : values.join(", ")
                  )(it?.spec?.template?.spec?.requirements?.find(req => req.key === "node.kubernetes.io/instance-type")?.values || [])
                }              </GuiTypography>
            </Tooltip>
          </GuiBox>
        ),
        "Nodes": (
          <GuiBox display="flex" alignItems="center">
            <GuiTypography pl="" color="white" variant="button" fontWeight="regular" opacity="0.8">
              --
            </GuiTypography>
          </GuiBox>
        ),
        "labels": (
          <GuiBox display="flex" alignItems="center">
            <NoMaxWidthTooltip key="labels" title={
              <GuiBox display="flex" alignItems="center" sx={{ flexWrap: "wrap", maxWidth: "250px", p: "4px", gap: "4px" }}>
                {
                  Object.entries(it?.spec?.template?.metadata?.labels || {}).map(([key, value]) => (<GuiTypography
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
              <GuiBox display="flex" alignItems="center" sx={{ width: "120px", flexWrap: "wrap", gap: "4px" }}>
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
                  })(Object.entries(it?.spec?.template?.metadata?.labels || {}))
                }
              </GuiBox>
            </NoMaxWidthTooltip>
          </GuiBox>
        ),
        "Cost/Month": (
          <GuiBox display="flex" alignItems="center">
            <GuiTypography pl="" color="white" variant="button" fontWeight="regular" opacity="0.8">
              --
            </GuiTypography>
          </GuiBox>
        ),
        "Region": (
          <GuiBox display="flex" alignItems="center">
            <GuiTypography pl="" color="white" variant="button" fontWeight="regular" opacity="0.8">
              {props?.region}
            </GuiTypography>
          </GuiBox>
        ),
        "CPU Used": (
          <GuiBox sx={{ width: '6rem' }}>
            {/* <Tooltip key="cpu" title={`${percentageCPU?.toFixed(1)}% used`} placement="top">
              <GuiCompletionProgress value={percentageCPU?.toFixed(1)} color={`${percentageCPU > 50 ? (percentageCPU > 70 ? chip?.red?.main : chip?.orange?.border) : chip?.green?.main}`} />
            </Tooltip> */}
            <GuiTypography pl="" color="white" variant="button" fontWeight="regular" opacity="0.8">
              --
            </GuiTypography>
          </GuiBox>
        ),
        "Memory Used": (
          <GuiBox sx={{ width: '6rem' }}>
            <GuiTypography pl="" color="white" variant="button" fontWeight="regular" opacity="0.8">
              --
            </GuiTypography>
            {/* <Tooltip key="cpu" title={`${percentageMem?.toFixed(1)}% used`} placement="top">

              <GuiCompletionProgress value={percentageMem?.toFixed(1)} color={`${percentageMem > 50 ? (percentageMem > 70 ? chip?.red?.main : chip?.orange?.border) : chip?.green?.main}`} />
            </Tooltip> */}
          </GuiBox>
        )
      }
    }))?.filter(elem => elem !== undefined)
  };
}
