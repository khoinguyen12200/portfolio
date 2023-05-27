import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';


export interface homeSliderInterface {
    activeSlide: string,
    isLoading: boolean,
    deActiveSlide: string,
    blackHoleMode: boolean,
    scrollY: number
}

const initialState: homeSliderInterface = {
    activeSlide: '',
    isLoading: false,
    deActiveSlide: '',
    blackHoleMode: true,
    scrollY: 0
};

const moveToSlide = createAsyncThunk(
    'homeSlider/moveToSlide',
    async (slideId: string, thunkAPI) => {
        const {dispatch, getState} = thunkAPI as any;
        const {activeSlide, isLoading} = getState().homeSlider as homeSliderInterface;
        console.log('moveToSlide', isLoading)
        if(!isLoading) {
            dispatch(setDeActiveSlide(activeSlide));
            dispatch(setActiveSlide(slideId));
            dispatch(setLoading(true));

            setTimeout(() => {
                dispatch(setLoading(false));
            }, 1000);
        }
    }
)

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
            console.log("setLoading", action.payload)
        },
        setBlackHoleMode: (state, action: PayloadAction<boolean>) => {
            state.blackHoleMode = action.payload;
        },
        setScrollY: (state, action: PayloadAction<number>) => {
            state.scrollY = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(moveToSlide.fulfilled, (state, action) => {

        })
    }
});

export const {setActiveSlide, setDeActiveSlide, setLoading, setBlackHoleMode, setScrollY} = homeSliderSlice.actions;
export {moveToSlide};
export default homeSliderSlice.reducer;
