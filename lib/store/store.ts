import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from './slices/favoriteSlice';
import motivationReducer from './slices/motivationSlice';
import languageReducer from './slices/languageSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            favorites: favoriteReducer,
            motivation: motivationReducer,
            language: languageReducer,
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];