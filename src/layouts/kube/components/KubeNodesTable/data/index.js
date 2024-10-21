import { LinearProgress, Tooltip } from "@mui/material";
import GuiBox from "components/GuiBox";
import GuiChip from "components/GuiChip";
import GuiTypography from "components/GuiTypography";
import { extractKubeNodeDetails } from "helpers/kubeHelper";
import { calculateRequestedResourcesForNode } from "helpers/kubeHelper";
import colors from "assets/theme/base/colors";
import GuiCompletionProgress from "components/GuiCompletionProgress";
import { ec2PricingMap } from "helpers/pricingHelper";
import { NoMaxWidthTooltip } from "components/GuiToolTip";

export default function parseActionsData(props, triggerKubeDetailModal) {
  const { chip } = colors;

  return {
    columns: [
      { name: "node name", align: "left" },
      // { name: "Namespace", align: "left" },
      { name: "kube Version", align: "center" },
      { name: "instance type", align: "center" },
      { name: "capacity type", align: "center" },
      { name: "Cost/Month", align: "center" },
      { name: "latest condition", align: "center" },
      { name: "labels", align: "left" },
      { name: "CPU Used", align: "left" },
      { name: "Memory Used", align: "left" },
      // { name: "restarts", align: "center" },
      // { name: "age", align: "center" },
      // { name: "logs", align: "center" },
      // { name: "execute", align: "right" },
    ],

    rows: props?.data.map(it => {

      let latestCondition = null

      if (it?.status?.conditions?.length > 0) {
        latestCondition = it?.status?.conditions?.find(con => con.status === "True")?.type
      }

      let totalCPU = 0
      let totalMem = 0

      let avlCPU = 0
      let avlMem = 0

      let percentageCPU = 0
      let percentageMem = 0

      const workloadResources = calculateRequestedResourcesForNode(props?.pods, it?.metadata?.name)
      const details = extractKubeNodeDetails(it)
      totalCPU = totalCPU + parseInt(details.cpu?.total.replace("m", ""), 10);
      totalMem = totalMem + parseFloat(details.ram?.total.replace(" GiB", ""));

      avlCPU = avlCPU + parseInt(details.cpu?.available.replace("m", ""), 10) - workloadResources?.totalRequestedCPU
      avlMem = avlMem + parseFloat(details.ram?.available.replace(" GiB", "")) - workloadResources.totalRequestedRAM / 1024
      percentageCPU = (((totalCPU - avlCPU) * 100) / totalCPU) ?? 0
      percentageMem = (((totalMem - avlMem) * 100) / totalMem) ?? 0


      const instanceCostsDetails = ec2PricingMap.find(ins => ins?.InstanceType === it?.metadata?.labels?.["node.kubernetes.io/instance-type"])

      let costPerMonth = 0

      if (instanceCostsDetails) {
        const capType = ((it?.metadata?.labels?.["eks.amazonaws.com/capacityType"] ?? it?.metadata?.labels?.["karpenter.sh/capacity-type"])?.replace("_", " ")?.toUpperCase())
        costPerMonth = capType === "ON DEMAND" ? instanceCostsDetails?.Cost * 720 : instanceCostsDetails?.SpotPrice * 720
      }

      return {
        "node name": (
          <GuiBox display="flex" alignItems="start" sx={{ width: "200px" }}>
            <GuiTypography
              sx={{ cursor: "pointer", textUnderlinePosition: "under", width: "200px" }}
              onClick={() => { triggerKubeDetailModal(it?.metadata?.name, "node", { node: it, data: props.data, pods: props?.pods }) }}
              pl="" color="white" variant="button" fontWeight="medium">
              <u>{it?.metadata?.name}</u>
            </GuiTypography>
          </GuiBox>
        ),
        "instance type": (
          <GuiBox display="flex" alignItems="start">
            <GuiTypography
              pl="" color="white" variant="button" fontWeight="medium">
              {it?.metadata?.labels?.["node.kubernetes.io/instance-type"]}
            </GuiTypography>
          </GuiBox>
        ),
        "kube Version": (
          <GuiBox display="flex" alignItems="start">
            <GuiTypography
              pl="" color="white" variant="button" fontWeight="medium">
              {it?.status?.nodeInfo?.kubeProxyVersion?.trim()?.substring(1, 5)}
            </GuiTypography>
          </GuiBox>
        ),
        "capacity type": (
          <GuiBox display="flex" alignItems="start">
            <GuiChip text={(it?.metadata?.labels?.["eks.amazonaws.com/capacityType"] ?? it?.metadata?.labels?.["karpenter.sh/capacity-type"])?.replace("_", " ")?.toUpperCase()} color={(it?.metadata?.labels?.["eks.amazonaws.com/capacityType"] ?? it?.metadata?.labels?.["karpenter.sh/capacity-type"])?.replace("_", " ")?.toUpperCase() === "SPOT" ? "green" : "lightblue"} />
          </GuiBox>
        ),
        "latest condition": (
          <GuiBox display="flex" alignItems="start">
            <GuiChip text={latestCondition} color={latestCondition === "Ready" ? "green" : "red"} />
          </GuiBox>
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
                  })(Object.entries(it?.metadata?.labels || {}))
                }
              </GuiBox>
            </NoMaxWidthTooltip>
          </GuiBox>
        ),
        "Cost/Month": (
          <GuiChip text={"$" + (costPerMonth)?.toFixed(1)} color={"green"} />
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
        // "status": (
        //   <GuiChip text={it?.status} loader={it?.status === "Pending"} color={it?.status === "Running" ? "green" : (it?.status === "CrashLoopBackOff" || it?.status === "CreateContainerConfigError") ? "red" : (it?.status === "Pending") ? "lightblue" : "lightblue"} />
        // ),
        // "latest condition": (
        //   <GuiChip text={it?.latestCondition} color={(podConditions?.find(item => item.reason === it?.latestCondition) || { type: "progres" }).type === "success" ? "green" : ((podConditions?.find(item => item.reason === it?.latestCondition) || { type: "progres" }).type === "failure" ? "red" : "lightblue")} />
        // ),
        // "restarts": (
        //   <GuiBox display="flex" alignItems="start">
        //     <GuiTypography
        //       pl="" color="white" variant="button" fontWeight="medium">
        //       {it?.restarts}
        //     </GuiTypography>
        //   </GuiBox>
        // ),
        // "age": (
        //   <GuiBox display="flex" alignItems="start">
        //     <GuiTypography
        //       pl="" color="white" variant="button" fontWeight="medium">
        //       {it?.age}
        //     </GuiTypography>
        //   </GuiBox>
        // )
      }
    })
  };
}
