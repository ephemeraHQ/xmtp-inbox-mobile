import './src/polyfills';

import React from 'react';
import {AppNavigation} from './src/navigation/AppNavigation';
import {Providers} from './src/providers';

function App(): React.JSX.Element {
  return (
    <Providers>
      <AppNavigation />
    </Providers>
  );
}

export default App;
