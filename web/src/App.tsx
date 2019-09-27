import React from 'react';

import CategoryDisplay from './components/CategoryDisplay';
import FixedSpendingList, { Cost } from './components/FixedSpendingList';
import FlexCategoryList, { FlexCategory } from './components/FlexCategoryList';
import IncomeInput from './components/IncomeInput';
import SpendingAdder from './components/SpendingAdder';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const testList: Cost[] = [
  {name: "Item A", amount: 200},
  {name: "Item B", amount: 300},
  {name: "Item C", amount: 400}
];

const testCategories = [
  'Food',
  'Groceries',
  'Fun'
];

const testFlexCategories: FlexCategory[] = [
  {name: 'Food', limit: 400 },
  {name: 'Groceries', limit: 400},
  {name: 'Fun', limit: 200}
];

const App: React.FC = () => {
  return ( 
    <div style={{ width: '75%' }}>
    <CategoryDisplay name="Test" limit={300} spent={200} />
    <br />
    <FixedSpendingList 
      costs={testList} 
      newName='New Cost'
      newAmount={89.70}
      changeNewName={(name) => console.log("CHANGE NAME:", name)}
      changeNewAmount={(amount) => console.log("CHANGE AMOUNT:", amount)}
      removeCost={(name) => console.log("REMOVE", name)} 
      submitCost={() => console.log("SUBMIT FIXED COST")} />
    <br />
    <IncomeInput income={30000} interval='Weekly' changeIncome={(amount) => console.log("Change income:", amount)} changeInterval={(interval) => console.log("Change interval:", interval)}/>
    <br />
    <SpendingAdder 
      categories={testCategories} 
      selectedCategory='Fun' 
      categoryLimit={200} 
      categorySpent={150} 
      amount={20.54} 
      changeCategory={(cat) => console.log("Change category:", cat)}
      changeAmount={(amt) => console.log("Change amount:", amt)}
      submitFunc={() => console.log("SUBMIT")}
    />
    <br />
    <FlexCategoryList 
      categories={testFlexCategories}
      newName={'Tax'}
      newLimit={150.45}
      changeNewName={(name) => console.log("CHANGE NAME:", name)}
      changeNewLimit={(limit) => console.log("CHANGE AMOUNT:", limit)}
      removeCategory={(name) => console.log("REMOVE", name)}
      submitCategory={() => console.log("SUBMIT CATEGORY")}
     />
    </div>
  );
}

export default App;
