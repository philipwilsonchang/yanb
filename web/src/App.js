import React from 'react'
import {
  useReducer,
  forwardRef,
} from 'react'
import reducer from './reducer'
import { ResponsiveBullet } from '@nivo/bullet'
import { ResponsivePie } from '@nivo/pie'
import MaterialTable from 'material-table'
import './App.css'

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

export const LibraryContext = React.createContext(null);

const App = () => {
  const initialState = {
    transactions: [
      {ID: "3af71ef5-4e2c-49f2-b6ad-6bf772bfb7d1", CardID: "chase", ChargeTime: "2019-07-15 13:39:55.869131 -0400 -0400", Vendor: "google", Value: 16.05, CategoryName: "grocery"}, 
      {ID: "ff8e3e6a-eb81-4cdb-8863-a7513e10bc9c", CardID: "discover", ChargeTime: "2019-07-15 13:39:55.871058 -0400 -0400", Vendor: "wholefoods", Value: 17.99, CategoryName: "food"}, 
      {ID: "298a9a1f-9d80-4756-8692-1590dd546d06", CardID: "chase", ChargeTime: "2019-07-15 13:39:55.871798 -0400 -0400", Vendor: "toysrus", Value: 1.05, CategoryName: "uncategorized"}, 
      {ID: "227d7c84-d264-44af-ad85-f8aef0c2d812", CardID: "discover", ChargeTime: "2019-07-15 13:39:55.872672 -0400 -0400", Vendor: "lego", Value: 7.99, CategoryName: "food"}, 
      {ID: "321e57e2-567e-4141-a839-ad3a742f787f", CardID: "chase", ChargeTime: "2019-07-15 13:39:55.873401 -0400 -0400", Vendor: "jennis", Value: 6.08, CategoryName: "toys"}, 
      {ID: "c1d0b7c1-2cd9-44e6-a6ce-78108d7a41b7", CardID: "discover", ChargeTime: "2019-07-15 13:39:55.874047 -0400 -0400", Vendor: "harristeeter", Value: 13.49, CategoryName: "taxes"}
    ],
    budgets: {},
    budgetUsage: [],
    budgetUsageTest: [
      {
        "id": "grocery",
        "measures": [80],
        "ranges": [100],
        "markers": [],
      },
      {
        "id": "food",
        "measures": [65],
        "ranges": [120],
        "markers": [],
      },
      {
        "id": "toys",
        "measures": [10],
        "ranges": [50],
        "markers": [],
      },
    ],
  }

  const [state, dispatch] = useReducer(reducer, initialState); // eslint-disable-line

  return (
    <div className="container">
      <h1>Our Budget</h1>
      <LibraryContext.Provider value={{dispatch, state}}>
        <MaterialTable 
          style={{ maxWidth: "85%", margin: "auto" }}
          icons={tableIcons}
          columns={[
            {title: "Date and Time", field: "ChargeTime"},
            {title: "Card Used", field: "CardID"},
            {title: "Vendor", field: "Vendor"},
            {title: "Amount Charged", field: "Value"},
            {title: "Category", field: "CategoryName"}
          ]}
          data={state.transactions}
          title={"Expenses"}
        />
        <br />
        <div className="bullets">
          <ResponsiveBullet
            axisPosition="before"
            data={state.budgetUsageTest}
            height={300}
            margin={{ top: 50, right: 90, bottom: 50, left: 90 }}
            measureSize={0.5}
            titleOffsetX={-40}
            width={500}
          />
        />
        </div>
      </LibraryContext.Provider>
    </div>
  )
}

export default App