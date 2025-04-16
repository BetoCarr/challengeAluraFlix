// Importacion de React, Hooks y componentes
import React from "react";
import { useFeedback } from "../feedBackDialogContext"
import FeedbackDialog from "./FeedbackDialog";

// Mapeo de tipos de feedback a componentes específicos.
// Permitiendo usar diferentes componentes de diálogo según el tipo de feedback.
const FeedbackLookup = {
    InformativeFeedbackDialog: FeedbackDialog, // Para mensajes informativos
    ConfirmationFeedbackDialog: FeedbackDialog, // Para confirmaciones de acciones
};


function FeedbackDialogManager() {
    // Obtiene el estado actual del feedback y la función para cerrarlo desde el contexto.
    const { feedback, closeFeedback } = useFeedback();
    
    // Si no hay feedback activo, no renderiza nada.
    if (!feedback) return null;

    // Extrae el nombre del componente de feedback y sus propiedades.
    const { name, props } = feedback;

    // Obtiene el componente correspondiente al tipo de feedback desde FeedbackLookup.
    const FeedbackComponent = FeedbackLookup[name];

    // Si el componente no está registrado, muestra un error en la consola y no renderiza nada.
    if (!FeedbackComponent) {
        console.error(`El componente "${name}" no está registrado en FeedbackLookup.`);
        return null;
    }

    // Configuraciones predeterminadas para cada tipo de feedback
    // Permite definir comportamientos generales para los diferentes tipos.
    const defaultConfig = {
        InformativeFeedbackDialog: {
            autoCloseDuration: 3000, // Duración de cierre automático en milisegundos.
            showActions: false, // No muestra botones de acción.
        },
        ConfirmationFeedbackDialog: {
            autoCloseDuration: null, // No se cierra automáticamente.
            showActions: true, // Muestra botones de acción (Aceptar/Cancelar).
        },
    };

    // Combina la configuración predeterminada con las propiedades específicas
    const combinedProps = {
        ...defaultConfig[name], // Configuración predeterminada según el tipo
        ...props, // Configuración específica pasada al abrir el feedback
    };
    // Maneja la confirmación de acciones en diálogos de confirmación.
    const handleConfirm = () => {
        combinedProps.onConfirm?.(); // Llama a la función `onConfirm` si está definida.
        closeFeedback(); // Cierra el diálogo automáticamente
    };
    // Maneja el cierre del diálogo, ejecutando el callback si se proporciona.
    const handleClose = () => {
        closeFeedback();
        props.onCloseCallback?.(); // Ejecutar callback al cerrar
    }

    // Configura el cierre automático para diálogos informativos.
    // Solo se aplica si `showActions` está desactivado y se define `autoCloseDuration`.
    if (!combinedProps.showActions && combinedProps.autoCloseDuration) {
        setTimeout(handleClose, combinedProps.autoCloseDuration); // Cierra el diálogo después de la duración especificada.
    }

    // Renderiza el componente de feedback con las propiedades combinadas y los manejadores de eventos.
    return (
        <FeedbackComponent
            {...combinedProps}
            onConfirm={handleConfirm}
            onClose={handleClose}
        />
    );
}

export default FeedbackDialogManager;