import React from 'react'
import {
  useReducer,
} from 'react'
import reducer from './reducer'
import BooksTable from './BooksTable'

export const LibraryContext = React.createContext(null);

const App = () => {
  const initialState = [
    {title: 'The Hobbit', author: 'J.R.R. Tolkien', isbn: '1'},
    {title: 'The Bible', author: 'Various', isbn: '2'}
  ]

  const [state, dispatch] = useReducer(reducer, initialState); // eslint-disable-line

  return (
    <div className="container">
      <h1>CRUD Library App with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          <h2>Add Book</h2>
        </div>
        <div className="flex-large">
          <h2>View Books</h2>
          <LibraryContext.Provider value={{dispatch, state}}>
            <BooksTable />
          </LibraryContext.Provider>
        </div>
      </div>
    </div>
  )
}

export default App