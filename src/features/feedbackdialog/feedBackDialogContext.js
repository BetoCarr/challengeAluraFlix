// FeedbackContext.js
import React, { createContext, useContext, useState } from 'react';

// Crea el contexto
const FeedbackContext = createContext();

// 2. Crear el proveedor del contexto
export const FeedbackProvider = ({ children }) => {
    const [feedback, setFeedback] = useState(null)

    const openFeedback = (name, customProps = {}) => {
        // Configuraciones específicas según el tipo de Feedback
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
                // onConfirm: () => {
                //     closeFeedback();
                //     console.log("Acción confirmada desde Feedback de confirmación.");
                // },
                // onCancel: () => {
                //     closeFeedback();
                //     console.log("Feedback de confirmación cerrado.");
                // },
            },
        };

        // Combinar las configuraciones predeterminadas con las personalizadas
        const finalProps = { ...defaultConfig[name], ...customProps };

        setFeedback({ name, props: finalProps });

        // Manejar cierre automático para feedbacks informativos
        if (!finalProps.showActions && finalProps.autoCloseDuration) {
            setTimeout(() => {
                closeFeedback();
                finalProps.onCloseCallback?.();
            }, finalProps.autoCloseDuration);
        }
    };

    const closeFeedback = () => setFeedback(null)

    return (
        <FeedbackContext.Provider value={{ feedback, openFeedback, closeFeedback }}>
            {children}
        </FeedbackContext.Provider>
    );
};

// 3. Crear un hook para usar el contexto
export const useFeedback = () => useContext(FeedbackContext);
