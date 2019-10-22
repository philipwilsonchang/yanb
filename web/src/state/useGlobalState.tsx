import React, { Dispatch, createContext, useContext, useReducer } from 'react';

import { IAction, reducer } from './reducer';
import { initialState, IGlobalState } from './initialState';

interface IContextProps {
  state: IGlobalState;
  dispatch: Dispatch<IAction>;
}

export const StateContext = createContext({} as IContextProps);

export const StateProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
	  <StateContext.Provider value={{ state, dispatch }}>
	    { children }
	  </StateContext.Provider>
  );
};

export const useGlobalState = () => useContext(StateContext);