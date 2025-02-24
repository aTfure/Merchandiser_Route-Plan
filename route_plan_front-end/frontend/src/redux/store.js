import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { merchandiserApi } from "./slices/merchandiserSlice";
import { authApi } from "./slices/authApi";
import authReducer from "./slices/authSlice";
import { ChannelApi } from "./slices/channelSlice";
import { OutletApi } from "./slices/outletSlice";
import { RouteApi } from "./slices/routeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [merchandiserApi.reducerPath]: merchandiserApi.reducer,
    [ChannelApi.reducerPath]: ChannelApi.reducer,
    [OutletApi.reducerPath]: OutletApi.reducer,
    [RouteApi.reducerPath]: RouteApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      merchandiserApi.middleware,
      ChannelApi.middleware,
      OutletApi.middleware,
      RouteApi.middleware
    ),
});

setupListeners(store.dispatch);

// For use with useSelector
export const selectStore = (state) => state;

export default store;
