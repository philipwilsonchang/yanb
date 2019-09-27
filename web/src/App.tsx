import React from 'react';

import CategoryDisplay from './components/CategoryDisplay';
import FixedSpendingList, { Cost } from './components/FixedSpendingList';
import IncomeInput from './components/IncomeInput';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const testList: Cost[] = [
  {name: "Item A", amount: 200},
  {name: "Item B", amount: 300},
  {name: "Item C", amount: 400}
];

const App: React.FC = () => {
  return ( 
    <div style={{ width: '75%' }}>
    <CategoryDisplay name="Test" limit={300} spent={200} />
    <br />
    <FixedSpendingList costs={testList} removeCost={(name) => console.log("REMOVE", name)} addCost={(name, amount) => console.log("ADD", name, amount)} />
    <br />
    <IncomeInput income={30000} interval='Weekly' changeIncome={(amount) => console.log("Change income:", amount)} changeInterval={(interval) => console.log("Change interval:", interval)}/>
    </div>
  );
}

export default App;
