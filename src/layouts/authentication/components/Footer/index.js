// @mui material components
import Grid from "@mui/material/Grid";

// @mui icons

// Vision UI Dashboard React components
import { LinkedIn, Twitter } from "@mui/icons-material";
import { Link } from "@mui/material";
import GuiBox from "components/GuiBox";
import GuiTypography from "components/GuiTypography";

function Footer() {
  return (
    <GuiBox
      component="footer"
      py={6}
      sx={({ breakpoints }) => ({
        maxWidth: "450px",
        [breakpoints.down("xl")]: {
          maxWidth: "400px",
        },
      })}
    >
      <Grid container justifyContent="center">
        {/* <Grid item xs={12} sx={{ textAlign: "center" }}>
          <GuiTypography
            variant="button"
            sx={{ textAlign: "center", fontWeight: "400 !important" }}
            color="text"
          >
            @ 2021, Made with ❤️&nbsp;&nbsp;&nbsp; by{" "}
            <GuiTypography
              
              variant="button"
              href="#"
              sx={{ textAlign: "center", fontWeight: "500 !important" }}
              color="text"
              mr="2px"
            >
              Simmmple
            </GuiTypography>
            &
            <GuiTypography
              ml="2px"
              mr="2px"
              
              variant="button"
              href="#"
              sx={{ textAlign: "center", fontWeight: "500 !important" }}
              color="text"
            >
              Creative Tim
            </GuiTypography>
            for a better web
          </GuiTypography>
        </Grid> */}
        <Grid item xs={10}>
          <GuiBox display="flex" justifyContent="center" flexWrap="wrap">
            <GuiBox mr={{ xs: "20px", lg: "46px" }}>
              <GuiTypography href="https://gravitycloud.ai" variant="body2" color="text">
                <Link
                  target="_blank"
                  rel="noreferrer"
                  sx={{ textUnderlinePosition: "under" }}
                  href="https://gravitycloud.ai">
                  <u>Website</u>
                </Link>
              </GuiTypography>
            </GuiBox>
            <GuiBox mr={{ xs: "20px", lg: "46px" }}>
              <GuiTypography href="https://gravitycloud.ai/blogs" target="_blank" variant="body2" color="text">
                <Link
                  target="_blank"
                  rel="noreferrer"
                  sx={{ textUnderlinePosition: "under" }}
                  href="https://gravitycloud.ai/blogs">
                  <u>Blogs</u>
                </Link>
              </GuiTypography>
            </GuiBox>
            <GuiBox>
              <GuiTypography href="https://gravitycloud.ai/policy" variant="body2" color="text">
                <Link
                  target="_blank"
                  rel="noreferrer"
                  sx={{ textUnderlinePosition: "under" }}
                  href="https://gravitycloud.ai/policy">
                  <u>Privacy Policy</u>
                </Link>
              </GuiTypography>
            </GuiBox>
          </GuiBox>
          <GuiBox display="flex" justifyContent="center" flexWrap="wrap" mt="12px" sx={{ gap: "12px" }}>
            <Link
              target="_blank"
              rel="noreferrer"
              sx={{ textUnderlinePosition: "under" }}
              href="https://www.linkedin.com/company/gravity-cloud-ai">
              <LinkedIn color="white" />
            </Link>
            <Link
              target="_blank"
              rel="noreferrer"
              sx={{ textUnderlinePosition: "under" }}
              href="https://x.com/gravitycloudai">
              <Twitter color="white" />
            </Link>
          </GuiBox>
        </Grid>
      </Grid>
    </GuiBox>
  );
}

export default Footer;
