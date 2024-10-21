const { default: GuiBox } = require("components/GuiBox");
const { NoMaxWidthTooltip } = require("components/GuiToolTip");
const { default: GuiTypography } = require("components/GuiTypography");

export default function GuiLabels(props) {
    const { labelsList } = props
    return (
        <GuiBox display="flex" alignItems="center">
            <NoMaxWidthTooltip key="labels" title={
                <GuiBox display="flex" alignItems="center" sx={{ flexWrap: "wrap", maxWidth: "250px", p: "4px", gap: "4px" }}>
                    {
                        labelsList.map(([key, value]) => (<GuiTypography
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
                <GuiBox display="flex" alignItems="center" sx={{ width: "250px", flexWrap: "wrap", gap: "4px" }}>
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
                        })(labelsList)
                    }
                </GuiBox>
            </NoMaxWidthTooltip>
        </GuiBox>
    )
}