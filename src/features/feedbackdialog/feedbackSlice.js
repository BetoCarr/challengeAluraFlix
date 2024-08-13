import { createSlice } from '@reduxjs/toolkit';
import { showFeedbackToUser, closeFeedback } from './feedbackActions';

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState: {
        isOpen: false,
        message: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(showFeedbackToUser, (state, action) => {
            state.isOpen = true;
            state.message = action.payload.message;
            state.onConfirm = action.payload.onConfirm || null;
            state.confirmLabel = action.payload.confirmLabel || 'Aceptar';
        })
        .addCase(closeFeedback, (state) => {
            state.isOpen = false;
            state.message = '';
            state.onConfirm = null;
            state.confirmLabel = 'Aceptar';
        });
    },
});

export default feedbackSlice.reducer;