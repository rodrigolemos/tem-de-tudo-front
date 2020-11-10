import React from 'react';

import { AuthContextProvider } from './auth';

const AppProvider = ({ children }) => (
  <AuthContextProvider>
    {children}
  </AuthContextProvider>
);

export default AppProvider;
