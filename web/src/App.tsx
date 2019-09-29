import React from 'react';

import CategoryDisplay from './components/CategoryDisplay';
import FlexCategoryList, { FlexCategory } from './components/FlexCategoryList';
import IncomeInput from './components/IncomeInput';
import SpendingAdder from './components/SpendingAdder';

import FixedSpendingListContainer from './containers/FixedSpendingListContainer';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

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
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '90%' }}>
        <FixedSpendingListContainer api='http://localhost:4466' />
        <br />
        <CategoryDisplay name="Test" limit={300} spent={200} />
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
    </div>
  );
}

export default App;
