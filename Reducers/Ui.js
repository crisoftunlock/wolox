import React, { useEffect, useReducer, useContext, createContext } from "react";

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "togglesearchbar":
      return { ...state, showSearch: payload };

    case "setviewtitle":
      return { ...state, viewTitle: payload }

    default:
      return { ...state }
  }
};

export const useUiState = () => useContext(Context);

const initialState = {
  showSearch: false,
  viewTitle: ''
};

const Context = createContext(initialState);

export const CtxUiProvider = ({ children, ...props }) => {
  const [uiStore, uiDispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ uiStore, uiDispatch }}>
      {children}
    </Context.Provider>
  );
};
