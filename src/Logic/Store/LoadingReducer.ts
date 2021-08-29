import { createSlice, Slice } from "@reduxjs/toolkit";

type LoadingSliceProps = {
    isLoading: boolean
}

const LoadingSlice: Slice<LoadingSliceProps> = createSlice({
    name: 'Loading',
    initialState: {
        isLoading: true
    } as LoadingSliceProps,
    reducers: {
        setLoading: (LoadingState, action: { payload: boolean, type: string }) => {
            LoadingState.isLoading = action.payload
        }
    }
})

export const { setLoading } = LoadingSlice.actions
export const loadingReducer = LoadingSlice.reducer