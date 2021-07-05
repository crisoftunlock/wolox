import React from 'react';
import { CtxAuth } from './Auth';
import { CtxLibraryProvider } from './Library';
import { CtxUiProvider } from './Ui';

function ReducerProvider({ children }) {
  return (
    <CtxAuth>
      <CtxUiProvider>
        <CtxLibraryProvider>
          {children}
        </CtxLibraryProvider>
      </CtxUiProvider>
    </CtxAuth>
  )
}

export default ReducerProvider;