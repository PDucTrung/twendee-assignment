import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  currentPage: 0,
  loading: true,
  sort: "",
  dataDefault: [],
};

export const loadUsers = createAsyncThunk(
  "users/loadloadUsers",
  async (page) => {
    const response = await fetch(
      `https://randomuser.me/api/?page=${page}&results=10`
    );
    const data = await response.json();
    const usersList = data.results;
    return usersList;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    sortByUserName: (state, action) => {
      const ascUserName = state.data.sort((a, b) =>
        a.login.username !== b.login.username
          ? a.login.username < b.login.username
            ? -1
            : 1
          : 0
      );

      return void {
        ...state,
        currentPage: 0,
        data: ascUserName,
      };
    },

    sortByUserFullName: (state, action) => {
      const ascFullName = state.data.sort((a, b) => {
        const c = a.name.title + " " + a.name.first + " " + a.name.last;
        const d = b.name.title + " " + b.name.first + " " + b.name.last;
        return c !== d ? (c < d ? -1 : 1) : 0;
      });

      return void {
        ...state,
        currentPage: 0,
        data: ascFullName,
      };
    },

    clearFilter: (state, action) => {
      return {
        ...state,
        currentPage: 0,
        filter: [],
        data: [...state.dataDefault],
      };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loadUsers.fulfilled, (state, action) => {
      return {
        ...state,
        data: action.payload,
        dataDefault: action.payload,
        loading: false,
      };
    });
  },
});

export const usersReducer = usersSlice.reducer;

export const { sortByUserName, sortByUserFullName, clearFilter } =
  usersSlice.actions;

export const selectUsersStatus = (state) => state.users.loading;

export const selectUsers = (state) => {
  return {
    users: state.users.data,
    sortByUserName,
    sortByUserFullName,
    clearFilter,
  };
};
