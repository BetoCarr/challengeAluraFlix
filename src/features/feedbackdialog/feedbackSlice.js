import { createSlice } from '@reduxjs/toolkit';
import { showFeedbackToUser, closeFeedback } from './feedbackActions';

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState: {
        isOpen: false,
        message: '',
        cancelLabel: 'Cancelar',
        confirmLabel: 'Aceptar',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(showFeedbackToUser, (state, action) => {
            state.isOpen = true;
            state.message = action.payload.message;
            state.confirmLabel = action.payload.confirmLabel || null;
            state.cancelLabel = action.payload.cancelLabel || 'Aceptar';
        })
        .addCase(closeFeedback, (state) => {
            state.isOpen = false;
            state.message = '';
            // state.onConfirm = null;
            // state.confirmLabel = 'Aceptar';
            // state.cancelLabel = 'Cancelar';
        });
    },
});

export default feedbackSlice.reducer;