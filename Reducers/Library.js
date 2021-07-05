import React, { useEffect, useReducer, useContext, createContext } from "react";

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "networkStatus":
      return { ...state, networkOK: payload };

    case "getdata":
      return { ...state, libraryData: payload, filteredData: payload };

    case "search":
      return { ...state, filteredData: payload }

    case "chosenBook":
      return { ...state, chosenBook: payload }

    default:
      return { ...state }
  }
};

export const useLibraryState = () => useContext(Context);

const initialState = {
  libraryData: [],
  filteredData: [],
  chosenBook: {}
};

const Context = createContext(initialState);

export const CtxLibraryProvider = ({ children }) => {
  const [libraryStore, libraryDispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      let response = await fetch('http://127.0.0.1:3000/books');
      let data = response.ok && await response.json();
      libraryDispatch({
        type: 'getdata',
        payload: data
      });
    })()
  }, []);

  return (
    <Context.Provider value={{ libraryStore, libraryDispatch }}>
      {children}
    </Context.Provider>
  );
};
