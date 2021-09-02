import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface Users {
  id: number;
  first_name: string;
  last_name: string;
  email_name: string;
  phone: string;
  email: string;
  photo: string;
  address: string;
  country: string;
  group: string;
  user: [];
}

export type UserState = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  username: string;
  state: string;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
  isLoggedIn: boolean;
};

const initialState: UserState = {
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  username: '',
  state: '',
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  isLoggedIn: false,
};

export const signupUser: any = createAsyncThunk(
  'users/signupUser',
  async (
    { firstName, email, password, lastName, phone, username, state, message }: any,
    thunkAPI,
  ) => {
    try {
      const response = await fetch('http://18.116.71.121/api/v1/users/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          state,
          username,
          email,
          password,
          message,
        }),
      });
      let data = await response.json();
      console.log('data', data);

      if (response.status === 200) {
        sessionStorage.setItem('token', data.token);
        return { ...data, firstName, lastName, email, phone, state, username };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const loginUser: any = createAsyncThunk(
  'users/login',
  async ({ email, password }: any, thunkAPI) => {
    try {
      const response = await fetch('https://ascend-newer.herokuapp.com/loginUser', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      let data = await response.json();
      console.log('response', data);
      if (response.status === 200) {
        sessionStorage.setItem('token', data.token);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const forgotPassword: any = createAsyncThunk(
  'users/forgot',
  async ({ email }: any, thunkAPI) => {
    try {
      const response = await fetch(
        'https://ascend-newer.herokuapp.com/forgotPassword',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
          }),
        },
      );
      let data = await response.json();
      console.log('response', data);
      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const resetPassword: any = createAsyncThunk(
  'users/reset',
  async ({ token, password }: any, thunkAPI) => {
    try {
      const response = await fetch(
        'https://ascend-newer.herokuapp.com/resetPassword',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            token,
            password,
          }),
        },
      );
      let data = await response.json();
      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const fetchUserBytoken: any = createAsyncThunk(
  'users/fetchUserByToken',
  async ({ token }: any, thunkAPI) => {
    try {
      const response = await fetch(
        'https://ascend-newer.herokuapp.com/getSingleUser',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'X-Auth-Token': token,
            'Content-Type': 'application/json',
          },
        },
      );
      let data = await response.json();
      console.log('data', data.data, response.status);

      if (response.status === 200) {
        return data.data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const userSlice: any = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearState: state => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
  },
  extraReducers: {
    [signupUser.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.email = payload.email;
      state.username = payload.name;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.phone = payload.phone;
      state.state = payload.state;
    },
    [signupUser.pending]: state => {
      state.isFetching = true;
    },
    [signupUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.email = payload.user.email;
      state.username = payload.username;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [loginUser.pending]: state => {
      state.isFetching = true;
    },
    [forgotPassword.fulfilled]: (state, { payload }) => {
      state.email = payload.email;
      state.isFetching = false;
      state.isLoggedIn = true;
      state.isSuccess = true;
      return state;
    },
    [forgotPassword.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [forgotPassword.pending]: state => {
      state.isFetching = true;
    },
    [fetchUserBytoken.pending]: state => {
      state.isFetching = true;
    },
    [fetchUserBytoken.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;

      state.email = payload.email;
      state.username = payload.name;
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.phone = payload.phone;
      state.state = payload.state;
    },
    [fetchUserBytoken.rejected]: state => {
      console.log('fetchUserBytoken');
      state.isFetching = false;
      state.isError = true;
    },
  },
});

export const { clearState } = userSlice.actions;

export const userSelector = (state: any) => state.user;
