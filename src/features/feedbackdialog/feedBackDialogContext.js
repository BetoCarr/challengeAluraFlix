// FeedbackContext.js
import React, { createContext, useContext, useState } from 'react';

// Crea el contexto
const FeedbackContext = createContext();

// 2. Crear el proveedor del contexto
export const FeedbackProvider = ({ children }) => {
    const [feedback, setFeedback] = useState(null)

    // Función para abrir un feedback
    const openFeedback = (name, props = {}) => {
        setFeedback({ name, props });
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