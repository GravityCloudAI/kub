// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Vision UI Dashboard React components
import GuiBox from "components/GuiBox";
import GuiTypography from "components/GuiTypography";

// Vision UI Dashboard React example components
import PageLayout from "components/PageLayout";

// Authentication layout components
import Footer from "../Footer";

// Vision UI Dashboard React theme functions
import colors from "assets/theme/base/colors";

// Vision UI Dashboard React theme functions
import GravitonLogo from "../../../../assets/images/g-logo.svg";

function CoverLayout({
  color,
  header,
  title,
  description,
  motto,
  premotto,
  image,
  top,
  cardContent,
  children,
}) {
  const { gradients } = colors;
  return (
    <PageLayout
    // background={tripleLinearGradient(
    //   gradients.cover.main,
    //   gradients.cover.state,
    //   gradients.cover.stateSecondary,
    //   gradients.cover.angle
    // )}
    >
      {/* <DefaultNavbar
        action={{
          type: "external",
          route: "https://creative-tim.com/product/vision-ui-dashboard-pro-react",
          label: "BUY NOW",
        }}
      /> */}
      <GuiBox
        height="100%"
        width="40vw"
        display={{ xs: "none", md: "block" }}
        position="absolute"
        top={0}
        left={0}
        sx={({ breakpoints }) => ({
          overflow: "hidden",
          [breakpoints.down("xl")]: {
            mr: "100px",
          },
          [breakpoints.down("lg")]: {
            display: "none",
          },
        })}
        zIndex={0}
      >
        <GuiBox
          height="100%"
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >

          <GuiBox
            component="img"
            src={image}
            alt="Cover Image"
            height="100%"
            width="100%"
            sx={{
              objectFit: "cover",
              objectPosition: "center",
              marginLeft: "50px",
              marginTop: "50px",
              marginBottom: "50px",
              marginRight: "30px",
              padding: "10px",
            }}
          />

          {/* <GuiBox component='img' src={GravitonText} sx={{ height: "4%" }} mb="18px" /> */}
          {/* <GuiTypography
            textAlign={cardContent ? "center" : "start"}
            variant="h1"
            fontWeight="medium"
            color="white"
            mb="10px"
            sx={{ mb: 1 }}
          >
            {premotto}
          </GuiTypography> */}
          {/* <GuiTypography
            textAlign={cardContent ? "center" : "start"}
            variant="h2"
            // fontWeight="bold"
            color="logo"
            // opacity="0.7"
            mb="10px"
            textGradient
          >
            {motto}
          </GuiTypography> */}
        </GuiBox>
      </GuiBox>
      <GuiBox
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          alignItems: "center",
          maxWidth: "1044px",
          minHeight: "65vh",
          margin: "0 auto",
        }}
      >
        <GuiBox
          mt={"5%"}
          ml="auto !important"
          sx={({ breakpoints }) => ({
            [breakpoints.down("xl")]: {
              mr: cardContent ? "50px" : "100px",
            },
            [breakpoints.down("lg")]: {
              mr: "auto",
              ml: "auto !important",
            },
            [breakpoints.down("md")]: {
              maxWidth: "90%",
              pr: "7px",
              pl: "10px !important",
            },
          })}
        >
          <GuiBox pt={1} px={3} mx="auto !important" maxWidth={cardContent ? "400px" : "350px"}>
            {!header ? (
              <>
                <GuiBox mb="24px" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                  {/* <GravitonLogo/> */}
                  <GuiBox component='img' src={GravitonLogo} sx={{ maxWidth: "30%" }} mb="18px" />

                  <GuiTypography
                    textAlign={cardContent ? "center" : "start"}
                    variant="h3"
                    fontWeight="bold"
                    color={color}
                    mb="10px"
                  >
                    {title}
                  </GuiTypography>
                  <GuiTypography
                    textAlign={cardContent ? "center !important" : "start !important"}
                    mx="auto"
                    sx={({ typography: { size }, functions: { pxToRem } }) => ({
                      fontWeight: "regular",
                      fontSize: size.xl,
                    })}
                    color="white"
                  >
                    {description}
                  </GuiTypography>
                </GuiBox>
              </>
            ) : (
              header
            )}
          </GuiBox>
          <GuiBox
            px={3}
            mb="12px"
            mx="auto"
            ml="auto !important"
            sx={({ breakpoints }) => ({
              mt: cardContent ? "12px" : { top },
              maxWidth: cardContent ? "450px" : "350px",
              [breakpoints.down("xl")]: {
                mr: cardContent ? "0px" : "100px",
              },
              [breakpoints.only("lg")]: {
                mr: "auto",
                ml: "auto !important",
              },
              [breakpoints.down("lg")]: {
                mr: "auto",
                ml: "auto !important",
              },
              [breakpoints.down("md")]: {
                mr: cardContent ? "auto !important" : "unset",
                pr: "7px",
                pl: cardContent ? "0px !important" : "10px !important",
              },
            })}
          >
            {children}
          </GuiBox>
          <Footer />
        </GuiBox>
      </GuiBox>
    </PageLayout>
  );
}

// Setting default values for the props of CoverLayout
CoverLayout.defaultProps = {
  header: "",
  title: "",
  description: "",
  color: "info",
  top: 20,
};

// Typechecking props for the CoverLayout
CoverLayout.propTypes = {
  header: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  top: PropTypes.number,
  children: PropTypes.node.isRequired,
};

export default CoverLayout;
