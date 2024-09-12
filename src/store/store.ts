import { setupListeners } from '@reduxjs/toolkit/query';
import { configureStore } from '@reduxjs/toolkit/react';
import { usersApi } from 'api/users.service';

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersApi.middleware),
});

setupListeners(store.dispatch);
