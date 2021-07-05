import React from 'react';
import AppHolder from './Reducers/AppHolder';
import { useAuth } from './Reducers/Auth';
import LoggedRoutes from './Routes/LoggedRoutes';
import UnloggedRoutes from './Routes/UnloggedRoutes';


function App() {
  const { authStore: { authenticated } } = useAuth();
  return (
    <>
      {
        authenticated ?
          <LoggedRoutes />
          :
          <UnloggedRoutes />

      }
    </>
  );
};


export default AppHolder(App);
