import React from "react";
import { useFeedback } from "../feedBackDialogContext"
import FeedbackDialog from "./FeedbackDialog";

const FeedbackLookup = {
    InformativeFeedbackDialog: FeedbackDialog, // Para mensajes informativos
    ConfirmationFeedbackDialog: FeedbackDialog, // Para confirmaciones de acciones
};


function FeedbackDialogManager() {
    const { feedback, closeFeedback } = useFeedback();

    if (!feedback) return null;

    const { name, props } = feedback;
    const FeedbackComponent = FeedbackLookup[name];

    if (!FeedbackComponent) {
        console.error(`El componente "${name}" no está registrado en FeedbackLookup.`);
        return null;
    }

    // Configuraciones predeterminadas para cada tipo de feedback
    const defaultConfig = {
        InformativeFeedbackDialog: {
            autoCloseDuration: 3000,
            showActions: false,
            onCloseCallback: () => {
                console.log("Feedback informativo cerrado automáticamente.");
            },
        },
        ConfirmationFeedbackDialog: {
            autoCloseDuration: null, // No cierre automático
            showActions: true,
        },
    };

    // Combina la configuración predeterminada con las propiedades específicas
    const combinedProps = {
        ...defaultConfig[name], // Configuración predeterminada según el tipo
        ...props, // Configuración específica pasada al abrir el feedback
    };

    const handleConfirm = () => {
        combinedProps.onConfirm?.(); // Ejecuta la función personalizada
        closeFeedback(); // Cierra el diálogo automáticamente
    };

    const handleClose = () => {
        closeFeedback();
        props.onCloseCallback?.(); // Ejecutar callback al cerrar
    }

    return (
        <FeedbackComponent
            {...combinedProps}
            onConfirm={handleConfirm}
            onClose={handleClose}
        />
    );
}

export default FeedbackDialogManager;