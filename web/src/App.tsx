import React, { useState } from 'react';

import ApolloClient from 'apollo-boost';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { ApolloProvider } from '@apollo/react-hooks';

import CategoryHUDContainer from './containers/CategoryHUDContainer';
import FixedSpendingListContainer from './containers/FixedSpendingListContainer';
import FlexSpendingListContainer from './containers/FlexCategoryListContainer';
import IncomeInputContainer from './containers/IncomeInputContainer';
import SpendingAdderContainer from './containers/SpendingAdderContainer';

import { StateProvider } from './state/useGlobalState';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const prismaAPI = 'http://localhost:4466';

const client = new ApolloClient({
  uri: prismaAPI,
});

const App: React.FC = () => {
  const [tabKey, setTabKey] = useState('flex-summary');

  return ( 
    <ApolloProvider client={client}>
      <StateProvider>
        <Tabs id="app" activeKey={tabKey} onSelect={(k: string) => setTabKey(k)}>
          <Tab id="flex-summary" eventKey="flex-summary" title="Summary">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '90%' }}>
                <br />
                <CategoryHUDContainer />
              </div>
            </div>
          </Tab>
          <Tab id="flex-add" eventKey="flex-add" title="Add Spending">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '90%' }}>
                <br />
                <SpendingAdderContainer />
              </div>
            </div>
          </Tab>
          <Tab id="budget" eventKey="budget" title="Modify Budget">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '90%' }}>
                <br />
                <IncomeInputContainer />
                <br />
                <FixedSpendingListContainer />
                <br />
                <FlexSpendingListContainer />
              </div>
            </div>
          </Tab>
        </Tabs>
      </StateProvider>
    </ApolloProvider>
  );
}

export default App;
