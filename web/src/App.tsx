import React, { useState } from 'react';

import ApolloClient from 'apollo-boost';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { ApolloProvider } from '@apollo/react-hooks';

import CategoryHUDContainer from './containers/CategoryHUDContainer';
import FixedSpendingListContainer from './containers/FixedSpendingListContainer';
import FlexSpendingListContainer from './containers/FlexCategoryListContainer';
import RollingCostCategoryListContainer from './containers/RollingCostCategoryListContainer';
import LoginContainer from './containers/LoginContainer';
import IncomeInputContainer from './containers/IncomeInputContainer';
import SpendingAdderContainer from './containers/SpendingAdderContainer';
import { StateProvider } from './state/useGlobalState';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const api = process.env.YANB_GRAPHQL_API; 

const unauthedClient = new ApolloClient({
  uri: api
})

const App: React.FC = () => {
  const [tabKey, setTabKey] = useState('flex-summary');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [client, setClient] = useState<ApolloClient<unknown>>(unauthedClient);  

  const uponLogin = (token: string) => {
    setClient(new ApolloClient({
      uri: api,
      request: (operation) => {
        operation.setContext({
          headers: {
            authorization: token ? `Bearer ${token}` : ''
          }
        })
      }
    }));
    setIsLoggedIn(true);
  };

  return ( 
    <div>
      {!isLoggedIn && (
        <ApolloProvider client={client}>
          <LoginContainer onLogin={uponLogin} />
        </ApolloProvider>
      )}
      {isLoggedIn && client !== unauthedClient &&
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
                    <br />
                    <RollingCostCategoryListContainer />
                  </div>
                </div>
              </Tab>
            </Tabs>
          </StateProvider>
        </ApolloProvider>
      }
    </div>
  );
}

export default App;
