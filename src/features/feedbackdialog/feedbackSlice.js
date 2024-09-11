import { createSlice } from '@reduxjs/toolkit';
import { showSimpleMessage, showMessageWithActions, closeFeedback } from './feedbackActions';

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState: {
        isOpen: false,
        message: '',
        cancelLabel: '',
        confirmLabel: '',
        actionType: null, // Nuevo campo para identificar la acción (por ejemplo: 'delete' o 'edit')
        showActions: false, // Estado para controlar si se muestran los botones
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(showSimpleMessage, (state, action) => {
            state.isOpen = true;
            state.message = action.payload.message;
            state.showActions = false; // No mostrar botones
            state.cancelLabel = '';
            state.confirmLabel = '';
            state.actionType = null; // Reinicia el tipo de acción
        })
        .addCase(showMessageWithActions, (state, action) => {
            state.isOpen = true;
            state.message = action.payload.message;
            state.showActions = true; // Mostrar botones
            state.cancelLabel = action.payload.cancelLabel || 'Cancelar';
            state.confirmLabel = action.payload.confirmLabel || 'Aceptar';
            state.actionType = action.payload.actionType; // Identifica qué acción está ocurriendo
        })
        .addCase(closeFeedback, (state) => {
            state.isOpen = false;
            state.message = '';
            state.showActions = false;
            state.cancelLabel = '';
            state.confirmLabel = '';
            state.actionType = null; // Reinicia el tipo de acción
        });
    },
});

export default feedbackSlice.reducer;