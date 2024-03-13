//import react features
import {configureStore} from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react';
import {userApi} from '../features/user/userApi'
import { notificationApi } from '../features/notifications/notificationApi';


export const store=configureStore({
    reducer:{
        [userApi.reducerPath]:userApi.reducer,
        [notificationApi.reducerPath]:notificationApi.reducer,

    },

    middleware:(getDefaultMiddleware)=>getDefaultMiddleware()
    .concat(
        userApi.middleware,notificationApi.middleware
        )
    }, 
)

setupListeners(store.dispatch)