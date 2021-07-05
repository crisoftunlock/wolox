import React, { useReducer, useContext, createContext, useEffect } from "react";

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'getusers':
      return { ...state, userList: payload }


    case "authsuccess":
      return { ...state, authenticated: true, userList: payload }


    case "logout":
      return { ...state, authenticated: false }

    case "registersuccess":
      const { userList } = state;
      const newUser = [...userList, payload];
      return { ...state, userList: newUser }

    case "registererror":
      return { ...state, authenticated: true, userData: payload }

    default:
      return { ...state }
  }
};

export const useAuth = () => useContext(Context);

const initialState = {
  authenticated: false,
  userData: {},
  userList: []
};

const Context = createContext(initialState);

export const CtxAuth = ({ children }) => {
  const [authStore, authDispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      let response = await fetch('http://127.0.0.1:3000/sign_in');
      let data = response.ok && await response.json();
      authDispatch({
        type: 'getusers',
        payload: data
      })
    })()
  }, []);


  return (
    <Context.Provider value={{ authStore, authDispatch }}>
      {children}
    </Context.Provider>
  );
};
