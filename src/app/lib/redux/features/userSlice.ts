import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Definisikan tipe untuk state
interface UserState {
    user: any | null; // Ganti `any` dengan tipe user yang lebih spesifik jika ada
}

// State awal
const initialState: UserState = {
    user: null,
};

// Buat slice dengan type safety
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setSignIn: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
        },
        signOut: (state) => {
            state.user = null;
        },
    },
});

// Export action dan reducer
export const { setSignIn, signOut } = userSlice.actions;
export default userSlice.reducer;
