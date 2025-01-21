// FeedbackContext.js
import React, { createContext, useContext, useState } from 'react';

// Crea el contexto
const FeedbackContext = createContext();

// 2. Crear el proveedor del contexto
export const FeedbackProvider = ({ children }) => {
    const [feedback, setFeedback] = useState(null)

    const openFeedback = (name, props = {}) => {
        const {
            autoCloseDuration = 3000, // Duración predeterminada
            showActions = false,
            onConfirm = () => {},
            onCloseCallback = () => {},
        } = props;
        console.log(props)
        setFeedback({ name, props })
    }

    // const openFeedback = ({
    //     name,
    //     props = {}
    //     // autoCloseDuration = 3000,
    //     // onConfirm = () => {},
    //     // onCloseCallback = () => {},
    //     // showActions = false,
    // }) => {
    //     // Configurar el feedback
    //     setFeedback({ name, props: { ...props, showActions, onConfirm } });

    //     // Configurar cierre automático si no se muestran acciones
    //     if (!showActions && autoCloseDuration) {
    //         setTimeout(() => {
    //             closeFeedback();
    //             onCloseCallback();
    //         }, autoCloseDuration);
    //     }
    // };
    
    const closeFeedback = () => setFeedback(null)

    return (
        <FeedbackContext.Provider value={{ feedback, openFeedback, closeFeedback }}>
            {children}
        </FeedbackContext.Provider>
    );
};

// 3. Crear un hook para usar el contexto
export const useFeedback = () => useContext(FeedbackContext);
