import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface homeSliderInterface {
    activeSlide: string,
    isLoading: boolean,
    deActiveSlide: string,
    blackHoleMode: boolean
}

const initialState: homeSliderInterface = {
    activeSlide: '',
    isLoading: false,
    deActiveSlide: '',
    blackHoleMode: true
};

export const homeSliderSlice = createSlice({
    name: 'homeSliderSlice',
    initialState,
    reducers: {
        setActiveSlide: (state, action: PayloadAction<string>) => {
            state.activeSlide = action.payload;
        },
        setDeActiveSlide: (state, action: PayloadAction<string>) => {
            state.deActiveSlide = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setBlackHoleMode: (state, action: PayloadAction<boolean>) => {
            state.blackHoleMode = action.payload;
        }
    },
});

export const { setActiveSlide, setDeActiveSlide, setLoading, setBlackHoleMode } = homeSliderSlice.actions;
export default homeSliderSlice.reducer;
