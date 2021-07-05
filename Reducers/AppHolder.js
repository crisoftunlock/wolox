import React from 'react';
import ReducerProvider from '.';

const AppHolder = Component => props => (
    <ReducerProvider>
        {<Component {...props} />}
    </ReducerProvider>
)

export default AppHolder;