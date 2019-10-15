import React, { useState } from 'react';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import FixedSpendingListContainer from './containers/FixedSpendingListContainer';
import FlexSpendingListContainer from './containers/FlexCategoryListContainer';
import IncomeInputContainer from './containers/IncomeInputContainer';
import SpendingAdderContainer from './containers/SpendingAdderContainer';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const prismaAPI = 'http://localhost:4466';

const App: React.FC = () => {
  const [tabKey, setTabKey] = useState('flex-summary');

  return ( 
    // <div style={{ display: 'flex', justifyContent: 'center' }}>
    //   <div style={{ width: '90%' }}>
    //     <SpendingAdderContainer api={prismaAPI} />
    //     <br />
    //     <FixedSpendingListContainer api={prismaAPI} />
    //     <br />
    //     <FlexSpendingListContainer api={prismaAPI} />
    //     <br />
    //     <IncomeInputContainer api={prismaAPI} />
    //   </div>
    // </div>
    <Tabs id="app" activeKey={tabKey} onSelect={(k: string) => setTabKey(k)}>
      <Tab id="flex-summary" eventKey="flex-summary" title="Summary">
      </Tab>
      <Tab id="flex-add" eventKey="flex-add" title="Add Spending">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '90%' }}>
            <br />
            <SpendingAdderContainer api={prismaAPI} />
          </div>
        </div>
      </Tab>
      <Tab id="budget" eventKey="budget" title="Modify Budget">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '90%' }}>
            <br />
            <IncomeInputContainer api={prismaAPI} />
            <br />
            <FixedSpendingListContainer api={prismaAPI} />
            <br />
            <FlexSpendingListContainer api={prismaAPI} />
           </div>
        </div>
      </Tab>
    </Tabs>
  );
}

export default App;
