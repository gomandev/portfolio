import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface Contacts {
  contact: string;
  name: string;
  id: string;
  groups: any[];
  group?: any[];
  customField: string[];
  token: string;
}

export type contactState = {
  contacts: any[];
  groups: any[];
  isGroupSuccess: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  isContactSuccess: boolean;
  isError: boolean;
  errorMessage: string;
};

const initialState: contactState = {
  contacts: [],
  groups: [],
  isGroupSuccess: false,
  isContactSuccess: false,
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
};

export const addContact: any = createAsyncThunk(
  'contacts/add',
  async ({ name, contact, customField, group, token }: Contacts, thunkAPI: any) => {
    try {
      const response = await fetch(
        'https://ascend-newer.herokuapp.com/contacts/contact',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': token,
          },
          body: JSON.stringify({
            contact,
            group,
            name,
            custom: customField,
          }),
        },
      );

      let data = await response.json();

      if (response.status === 200) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const moveContact: any = createAsyncThunk(
  'contacts/move',
  async ({ contacts, newGroup, oldGroup, token }: any, thunkAPI: any) => {
    try {
      const response = await fetch(
        'https://ascend-newer.herokuapp.com/contacts/move/contact/many',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': token,
          },
          body: JSON.stringify({
            contacts,
            newGroup,
            oldGroup,
          }),
        },
      );

      let data = await response.json();

      if (response.status === 200) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const copyContact: any = createAsyncThunk(
  'contacts/copy',
  async ({ contacts, group, token }: any, thunkAPI: any) => {
    try {
      const response = await fetch(
        'https://ascend-newer.herokuapp.com/contacts/copy/contact/many',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': token,
          },
          body: JSON.stringify({
            contacts,
            group,
          }),
        },
      );

      let data = await response.json();

      if (response.status === 200) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const getContacts: any = createAsyncThunk(
  'contacts/all',
  async ({ token }: any, thunkAPI) => {
    try {
      const response = await fetch(
        'https://ascend-newer.herokuapp.com/contacts/getcontacts',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': token,
          },
        },
      );
      let data = await response.json();

      if (response.status === 200) {
        return data.data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const getGroups: any = createAsyncThunk(
  'groups/all',
  async ({ token }: any, thunkAPI) => {
    try {
      const response = await fetch(
        'https://ascend-newer.herokuapp.com/contacts/getgroups',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': token,
          },
        },
      );
      let data = await response.json();
      console.log('Fetched Groups:', data);
      if (response.status === 200) {
        return data.data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const addGroup: any = createAsyncThunk(
  'groups/add',
  async ({ group, token }: Contacts, thunkAPI: any) => {
    try {
      const response = await fetch(
        'https://ascend-newer.herokuapp.com/contacts/group',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': token,
          },
          body: JSON.stringify({
            group,
          }),
        },
      );

      let data = await response.json();
      console.log('data', data);

      if (response.status === 200) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const deleteContacts: any = createAsyncThunk(
  'contacts/delete',
  async ({ contacts, token }: any, thunkAPI: any) => {
    console.log(
      JSON.stringify({
        contact: contacts,
      }),
    );
    try {
      const response = await fetch(
        'https://ascend-newer.herokuapp.com/contacts/contact/many',
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'X-Auth-Token': token,
          },
          body: JSON.stringify({
            contacts: contacts,
          }),
        },
      );

      let data = await response.json();
      console.log('data', data);

      if (response.status === 200) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const addContacts: any = createAsyncThunk(
  'contacts/sheet',
  async ({ file, token }: any, thunkAPI: any) => {
    const fileData = new FormData();
    fileData.append('contacts.csv', file);

    try {
      console.log(
        JSON.stringify({
          file: file,
        }),
      );
      const response = await fetch(
        'https://ascend-newer.herokuapp.com/contacts/contact/sheet',
        {
          method: 'POST',
          headers: {
            'X-Auth-Token': token,
          },
          body: fileData,
        },
      );

      let data = await response.json();
      console.log('data', data);

      if (response.status === 200) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log('Error', e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  },
);

export const contactSlice: any = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    clearContactState: state => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;

      return state;
    },
    deleteContact: (state, { payload }): any => {
      console.log(payload);
      return state.contacts.filter(item => item.id === payload);
    },
  },
  extraReducers: {
    [addContact.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isContactSuccess = true;
      return state;
    },
    [addContact.pending]: state => {
      state.isFetching = true;
    },
    [addContact.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [getContacts.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.contacts = payload;
      return state;
    },
    [getContacts.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
    },
    [getContacts.pending]: state => {
      state.isFetching = true;
    },
    [addGroup.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isGroupSuccess = true;
      return state;
    },
    [addGroup.pending]: state => {
      state.isFetching = true;
    },
    [addGroup.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [getGroups.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.groups = payload;
      return state;
    },
    [getGroups.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
    },
    [getGroups.pending]: state => {
      state.isFetching = true;
    },

    [deleteContacts.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;

      return state;
    },
    [deleteContacts.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
    },
    [deleteContacts.pending]: state => {
      state.isFetching = true;
    },
    [addContacts.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;

      return state;
    },
    [addContacts.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
    },
    [addContacts.pending]: state => {
      state.isFetching = true;
    },
    [moveContact.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;

      return state;
    },
    [moveContact.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
    },
    [moveContact.pending]: state => {
      state.isFetching = true;
    },
    [copyContact.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;

      return state;
    },
    [copyContact.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
    },
    [copyContact.pending]: state => {
      state.isFetching = true;
    },
  },
});

export const { clearContactState, deleteContact } = contactSlice.actions;

export const contactSelector = (state: any) => state.contact;
