import { createListenerMiddleware } from "@reduxjs/toolkit";
import { deleteCategory } from "./videoCategoriesSlice";
import { showFeedbackToUser } from "../feedbackdialog/feedbackActions";

// Crea el middleware de listener
const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    actionCreator: deleteCategory.pending, // Intercepta cuando el thunk se inicia
    effect: async (action, listenerApi) => {
        listenerApi.dispatch(showFeedbackToUser({
            message: 'Eliminando categoría...',
            confirmLabel: 'Aceptar',
        }));
    },
});

listenerMiddleware.startListening({
    actionCreator: deleteCategory.fulfilled, // Intercepta cuando el thunk se completa exitosamente
    effect: async (action, listenerApi) => {
        listenerApi.dispatch(showFeedbackToUser({
            message: '¡Categoría eliminada exitosamente!',
            confirmLabel: 'Aceptar',
        }));    
    },
});

listenerMiddleware.startListening({
    actionCreator: deleteCategory.rejected, // Intercepta cuando el thunk falla
    effect: async (action, listenerApi) => {
        listenerApi.dispatch(showFeedbackToUser({
            message: `Error al eliminar la categoría: ${action.error.message}`,
            confirmLabel: 'Aceptar',
        }));    
    },
});

export default listenerMiddleware;