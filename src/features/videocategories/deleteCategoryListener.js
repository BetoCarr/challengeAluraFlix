// import { createListenerMiddleware } from "@reduxjs/toolkit";
// import { deleteCategory } from "./videoCategoriesSlice";
// import { showFeedbackToUser, closeFeedback, confirmCategoryDeletion } from "../feedbackdialog/feedbackActions";

// // Crea el middleware de listener
// const listenerMiddleware = createListenerMiddleware();

// listenerMiddleware.startListening({
//     actionCreator: deleteCategory.pending, // Intercepta cuando el thunk se inicia
//     effect: async (action, listenerApi) => {
//         listenerApi.dispatch(showFeedbackToUser({
//             message: 'Eliminando categoría...',
//             // confirmLabel: 'Aceptar',
//         }));
//     },
// });

// listenerMiddleware.startListening({
//     actionCreator: deleteCategory.fulfilled,
//     effect: async (action, listenerApi) => {
//         listenerApi.dispatch(showFeedbackToUser({
//             message: '¡Categoría eliminada exitosamente!',
//             confirmLabel: 'Aceptar',
//         }));

//         // Espera hasta que el usuario confirme
//         await listenerApi.take(confirmCategoryDeletion);

//         // Aquí puedes realizar cualquier acción adicional necesaria antes de cerrar el feedback
//         listenerApi.dispatch(closeFeedback());
//     },
// });

// listenerMiddleware.startListening({
//     actionCreator: deleteCategory.rejected, // Intercepta cuando el thunk falla
//     effect: async (action, listenerApi) => {
//         listenerApi.dispatch(showFeedbackToUser({
//             message: `Error al eliminar la categoría: ${action.error.message}`,
//             confirmLabel: 'Aceptar',
//         }));    
//     },
// });

// export default listenerMiddleware;