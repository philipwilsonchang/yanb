import React from 'react';

import CategoryDisplay from './components/CategoryDisplay';
import IncomeInput from './components/IncomeInput';
import SpendingAdder from './components/SpendingAdder';

import FixedSpendingListContainer from './containers/FixedSpendingListContainer';
import FlexSpendingListContainer from './containers/FlexCategoryListContainer';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const prismaAPI = 'http://localhost:4466';

const testCategories = [
  'Food',
  'Groceries',
  'Fun'
];

const App: React.FC = () => {
  return ( 
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '90%' }}>
        <FixedSpendingListContainer api={prismaAPI} />
        <br />
        <FlexSpendingListContainer api={prismaAPI} />
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
      </div>
    </div>
  );
}

export default App;
