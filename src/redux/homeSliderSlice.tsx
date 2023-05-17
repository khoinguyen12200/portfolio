import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface homeSliderInterface {
    activeSlide: string,
    isLoading: boolean,
    deActiveSlide: string
}

const initialState: homeSliderInterface = {
    activeSlide: '',
    isLoading: false,
    deActiveSlide: ''
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
        }
    },
});

export const { setActiveSlide, setDeActiveSlide, setLoading } = homeSliderSlice.actions;
export default homeSliderSlice.reducer;
