import { configureStore } from '@reduxjs/toolkit';
import users from "./users"
import category from "./category"
export const store = configureStore({
    reducer: {
        users,
        category
    },
});