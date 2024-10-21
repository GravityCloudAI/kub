import { useEffect } from "react";

// react-router-dom components
import { useLocation } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// Vision UI Dashboard React components
import GuiBox from "components/GuiBox";

// Vision UI Dashboard React context
import { useGravityUIController, setLayout } from "context";

function PageLayout({ children }) {
  const [, dispatch] = useGravityUIController();
  const { pathname } = useLocation();

  useEffect(() => {
    setLayout(dispatch, "page");
  }, [pathname]);

  return (
    <GuiBox
      width="100vw"
      maxWidth="100%"
      height="100%"
      minHeight="100vh"
      sx={({ functions: { tripleLinearGradient }, palette: { gradients } }) => ({
        overflowX: "hidden",
        backgroundImage: tripleLinearGradient(
          gradients.cover.main,
          gradients.cover.state,
          gradients.cover.stateSecondary,
          gradients.cover.deg
        ),
        position: "relative",
      })}
    >
      {children}
    </GuiBox>
  );
}

// Setting default values for the props for PageLayout
PageLayout.defaultProps = {
  background: "default",
};

// Typechecking props for the PageLayout
PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;
