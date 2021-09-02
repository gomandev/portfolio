import { combineReducers } from '@reduxjs/toolkit';
import { contactSlice } from './ducks/contact';
import { userSlice } from './ducks/auth';

const rootReducer = combineReducers({
  contact: contactSlice.reducer,
  user: userSlice.reducer,
});

export type RootState = ReturnType<typeof Object>;

export default rootReducer;
