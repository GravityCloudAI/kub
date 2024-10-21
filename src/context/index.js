import { createContext, useContext, useReducer } from "react";

import PropTypes from "prop-types";

const GravityUI = createContext();

// Setting custom name for the context which is visible on react dev tools
GravityUI.displayName = "GravityUIContext";

// Gravity UI Dashboard React reducer
function reducer(state, action) {
  switch (action.type) {
    case "MINI_SIDENAV": {
      return { ...state, miniSidenav: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    case "LAYOUT": {
      return { ...state, layout: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function GravityUIControllerProvider({ children }) {
  const initialState = {
    miniSidenav: false,
    transparentSidenav: true,
    transparentNavbar: true,
    fixedNavbar: true,
    layout: "kubernetes",
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  return <GravityUI.Provider value={[controller, dispatch]}>{children}</GravityUI.Provider>;
}

function useGravityUIController() {
  const context = useContext(GravityUI);

  if (!context) {
    throw new Error("useGravityUIController should be used inside the GravityUIControllerProvider.");
  }

  return context;
}

GravityUIControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Context module functions
const setMiniSidenav = (dispatch, value) => dispatch({ type: "MINI_SIDENAV", value });
const setTransparentNavbar = (dispatch, value) => dispatch({ type: "TRANSPARENT_NAVBAR", value });
const setFixedNavbar = (dispatch, value) => dispatch({ type: "FIXED_NAVBAR", value });
const setLayout = (dispatch, value) => dispatch({ type: "LAYOUT", value });

export {
  GravityUIControllerProvider,
  useGravityUIController,
  setMiniSidenav,
  setTransparentNavbar,
  setFixedNavbar,
  setLayout
};
