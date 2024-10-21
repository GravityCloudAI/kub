import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// react-router-dom components

// @mui material components
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import GoogleLogin from "../../../assets/images/logingoogle.svg";
// Icons

// Vision UI Dashboard React components
import GuiBox from "components/GuiBox";
import GuiTypography from "components/GuiTypography";
import GradientBorder from "components/GradientBorder";

// Vision UI Dashboard assets
import borders from "assets/theme/base/borders";
import rgba from "assets/theme/functions/rgba";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import pxToRem from "assets/theme/functions/pxToRem";
import { Checkbox, CircularProgress, Link } from "@mui/material";
import { getBaseAPIUrl } from "helpers/stringHelper";
import GuiInput from "components/GuiInput";
import GuiButton from "components/GuiButton";
import customAxios from "../../../axiosi";
// Images

require('dotenv').config()

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [email, setEmail] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(false);

  const [password, setPassword] = useState("");

  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const handleEmailChange = (e) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setEmail(e.target.value);
    if (emailRegex.test(e.target.value)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (passwordRegex.test(e.target.value)) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  };

  const encryptPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  const registerOrLogin = async () => {
    try {
      setIsLoading(true);

      if (isEmailValid && isPasswordValid) {
        const encryptedPassword = await encryptPassword(password);
        await customAxios.post(`${getBaseAPIUrl()}/api/v1/auth/signup`, {
          email,
          encryptedPassword
        })
        setIsLoading(false);
        history.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  const openLink = () => {
    const url = `${getBaseAPIUrl()}/api/v1/auth`;
    if (window?.electron?.shell) {
      // get app version
      // get react app version
      window?.electron?.shell.openExternal(url );
    } else {
      window.open(url, '_blank');
    }
  }

  return (
    <CoverLayout
      title="Get Started with Gravity!"
      color="white"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      description="AI-Powered Developer Platform"
      image={"https://res.cloudinary.com/dor5uewzz/image/upload/v1726901910/login-cover_u4goeu.png"}
      premotto=""
      motto=""
      cardContent
    >
      <GradientBorder borderRadius={borders.borderRadius.form} minWidth="100%" maxWidth="100%">
        <GuiBox
          component="form"
          role="form"
          borderRadius="inherit"
          p="15px"
          sx={({ palette: { secondary } }) => ({
            backgroundColor: secondary.focus,
          })}
        >
          <GuiTypography
            color="white"
            fontWeight="bold"
            textAlign="center"
            mb="2px"
            mt="2px"
            sx={({ typography: { size } }) => ({
              fontSize: size.lg,
            })}
          >
            Register or Login with Business Email
          </GuiTypography>
          <Stack mb="0px" justifyContent="center" alignItems="center" direction="row" spacing={2}>
            <a href="#" onClick={openLink}>
              <IconButton
                transition="all .25s ease"
                justify="center"
                align="center"
                bg="rgb(19,21,54)"
                borderradius="15px"
                sx={({ palette: { secondary }, borders: { borderRadius } }) => ({
                  borderRadius: borderRadius.xl,
                  padding: "12px",
                  backgroundColor: secondary.focus,
                  "&:hover": {
                    backgroundColor: rgba(secondary.focus, 0.9),
                  },
                })}
              >
                <GuiBox component='img' src={GoogleLogin} alt="Google Login" sx={{ maxWidth: "300px" }} />
              </IconButton>
            </a>
          </Stack>
          <GuiTypography
            color="white"
            fontWeight="bold"
            textAlign="center"
            mb="12px"
            mt="0px"
            sx={({ typography: { size } }) => ({
              fontSize: size.lg,
            })}
          >
            OR
          </GuiTypography>
          <Stack mb="12px" justifyContent="center" alignItems="center" direction="column" spacing={2}>
            <GuiInput
              placeholder="Enter your email"
              error={!isEmailValid && email !== ""}
              helperText={!isEmailValid && email !== "" ? "Invalid email address" : ""}
              onChange={(e) => handleEmailChange(e)}
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

            <GuiInput
              placeholder="Enter your password"
              error={!isPasswordValid && password !== ""}
              helperText={!isPasswordValid && password !== "" ? "Minimum 8 characters, 1 uppercase letter, 1 special character" : ""}
              onChange={(e) => handlePasswordChange(e)}
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

            <GuiButton
              onClick={() => registerOrLogin()}
              disabled={password === "" || email === "" || !isEmailValid || !isPasswordValid}
              color="info"
              sx={{ width: "100%", maxWidth: `${pxToRem(250)}` }}
            >
              {
                isLoading ?
                  <>
                    <CircularProgress size="1rem" thickness={4} sx={{ color: "#ffffff" }} />
                  </> :
                  <GuiTypography
                    color="white"
                    fontWeight="bold"
                    textAlign="center"
                    m="0px"
                    sx={{ fontSize: `${pxToRem(14)}` }}
                  >
                    Sign Up / Login
                  </GuiTypography>
              }

            </GuiButton>
          </Stack>
        </GuiBox>
      </GradientBorder>
      <GuiBox display="flex" justifyContent="center" sx={{ gap: "4px", mt: "12px" }} textAlign={"center"}>
        <Checkbox style={{ color: "#fff" }} defaultChecked={true} disabled="true" />
        <GuiTypography variant="h6" color="white" fontWeight="regular" sx={{ fontSize: `${pxToRem(13)}`, opacity: "0.7" }}>
          By signing up you agree to the
        </GuiTypography>

        <GuiTypography variant="h6" fontWeight="regular" color="info" sx={{ fontSize: `${pxToRem(13)}`, color: "#818aff !important" }}>
          <Link
            target="_blank"
            rel="noreferrer"
            sx={{ color: "#818aff !important" }}
            href="https://gravitycloud.ai/policy">
            <u style={{ color: "#818AFF", borderColor: "#818AFF" }}>Privacy Policy</u>
          </Link>
        </GuiTypography>

      </GuiBox>
    </CoverLayout>
  );
}

export default SignIn;
