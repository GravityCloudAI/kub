// Vision UI Dashboard React components
import GuiBox from "components/GuiBox";

// Vision UI Dashboard React context

function GradientBorder(props) {
  const { backgroundImage, children, borderRadius, width, minWidth, ...rest } = props;
  return (
    <GuiBox
      padding="0px"
      width={width}
      minWidth={minWidth}
      height="fit-content"
      borderRadius={borderRadius}
      sx={{
        height: "fit-content",
        border: "1px solid #26282d"
        // backgroundImage: backgroundImage
        //   ? backgroundImage
        //   : "radial-gradient(94.43% 69.43% at 50% 50%, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%)",
      }}
      {...rest}
    >
      {children}
    </GuiBox>
  );
}

export default GradientBorder;
