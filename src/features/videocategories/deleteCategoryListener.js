import { createListenerMiddleware } from "@reduxjs/toolkit";
import { deleteCategory } from "./videoCategoriesSlice";
import { showFeedbackToUser, closeFeedback } from "../feedbackdialog/feedbackActions";

// Crea el middleware de listener
const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    actionCreator: deleteCategory.pending, // Intercepta cuando el thunk se inicia
    effect: async (action, listenerApi) => {
        listenerApi.dispatch(showFeedbackToUser({
            message: 'Eliminando categoría...',
            // confirmLabel: 'Aceptar',
        }));
    },
});

listenerMiddleware.startListening({
    actionCreator: deleteCategory.fulfilled, // Intercepta cuando el thunk se completa exitosamente
    effect: async (action, listenerApi) => {
        await listenerApi.condition((action) => action.type === closeFeedback.type);
        listenerApi.dispatch(showFeedbackToUser({
            message: '¡Categoría eliminada exitosamente!',
            confirmLabel: 'Aceptar',
        }));    
         // Espera a que el feedback sea cerrado antes de continuar
         // Aquí se puede despachar una acción para actualizar el estado de Redux o ejecutar cualquier otra lógica.
        console.log('Feedback cerrado, ahora puedes actualizar el estado.');
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