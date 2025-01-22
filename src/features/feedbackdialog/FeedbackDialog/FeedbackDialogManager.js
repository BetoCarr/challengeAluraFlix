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
    const handleConfirm = () => {
        props.onConfirm?.(); // Llama la función personalizada si está definida
        closeFeedback(); // Cierra el diálogo automáticamente
    };

    const handleClose = () => {
        closeFeedback();
        props.onCloseCallback?.(); // Ejecutar callback al cerrar
    }

    return (
        <FeedbackComponent
            {...props}
            onConfirm={handleConfirm}
            onClose={handleClose}
        />
    );
}

export default FeedbackDialogManager;