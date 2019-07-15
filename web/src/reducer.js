function reducer(state, action) {
  console.log(action);
  switch (action.action) {
    case 'ADD':
      return state.push(action.payload);
    case 'DELETE':
      return state.filter(book => {
        if (book.isbn !== action.payload) {
          return true
        }
        return false
      });
    case 'EDIT':
      return state.map(book => {
        if (book.isbn === action.payload.isbn) {
          book.title = action.payload.title;
          book.author = action.payload.author;
        }
        return book;
      });
    default:
      console.log("ERROR ACTION:", action)
      throw new Error();
  }
}

export default reducer;