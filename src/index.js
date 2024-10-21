import App from "App";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";

import { GravityUIControllerProvider } from "context";
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const render = () => {
  return root.render(
    <HashRouter>
      <GravityUIControllerProvider>
        <App />
      </GravityUIControllerProvider>
    </HashRouter>
  )
}

render()