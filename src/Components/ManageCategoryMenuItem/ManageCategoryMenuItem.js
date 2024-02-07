// // Importación de React y componentes
// import React, { useState }  from 'react';
// import MenuItem from '@mui/material/MenuItem';
// import Divider from '@mui/material/Divider';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import EditIcon from '@mui/icons-material/Edit';
// import FeedbackDialog from '../FeedbackDialog/FeedbackDialog';
// import { useTheme } from '@mui/material/styles'; 

// // Función utilitaria para cerrar el diálogo
// export const handleCloseDialog = (handleClose, setFeedback) => {
//     handleClose();
//     setFeedback({ isOpen: false });
// }

// function ManageCategoryMenuItem({ categoryId, categoryName, operation, handleBackendOperation }) {
//     // Estado para controlar la apertura y cierre del cuadro de diálogo de eliminación
//     const [feedback, setFeedback] = useState({ isOpen: false, message: '', onConfirm: null });

//     // Variable para acceder a ThemeProvider
//     const theme = useTheme();

//     // Función para abrir cuadro de dialogo de confirmación de acción de la categoría
//     const handleOpenDialog = () => {
//         setFeedback({
//             isOpen: true,
//             message: `¿Quieres ${operation.toLowerCase()} la categoría "${categoryName}"?`,
//             onCancel: handleCloseDialog,
//             onConfirm: handleOperation,
//             cancelLabel: 'Cancelar',
//             confirmLabel: 'Aceptar',
//         });
//     };

//     // Función para realizar la operación en el backend
//     const handleOperation = async () => {
//         try {
//             await handleBackendOperation(categoryId);
//         } catch (error) {
//             console.error(`Error al ${operation.toLowerCase()} la categoría:`, error);
//             setFeedback({
//                 isOpen: true,
//                 message: `Error al ${operation.toLowerCase()} la categoría. Detalles: ${error}`,
//                 onConfirm: () => setFeedback({ isOpen: false }),
//                 confirmLabel: 'Aceptar',
//             });
//         }
//     };

//     // Retorna componente principal
//     return (
//         <>
//             {/* Elemento de menú con ícono y texto de acuerdo a la operación */}
//             <MenuItem className='menu-item' onClick={handleOpenDialog}>
//                 {operation === 'Eliminar' && <DeleteForeverIcon style={{ fill: theme.palette.text.primary, fontSize: "23px" }} />}
//                 {operation === 'Editar' && <EditIcon style={{ fill: theme.palette.text.primary, fontSize: "23px" }} />}
//                 {operation}
//             </MenuItem>
//             {/* Cuadro de diálogo de confirmación */}
//             <FeedbackDialog
//                 isOpen={feedback.isOpen}
//                 onClose={handleCloseDialog}
//                 message={feedback.message}
//                 onCancel={handleCloseDialog}
//                 onConfirm={feedback.onConfirm}
//                 confirmLabel={feedback.confirmLabel}
//             />
//             {/* Separador entre elementos de menú */}
//             <Divider sx={{ my: 0.5 }} />
//         </>
//     )
// }

// // Exporta el componente ManageCategoryMenuItem
// export default ManageCategoryMenuItem;