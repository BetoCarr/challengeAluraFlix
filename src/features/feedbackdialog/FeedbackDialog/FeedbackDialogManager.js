import React, { useEffect } from "react";
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

    // Cierre automático para feedback informativo
    if (!combinedProps.showActions && combinedProps.autoCloseDuration) {
        setTimeout(handleClose, combinedProps.autoCloseDuration);
    }

    // useEffect(() => {
    //     if (!combinedProps.showActions && combinedProps.autoCloseDuration) {
    //         const timer = setTimeout(handleClose, combinedProps.autoCloseDuration);

    //         // Limpia el temporizador cuando se desmonta el componente
    //         return () => clearTimeout(timer);
    //     }
    // }, [combinedProps.showActions, combinedProps.autoCloseDuration, handleClose]);


    return (
        <FeedbackComponent
            {...combinedProps}
            onConfirm={handleConfirm}
            onClose={handleClose}
        />
    );
}

export default FeedbackDialogManager;