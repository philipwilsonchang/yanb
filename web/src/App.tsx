import React from 'react';

import CategoryDisplay from './components/CategoryDisplay';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App: React.FC = () => {
  return (
    <CategoryDisplay name="Test" limit={300} spent={200} />
  );
}

export default App;
