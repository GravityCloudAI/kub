import SignIn from "layouts/authentication/sign-up";
import Kube from "layouts/kube";
import { IoRocketSharp } from "react-icons/io5";
import { SiKubernetes } from "react-icons/si";

const routes = [
  {
    type: "collapse",
    name: "Kubernetes",
    key: "kubernetes",
    route: "/kubernetes",
    icon: <SiKubernetes size="22px" color="inherit" />,
    component: Kube,
    noCollapse: true,
  },
  {
    type: "hidden",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <IoRocketSharp size="15px" color="inherit" />,
    component: SignIn,
    noCollapse: true,
  }
];

export default routes;
