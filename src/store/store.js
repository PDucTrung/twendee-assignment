import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./feature/users/users.slice";

const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export default store;
