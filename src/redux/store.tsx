import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import homeSliderReducer from "./homeSliderSlice";

const loadState = () => {
    try {
        const serializedState = localStorage.getItem("State");
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (e) {
        return undefined;
    }
};

const saveState = (state: any) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("State", serializedState);
    } catch (e) {
        // Ignore write errors;
    }
};

export const store = configureStore({
    reducer: {
        homeSlider: homeSliderReducer,
    },
    preloadedState: loadState(),
    devTools: true,
});
store.subscribe(() => {
    saveState(store.getState())
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
