// // Importación de React y componentes necesarios
// import React, { useState } from 'react';
// import FeedbackDialog from '../../features/feedbackdialog/FeedbackDialog/FeedbackDialog';

// // Definición del componente ConfirmationDialogWithForm
// function ConfirmationDialogWithForm({ isOpen, onClose, message, onConfirm, confirmLabel, onCancel, cancelLabel, formComponent }) {

//     // Estado local para controlar la visibilidad del formulario
//     const [showForm, setShowForm] = useState(false);

//     // Función para manejar la confirmación
//     const handleConfirm = () => {
//         onConfirm(); // Llama a la función de confirmación pasada como prop
//         setShowForm(true); // Muestra el formulario después de confirmar
//     };

//     // Función para manejar la cancelación
//     const handleCancel = () => {
//         onCancel(); // Llama a la función de cancelación pasada como prop
//         setShowForm(false);
//     };

//     // Función para cerrar el formulario
//     const handleFormClose = () => {
//         setShowForm(false); // Oculta el formulario cuando se cierra
//     };

//     return (
//         <>
//             {/* Componente FeedbackDialog para mostrar mensajes de confirmación y cancelación */}
//             <FeedbackDialog
//                isOpen={isOpen} // Indica si el diálogo de confirmación está abierto
//                onClose={onClose} // Función para cerrar el diálogo de confirmación
//                message={message} // Mensaje a mostrar en el diálogo de confirmación
//                onConfirm={handleConfirm} // Función para manejar la confirmación
//                confirmLabel={confirmLabel} // Etiqueta para el botón de confirmación
//                onCancel={handleCancel} // Función para manejar la cancelación
//                cancelLabel={cancelLabel} // Etiqueta para el botón de cancelación
//             />
//             {/* Renderiza el formulario si showForm es true */}
//             {showForm && formComponent(handleFormClose)}
//         </>
//     );
// }

// // Exporta el componente ConfirmationDialogWithForm
// export default ConfirmationDialogWithForm;
